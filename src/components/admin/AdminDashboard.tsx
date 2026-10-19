import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { QoshqarMuiiz, OrnamentDivider } from '../common/KazakhOrnament';
import { PhotoItem, VideoItem, TimelineEvent } from '../../types';
import {
  ShieldCheck,
  Settings,
  Clock,
  Image as ImageIcon,
  Film,
  Users,
  Building2,
  BookOpen,
  FileText,
  Save,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Key,
  CheckCircle,
  HelpCircle,
  ArrowLeft,
  Camera,
  X,
  Play,
  Check,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  onOpenSetupGuide: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  onOpenSetupGuide,
}) => {
  const {
    siteConfig,
    timelineEvents,
    photos,
    videos,
    people,
    documents,
    facilities,
    research,
    updateSiteConfig,
    changeAdminPasscode,
    exportBackupJSON,
    importBackupJSON,
    resetToDefaults,
    showToast,
    addPhoto,
    updatePhoto,
    deletePhoto,
    addVideo,
    updateVideo,
    deleteVideo,
    updateTimelineEvent,
    deleteTimelineEvent,
  } = useData();

  const [activeTab, setActiveTab] = useState<
    'general' | 'timeline' | 'gallery' | 'videos' | 'people' | 'building' | 'research' | 'documents' | 'backup'
  >('general');

  // Form states for general settings
  const [configForm, setConfigForm] = useState({ ...siteConfig });
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // Gallery Add/Edit modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoFormData, setPhotoFormData] = useState<Partial<PhotoItem>>({
    title: '',
    category: 'historical',
    categoryLabel: 'Тарихи шежіре',
    year: '1984',
    dateStr: '',
    description: '',
    imageUrl: '',
    sourceNote: '',
  });

  // Video Add/Edit modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoFormData, setVideoFormData] = useState<Partial<VideoItem>>({
    title: '',
    category: 'Ғылыми жоба',
    year: '2025',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '',
  });

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(configForm);
    showToast('Жалпы баптаулар сәтті жаңартылды!', 'success');
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImageUrl' | 'historyArchiveImageUrl' | 'keleshekImageUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const val = reader.result as string;
        setConfigForm((prev) => ({ ...prev, [field]: val }));
        updateSiteConfig({ [field]: val });
        showToast('Сурет таңдалды және сақталды!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = changeAdminPasscode(oldPass, newPass);
    if (ok) {
      setOldPass('');
      setNewPass('');
    }
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sazdy_school_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Резервтік көшірме жүктелді!', 'success');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importBackupJSON(content);
      }
    };
    reader.readAsText(file);
  };

  // Gallery handlers
  const handleOpenAddPhoto = () => {
    setPhotoFormData({
      title: '',
      category: 'historical',
      categoryLabel: 'Тарихи шежіре',
      year: '1984',
      dateStr: '',
      description: '',
      imageUrl: '',
      sourceNote: 'Мектеп мұрағатынан',
    });
    setIsPhotoModalOpen(true);
  };

  const handleOpenEditPhoto = (p: PhotoItem) => {
    setPhotoFormData(p);
    setIsPhotoModalOpen(true);
  };

  const handleSavePhotoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoFormData.title || !photoFormData.imageUrl) return;

    if (photoFormData.id) {
      updatePhoto(photoFormData.id, photoFormData);
      showToast('Фотосурет сәтті жаңартылды!', 'success');
    } else {
      addPhoto({
        title: photoFormData.title || '',
        category: (photoFormData.category as any) || 'historical',
        categoryLabel: photoFormData.categoryLabel || 'Тарихи шежіре',
        year: photoFormData.year || '',
        dateStr: photoFormData.dateStr || `${photoFormData.year || ''} жыл`,
        description: photoFormData.description || '',
        imageUrl: photoFormData.imageUrl || '',
        sourceNote: photoFormData.sourceNote || 'Мектеп мұрағаты',
      });
      showToast('Жаңа фото қосылды!', 'success');
    }
    setIsPhotoModalOpen(false);
  };

  // Video handlers
  const handleOpenAddVideo = () => {
    setVideoFormData({
      title: '',
      category: 'Мұрағат бейнесі',
      year: '2025',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      duration: '',
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (v: VideoItem) => {
    setVideoFormData(v);
    setIsVideoModalOpen(true);
  };

  const handleSaveVideoModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFormData.title || !videoFormData.videoUrl) return;

    if (videoFormData.id) {
      updateVideo(videoFormData.id, videoFormData);
      showToast('Бейнематериал жаңартылды!', 'success');
    } else {
      addVideo({
        title: videoFormData.title || '',
        category: videoFormData.category || 'Мұрағат',
        year: videoFormData.year || '2025',
        description: videoFormData.description || '',
        videoUrl: videoFormData.videoUrl || '',
        thumbnailUrl: videoFormData.thumbnailUrl || '',
        duration: videoFormData.duration || '',
      });
      showToast('Жаңа бейне сәтті қосылды!', 'success');
    }
    setIsVideoModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top bar with back to site button */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Сайтқа қайту</span>
            </button>
            <div className="h-5 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h1 className="font-editorial text-xl font-bold text-slate-900">
                Сазды мектебінің басқару тақтасы (CMS)
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSetupGuide}
              className="px-3.5 py-2 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-50 border border-amber-300 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Дерекқор баптау нұсқаулығы</span>
            </button>
            <button
              onClick={handleExportBackup}
              className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Көшірмені сақтау</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'general' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Жалпы баптаулар</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'gallery' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Фотогалерея ({photos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'videos' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Бейнелер ({videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'timeline' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Шежіре ({timelineEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('people')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'people' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Ұстаздар мен түлектер ({people.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('building')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'building' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>«Келешек мектебі» ({facilities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('research')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'research' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Ғылыми жоба</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'documents' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Құжаттар ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'backup' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Сақтық көшірме</span>
          </button>
        </div>

        {/* Tab 1: General Settings & Key Photos Management */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Direct Key Photos Management Panel */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Camera className="w-6 h-6 text-amber-600" />
                    <span>Сайттың басты фотосуреттерін қолдан ауыстыру</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Мектеп қасбеті, 1984 ж. мұрағат фотосы және 2025 ж. «Келешек мектебі» суреттерін құрылғыңыздан тікелей жүктеңіз
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Hero Image */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span>1. Басты мектеп қасбеті:</span>
                  </div>
                  <div className="aspect-[16/10] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 relative">
                    <img
                      src={configForm.heroImageUrl}
                      alt="Мектеп қасбеті"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg cursor-pointer shadow-xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Компьютерден жаңа фото жүктеу</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleHeroImageUpload(e, 'heroImageUrl')}
                      />
                    </label>
                    <input
                      type="text"
                      value={configForm.heroImageUrl}
                      onChange={(e) => setConfigForm({ ...configForm, heroImageUrl: e.target.value })}
                      placeholder="Немесе URL сілтемесі"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>

                {/* 2. 1984 Historical Image */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span>2. 1984 ж. тарихи фото:</span>
                  </div>
                  <div className="aspect-[16/10] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 relative">
                    <img
                      src={configForm.historyArchiveImageUrl}
                      alt="1984 ж. тарихи фото"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg cursor-pointer shadow-xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Компьютерден жаңа фото жүктеу</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleHeroImageUpload(e, 'historyArchiveImageUrl')}
                      />
                    </label>
                    <input
                      type="text"
                      value={configForm.historyArchiveImageUrl}
                      onChange={(e) => setConfigForm({ ...configForm, historyArchiveImageUrl: e.target.value })}
                      placeholder="Немесе URL сілтемесі"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>

                {/* 3. Keleshek 2025 Image */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span>3. «Келешек мектебі» 2025 ж.:</span>
                  </div>
                  <div className="aspect-[16/10] bg-slate-200 rounded-lg overflow-hidden border border-slate-300 relative">
                    <img
                      src={configForm.keleshekImageUrl}
                      alt="Келешек мектебі"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-lg cursor-pointer shadow-xs transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Компьютерден жаңа фото жүктеу</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleHeroImageUpload(e, 'keleshekImageUrl')}
                      />
                    </label>
                    <input
                      type="text"
                      value={configForm.keleshekImageUrl}
                      onChange={(e) => setConfigForm({ ...configForm, keleshekImageUrl: e.target.value })}
                      placeholder="Немесе URL сілтемесі"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <h2 className="font-editorial text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
                  Мектеп порталының басты ақпараттары
                </h2>

                <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Мектеп атауы</label>
                    <input
                      type="text"
                      value={configForm.schoolName}
                      onChange={(e) => setConfigForm({ ...configForm, schoolName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Басты беттегі тақырып (Hero Headline)
                    </label>
                    <input
                      type="text"
                      value={configForm.heroHeadline}
                      onChange={(e) => setConfigForm({ ...configForm, heroHeadline: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Қысқаша түсініктеме (Subheadline)
                    </label>
                    <textarea
                      rows={3}
                      value={configForm.heroSubheadline}
                      onChange={(e) =>
                        setConfigForm({ ...configForm, heroSubheadline: e.target.value })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Жобаның кіріспе сөзі (Welcome Speech)
                    </label>
                    <textarea
                      rows={4}
                      value={configForm.welcomeMessage}
                      onChange={(e) =>
                        setConfigForm({ ...configForm, welcomeMessage: e.target.value })
                      }
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Байланыс телефоны</label>
                      <input
                        type="text"
                        value={configForm.contactPhone}
                        onChange={(e) =>
                          setConfigForm({ ...configForm, contactPhone: e.target.value })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Электрондық пошта</label>
                      <input
                        type="text"
                        value={configForm.contactEmail}
                        onChange={(e) =>
                          setConfigForm({ ...configForm, contactEmail: e.target.value })
                        }
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Мекенжай</label>
                    <input
                      type="text"
                      value={configForm.address}
                      onChange={(e) => setConfigForm({ ...configForm, address: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Өзгерістерді жариялау</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Admin Security */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <h2 className="font-editorial text-xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-600" />
                  <span>Құпия сөзді жаңарту</span>
                </h2>

                <form onSubmit={handleChangePasscode} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Ескі құпия сөз</label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="Ағымдағы құпия сөз (admin1984)"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Жаңа құпия сөз</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Кемінде 6 таңба"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-950 rounded-lg font-bold border border-slate-300 transition-colors"
                  >
                    Құпия сөзді өзгерту
                  </button>
                </form>

                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-slate-600">
                  <p>Құпия сөз тек сайт әкімшісіне ғана қолжетімді. Ешкімге жарияламаңыз.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Photo Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-slate-900">
                  Фотогалереяны басқару ({photos.length} сурет)
                </h2>
                <p className="text-xs text-slate-500">
                  Мектептің фотосуреттерін жүктеу, жаңарту және ауыстыру
                </p>
              </div>

              <button
                onClick={handleOpenAddPhoto}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Жаңа фото жүктеу</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {photos.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden p-3 text-xs flex flex-col justify-between hover:border-amber-400 transition-all shadow-xs"
                >
                  <div>
                    <div className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden mb-2 relative group">
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-bold text-slate-900 line-clamp-1">{p.title}</p>
                    <p className="text-[11px] text-amber-800 font-semibold">{p.categoryLabel}</p>
                    {p.year && <p className="text-[11px] text-slate-500">{p.year} жыл</p>}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditPhoto(p)}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-semibold rounded-lg border border-slate-200 flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Ауыстыру / Өңдеу</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`«${p.title}» фотосын өшіруді растайсыз ба?`)) {
                          deletePhoto(p.id);
                        }
                      }}
                      className="p-1 text-rose-600 hover:text-rose-800"
                      title="Өшіру"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Videos Management */}
        {activeTab === 'videos' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-slate-900">
                  Бейне мұрағатты басқару ({videos.length} бейне)
                </h2>
                <p className="text-xs text-slate-500">
                  YouTube немесе MP4 бейнематериалдарын жүктеу және ауыстыру
                </p>
              </div>

              <button
                onClick={handleOpenAddVideo}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Жаңа бейне қосу</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3 flex flex-col justify-between hover:border-amber-400 transition-all shadow-xs">
                  <div>
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 mb-2 relative">
                      {v.thumbnailUrl ? (
                        <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          <Film className="w-8 h-8 text-amber-500" />
                        </div>
                      )}
                    </div>
                    <span className="text-amber-800 font-semibold">{v.category} · {v.year} ж.</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{v.title}</p>
                    <p className="text-slate-600 line-clamp-2 mt-1">{v.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditVideo(v)}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-900 font-semibold rounded-lg border border-slate-200 flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Ауыстыру / Өңдеу</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`«${v.title}» бейнесін өшіруді растайсыз ба?`)) {
                          deleteVideo(v.id);
                        }
                      }}
                      className="p-1 text-rose-600 hover:text-rose-800"
                      title="Өшіру"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Timeline */}
        {activeTab === 'timeline' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-slate-900">
                  Тарихи оқиғалар шежіресін басқару
                </h2>
                <p className="text-xs text-slate-500">
                  Мектептің 1984 жылдан бастап бүгінге дейінгі оқиғаларын қосу және өңдеу
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {timelineEvents.map((evt) => (
                <div key={evt.id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-800 font-sans font-semibold">
                      <span className="font-mono font-bold text-sm text-amber-900">{evt.period}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      {evt.isConfirmedFact ? (
                        <span className="text-emerald-700">Расталған тарихи факт</span>
                      ) : (
                        <span className="text-slate-500">Мұрағаттық кезең</span>
                      )}
                    </div>
                    <h3 className="font-editorial text-lg font-bold text-slate-900 mt-0.5">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-2xl line-clamp-2 mt-1 font-sans">
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-amber-800 pt-3 border-t border-slate-200 font-semibold">
              💡 Кеңес: «Шежіре» бөліміндегі оқиғаларды тікелей негізгі беттегі визуалды батырмалар арқылы да өңдей аласыз!
            </p>
          </div>
        )}

        {/* Tab 5: People */}
        {activeTab === 'people' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-editorial text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              Ұстаздар мен түлектер тізімі ({people.length} тұлға)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-amber-800 font-semibold">{item.roleLabel} · {item.yearsActive}</span>
                  <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-slate-600">{item.subjectOrProfession}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Building */}
        {activeTab === 'building' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-editorial text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              «Келешек мектебі» ғимаратының бөлімдері ({facilities.length} нысан)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facilities.map((f) => (
                <div key={f.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <p className="font-bold text-slate-900 text-sm">{f.title}</p>
                  <p className="text-emerald-700 font-semibold">{f.capacity}</p>
                  <p className="text-slate-600">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Research */}
        {activeTab === 'research' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs sm:text-sm">
            <h2 className="font-editorial text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              Ғылыми-зерттеу жобасының мәліметтері
            </h2>
            <div className="space-y-2 bg-slate-50 p-5 rounded-xl border border-slate-200 text-slate-700">
              <p><strong>Тақырыбы:</strong> {research.title}</p>
              <p><strong>Зерттеуші:</strong> {research.authorName} ({research.authorGrade})</p>
              <p><strong>Жетекшісі:</strong> {research.supervisorName} ({research.supervisorRole})</p>
              <p><strong>Мақсаты:</strong> {research.aim}</p>
            </div>
          </div>
        )}

        {/* Tab 8: Documents */}
        {activeTab === 'documents' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-editorial text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
              Тарихи құжаттар ({documents.length} құжат)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((d) => (
                <div key={d.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <span className="text-amber-800 font-semibold">{d.accessionCode} · {d.dateStr}</span>
                  <p className="font-bold text-slate-900 text-sm">{d.title}</p>
                  <p className="text-slate-600 line-clamp-2">{d.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 9: Backup & Data management */}
        {activeTab === 'backup' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="font-editorial text-2xl font-bold text-slate-900">
                Деректерді сақтау, экспорт және импорт
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Сайттың барлық ақпаратын файл түрінде сақтап қою немесе қалпына келтіру
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Export */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">JSON Резервтік көшірме</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Барлық шежірені, суреттерді, құжаттарды және ғылыми жоба мәтіндерін толықтай бір файл ретінде компьютеріңізге жүктеп алыңыз.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Файлды жүктеу (.json)
                </button>
              </div>

              {/* Import */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Көшірмені қалпына келтіру</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Бұрын сақталған .json резервтік файлын таңдап, барлық сайт деректерін дереу қайта жүктеңіз.
                </p>
                <label className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center cursor-pointer border border-slate-300 transition-colors shadow-xs">
                  <span>Файлды таңдау</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>

              {/* Reset to defaults */}
              <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-rose-900 text-sm">Бастапқы күйге қайтару</h3>
                <p className="text-xs text-rose-700 leading-relaxed">
                  Сайтты алғашқы расталған тарихи күйіне (1984 ж. және 2025 ж. «Келешек мектебі») қайтару.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Шын мәнінде барлық өңделген деректерді өшіріп, бастапқы қалпына келтіресіз бе?')) {
                      resetToDefaults();
                    }
                  }}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Бастапқы күйге келтіру
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Gallery Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative font-sans">
            <button
              onClick={() => setIsPhotoModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
              {photoFormData.id ? 'Фотосуретті өңдеу / ауыстыру' : 'Жаңа фотосурет жүктеу'}
            </h3>

            <form onSubmit={handleSavePhotoModal} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Фото атауы немесе тақырыбы *
                </label>
                <input
                  type="text"
                  required
                  value={photoFormData.title || ''}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, title: e.target.value })}
                  placeholder="Мысалы: 1984 жылғы алғашқы мектеп ұжымы"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Санаты
                  </label>
                  <select
                    value={photoFormData.category || 'historical'}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                  >
                    <option value="historical">Тарихи суреттер (1984-2000)</option>
                    <option value="keleshek_2025">«Келешек мектебі» (2025 ж.)</option>
                    <option value="teachers_pupils">Ұстаздар мен шәкірттер</option>
                    <option value="events">Мектеп іс-шаралары</option>
                    <option value="archive">Мұрағат құжаттары</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Жылы
                  </label>
                  <input
                    type="text"
                    value={photoFormData.year || ''}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, year: e.target.value })}
                    placeholder="1984"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Preview & Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Сурет файлы немесе URL *
                </label>
                <div className="space-y-3">
                  {photoFormData.imageUrl && (
                    <div className="aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-300 relative max-h-48">
                      <img
                        src={photoFormData.imageUrl}
                        alt="Таңдалған сурет"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                        Көрініс
                      </span>
                    </div>
                  )}

                  <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>Құрылғыдан (компьютер/телефон) фото таңдау</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setPhotoFormData({ ...photoFormData, imageUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    value={photoFormData.imageUrl || ''}
                    onChange={(e) => setPhotoFormData({ ...photoFormData, imageUrl: e.target.value })}
                    placeholder="Немесе интернет URL сілтемесін жазыңыз"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Сипаттамасы
                </label>
                <textarea
                  rows={3}
                  value={photoFormData.description || ''}
                  onChange={(e) => setPhotoFormData({ ...photoFormData, description: e.target.value })}
                  placeholder="Сурет туралы қысқаша мәлімет..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Бас тарту
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Сақтау</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative font-sans">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
              {videoFormData.id ? 'Бейне ақпаратын өңдеу / ауыстыру' : 'Жаңа бейне қосу'}
            </h3>

            <form onSubmit={handleSaveVideoModal} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Бейне атауы *
                </label>
                <input
                  type="text"
                  required
                  value={videoFormData.title || ''}
                  onChange={(e) => setVideoFormData({ ...videoFormData, title: e.target.value })}
                  placeholder="Бейне тақырыбы..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Санаты
                  </label>
                  <input
                    type="text"
                    value={videoFormData.category || ''}
                    onChange={(e) => setVideoFormData({ ...videoFormData, category: e.target.value })}
                    placeholder="Ғылыми жоба / Мұрағат"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Жылы
                  </label>
                  <input
                    type="text"
                    value={videoFormData.year || ''}
                    onChange={(e) => setVideoFormData({ ...videoFormData, year: e.target.value })}
                    placeholder="2025"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Video URL or File */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Бейне файлы немесе YouTube сілтемесі *
                </label>
                <div className="space-y-2">
                  <label className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border-2 border-dashed border-amber-300 rounded-xl cursor-pointer text-amber-900 font-semibold text-xs transition-colors">
                    <Film className="w-4 h-4 text-amber-600" />
                    <span>Құрылғыдан бейне файлын жүктеу (MP4)</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 80 * 1024 * 1024) {
                            alert('Файл көлемі 80MB-тан аспауы тиіс');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            setVideoFormData({ ...videoFormData, videoUrl: reader.result as string });
                            showToast('Бейне файлы таңдалды!', 'info');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    value={videoFormData.videoUrl?.startsWith('data:') ? 'Таңдалған жергілікті бейне файлы' : videoFormData.videoUrl || ''}
                    onChange={(e) => setVideoFormData({ ...videoFormData, videoUrl: e.target.value })}
                    placeholder="Немесе YouTube сілтемесін жазыңыз (https://...)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Video Thumbnail */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Бейне мұқабасы (Кадр немесе фото)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={videoFormData.thumbnailUrl || ''}
                    onChange={(e) => setVideoFormData({ ...videoFormData, thumbnailUrl: e.target.value })}
                    placeholder="https://... фото сілтемесі"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none text-xs"
                  />
                  <label className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg cursor-pointer border border-slate-300 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-amber-600" />
                    <span>Фото таңдау</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setVideoFormData({ ...videoFormData, thumbnailUrl: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Сипаттамасы
                </label>
                <textarea
                  rows={3}
                  value={videoFormData.description || ''}
                  onChange={(e) => setVideoFormData({ ...videoFormData, description: e.target.value })}
                  placeholder="Бейнематериал жайлы қысқаша мәлімет..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Бас тарту
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Сақтау</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
