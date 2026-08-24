
import React, { useState, useEffect, useCallback } from "react";
import { Resume } from "@/entities/Resume";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Sparkles, Target, Download, Plus, X, FileDown } from "lucide-react";
import { motion } from "framer-motion";

import PersonalSection from "../components/editor/PersonalSection";
import ExperienceSection from "../components/editor/ExperienceSection";
import EducationSection from "../components/editor/EducationSection";
import SkillsSection from "../components/editor/SkillsSection";
import ProjectsSection from "../components/editor/ProjectsSection";
import ResumePreview from "../components/editor/ResumePreview";
import AIAssistant from "../components/editor/AIAssistant";
import ResumeLoader from "@/components/common/ResumeLoader";

export default function Editor() {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");
  
  const urlParams = new URLSearchParams(window.location.search);
  const resumeId = urlParams.get('id');

  const loadResume = useCallback(async () => {
    setIsLoading(true);
    try {
      // Direct fetch by ID is more efficient if the SDK supports it.
      // Assuming it doesn't, filtering from a list is the alternative.
      const data = await Resume.list();
      const resumeData = data.find(r => r.id === resumeId);
      if (resumeData) {
        setResume(resumeData);
      } else {
        console.error("Resume not found for ID:", resumeId);
      }
    } catch (error) {
      console.error("Error loading resume:", error);
    }
    setIsLoading(false);
  }, [resumeId]); // `resumeId` is a dependency here.

  useEffect(() => {
    if (resumeId) {
      loadResume();
    }
  }, [resumeId, loadResume]); // `loadResume` is now a dependency here.

  const saveResume = async () => {
    if (!resume || !resumeId) return;
    
    setIsSaving(true);
    try {
      await Resume.update(resumeId, resume);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
    setIsSaving(false);
  };

  const exportResume = async () => {
    if (!resume) return;
    
    setIsExporting(true);
    try {
      // Generate PDF content using AI
      const response = await InvokeLLM({
        prompt: `Create a professional resume in HTML format that can be converted to PDF. Use this data:

        Personal Info: ${JSON.stringify(resume.personal_info)}
        Experience: ${JSON.stringify(resume.experience)}
        Education: ${JSON.stringify(resume.education)}
        Skills: ${JSON.stringify(resume.skills)}
        Projects: ${JSON.stringify(resume.projects)}
        Template: ${resume.template}

        Create a clean, professional HTML structure with inline CSS that's optimized for PDF conversion. Include all sections and make it ATS-friendly.`,
        response_json_schema: {
          type: "object",
          properties: {
            html: { type: "string" }
          }
        }
      });

      if (response.html) {
        // Create a new window and print
        const printWindow = window.open('', '_blank');
        printWindow.document.write(response.html);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
      }
      
      // Update last exported timestamp
      const updatedResume = { ...resume, last_exported: new Date().toISOString() };
      setResume(updatedResume);
      await Resume.update(resumeId, updatedResume);
      
    } catch (error) {
      console.error("Error exporting resume:", error);
    }
    setIsExporting(false);
  };

  const updateResume = (section, data) => {
    setResume(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const calculateATSScore = async () => {
    if (!resume) return;
    
    try {
      const response = await InvokeLLM({
        prompt: `Analyze this resume for ATS optimization and provide a score out of 100. Consider: contact information completeness, relevant keywords, quantified achievements, proper formatting, and section organization. 

Resume data: ${JSON.stringify(resume)}

Provide only a numeric score between 0-100.`,
        response_json_schema: {
          type: "object",
          properties: {
            score: { type: "number", minimum: 0, maximum: 100 }
          }
        }
      });
      
      const newScore = response.score || 0;
      const updatedResume = { ...resume, ats_score: newScore };
      setResume(updatedResume);
      
      if (resumeId) {
        await Resume.update(resumeId, updatedResume);
      }
    } catch (error) {
      console.error("Error calculating ATS score:", error);
    }
  };

  if (isLoading) {
    return <ResumeLoader />;
  }

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Resume not found</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200/30 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{resume.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {resume.template} template
              </Badge>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  ATS Score: {resume.ats_score || 0}%
                </span>
              </div>
              {resume.last_exported && (
                <span className="text-xs text-gray-500">
                  Last exported: {new Date(resume.last_exported).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={calculateATSScore}
              className="border-blue-200 hover:bg-blue-50"
            >
              <Target className="w-4 h-4 mr-2" />
              Check ATS Score
            </Button>

            <Button
              variant="outline"
              onClick={exportResume}
              disabled={isExporting}
              className="border-purple-200 hover:bg-purple-50"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500 mr-2"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2" />
                  Export PDF
                </>
              )}
            </Button>
            
            <Button
              onClick={saveResume}
              disabled={isSaving}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Resume
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        {/* Editor Sections */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <PersonalSection 
                data={resume.personal_info || {}} 
                onChange={(data) => updateResume('personal_info', data)} 
              />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceSection 
                data={resume.experience || []} 
                onChange={(data) => updateResume('experience', data)} 
              />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationSection 
                data={resume.education || []} 
                onChange={(data) => updateResume('education', data)} 
              />
            </TabsContent>
            
            <TabsContent value="skills">
              <SkillsSection 
                data={resume.skills || []} 
                onChange={(data) => updateResume('skills', data)} 
              />
            </TabsContent>
            
            <TabsContent value="projects">
              <ProjectsSection 
                data={resume.projects || []} 
                onChange={(data) => updateResume('projects', data)} 
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview & AI Assistant */}
        <div className="space-y-6">
          <ResumePreview resume={resume} />
          <AIAssistant resume={resume} onUpdateResume={setResume} />
        </div>
      </div>
    </div>
  );
}
