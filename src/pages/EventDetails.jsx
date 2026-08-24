import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Zap, Star, Gift, CheckCircle, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import EventRegistrationModal from "@/components/event/EventRegistrationModal";

export default function EventDetails() {
  const [showRegistration, setShowRegistration] = useState(false);

  const speakers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "CTO, Tech Giants Inc",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      topic: "Future of AI & Career Opportunities"
    },
    {
      name: "Priya Sharma",
      role: "Founder, StartupXYZ",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      topic: "From Student to Entrepreneur"
    },
    {
      name: "Amit Patel",
      role: "Senior Developer, FAANG",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      topic: "Cracking Tech Interviews"
    }
  ];

  const prizes = [
    { rank: "1st Prize", amount: "₹5,00,000", desc: "Cash + Internship + Mentorship" },
    { rank: "2nd Prize", amount: "₹3,00,000", desc: "Cash + Internship" },
    { rank: "3rd Prize", amount: "₹2,00,000", desc: "Cash + Goodies" },
    { rank: "Participation", amount: "Certificates", desc: "All attendees get certificates" }
  ];

  const workshops = [
    { title: "Web Development Bootcamp", duration: "2 hours", level: "Beginner to Advanced" },
    { title: "AI & Machine Learning Workshop", duration: "2 hours", level: "Intermediate" },
    { title: "Design Thinking Session", duration: "1.5 hours", level: "All Levels" },
    { title: "Resume Building & Interview Prep", duration: "1 hour", level: "All Levels" }
  ];

  const faqs = [
    { q: "Is the event really free?", a: "Yes! 100% free entry, including lunch and all workshop materials." },
    { q: "Who can attend?", a: "All students from any college/university are welcome, regardless of branch or year." },
    { q: "What should I bring?", a: "Just bring your laptop, enthusiasm, and a learning mindset!" },
    { q: "Will I get a certificate?", a: "Yes, all attendees will receive a participation certificate." },
    { q: "Is accommodation provided?", a: "Accommodation is not provided, but we can help you find nearby budget hotels." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Badge className="bg-yellow-400 text-yellow-900 text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              MEGA STUDENT SUMMIT 2024
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-black text-white">
              Complete Event Details
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Everything you need to know about India's biggest student tech event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => setShowRegistration(true)}
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
              >
                Register Now - FREE
              </Button>
              <Link to={createPageUrl("StudentEventLanding")}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-bold"
                >
                  Back to Event Page
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Event Overview */}
        <section className="mb-16">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-3xl">Event Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <Calendar className="w-8 h-8 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Date & Time</h3>
                    <p className="text-gray-600">15th March 2024</p>
                    <p className="text-gray-600">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Venue</h3>
                    <p className="text-gray-600">Convention Center</p>
                    <p className="text-gray-600">Jhansi, Uttar Pradesh</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg">Capacity</h3>
                    <p className="text-gray-600">500+ Students</p>
                    <p className="text-red-600 font-semibold">Only 50 Spots Left!</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <Gift className="w-6 h-6 text-green-600" />
                  What's Included (100% FREE)
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Free Entry & Registration</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Complimentary Lunch & Snacks</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Workshop Materials & Kits</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Participation Certificate</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Networking Opportunities</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" /> Swag Bags Worth ₹2,000</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Speakers */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Featured Speakers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-all duration-300 border-2 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-200"
                    />
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                    <p className="text-purple-600 font-semibold mb-3">{speaker.role}</p>
                    <Badge className="bg-blue-100 text-blue-800">{speaker.topic}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Workshops */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Workshop Sessions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Zap className="w-8 h-8 text-blue-600 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{workshop.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" /> {workshop.duration}
                          </span>
                          <Badge variant="outline">{workshop.level}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prizes */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Competition Prizes</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {prizes.map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`text-center ${index === 0 ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-400' : 'bg-white'}`}>
                  <CardContent className="p-6">
                    {index === 0 && <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-3" />}
                    {index === 1 && <Star className="w-10 h-10 text-gray-400 mx-auto mb-3" />}
                    {index === 2 && <Star className="w-8 h-8 text-orange-600 mx-auto mb-3" />}
                    <h3 className="font-bold text-xl mb-2">{prize.rank}</h3>
                    <p className="text-2xl font-black text-purple-600 mb-2">{prize.amount}</p>
                    <p className="text-sm text-gray-600">{prize.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Join?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Don't miss this opportunity to learn, network, and win amazing prizes!
              </p>
              <Button 
                onClick={() => setShowRegistration(true)}
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Register Now - It's FREE!
              </Button>
              <p className="text-white/80 mt-4">Limited spots available • Register before it's too late!</p>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Registration Modal */}
      <EventRegistrationModal 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
    </div>
  );
}