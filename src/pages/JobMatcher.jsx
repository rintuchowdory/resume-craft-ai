import React, { useState } from "react";
import { Resume } from "@/entities/Resume";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Upload, Sparkles, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function JobMatcher() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  React.useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await Resume.list("-updated_date");
      setResumes(data);
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
  };

  const analyzeJobMatch = async () => {
    if (!selectedResume || !jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const resume = resumes.find(r => r.id === selectedResume);
      
      const response = await InvokeLLM({
        prompt: `Analyze the match between this resume and job description. Provide a comprehensive analysis with:

        RESUME:
        Name: ${resume.personal_info?.full_name}
        Summary: ${resume.personal_info?.summary}
        Skills: ${resume.skills?.join(', ')}
        Experience: ${resume.experience?.map(exp => `${exp.title} at ${exp.company}: ${exp.bullets?.join('; ')}`).join(' | ')}
        
        JOB DESCRIPTION:
        ${jobDescription}
        
        Provide:
        1. Overall match percentage (0-100)
        2. Missing skills that are required
        3. Skills that match well
        4. Experience relevance score
        5. Specific suggestions to improve the match
        6. Keywords to add to resume
        7. Sections that need strengthening`,
        response_json_schema: {
          type: "object",
          properties: {
            match_percentage: { type: "number", minimum: 0, maximum: 100 },
            missing_skills: { type: "array", items: { type: "string" } },
            matching_skills: { type: "array", items: { type: "string" } },
            experience_relevance: { type: "number", minimum: 0, maximum: 100 },
            suggestions: { type: "array", items: { type: "string" } },
            keywords_to_add: { type: "array", items: { type: "string" } },
            weak_sections: { type: "array", items: { type: "string" } },
            strong_points: { type: "array", items: { type: "string" } }
          }
        }
      });

      setMatchResult(response);
    } catch (error) {
      console.error("Error analyzing job match:", error);
    }
    setIsAnalyzing(false);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600"; 
    return "text-red-600";
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100";
    if (percentage >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Target className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Job Matcher</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Analyze how well your resume matches specific job descriptions and get personalized improvement suggestions.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border border-purple-200/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Upload className="w-5 h-5" />
                Job Analysis Setup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Resume
                </label>
                <Select value={selectedResume} onValueChange={setSelectedResume}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a resume to analyze" />
                  </SelectTrigger>
                  <SelectContent>
                    {resumes.map((resume) => (
                      <SelectItem key={resume.id} value={resume.id}>
                        {resume.title} ({resume.template})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here... Include requirements, responsibilities, and qualifications."
                  rows={12}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={analyzeJobMatch}
                disabled={isAnalyzing || !selectedResume || !jobDescription.trim()}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing Match...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze Job Match
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {matchResult ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Match Score */}
              <Card className={`${getMatchBgColor(matchResult.match_percentage)} border border-gray-200`}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <span>Match Score</span>
                    <TrendingUp className={`w-5 h-5 ${getMatchColor(matchResult.match_percentage)}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getMatchColor(matchResult.match_percentage)} mb-2`}>
                      {matchResult.match_percentage}%
                    </div>
                    <Progress value={matchResult.match_percentage} className="w-full mb-4" />
                    <p className="text-sm text-gray-600">
                      {matchResult.match_percentage >= 80 && "Excellent match! You're a strong candidate."}
                      {matchResult.match_percentage >= 60 && matchResult.match_percentage < 80 && "Good match with room for improvement."}
                      {matchResult.match_percentage < 60 && "Needs significant improvements to match."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Experience Relevance */}
              <Card className="bg-blue-50 border border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Experience Relevance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-700">Relevance Score</span>
                    <span className="font-bold text-blue-800">{matchResult.experience_relevance}%</span>
                  </div>
                  <Progress value={matchResult.experience_relevance} className="w-full" />
                </CardContent>
              </Card>

              {/* Strong Points */}
              {matchResult.strong_points?.length > 0 && (
                <Card className="bg-green-50 border border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      Strong Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {matchResult.strong_points.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-green-700 text-sm">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Areas to Improve */}
              {matchResult.suggestions?.length > 0 && (
                <Card className="bg-orange-50 border border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-800">
                      <AlertCircle className="w-5 h-5" />
                      Improvement Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {matchResult.suggestions.slice(0, 3).map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-orange-700 text-sm">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ) : (
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Ready to Analyze</h3>
                <p className="text-gray-500 text-sm">
                  Select a resume and paste a job description to get your personalized match analysis.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Detailed Analysis */}
      {matchResult && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          {/* Skills Analysis */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Skills Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {matchResult.matching_skills?.length > 0 && (
                <div>
                  <h4 className="font-medium text-green-700 mb-2">Matching Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.matching_skills.map((skill, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {matchResult.missing_skills?.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Missing Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missing_skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Keywords to Add */}
          {matchResult.keywords_to_add?.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Recommended Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Add these keywords to improve your ATS score and match rate:
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchResult.keywords_to_add.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}