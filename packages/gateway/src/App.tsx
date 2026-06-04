import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Landing from '@/pages/Landing/Landing'
import Dashboard from '@/pages/Dashboard/Dashboard'
import ApiKeys from '@/pages/ApiKeys/ApiKeys'

export default function App() {
  return (
    <div className="relative min-h-screen">
      <div className="cinematic-bg">
        <div className="cinematic-orbs cinematic-orb-1" />
        <div className="cinematic-orbs cinematic-orb-2" />
        <div className="cinematic-orbs cinematic-orb-3" />
      </div>
      <div className="noise-overlay" />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/api-keys" element={<ApiKeys />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
