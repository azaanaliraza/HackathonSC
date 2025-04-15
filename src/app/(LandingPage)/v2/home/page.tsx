"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquareText, 
  Stethoscope, 
  Brain, 
  HeartPulse, 
  Mail, 
  Shield, 
  Award,
  CheckCircle,
  Calendar,
  Users,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const subscribeSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const healthChallenges = [
  {
    icon: "🚰",
    title: "Drink 7 Liters of Water",
    description: "Flush out toxins and keep your system hydrated."
  },
  {
    icon: "🚶‍♂️",
    title: "Walk 10,000 Steps",
    description: "Boosts cardiovascular health and clears the mind."
  },
  {
    icon: "🍃",
    title: "Eat 3 Fruits & 3 Veggies",
    description: "Natural fiber + vitamins = daily immunity boost."
  },
  {
    icon: "☀️",
    title: "Get 20 Minutes of Sunlight",
    description: "For Vitamin D and mood elevation."
  },
  {
    icon: "🧘‍♂️",
    title: "10 Minutes of Meditation",
    description: "Lowers stress, improves focus."
  },
  {
    icon: "📴",
    title: "No Phone for 1 Hour After Waking & Before Sleeping",
    description: "Protect your brain, posture, and mental peace."
  },
  {
    icon: "💪",
    title: "Do a 15-Minute Workout",
    description: "Keep that blood flowing even on lazy days."
  },
  {
    icon: "🫖",
    title: "Avoid Caffeine After 5 PM",
    description: "Helps you sleep deeper and longer."
  },
  {
    icon: "📒",
    title: "Journal One Thing You're Grateful For",
    description: "Builds mental resilience and contentment."
  },
  {
    icon: "😴",
    title: "Sleep 7–9 Hours",
    description: "Recovery is the real glow-up secret."
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    content: "SymptoCheck completely changed how I manage my health. The AI symptoms checker saved me unnecessary doctor visits!",
    avatar: "/api/placeholder/150/150"
  },
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist",
    content: "As a healthcare professional, I'm impressed with the accuracy of SymptoCheck's AI. It helps patients come prepared to appointments.",
    avatar: "/api/placeholder/150/150"
  },
  {
    name: "Emily Rodriguez",
    role: "Mother of two",
    content: "The daily health challenges have helped our whole family develop better habits. My kids love completing them!",
    avatar: "/api/placeholder/150/150"
  }
];

const doctorSpecialties = [
  { name: "General Practice", count: 125 },
  { name: "Cardiology", count: 43 },
  { name: "Pediatrics", count: 67 },
  { name: "Dermatology", count: 31 },
  { name: "Neurology", count: 28 },
  { name: "Psychiatry", count: 52 }
];

export default function LandingPage() {
  const router = useRouter();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(33);

  // Form for newsletter subscription
  const form = useForm({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
    },
  });

  // Function to handle form submission
  function onSubmit(values) {
    console.log(values);
    // Add subscription logic here
    form.reset();
  }

  // Auto-rotate health challenges
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentChallengeIndex((prevIndex) => 
        prevIndex === healthChallenges.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);
    
    return () => clearInterval(timer);
  }, []);

  // Animated progress bar for stats
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Floating quick access */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button 
          size="lg" 
          className="bg-red-600 hover:bg-red-700 rounded-full shadow-lg p-6"
          onClick={() => router.push("/symptom-checker")}
        >
          <MessageSquareText className="w-6 h-6" />
        </Button>
      </div>
      
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 fixed w-full z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HeartPulse className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-red-600">SymptoCheck</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-red-600 transition-colors">Features</a>
            <a href="#doctors" className="text-gray-700 hover:text-red-600 transition-colors">Doctors</a>
            <a href="#challenges" className="text-gray-700 hover:text-red-600 transition-colors">Challenges</a>
            <a href="#testimonials" className="text-gray-700 hover:text-red-600 transition-colors">Testimonials</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => router.push("/v2/login")}>
              Sign In
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={() => router.push("/v2/sign-up")}>
              Register
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-red-50 to-red-100">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-200 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Badge className="mb-4 bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5">
                AI-Powered Healthcare
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900">
                Your Personal <span className="text-red-600">Health Assistant</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-xl">
                Analyze symptoms, connect with certified doctors, and build healthier habits with our AI-powered platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-red-600 text-white hover:bg-red-700 px-8 py-6 text-lg rounded-xl shadow-lg"
                  onClick={() => router.push("/v2/sign-up")}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg rounded-xl"
                  onClick={() => router.push("/v2/sign-up")}
                >
                  See How It Works
                </Button>
              </div>
              
              <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6">
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} className={`w-8 h-8 border-2 border-white -ml-${i > 1 ? 3 : 0}`}>
                      <AvatarImage src={`/api/placeholder/150/150`} />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-red-600">5,000+</span> users trust SymptoCheck
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-6 rounded-3xl shadow-xl">
              <img 
                src="/api/placeholder/600/400" 
                alt="Doctor with patient" 
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Symptoms analyzed</div>
                    <div className="text-2xl font-bold text-gray-900">1,240,567</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -left-12 bg-white rounded-2xl shadow-lg p-4 transform -translate-y-1/2">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-xl">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs font-medium">Available doctors</div>
                  <div className="text-lg font-bold text-gray-900">247</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-red-600">98%</h3>
              <p className="text-gray-600 mt-2">User Satisfaction</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-red-600">24/7</h3>
              <p className="text-gray-600 mt-2">Available Support</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-red-600">15K+</h3>
              <p className="text-gray-600 mt-2">Active Users</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-4xl font-bold text-red-600">350+</h3>
              <p className="text-gray-600 mt-2">Medical Experts</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-red-100 text-red-600 hover:bg-red-200">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900">How SymptoCheck Works</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Our comprehensive health platform combines AI technology with medical expertise to provide you with personalized healthcare solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardHeader>
                  <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-red-600" />
                  </div>
                  <CardTitle>Smart Symptom Analysis</CardTitle>
                  <CardDescription className="text-base">
                    Our AI engine uses advanced models to help understand your symptoms quickly and accurately.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Real-time symptom assessment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Personalized health insights</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Medical condition information</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700 mt-4">
                    <MessageSquareText className="mr-2" /> Try Symptom Checker
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardHeader>
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Stethoscope className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>Connect with Doctors</CardTitle>
                  <CardDescription className="text-base">
                    Get in touch with certified doctors for real-time consultations and personalized help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Video consultations with specialists</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Secure messaging with your doctor</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Digital prescriptions and referrals</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                    <Calendar className="mr-2" /> Book Appointment
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                <CardHeader>
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <HeartPulse className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Daily Health Challenges</CardTitle>
                  <CardDescription className="text-base">
                    Build healthier habits with our curated daily challenges for total wellbeing.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Personalized wellness goals</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Progress tracking and achievements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Community support and motivation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                    <Award className="mr-2" /> View Challenges
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Doctors Section */}
      <section id="doctors" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 hover:bg-blue-200">Medical Experts</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Meet Our Doctors</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Our platform connects you with certified healthcare professionals across multiple specialties.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-2xl mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cardiology">Cardiology</TabsTrigger>
              <TabsTrigger value="pediatrics">Pediatrics</TabsTrigger>
              <TabsTrigger value="dermatology">Dermatology</TabsTrigger>
              <TabsTrigger value="neurology">Neurology</TabsTrigger>
              <TabsTrigger value="psychiatry">Psychiatry</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all">
                      <img
                        src={`/api/placeholder/400/400`}
                        alt={`Doctor ${i}`}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Dr. {["Sarah Wilson", "James Miller", "Emily Chen", "Robert Taylor"][i-1]}</CardTitle>
                        <CardDescription>{["Cardiologist", "Pediatrician", "Dermatologist", "Neurologist"][i-1]}</CardDescription>
                      </CardHeader>
                      <CardContent className="px-4 pb-2">
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Users className="w-4 h-4 mr-2" />
                          <span>{Math.floor(Math.random() * 1000) + 500} patients</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Award className="w-4 h-4 mr-2" />
                          <span>{Math.floor(Math.random() * 10) + 5} years experience</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4">
                        <Button variant="outline" className="w-full">View Profile</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            {["cardiology", "pediatrics", "dermatology", "neurology", "psychiatry"].map((specialty) => (
              <TabsContent key={specialty} value={specialty} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all">
                      <img
                        src={`/api/placeholder/400/400`}
                        alt={`${specialty} Doctor ${i}`}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">Dr. {["John Doe", "Jane Smith", "Alex Johnson"][i-1]}</CardTitle>
                        <CardDescription className="capitalize">{specialty} Specialist</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4">
                        <Button variant="outline" className="w-full">View Profile</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {doctorSpecialties.map((specialty, index) => (
              <motion.div
                key={specialty.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-xl text-center"
              >
                <div className="text-2xl font-bold text-red-600">{specialty.count}+</div>
                <div className="text-gray-700 text-sm">{specialty.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Health Challenges Section */}
      <section id="challenges" className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-600 hover:bg-green-200">Daily Wellness</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Daily Health Challenges</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Small daily habits that create big health improvements over time. Start your wellness journey today.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="mb-8 flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                <motion.div
                  key={currentChallengeIndex}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl"
                >
                  {healthChallenges[currentChallengeIndex].icon}
                </motion.div>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentChallengeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {healthChallenges[currentChallengeIndex].title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {healthChallenges[currentChallengeIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
              
              <div className="mt-10 w-full max-w-md">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    key={currentChallengeIndex}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5 }}
                    className="h-full bg-green-500"
                  />
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <div>{currentChallengeIndex + 1} of {healthChallenges.length}</div>
                  <div>Next challenge in 3s</div>
                </div>
              </div>
              
              <Button 
                className="mt-10 bg-green-600 hover:bg-green-700"
                onClick={() => router.push("/challenges")}
              >
                See All Challenges
              </Button>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthChallenges.slice(0, 3).map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border border-gray-100 h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="text-3xl mb-2">{challenge.icon}</div>
                    <CardTitle>{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{challenge.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-600 hover:bg-purple-200">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Discover how SymptoCheck is changing lives and improving health outcomes worldwide.
            </p>
          </div>
          
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <Card className="border-0 shadow-lg h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription>{testimonial.role}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{testimonial.content}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>  
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 space-x-2">
              <CarouselPrevious className="relative inline-flex" />
              <CarouselNext className="relative inline-flex" />
            </div>
          </Carousel>
          
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Join our community</h3>
                <p className="text-gray-700 mb-6">
                  Subscribe to our newsletter to receive health tips, updates on new features, and exclusive promotions.
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input placeholder="Enter your email" {...field} className="rounded-lg" />
                              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                                Subscribe
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/api/placeholder/400/250" 
                  alt="Newsletter" 
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-amber-100 text-amber-600 hover:bg-amber-200">Process</Badge>
            <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              A simple 3-step process to get the healthcare you need on your terms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <MessageSquareText className="w-8 h-8 text-blue-600" />,
                title: "Describe Your Symptoms",
                description: "Tell our AI about how you're feeling. The system will analyze your symptoms and provide initial guidance."
              },
              {
                icon: <Brain className="w-8 h-8 text-purple-600" />,
                title: "Get AI Assessment",
                description: "Our advanced AI analyzes your symptoms and provides possible conditions and next steps."
              },
              {
                icon: <Stethoscope className="w-8 h-8 text-green-600" />,
                title: "Connect with Doctors",
                description: "If needed, book a virtual consultation with a certified doctor who specializes in your condition."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-gray-50 rounded-2xl p-8 h-full">
                  <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-600 hover:bg-blue-200">Plans</Badge>
            <h2 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
              Choose the plan that works best for you and your health needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "Free",
                description: "Get started with essential health features",
                features: [
                  "Basic symptom checking",
                  "Health articles access",
                  "Community forum"
                ],
                buttonText: "Get Started",
                highlighted: false
              },
              {
                name: "Premium",
                price: "$9.99",
                period: "monthly",
                description: "Enhanced features for proactive health management",
                features: [
                  "Advanced symptom analysis",
                  "Unlimited health checks",
                  "Priority access to doctors",
                  "Personalized health insights",
                  "24/7 chat support"
                ],
                buttonText: "Go Premium",
                highlighted: true
              },
              {
                name: "Family",
                price: "$19.99",
                period: "monthly",
                description: "Complete coverage for your entire family",
                features: [
                  "Up to 5 family members",
                  "All Premium features",
                  "Family health tracking",
                  "Pediatric specialists access",
                  "Shared medical records"
                ],
                buttonText: "Choose Family Plan",
                highlighted: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`border-0 h-full ${plan.highlighted ? 'shadow-xl ring-2 ring-red-500' : 'shadow-lg'}`}>
                  {plan.highlighted && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Badge className="bg-red-600 text-white px-4 py-1 rounded-full">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className={plan.highlighted ? "bg-red-50 rounded-t-lg" : ""}>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-gray-500 ml-1">/{plan.period}</span>}
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${plan.highlighted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-900 hover:bg-gray-800'}`}>
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>All plans include a 14-day money-back guarantee. No contracts or hidden fees.</p>
          </div>
        </div>
      </section>

      {/* Download Apps Section */}
      <section className="py-24 px-6 bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Badge className="mb-4 bg-red-900 text-red-200 hover:bg-red-800">Mobile Apps</Badge>
        <h2 className="text-4xl font-bold mb-6">Take SymptoCheck Everywhere You Go</h2>
        <p className="text-lg text-gray-300 mb-8">
          Download our mobile apps to access all SymptoCheck features on the go. Track your health, chat with doctors, and manage your family's wellness anytime, anywhere.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.36-1.09-.47-2.07-.48-3.19 0-1.38.59-2.1.44-2.95-.36-5.42-5.89-4.98-14.22 3.09-14.29 1.86.11 3.17 1.05 4.08 1.07.87-.1 2.26-1.16 3.83-1.05 1.45.12 2.54.64 3.3 1.53-2.77 1.69-2.22 5.27.48 6.38-.69 1.95-1.61 3.89-3.12 5.51l-.44.85zM12.03 7.25c-.15-2.75 2.28-5.07 4.96-5.26.36 2.91-2.61 5.33-4.96 5.26z" />
            </svg>
            App Store
          </Button>
          <Button className="bg-white text-gray-900 hover:bg-gray-100">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.293-.707V2.521a1 1 0 0 1 .293-.707zM14.831 13.036l2.517 2.517-10.875 6.125a1.01 1.01 0 0 1-.975.044l9.333-8.686zM17.349 8.447l2.516-2.516a1.002 1.002 0 0 1 .121 1.32l-2.126 3.63-5.411-3.12 4.9.686zM6.462.337a1 1 0 0 1 1.038-.052l10.814 6.11-2.814 2.814-9.038-8.872z" />
            </svg>
            Google Play
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex justify-center"
      >
        <div className="relative">
          <img 
            src="/mobiletemp.png" 
            alt="SymptoCheck Mobile App" 
            className="rounded-3xl shadow-2xl relative z-10 w-full max-w-xs md:max-w-sm"
          />
          <div className="absolute -top-4 -right-4 w-64 h-64 bg-red-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-red-50 to-red-100 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-4 bg-red-200 text-red-700 hover:bg-red-300">Get Started Today</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Your health journey begins now</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
            Join thousands of users who have transformed their health with SymptoCheck's AI-powered platform and expert medical guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 text-white hover:bg-red-700 px-10 py-6 text-lg rounded-xl shadow-lg"
              onClick={() => router.push("/sign-up")}
            >
              Create Free Account
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg rounded-xl"
              onClick={() => router.push("/demo")}
            >
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-gray-700">HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-gray-700">Certified Doctors</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-gray-700">Award-winning Platform</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <HeartPulse className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold text-white">SymptoCheck</span>
              </div>
              <p className="text-gray-400 mb-6">
                Your AI-powered health assistant to analyze symptoms and connect with certified doctors.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white">Symptom Checker</a></li>
                <li><a href="#" className="hover:text-white">Doctor Consultations</a></li>
                <li><a href="#" className="hover:text-white">Health Challenges</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Doctors</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>Made with ❤️ by Team <strong>"Bacterias"</strong> | SymptoCheck © 2025 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </main>
  );
}