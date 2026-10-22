import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { PrinciplesSection } from './components/sections/PrinciplesSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ContactBanner } from './components/sections/ContactBanner';
import { Footer } from './components/layout/Footer';
import { ResumeModal } from './components/common/ResumeModal';

import { AskHarshilChat } from './components/chat/AskHarshilChat';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeModalOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeModalOpen(false);
  };

  return (
    <div className="mint-canvas">
      {/* Sticky Top Navigation */}
      <Navbar onOpenResume={handleOpenResume} />

      {/* Main Content Sections */}
      <main>
        <HeroSection />
        <AboutSection onOpenResume={handleOpenResume} />
        <PrinciplesSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <ContactBanner />
      </main>

      {/* Footer */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Non-broken Interactive Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={handleCloseResume} />

      {/* Real AI-Powered Portfolio Chatbot */}
      <AskHarshilChat />
    </div>
  );
};

export default App;
