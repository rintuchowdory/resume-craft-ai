import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Users, Trophy, Zap, Calendar, MapPin, Gift, ArrowRight, Star, Rocket } from "lucide-react";
import * as THREE from "three";
import EventRegistrationModal from "@/components/event/EventRegistrationModal";

function ThreeJsBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x10B981,
      transparent: true,
      opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const torusGeometry = new THREE.TorusGeometry(10, 2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x10B981,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torus);

    // Add lighting
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.z = 30;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}

export default function StudentEventLanding() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const eventHighlights = [
    { icon: Users, title: "500+ Students", desc: "Join a community of passionate learners" },
    { icon: Trophy, title: "₹10 Lakh+ Prizes", desc: "Exciting rewards and opportunities" },
    { icon: Zap, title: "Industry Experts", desc: "Learn from top professionals" },
    { icon: Gift, title: "Free Resources", desc: "Worth ₹50,000 for all attendees" }
  ];

  const agenda = [
    { time: "09:00 AM", title: "Registration & Welcome", desc: "Check-in and networking breakfast" },
    { time: "10:00 AM", title: "Keynote Speech", desc: "Industry leaders share insights" },
    { time: "11:30 AM", title: "Workshop Sessions", desc: "Hands-on learning experiences" },
    { time: "02:00 PM", title: "Competition & Awards", desc: "Showcase your skills" },
    { time: "05:00 PM", title: "Networking & Closing", desc: "Connect with peers and mentors" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* 3D Background */}
      <ThreeJsBackground />

      {/* Floating popup */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl border-2 border-white/20">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-2">🎉 Limited Seats Available!</h3>
              <p className="text-white/90 mb-4">Only 50 spots left. Register now to secure your place!</p>
              <Button 
                onClick={() => {
                  setShowPopup(false);
                  setShowRegistration(true);
                }}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-bold"
              >
                Register Now - It's FREE!
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {/* Event Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full mb-8 shadow-lg"
            >
              <Rocket className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-lg">MEGA STUDENT SUMMIT 2024</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-tight"
            >
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Future Today
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              India's Biggest Student Career & Tech Event - Learn, Network, Win!
            </motion.p>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mb-10 text-white"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="w-5 h-5 text-green-400" />
                <span className="font-semibold">15th March 2024</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="font-semibold">Jhansi, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">500+ Students Expected</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                onClick={() => setShowRegistration(true)}
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-6 rounded-xl text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Register FREE Now
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>

              <Link to={createPageUrl("EventDetails")}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-6 rounded-xl text-xl font-bold backdrop-blur-sm"
                >
                  View Event Details
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-12 flex justify-center gap-8 text-white/70 text-sm"
            >
              <span>✓ 100% Free Entry</span>
              <span>✓ Certificate Provided</span>
              <span>✓ Lunch Included</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            rotate: [0, -5, 0, 5, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
        />
      </section>

      {/* Event Highlights */}
      <section className="relative py-20 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Attend This Event?
            </h2>
            <p className="text-xl text-gray-300">Unlock incredible opportunities and experiences</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
                <p className="text-gray-300">{highlight.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Agenda */}
      <section className="relative py-20 px-4 sm:px-6 z-10 bg-black/30">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Event Schedule
            </h2>
            <p className="text-xl text-gray-300">A day packed with learning and excitement</p>
          </motion.div>

          <div className="space-y-6">
            {agenda.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white font-bold py-2 px-3 rounded-lg">
                    {item.time}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl"
          >
            <Star className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Don't Miss Out!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Limited seats available. Register now and be part of the biggest student event of the year!
            </p>
            <Button 
              onClick={() => setShowRegistration(true)}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 rounded-xl text-xl font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Secure Your Spot Now
            </Button>
            <p className="text-white/70 mt-4">No payment required • Instant confirmation</p>
          </motion.div>
        </div>
      </section>

      {/* Registration Modal */}
      <EventRegistrationModal 
        isOpen={showRegistration} 
        onClose={() => setShowRegistration(false)} 
      />
    </div>
  );
}