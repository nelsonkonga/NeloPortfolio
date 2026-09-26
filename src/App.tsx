import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LangProvider } from '@/contexts/LangContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Methodology } from '@/components/sections/Methodology'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { MentionsLegales } from '@/pages/legal/MentionsLegales'
import { Confidentialite } from '@/pages/legal/Confidentialite'
import { ConditionsGenerales } from '@/pages/legal/ConditionsGenerales'
import { Tarifs } from '@/pages/Tarifs'
import { Portfolio } from '@/pages/Portfolio'
import './index.css'

function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Methodology />
      <About />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/tarifs" element={<Tarifs />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                <Route path="/confidentialite" element={<Confidentialite />} />
                <Route path="/conditions-generales" element={<ConditionsGenerales />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </LangProvider>
    </ThemeProvider>
  )
}

export default App
