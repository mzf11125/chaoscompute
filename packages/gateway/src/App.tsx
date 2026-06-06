import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/layout/ErrorBoundary'
import { WalletProvider } from '@/components/console/WalletConnect'
import Landing from '@/pages/Landing/Landing'
import Console from '@/pages/Console/Console'
import Docs from '@/pages/Docs/Docs'
import Api from '@/pages/Api/Api'
import Nodes from '@/pages/Nodes/Nodes'
import Marketplace from '@/pages/Marketplace/Marketplace'
import Operators from '@/pages/Operators/Operators'
import NotFound from '@/pages/NotFound'

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
        <WalletProvider>
          <ErrorBoundary>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/console" element={<Console />} />
              <Route path="/nodes" element={<Nodes />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/operators" element={<Operators />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/api" element={<Api />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </ErrorBoundary>
        </WalletProvider>
      </div>
    </div>
  )
}
