"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  HeartPulse, 
  User, 
  Mail, 
  Lock, 
  Building, 
  Award, 
  Phone,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Shield,
  Briefcase
} from "lucide-react";
import { toast, Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  specialization: z.string().min(1, "Please select your specialization"),
  licenseNumber: z.string().min(4, "Please enter a valid license number"),
  yearsOfExperience: z.string().min(1, "Please select your experience"),
  hospital: z.string().min(2, "Please enter your hospital or clinic name"),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const specializations = [
  "Cardiology", "Dermatology", "Emergency Medicine", 
  "Family Medicine", "Internal Medicine", "Neurology",
  "Obstetrics & Gynecology", "Oncology", "Pediatrics",
  "Psychiatry", "Radiology", "Surgery"
];

const experienceOptions = [
  "Less than 1 year", "1-3 years", "3-5 years", 
  "5-10 years", "10+ years"
];

export default function DoctorSignupPage() {
  const [submitting, setSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      specialization: "",
      licenseNumber: "",
      yearsOfExperience: "",
      hospital: "",
      termsAccepted: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    setTimeout(() => {
      console.log(values);
      setSubmitting(false);
      toast.success("Registration submitted successfully!");
    }, 1500);
  }

  const nextFormStep = () => {
    if (formStep === 0) {
      form.trigger(["firstName", "lastName", "email", "password", "confirmPassword"]);
      const basicInfoErrors = form.formState.errors;
      
      if (!basicInfoErrors.firstName && !basicInfoErrors.lastName && 
          !basicInfoErrors.email && !basicInfoErrors.password && 
          !basicInfoErrors.confirmPassword) {
        setFormStep(1);
      }
    }
  };

  const prevFormStep = () => setFormStep(0);

  const benefits = [
    { icon: <Shield className="w-5 h-5 text-rose-500" />, text: "Secure patient connections" },
    { icon: <Briefcase className="w-5 h-5 text-rose-500" />, text: "Expand your practice" },
    { icon: <CheckCircle2 className="w-5 h-5 text-rose-500" />, text: "Verified professional network" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <Toaster position="top-center" richColors />
      
      {/* Hero Section with Medical DNA Abstract Background */}
      <div className="relative bg-red-700 text-white py-16 overflow-hidden">
        {/* Abstract Medical Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ecg" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
                <path d="M0,50 L40,50 L45,20 L50,80 L55,50 L60,50 L65,40 L70,60 L75,50 L200,50" fill="none" stroke="white" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ecg)" />
          </svg>
        </div>
        
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-4 rounded-full">
              <HeartPulse className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">Join Our Elite Medical Network</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto text-center">
            Connect with patients, collaborate with specialists, and enhance healthcare delivery
          </p>
          
          <div className="flex justify-center gap-6 mt-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="flex items-center gap-2"
              >
                <div className="bg-white rounded-full p-1">
                  {benefit.icon}
                </div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 py-12 -mt-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-red-100 shadow-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-5 h-5" />
                    <Badge variant="outline" className="text-red-100 border-red-400">
                      Medical Professionals
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">Provider Registration</CardTitle>
                  <CardDescription className="text-red-100 mt-1">
                    {formStep === 0 ? "Personal Information" : "Professional Credentials"}
                  </CardDescription>
                </div>
                <div className="hidden md:block">
                  <div className="p-3 bg-red-500 rounded-full">
                    <Stethoscope className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Progress value={formStep === 0 ? 50 : 100} className="h-1 bg-red-800" />
                <div className="flex justify-between mt-2 text-xs text-red-200">
                  <span>Step {formStep + 1} of 2</span>
                  <span>{formStep === 0 ? "50%" : "100%"} Complete</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {formStep === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-800">First Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                  <Input placeholder="John" {...field} className="pl-10 border-red-200 rounded-md" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-800">Last Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                  <Input placeholder="Smith" {...field} className="pl-10 border-red-200 rounded-md" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                <Input placeholder="doctor@hospital.com" {...field} className="pl-10 border-red-200 rounded-md" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                <Input type="password" placeholder="••••••••" {...field} className="pl-10 border-red-200 rounded-md" />
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs text-red-600">
                              Must contain 8+ characters with uppercase, lowercase & numbers
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                <Input type="password" placeholder="••••••••" {...field} className="pl-10 border-red-200 rounded-md" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="button" 
                        onClick={nextFormStep}
                        className="w-full bg-red-600 hover:bg-red-700 mt-6 py-6 rounded-md"
                      >
                        Continue to Professional Details <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  )}
                  
                  {formStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                    >
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
                        <h3 className="text-red-800 font-semibold flex items-center gap-2 mb-1">
                          <Stethoscope className="w-4 h-4" />
                          Professional Verification
                        </h3>
                        <p className="text-sm text-red-700">
                          Your credentials will be verified by our medical board to ensure the highest standards of care
                        </p>
                      </div>
                
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                <Input placeholder="(123) 456-7890" {...field} className="pl-10 border-red-200 rounded-md" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="specialization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-800">Specialization</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="border-red-200 rounded-md">
                                    <SelectValue placeholder="Select specialization" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {specializations.map((spec) => (
                                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="yearsOfExperience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-red-800">Years of Experience</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="border-red-200 rounded-md">
                                    <SelectValue placeholder="Select experience" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {experienceOptions.map((exp) => (
                                    <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="licenseNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">Medical License Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Award className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                <Input placeholder="ML12345678" {...field} className="pl-10 border-red-200 rounded-md" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hospital"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-800">Primary Hospital/Clinic</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-red-400" />
                                <Input placeholder="City General Hospital" {...field} className="pl-10 border-red-200 rounded-md" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator className="my-6 bg-red-100" />
                      
                      <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border border-red-200 p-4 bg-red-50">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-red-300 data-[state=checked]:bg-red-600"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-red-800">
                                I agree to the terms of service, privacy policy, and code of medical ethics
                              </FormLabel>
                              <FormDescription className="text-xs text-red-600">
                                By agreeing, you confirm that all information provided is accurate and complete
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-4 pt-2">
                        <Button 
                          type="button" 
                          onClick={prevFormStep}
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50 flex-1 py-6 rounded-md"
                        >
                          Back to Personal Information
                        </Button>
                        
                        <Button 
                          type="submit" 
                          className="bg-red-600 hover:bg-red-700 flex-1 py-6 rounded-md"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              Complete Registration <ArrowRight className="ml-2 h-5 w-5" />
                            </span>
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="bg-gradient-to-r from-red-50 to-red-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-red-100">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <HeartPulse className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-red-800 font-medium text-sm">MedConnect Pro</h3>
                  <p className="text-red-600 text-xs">Trusted by over 50,000 healthcare professionals</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-white border-red-200 text-red-700 hover:bg-red-50">
                  HIPAA Compliant
                </Badge>
                <Badge variant="outline" className="bg-white border-red-200 text-red-700 hover:bg-red-50">
                  256-bit Encryption
                </Badge>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Medical Imagery Elements */}
        <div className="hidden lg:block absolute left-6 top-1/2 transform -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <svg width="80" height="400" viewBox="0 0 80 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 0V400" stroke="#EF4444" strokeWidth="1" strokeDasharray="8 8" />
              <circle cx="40" cy="80" r="10" fill="#FCA5A5" fillOpacity="0.6" />
              <circle cx="40" cy="160" r="15" fill="#FCA5A5" fillOpacity="0.4" />
              <circle cx="40" cy="240" r="8" fill="#FCA5A5" fillOpacity="0.5" />
              <circle cx="40" cy="320" r="12" fill="#FCA5A5" fillOpacity="0.3" />
            </svg>
          </motion.div>
        </div>
        
        <div className="hidden lg:block absolute right-6 top-1/2 transform -translate-y-1/2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.6, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <svg width="80" height="400" viewBox="0 0 80 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 0V400" stroke="#EF4444" strokeWidth="1" strokeDasharray="8 8" />
              <path d="M25 80H55V85H25V80Z" fill="#EF4444" fillOpacity="0.6" />
              <path d="M20 160H60V165H20V160Z" fill="#EF4444" fillOpacity="0.4" />
              <path d="M30 240H50V245H30V240Z" fill="#EF4444" fillOpacity="0.5" />
              <path d="M15 320H65V325H15V320Z" fill="#EF4444" fillOpacity="0.3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}