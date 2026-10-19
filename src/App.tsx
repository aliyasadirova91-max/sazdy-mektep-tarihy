/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { HeroSection } from './components/home/HeroSection';
import { HomeFeaturedSections } from './components/home/HomeFeaturedSections';
import { TimelineSection } from './components/timeline/TimelineSection';
import { ModernBuildingSection } from './components/building/ModernBuildingSection';
import { ResearchSection } from './components/research/ResearchSection';
import { GallerySection } from './components/gallery/GallerySection';
import { VideoSection } from './components/videos/VideoSection';
import { PeopleSection } from './components/people/PeopleSection';
import { DocumentsSection } from './components/documents/DocumentsSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { DatabaseSetupGuideModal } from './components/admin/DatabaseSetupGuideModal';

const MainContent: React.FC = () => {
  const { isAdmin } = useData();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState<boolean>(false);

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-900 selection:bg-amber-500/20 selection:text-amber-900">
      {/* Toast notifications */}
      <ToastContainer />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => {
          setActiveTab('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Database & Cloud Setup Guide Modal */}
      <DatabaseSetupGuideModal
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
      />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <HomeFeaturedSections onNavigate={handleNavigate} />
          </>
        )}

        {activeTab === 'timeline' && <TimelineSection onNavigateToAdmin={() => setActiveTab('admin')} />}

        {activeTab === 'building' && <ModernBuildingSection />}

        {activeTab === 'research' && <ResearchSection />}

        {activeTab === 'gallery' && <GallerySection />}

        {activeTab === 'videos' && <VideoSection />}

        {activeTab === 'people' && <PeopleSection />}

        {activeTab === 'documents' && <DocumentsSection />}

        {activeTab === 'admin' && (
          <AdminDashboard
            onBackToSite={() => handleNavigate('home')}
            onOpenSetupGuide={() => setIsSetupGuideOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigate}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onOpenSetupGuide={() => setIsSetupGuideOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainContent />
    </DataProvider>
  );
}
