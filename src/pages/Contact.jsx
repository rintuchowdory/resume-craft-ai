import React, { useState } from "react";
import { SendEmail } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      await SendEmail({
        to: "support@resumeai.com",
        subject: `Contact Form: ${formData.subject || formData.category}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Category: ${formData.category}
Subject: ${formData.subject}

Message:
${formData.message}
        `
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nachricht gesendet!</h2>
          <p className="text-gray-600 mb-6">
            Danke für deine Nachricht. Wir antworten innerhalb von 24 Stunden.
          </p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Weitere Nachricht senden
          </Button>
        </motion.div>
      </div>
    );
  }

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
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900">Kontakt aufnehmen</h1>
            </div>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Have questions, feedback, or need support? We're here to help! 
              Schreib uns – wir antworten in der Regel innerhalb von 24 Stunden.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-blue-200/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Mail className="w-5 h-5" />
                  Kontaktdaten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">E-Mail</h4>
                    <p className="text-gray-600">support@resumeai.com</p>
                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Telefon</h4>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-sm text-gray-500">Mon-Sat, 10AM-7PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Büro</h4>
                    <p className="text-gray-600">52499 Baesweiler, Nordrhein-Westfalen</p>
                    <p className="text-sm text-gray-500">Betrieben aus Baesweiler bei Aachen</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Support-Zeiten</h4>
                    <p className="text-gray-600">Monday - Saturday</p>
                    <p className="text-sm text-gray-500">10:00 AM - 7:00 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Support */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-green-800 mb-2">Schneller Support</h3>
                <p className="text-green-700 text-sm mb-4">
                  Need instant help? Connect with us on WhatsApp for real-time assistance.
                </p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                >
                  📱 WhatsApp Support
                </Button>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-800 mb-4">Folge uns</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-100">
                    🐦 Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-100">
                    💼 LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-100">
                    📘 Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-100">
                    📸 Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Schreib uns</CardTitle>
                <p className="text-gray-600">Füll das Formular aus, wir melden uns zeitnah.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Vollständiger Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-Mail-Adresse *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategorie</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Technischer Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="feature">Funktionswunsch</SelectItem>
                          <SelectItem value="bug">Fehlermeldung</SelectItem>
                          <SelectItem value="partnership">Kooperation</SelectItem>
                          <SelectItem value="other">Sonstiges</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subject">Betreff</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Nachricht *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide details about your question, issue, or feedback..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Wird gesendet …
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Nachricht senden
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Google Maps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Unser Standort – Baesweiler bei Aachen</CardTitle>
              <p className="text-center text-gray-600">ResumeAI entsteht in Baesweiler bei Aachen</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Baesweiler%2C%20Deutschland&z=12&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}