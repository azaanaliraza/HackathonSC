"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Send, Stethoscope, Pill, HeartPulse, ActivitySquare, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample health knowledge database
const HEALTH_KNOWLEDGE = {
  "headache": {
    cures: ["Rest in a quiet, dark room", "Apply cold compress to forehead", "Take ibuprofen (if no contraindications)"],
    prevention: ["Stay hydrated - drink at least 8 glasses of water daily", "Manage stress with meditation", "Maintain regular sleep schedule"]
  },
  "fever": {
    cures: ["Rest and stay hydrated", "Take acetaminophen as directed", "Use a cool compress on forehead"],
    prevention: ["Wash hands frequently", "Avoid close contact with sick individuals", "Keep your immune system strong"]
  },
  "cough": {
    cures: ["Stay hydrated with warm liquids", "Use honey (for adults and children over 1)", "Use a humidifier at night"],
    prevention: ["Avoid irritants like smoke", "Practice good hand hygiene", "Stay away from people with respiratory infections"]
  },
  "sore throat": {
    cures: ["Gargle with warm salt water", "Drink warm tea with honey", "Use throat lozenges for temporary relief"],
    prevention: ["Stay hydrated", "Avoid sharing utensils or drinks", "Wash hands regularly"]
  },
  "back pain": {
    cures: ["Apply heat or ice", "Gentle stretching exercises", "Over-the-counter pain relievers"],
    prevention: ["Maintain good posture", "Lift with your legs, not your back", "Strengthen core muscles"]
  },
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { repeat: Infinity, duration: 2 }
};

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your health assistant powered by Gemini AI. What symptoms are you experiencing?", 
      sender: "bot" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    // Add user message to chat
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: "user" }]);
    setInput("");
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Send message to Gemini API via our server endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          chatHistory: messages,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Add AI response to chat
      setMessages(prev => [...prev, { 
        text: data.text || "I'm having trouble understanding. Could you please rephrase your question?", 
        sender: "bot" 
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I encountered an error while processing your request. Please try again later.", 
        sender: "bot" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Common symptoms list for quick selection
  const commonSymptoms = ["Headache", "Fever", "Cough", "Sore Throat", "Back Pain"];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <motion.div animate={pulseAnimation}>
            <HeartPulse className="text-red-600 w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold text-red-800">SymptoCheck AI</h1>
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Powered by Gemini</span>
        </motion.div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="chat" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <Bot className="mr-2 h-4 w-4" />
              Chat Assistant
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Symptom Library
            </TabsTrigger>
          </TabsList>
          
          {/* Chat Tab */}
          <TabsContent value="chat" className="mt-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="border-red-200 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 border-b border-red-300">
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <Avatar className="bg-red-500 border-2 border-white">
                        <AvatarFallback><Stethoscope className="h-5 w-5" /></AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <CardTitle className="text-white flex items-center">
                      Health Assistant
                      {isTyping && (
                        <motion.div 
                          className="ml-3 flex gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[0, 1, 2].map((dot) => (
                            <motion.div
                              key={dot}
                              className="h-2 w-2 bg-white rounded-full"
                              animate={{
                                y: [0, -5, 0],
                              }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: dot * 0.1,
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col" style={{ height: '65vh' }}>
  {/* Chat Messages Area - Now properly scrollable */}
  <ScrollArea className="flex-1 p-6 overflow-y-auto">
    <div className="space-y-4">
      <AnimatePresence>
        {messages.map((msg, i) => (
          <motion.div 
            key={i} 
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 20 }}
          >
            <div 
              className={`
                max-w-[85%] p-4 rounded-xl break-words
                ${msg.sender === "user" 
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-md" 
                  : "bg-white border border-red-100 shadow-sm"}
                whitespace-pre-wrap
              `}
              dangerouslySetInnerHTML={{ 
                __html: msg.text
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br />')
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  </ScrollArea>
  
  {/* Quick Symptoms Selection */}
  <div className="px-4 py-2 bg-red-50 overflow-x-auto border-t border-red-100">
    <div className="flex gap-2 items-center">
      <span className="text-xs text-red-600 whitespace-nowrap">Common symptoms:</span>
      <div className="flex gap-2">
        {commonSymptoms.map((symptom, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 1 }}
            className="px-3 py-1 bg-white text-xs border border-red-200 rounded-full text-red-700 hover:bg-red-100 whitespace-nowrap"
            onClick={() => setInput(symptom)}
          >
            {symptom}
          </motion.button>
        ))}
      </div>
    </div>
  </div>
  
  {/* Input Area */}
  <div className="border-t border-red-100 p-4 bg-white">
    <div className="flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Describe your symptoms..."
        className="min-h-[60px] border-red-200 focus-visible:ring-red-300"
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          size="icon" 
          className="h-[60px] w-[60px] bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md"
          disabled={isTyping || input.trim() === ""}
          onClick={handleSendMessage}
        >
          <Send className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
    <p className="text-xs text-red-400 mt-2 text-center">
      Note: This is not real medical advice. Consult a doctor for serious symptoms.
    </p>
  </div>
</CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          {/* Symptoms Library Tab */}
          <TabsContent value="symptoms" className="mt-0">
            {/* This part remains unchanged */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="border-red-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4">
                  <div className="flex items-center gap-3">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <ClipboardCheck className="h-6 w-6" />
                    </motion.div>
                    <CardTitle className="text-white">Symptom Library</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(HEALTH_KNOWLEDGE).map(([symptom, info], i) => (
                      <motion.div 
                        key={symptom}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                        }}
                        className="bg-white p-5 rounded-xl border border-red-100 shadow-sm"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-red-100 p-2 rounded-full">
                            <ActivitySquare className="text-red-600 h-5 w-5" />
                          </div>
                          <h3 className="text-lg font-semibold text-red-800 capitalize">{symptom}</h3>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-red-600 mb-1">Treatment:</h4>
                            <ul className="text-sm text-gray-700 pl-5 list-disc space-y-1">
                              {info.cures.map((cure, j) => (
                                <li key={j}>{cure}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-red-600 mb-1">Prevention:</h4>
                            <ul className="text-sm text-gray-700 pl-5 list-disc space-y-1">
                              {info.prevention.map((tip, j) => (
                                <li key={j}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="w-full mt-2 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg border border-red-100"
                            onClick={() => {
                              setInput(`I'm experiencing ${symptom}`);
                              setActiveTab("chat");
                            }}
                          >
                            Ask about {symptom}
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Health Tips and AI Capabilities sections remain unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Health Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-red-200 bg-white overflow-hidden">
              <CardHeader className="bg-red-50 border-b border-red-100">
                <div className="flex items-center gap-2 text-red-600">
                  <motion.div animate={pulseAnimation}>
                    <Pill className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-lg">Quick Health Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  {[
                    "Drink 8 glasses of water daily for proper hydration",
                    "Get 7-9 hours of quality sleep nightly",
                    "Wash hands with soap for at least 20 seconds",
                    "Eat 5 servings of colorful fruits and vegetables",
                    "Take short walking breaks every hour of sitting",
                    "Practice deep breathing to manage daily stress"
                  ].map((tip, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-2 group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      whileHover={{ x: 3 }}
                    >
                      <div className="bg-red-100 p-1 rounded-full mt-0.5 group-hover:bg-red-200">
                        <div className="h-1.5 w-1.5 bg-red-600 rounded-full" />
                      </div>
                      <p className="text-sm text-red-900">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Capabilities - Updated to mention Gemini */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-red-200 bg-white overflow-hidden">
              <CardHeader className="bg-red-50 border-b border-red-100">
                <div className="flex items-center gap-2 text-red-600">
                  <motion.div animate={pulseAnimation}>
                    <Bot className="w-5 h-5" />
                  </motion.div>
                  <CardTitle className="text-lg">Gemini AI Features</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  {[
                    "Advanced medical symptom analysis and recommendations",
                    "Natural language understanding of complex health concerns",
                    "Personalized advice based on your specific symptoms",
                    "Up-to-date medical knowledge integrated with our database",
                    "Contextual awareness to provide relevant follow-up suggestions",
                    "Educational health information to improve your wellness"
                  ].map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-start gap-2 group"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                      whileHover={{ x: -3 }}
                    >
                      <div className="bg-red-100 p-1 rounded-full mt-0.5 group-hover:bg-red-200">
                        <div className="h-1.5 w-1.5 bg-red-600 rounded-full" />
                      </div>
                      <p className="text-sm text-red-900">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}