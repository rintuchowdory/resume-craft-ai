import React, { useState, useEffect } from "react";
import { Resume } from "@/entities/Resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Eye, Download, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    setIsLoading(true);
    try {
      const data = await Resume.list("-updated_date");
      setResumes(data);
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
    setIsLoading(false);
  };

  const createNewResume = async () => {
    try {
      const newResume = await Resume.create({
        title: `Resume ${resumes.length + 1}`,
        template: "modern",
        personal_info: {
          full_name: "",
          email: "",
          phone: "",
          location: "",
          summary: ""
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        ats_score: 0
      });
      window.location.href = createPageUrl(`Editor?id=${newResume.id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Resumes</h1>
            <p className="text-gray-600">Create and manage your AI-powered resumes</p>
          </div>
          <Button
            onClick={createNewResume}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Resume
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Total Resumes</p>
                  <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Avg ATS Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {resumes.length > 0 
                      ? Math.round(resumes.reduce((sum, r) => sum + (r.ats_score || 0), 0) / resumes.length)
                      : 0}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">AI Generations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {resumes.reduce((sum, r) => sum + (r.experience?.length || 0), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Resume Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <FileText className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No resumes yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Get started by creating your first AI-powered resume. It only takes a few minutes!
          </p>
          <Button
            onClick={createNewResume}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Resume
          </Button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                        {resume.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        {resume.template} template
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
                      <Target className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-green-700">
                        {resume.ats_score || 0}%
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-4 mb-4 h-32 flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    Updated {format(new Date(resume.updated_date), "MMM d, yyyy")}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      to={createPageUrl(`Editor?id=${resume.id}`)}
                      className="flex-1"
                    >
                      <Button size="sm" variant="outline" className="w-full group-hover:bg-green-50 group-hover:border-green-200">
                        <Eye className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="group-hover:bg-green-50 group-hover:border-green-200">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}