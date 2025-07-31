import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Textarea } from "@/components/ui/textarea"; import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; import { useState, useEffect } from "react";

export default function DrMadhyaTeleconsultation() { const [form, setForm] = useState({ name: "", email: "", symptoms: "", time: "" }); const [submitted, setSubmitted] = useState(false); const [doctorLoggedIn, setDoctorLoggedIn] = useState(false); const [historyDialogOpen, setHistoryDialogOpen] = useState(false); const [videoCallDialogOpen, setVideoCallDialogOpen] = useState(false); const [selectedPatient, setSelectedPatient] = useState(""); const [appointments, setAppointments] = useState([]);

useEffect(() => { // Simulated fetching of data from backend setAppointments([ { name: "John Doe", email: "john@example.com", symptoms: "Blurred vision", time: "2025-08-01T10:30", history: [ "05 Jan 2025 - Dry eye symptoms - Eye drops prescribed", "23 Feb 2025 - Follow-up - Condition improving" ] }, { name: "Jane Smith", email: "jane@example.com", symptoms: "Itching eyes", time: "2025-08-01T11:00", history: [ "10 Mar 2025 - Allergy symptoms - Advised antihistamines" ] } ]); }, []);

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault(); setAppointments([...appointments, { ...form, history: [] }]); setSubmitted(true); };

const handleDoctorLogin = (e) => { e.preventDefault(); setDoctorLoggedIn(true); };

const openHistory = (patientName) => { setSelectedPatient(patientName); setHistoryDialogOpen(true); };

const openVideoCall = (patientName) => { setSelectedPatient(patientName); setVideoCallDialogOpen(true); };

return ( <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 flex flex-col items-center justify-start p-4"> <h1 className="text-3xl font-bold mb-4 text-blue-900">Dr. Madhya’s Eye Care Teleconsultation</h1> <Tabs defaultValue="patient" className="w-full max-w-2xl"> <TabsList className="grid grid-cols-2 w-full"> <TabsTrigger value="patient">Patient</TabsTrigger> <TabsTrigger value="doctor">Doctor</TabsTrigger> </TabsList>

<TabsContent value="patient">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-blue-800">Book Your Online Consultation</h2>
          {submitted ? (
            <div className="text-green-600 font-medium text-center">
              Thank you! Your consultation request has been received.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Describe Your Eye Problem</label>
                <Textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows={4} required />
              </div>
              <div>
                <label className="block text-sm font-medium">Preferred Date & Time</label>
                <Input name="time" type="datetime-local" value={form.time} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full">Request Consultation</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="doctor">
      <Card>
        <CardContent className="p-6 space-y-4">
          {!doctorLoggedIn ? (
            <form onSubmit={handleDoctorLogin} className="space-y-4">
              <h2 className="text-xl font-semibold text-center">Doctor Login</h2>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <Input name="username" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <Input name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Consultation Dashboard</h2>
              <ul className="list-disc list-inside space-y-2">
                {appointments.map((p, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-sm text-gray-500">{new Date(p.time).toLocaleString()}</div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => openVideoCall(p.name)}>Start Video</Button>
                      <Button variant="outline" onClick={() => openHistory(p.name)}>History</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

  {/* Video Call Dialog */}
  <Dialog open={videoCallDialogOpen} onOpenChange={setVideoCallDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Video Consultation</DialogTitle>
      </DialogHeader>
      <p>Initiating video call with {selectedPatient}...</p>
      <div className="w-full h-48 bg-black text-white flex items-center justify-center rounded-lg mt-4">
        [Simulated Video Call Interface]
      </div>
    </DialogContent>
  </Dialog>

  {/* History Dialog */}
  <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Consultation History</DialogTitle>
      </DialogHeader>
      <p>History for {selectedPatient}:</p>
      <ul className="list-disc list-inside mt-2">
        <li>05 Jan 2025 - Dry eye symptoms - Eye drops prescribed</li>
        <li>23 Feb 2025 - Follow-up - Condition improving</li>
      </ul>
    </DialogContent>
  </Dialog>
</div>

); }
