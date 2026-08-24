import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Job } from "@/entities/Job";
import { Resume, JobApplication } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Calendar, DollarSign, TrendingUp, Search, Filter, ExternalLink, Bookmark, Send } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { createPageUrl } from "@/utils";
import ResumeLoader from "@/components/common/ResumeLoader";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [jobData, resumeData] = await Promise.all([
        Job.list("-posted_date"),
        Resume.list("-updated_date")
      ]);
      setJobs(jobData);
      setResumes(resumeData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const applyToJob = async (job) => {
    try {
      if (resumes.length === 0) {
        alert("Please create a resume first before applying to jobs!");
        return;
      }

      // Use the most recently updated resume
      const latestResume = resumes[0];
      
      await JobApplication.create({
        job_title: job.title,
        company_name: job.company,
        application_date: new Date().toISOString().split('T')[0],
        status: "applied",
        resume_used: latestResume.id,
        notes: `Applied through ResumeAI job board`
      });

      alert(`Successfully applied to ${job.title} at ${job.company}!`);
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Error applying to job. Please try again.");
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = locationFilter === "all" || job.location.toLowerCase().includes(locationFilter);
    const matchesType = typeFilter === "all" || job.type === typeFilter;
    const matchesLevel = levelFilter === "all" || job.experience_level === levelFilter;
    const matchesTrending = !showTrendingOnly || job.is_trending;

    return matchesSearch && matchesLocation && matchesType && matchesLevel && matchesTrending;
  });

  const getExperienceLevelColor = (level) => {
    const colors = {
      entry: "bg-green-100 text-green-800",
      mid: "bg-blue-100 text-blue-800", 
      senior: "bg-purple-100 text-purple-800",
      executive: "bg-red-100 text-red-800"
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800",
      "part-time": "bg-yellow-100 text-yellow-800",
      "contract": "bg-orange-100 text-orange-800",
      "remote": "bg-purple-100 text-purple-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  if (isLoading) {
    return <ResumeLoader />;
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <TrendingUp className="w-4 h-4 mr-1" />
            Trending
          </Badge>
        </div>
        <p className="text-gray-600 text-lg">
          Discover exciting career opportunities and apply directly with your AI-optimized resume.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-200">
        <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="austin">Austin</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showTrendingOnly ? "default" : "outline"}
            onClick={() => setShowTrendingOnly(!showTrendingOnly)}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Trending Only
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          Found {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} matching your criteria
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      {job.company_logo && (
                        <img 
                          src={job.company_logo} 
                          alt={`${job.company} logo`}
                          className="w-12 h-12 rounded-lg object-contain border"
                        />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-xl font-bold text-gray-900 truncate">{job.title}</h2>
                          {job.is_trending && (
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-400 text-white">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(job.posted_date), 'MMM d, yyyy')}</span>
                          </div>
                          {job.salary_min && job.salary_max && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span>${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getTypeColor(job.type)}>
                            {job.type.replace('-', ' ')}
                          </Badge>
                          <Badge className={getExperienceLevelColor(job.experience_level)}>
                            {job.experience_level} level
                          </Badge>
                          {job.remote_friendly && (
                            <Badge variant="outline" className="border-green-200 text-green-700">
                              Remote Friendly
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                          {job.description}
                        </p>

                        {job.skills && job.skills.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
                            <div className="flex flex-wrap gap-1">
                              {job.skills.slice(0, 6).map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 6 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{job.skills.length - 6} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={() => applyToJob(job)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Quick Apply
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      
                      <Button asChild variant="outline" size="sm">
                        <Link to={createPageUrl(`JobDetails?id=${job.id}`)}>
                         <ExternalLink className="w-4 h-4 mr-2" />
                         View Details
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      {job.application_deadline && (
                        <p className="text-xs text-gray-500">
                          Deadline: {format(new Date(job.application_deadline), 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {filteredJobs.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
}