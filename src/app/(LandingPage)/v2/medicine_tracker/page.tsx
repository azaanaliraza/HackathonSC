"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { 
  Plus, 
  Check, 
  X, 
  Bell, 
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Award,
  TrendingUp,
  Pill,
  AlignLeft,
  Settings,
  User,
  HeartPulse
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schema for medication form validation
const medicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  time: z.string().min(1, "Time is required"),
  reminders: z.boolean().default(true)
});

export default function MedicationTracker() {
  const [medications, setMedications] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showAddForm, setShowAddForm] = useState(false);
  const [takenDates, setTakenDates] = useState({});
  const [reminderTime, setReminderTime] = useState("08:00");
  const [showReminder, setShowReminder] = useState(false);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: "",
      dosage: "",
      frequency: "Daily",
      time: "08:00",
      reminders: true
    }
  });

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Empty days for calendar alignment
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Actual days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
      const isToday = new Date().getDate() === day && 
                      new Date().getMonth() === currentMonth && 
                      new Date().getFullYear() === currentYear;
      const isTaken = selectedMed && takenDates[selectedMed.id]?.[dateKey];
      
      days.push(
        <motion.div 
          key={dateKey}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleTakenStatus(dateKey)}
          className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer transition-all ${
            isTaken 
              ? "bg-red-600 text-white shadow-lg"
              : "hover:bg-red-50"
          } ${
            isToday ? "ring-2 ring-red-500" : ""
          }`}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };

  // Toggle medication taken status
  const toggleTakenStatus = (dateKey) => {
    if (!selectedMed) return;
    
    setTakenDates(prev => ({
      ...prev,
      [selectedMed.id]: {
        ...prev[selectedMed.id],
        [dateKey]: !prev[selectedMed.id]?.[dateKey]
      }
    }));
    
    toast.success(
      `${selectedMed.name} marked as ${takenDates[selectedMed.id]?.[dateKey] ? "not taken" : "taken"}`
    );
  };

  // Add new medication
  const onSubmit = (data) => {
    const newMed = {
      id: Date.now().toString(),
      ...data,
      streak: 0,
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
    };
    
    setMedications([...medications, newMed]);
    setTakenDates({ ...takenDates, [newMed.id]: {} });
    setShowAddForm(false);
    form.reset();
    toast.success(`${data.name} added successfully!`);
  };

  // Calculate adherence percentage
  const calculateAdherence = (medId) => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date().getDate();
    const daysSoFar = currentMonth === new Date().getMonth() ? today : daysInMonth;
    
    if (!takenDates[medId] || daysSoFar === 0) return 0;
    
    const takenDays = Object.keys(takenDates[medId]).filter(
      date => takenDates[medId][date]
    ).length;
    
    return Math.round((takenDays / daysSoFar) * 100);
  };

  // Check for reminders
  useEffect(() => {
    const checkReminders = () => {
      medications.forEach(med => {
        if (med.reminders) {
          const now = new Date();
          const [hours, minutes] = med.time.split(':').map(Number);
          
          if (
            now.getHours() === hours && 
            now.getMinutes() === minutes && 
            !takenDates[med.id]?.[`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`]
          ) {
            setShowReminder(true);
            setSelectedMed(med);
          }
        }
      });
    };
    
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [medications, takenDates]);

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HeartPulse className="text-red-600 h-8 w-8" />
            <h1 className="text-2xl font-bold text-red-800">SymptoCheck Medtracker</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-red-600 hover:bg-red-50">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="text-red-600 hover:bg-red-50">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
            <CardHeader className="relative z-10">
              <CardTitle className="text-3xl font-bold mb-2">Track Your Medications</CardTitle>
              <p className="text-red-100 max-w-2xl">
                Never miss a dose with our intelligent tracking system, reminders, and progress visualization.
              </p>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center space-x-4 mt-4">
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-white text-red-600 hover:bg-red-50 shadow-lg"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medication
                </Button>
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                  <AlignLeft className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </div>
            </CardContent>
            <div className="absolute right-0 bottom-0 opacity-10">
              <Pill className="h-64 w-64 text-white" />
            </div>
          </Card>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Medications List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Medication Form */}
            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6 shadow-lg">
                    <CardHeader className="border-b border-red-100">
                      <CardTitle className="flex items-center justify-between">
                        <span>Add New Medication</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => setShowAddForm(false)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Medication Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Ibuprofen" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="dosage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dosage</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 200mg" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Frequency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Daily">Daily</SelectItem>
                                    <SelectItem value="Weekly">Weekly</SelectItem>
                                    <SelectItem value="As Needed">As Needed</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="reminders"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                                <div className="space-y-1">
                                  <FormLabel>Enable Reminders</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Get notifications when it's time to take your medication
                                  </p>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                            Add Medication
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Medications List */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-red-100">
                <CardTitle>Your Medications</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {medications.length === 0 ? (
                  <div className="text-center py-8">
                    <Pill className="mx-auto h-12 w-12 text-red-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">No medications added</h3>
                    <p className="text-gray-500 mt-1">Add your first medication to get started</p>
                    <Button 
                      onClick={() => setShowAddForm(true)}
                      className="mt-4 bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {medications.map(med => (
                      <motion.div
                        key={med.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedMed(med)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          selectedMed?.id === med.id 
                            ? 'bg-red-100 border border-red-200 shadow-sm'
                            : 'bg-white border border-gray-200 hover:border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="h-10 w-10 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: med.color }}
                            >
                              <Pill className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{med.name}</h3>
                              <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-red-200 text-red-600">
                            {med.time}
                          </Badge>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-500">Adherence</span>
                            <span className="text-sm font-medium">{calculateAdherence(med.id)}%</span>
                          </div>
                          <Progress 
                            value={calculateAdherence(med.id)} 
                            className="h-2 bg-red-100"
                            indicatorClassName="bg-red-600"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calendar & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar Section */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-red-100">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {selectedMed ? (
                      <span>Tracking: <span style={{ color: selectedMed.color }}>{selectedMed.name}</span></span>
                    ) : (
                      "Select a medication to track"
                    )}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={prevMonth}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">
                      {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={nextMonth}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {selectedMed ? (
                  <>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-medium text-sm text-red-600">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {generateCalendarDays()}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="mx-auto h-12 w-12 text-red-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">No medication selected</h3>
                    <p className="text-gray-500 mt-1">Select a medication from the list to view tracking calendar</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-red-600 mr-3" />
                    <span className="text-3xl font-bold">
                      {selectedMed ? selectedMed.streak : '0'} days
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Monthly Adherence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-red-600 mr-3" />
                    <span className="text-3xl font-bold">
                      {selectedMed ? calculateAdherence(selectedMed.id) : '0'}%
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Pill className="h-8 w-8 text-red-600 mr-3" />
                    <span className="text-3xl font-bold">{medications.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reminders Section */}
            <Card className="shadow-lg">
              <CardHeader className="border-b border-red-100">
                <CardTitle>Reminder Settings</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-6 w-6 text-red-600" />
                      <div>
                        <h3 className="font-medium">Daily Reminder Time</h3>
                        <p className="text-sm text-gray-600">Set your preferred reminder time</p>
                      </div>
                    </div>
                    <Input 
                      type="time" 
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="w-32"
                    />
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">Push Notifications</h3>
                          <p className="text-sm text-red-100">Get reminders on your device</p>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Reminder Notification */}
      <AnimatePresence>
        {showReminder && selectedMed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="w-96 shadow-xl border-red-200">
              <CardHeader className="bg-red-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Medication Reminder
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowReminder(false)}
                    className="text-white hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div 
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: selectedMed.color }}
                  >
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{selectedMed.name}</h3>
                    <p className="text-gray-600">{selectedMed.dosage}</p>
                    <p className="text-sm text-gray-500 mt-1">It's time to take your medication</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setShowReminder(false)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Snooze (10 min)
                </Button>
                <Button 
                  onClick={() => {
                    const today = new Date();
                    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
                    toggleTakenStatus(dateKey);
                    setShowReminder(false);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Taken
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}