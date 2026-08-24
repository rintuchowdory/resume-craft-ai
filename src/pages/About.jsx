import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Sparkles, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const teamMembers = [
  {
    name: "Sudhanshu Yadav",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur from Jhansi, U.P., India. Passionate about AI-driven career solutions and democratizing access to professional opportunities.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Iinvo Techy Team", 
    role: "Development Team",
    bio: "Innovative tech team based in Jhansi, specializing in AI/ML solutions, modern web development, and user-centric design.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces"
  },
  {
    name: "Product Team",
    role: "Design & Strategy",
    bio: "Creative minds focused on user experience, product strategy, and making resume building accessible to everyone.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=faces"
  }
];

const milestones = [
  {
    year: "2024",
    title: "ResumeAI Launch",
    description: "Launched AI-powered resume builder from Jhansi, U.P., India"
  },
  {
    year: "2024",
    title: "Template Library",
    description: "Released professional templates with ATS optimization"
  },
  {
    year: "2024",
    title: "Job Matching",
    description: "Introduced AI-powered job matching and application tracking"
  },
  {
    year: "Future",
    title: "Global Expansion",
    description: "Planning to serve job seekers worldwide"
  }
];

const stats = [
  { number: "50K+", label: "Resumes Created", icon: Award },
  { number: "89%", label: "Success Rate", icon: Target },
  { number: "120+", label: "Countries", icon: Globe },
  { number: "4.9★", label: "User Rating", icon: Sparkles }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-5xl font-bold text-gray-900">About ResumeAI</h1>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to empower job seekers worldwide with AI-powered tools that level the playing field. 
              Every great career starts with a great resume, and we're here to make that accessible to everyone.
            </p>
            
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mt-8">
              <p className="text-lg font-semibold text-green-800 mb-2">Built with ❤️ in Jhansi, Uttar Pradesh, India</p>
              <p className="text-green-700">
                Founded by <strong>Sudhanshu Yadav</strong> and developed by the talented <strong>Iinvo Techy</strong> team, 
                ResumeAI represents the innovative spirit of Indian tech entrepreneurship.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p>
                ResumeAI was born from a simple observation: despite having incredible talent, 
                many qualified candidates were getting filtered out by Applicant Tracking Systems (ATS) 
                before human recruiters ever saw their resumes.
              </p>
              <p>
                In 2024, our founding team from <strong>Jhansi, Uttar Pradesh, India</strong> combined their expertise 
                in AI, user experience, and recruitment to create a platform that not only helps create beautiful resumes 
                but ensures they pass through ATS filters and catch recruiters' attention.
              </p>
              <p>
                Today, we're proud to have helped over 50,000 job seekers land interviews at top companies 
                worldwide. But we're just getting started on our mission to democratize career opportunities.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones in our mission to revolutionize resume building</p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold text-green-600">{milestone.year}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-green-100">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Accessibility First",
                description: "Career opportunities should be accessible to everyone, regardless of background or resources."
              },
              {
                icon: Sparkles,
                title: "AI for Good",
                description: "We use artificial intelligence to augment human potential, not replace human judgment."
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Our users' success stories drive our product development and company mission."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center text-white"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-green-100">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              Passionate individuals from Jhansi working to transform career opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">Join Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your career? Start building your AI-powered resume today and join 
              thousands of successful job seekers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-4">
                  Start Building Your Resume
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" size="lg" className="px-8 py-4">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}