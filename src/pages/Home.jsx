
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Download, Star, FileText, TrendingUp, Users, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";

function FloatingResume2D() {
  return (
    <motion.div
      className="w-[280px] h-[392px] lg:w-[320px] lg:h-[448px] bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 relative overflow-hidden"
      animate={{
        y: [-8, 8],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-30"></div>
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="space-y-1">
            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-2 w-16 bg-green-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-1/2 bg-green-200 rounded animate-pulse"></div>
        
        <div className="w-full h-1.5 bg-green-100 rounded-full mt-4 animate-pulse" />
        
        <div className="space-y-2 pt-2">
          <div className="h-3 w-3/4 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-5/6 bg-gray-200 rounded-full animate-pulse" />
        </div>
         
        <div className="w-full h-1.5 bg-green-100 rounded-full mt-4 animate-pulse" />
        
        <div className="space-y-2 pt-2">
          <div className="h-3 w-3/4 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-full bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Skill bars */}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between items-center">
            <div className="h-2 w-16 bg-gray-200 rounded"></div>
            <div className="h-2 w-8 bg-green-300 rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-2 w-20 bg-gray-200 rounded"></div>
            <div className="h-2 w-10 bg-green-300 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <motion.div 
        className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-8 left-4 w-2 h-2 bg-emerald-400 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
    </motion.div>
  );
}

export default function Home() {
  const [showEventBanner, setShowEventBanner] = React.useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Event Promotion Banner */}
      {showEventBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-3 px-4 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <span className="text-2xl">🎉</span>
              <div>
                <p className="font-bold text-sm sm:text-base">MEGA STUDENT SUMMIT 2024 - Register Now!</p>
                <p className="text-xs sm:text-sm text-white/90">15th March • Free Entry • ₹10L+ Prizes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={createPageUrl("StudentEventLanding")}>
                <Button size="sm" className="bg-white text-purple-600 hover:bg-gray-100 font-bold">
                  Learn More
                </Button>
              </Link>
              <button 
                onClick={() => setShowEventBanner(false)}
                className="text-white hover:text-gray-200 p-1"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add padding when banner is visible */}
      <div className={showEventBanner ? "pt-16" : ""}>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
          {/* Animated background particles */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-200/30 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-green-700 text-sm font-medium border border-green-200"
                >
                  <Sparkles className="w-4 h-4" />
                  #1 AI-Powered Resume Builder
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
                >
                  Land Your
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"> Dream Job</span>
                  <br />with AI Power
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
                >
                  Create ATS-optimized resumes with AI-generated content, real-time job matching, and professional templates. Join 50,000+ successful job seekers.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>50K+ Users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>94% Success Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span>Global Reach</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to={createPageUrl("Templates")}>
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Start Building Free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link to={createPageUrl("Jobs")}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-green-200 hover:border-green-300 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-green-50 transition-all duration-300">
                    Browse Jobs
                  </Button>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4"
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-xs sm:text-sm text-gray-600">User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs sm:text-sm text-gray-600">ATS Pass Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">2 min</div>
                  <div className="text-xs sm:text-sm text-gray-600">Setup Time</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right 2D Animated Scene */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-64 sm:h-96 lg:h-[500px] relative flex items-center justify-center"
            >
              <FloatingResume2D />
              
              {/* Floating UI elements */}
              <motion.div 
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-green-200"
                animate={{ y: [-5, 5] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="flex items-center gap-2 text-green-600">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">ATS Score: 98%</span>
                </div>
              </motion.div>

              <motion.div 
                className="absolute bottom-8 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-blue-200"
                animate={{ y: [5, -5] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              >
                <div className="flex items-center gap-2 text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Job Match: 94%</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Strip */}
        <section className="py-16 bg-white/70 backdrop-blur-sm border-y border-green-200/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ResumeAI?</h2>
              <p className="text-xl text-gray-600">Powerful features that give you the competitive edge</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8"
            >
              {[
                { icon: Sparkles, title: "AI-Generated Content", desc: "Smart bullet points & summaries tailored to your industry", color: "text-purple-600", bg: "bg-purple-100" },
                { icon: Target, title: "ATS Optimized", desc: "Beat 99% of applicant tracking systems with our optimization", color: "text-green-600", bg: "bg-green-100" },
                { icon: Download, title: "Multiple Formats", desc: "Export to PDF, DOCX, and shareable links instantly", color: "text-blue-600", bg: "bg-blue-100" },
                { icon: TrendingUp, title: "Real-time Analytics", desc: "Track performance and get improvement suggestions", color: "text-orange-600", bg: "bg-orange-100" }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className={`w-16 h-16 ${benefit.bg} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get from idea to interview-ready resume in just 4 simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Choose Template", desc: "Select from our ATS-optimized professional templates", icon: "🎨" },
                { step: "02", title: "AI Assistance", desc: "Our AI generates compelling content based on your input", icon: "🤖" },
                { step: "03", title: "Live Preview", desc: "See your resume update in real-time as you edit", icon: "👁️" },
                { step: "04", title: "Export & Apply", desc: "Download and start applying to jobs immediately", icon: "🚀" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 group">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="text-3xl font-bold text-green-500 mb-4">{step.step}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-green-200 to-emerald-200" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof / Testimonials */}
        <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by Job Seekers Worldwide</h2>
              <p className="text-xl text-gray-600">Join thousands who landed their dream jobs</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Software Engineer",
                  company: "Google",
                  testimonial: "ResumeAI helped me land my dream job at Google! The AI suggestions were spot-on and the ATS optimization really works.",
                  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Michael Rodriguez", 
                  role: "Product Manager",
                  company: "Meta",
                  testimonial: "From unemployed to PM at Meta in 3 weeks. The resume templates and job matching feature are game-changers!",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                },
                {
                  name: "Priya Sharma",
                  role: "Data Scientist", 
                  company: "Microsoft",
                  testimonial: "The AI-generated content saved me hours and helped me articulate my experience perfectly. Highly recommend!",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
                  <div className="flex text-yellow-400 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-5xl font-bold text-white mb-6">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Join 50,000+ professionals who've successfully landed their dream jobs using ResumeAI. Start building your winning resume today - it's completely free to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Templates")}>
                  <Button size="lg" className="bg-white hover:bg-gray-50 text-green-600 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <FileText className="w-5 h-5 mr-2" />
                    Start Building Free
                  </Button>
                </Link>
                <Link to={createPageUrl("About")}>
                  <Button variant="outline" size="lg" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-12 text-green-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Free Forever Plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Start in 2 Minutes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
