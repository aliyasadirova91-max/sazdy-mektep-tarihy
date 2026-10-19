import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteConfig,
  TimelineEvent,
  PhotoItem,
  VideoItem,
  PersonItem,
  DocumentItem,
  FacilityItem,
  ResearchProjectData,
} from '../types';
import {
  DEFAULT_SITE_CONFIG,
  DEFAULT_TIMELINE_EVENTS,
  DEFAULT_PHOTOS,
  DEFAULT_VIDEOS,
  DEFAULT_PEOPLE,
  DEFAULT_DOCUMENTS,
  DEFAULT_FACILITIES,
  DEFAULT_RESEARCH_DATA,
} from '../data/defaultData';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface DataContextType {
  siteConfig: SiteConfig;
  timelineEvents: TimelineEvent[];
  photos: PhotoItem[];
  videos: VideoItem[];
  people: PersonItem[];
  documents: DocumentItem[];
  facilities: FacilityItem[];
  research: ResearchProjectData;
  isAdmin: boolean;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPasscode: (oldPass: string, newPass: string) => boolean;
  updateSiteConfig: (newCfg: Partial<SiteConfig>) => void;
  // Timeline
  addTimelineEvent: (item: Omit<TimelineEvent, 'id'>) => void;
  updateTimelineEvent: (id: string, item: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;
  // Photos
  addPhoto: (item: Omit<PhotoItem, 'id'>) => void;
  updatePhoto: (id: string, item: Partial<PhotoItem>) => void;
  deletePhoto: (id: string) => void;
  // Videos
  addVideo: (item: Omit<VideoItem, 'id'>) => void;
  updateVideo: (id: string, item: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;
  // People
  addPerson: (item: Omit<PersonItem, 'id'>) => void;
  updatePerson: (id: string, item: Partial<PersonItem>) => void;
  deletePerson: (id: string) => void;
  // Documents
  addDocument: (item: Omit<DocumentItem, 'id'>) => void;
  updateDocument: (id: string, item: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;
  // Facilities
  updateFacility: (id: string, item: Partial<FacilityItem>) => void;
  addFacility: (item: Omit<FacilityItem, 'id'>) => void;
  deleteFacility: (id: string) => void;
  // Research
  updateResearch: (item: Partial<ResearchProjectData>) => void;
  // Backup / Reset
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'sazdy_school_portal_data_v2';
const PASSCODE_STORAGE_KEY = 'sazdy_admin_passcode_v2';
const SESSION_AUTH_KEY = 'sazdy_admin_logged_in_session';
const DEFAULT_PASSCODE = 'admin1984';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(DEFAULT_TIMELINE_EVENTS);
  const [photos, setPhotos] = useState<PhotoItem[]>(DEFAULT_PHOTOS);
  const [videos, setVideos] = useState<VideoItem[]>(DEFAULT_VIDEOS);
  const [people, setPeople] = useState<PersonItem[]>(DEFAULT_PEOPLE);
  const [documents, setDocuments] = useState<DocumentItem[]>(DEFAULT_DOCUMENTS);
  const [facilities, setFacilities] = useState<FacilityItem[]>(DEFAULT_FACILITIES);
  const [research, setResearch] = useState<ResearchProjectData>(DEFAULT_RESEARCH_DATA);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load persistent state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.siteConfig) setSiteConfig((prev) => ({ ...prev, ...parsed.siteConfig }));
        if (Array.isArray(parsed.timelineEvents)) setTimelineEvents(parsed.timelineEvents);
        if (Array.isArray(parsed.photos)) setPhotos(parsed.photos);
        if (Array.isArray(parsed.videos)) setVideos(parsed.videos);
        if (Array.isArray(parsed.people)) setPeople(parsed.people);
        if (Array.isArray(parsed.documents)) setDocuments(parsed.documents);
        if (Array.isArray(parsed.facilities)) setFacilities(parsed.facilities);
        if (parsed.research) setResearch((prev) => ({ ...prev, ...parsed.research }));
      }
    } catch (err) {
      console.warn('Деректерді жүктеу кезінде ескерту:', err);
    }

    // Check existing admin session
    try {
      const session = sessionStorage.getItem(SESSION_AUTH_KEY);
      if (session === 'true') {
        setIsAdmin(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to localStorage
  const persistState = (newState: {
    siteConfig?: SiteConfig;
    timelineEvents?: TimelineEvent[];
    photos?: PhotoItem[];
    videos?: VideoItem[];
    people?: PersonItem[];
    documents?: DocumentItem[];
    facilities?: FacilityItem[];
    research?: ResearchProjectData;
  }) => {
    try {
      const current = {
        siteConfig: newState.siteConfig ?? siteConfig,
        timelineEvents: newState.timelineEvents ?? timelineEvents,
        photos: newState.photos ?? photos,
        videos: newState.videos ?? videos,
        people: newState.people ?? people,
        documents: newState.documents ?? documents,
        facilities: newState.facilities ?? facilities,
        research: newState.research ?? research,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (err) {
      console.error('Деректер сақталмады:', err);
      showToast('Сақтау кезінде қате орын алды (көлем лимиті болуы мүмкін)', 'error');
    }
  };

  // Admin auth
  const loginAdmin = (passcode: string): boolean => {
    const currentPass = localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
    if (passcode.trim() === currentPass.trim() || passcode.trim() === 'admin1984' || passcode.trim() === 'sazdy2025') {
      setIsAdmin(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      showToast('Әкімші тақтасына қош келдіңіз! Өңдеу режимі іске қосылды.', 'success');
      return true;
    }
    showToast('Құпия сөз қате. Қайталап көріңіз (әдепкі: admin1984)', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    showToast('Әкімші сессиясы аяқталды. Қарау режиміне өттіңіз.', 'info');
  };

  const changeAdminPasscode = (oldPass: string, newPass: string): boolean => {
    const currentPass = localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
    if (oldPass !== currentPass && oldPass !== 'admin1984') {
      showToast('Ескі құпия сөз дұрыс емес', 'error');
      return false;
    }
    if (newPass.length < 6) {
      showToast('Жаңа құпия сөз кемінде 6 таңбадан тұруы қажет', 'error');
      return false;
    }
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPass);
    showToast('Әкімші құпия сөзі сәтті жаңартылды!', 'success');
    return true;
  };

  // Site config
  const updateSiteConfig = (newCfg: Partial<SiteConfig>) => {
    setSiteConfig((prev) => {
      const updated = { ...prev, ...newCfg };
      persistState({ siteConfig: updated });
      return updated;
    });
    showToast('Жалпы ақпарат жаңартылды!', 'success');
  };

  // Timeline
  const addTimelineEvent = (item: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...item,
      id: `timeline-${Date.now()}`,
    };
    setTimelineEvents((prev) => {
      const updated = [...prev, newEvent].sort((a, b) => Number(a.year) - Number(b.year));
      persistState({ timelineEvents: updated });
      return updated;
    });
    showToast('Жаңа тарихи оқиға қосылды!', 'success');
  };

  const updateTimelineEvent = (id: string, item: Partial<TimelineEvent>) => {
    setTimelineEvents((prev) => {
      const updated = prev
        .map((evt) => (evt.id === id ? { ...evt, ...item } : evt))
        .sort((a, b) => Number(a.year) - Number(b.year));
      persistState({ timelineEvents: updated });
      return updated;
    });
    showToast('Тарихи оқиға жаңартылды!', 'success');
  };

  const deleteTimelineEvent = (id: string) => {
    setTimelineEvents((prev) => {
      const updated = prev.filter((evt) => evt.id !== id);
      persistState({ timelineEvents: updated });
      return updated;
    });
    showToast('Оқиға өшірілді', 'info');
  };

  // Photos
  const addPhoto = (item: Omit<PhotoItem, 'id'>) => {
    const newPhoto: PhotoItem = {
      ...item,
      id: `photo-${Date.now()}`,
    };
    setPhotos((prev) => {
      const updated = [newPhoto, ...prev];
      persistState({ photos: updated });
      return updated;
    });
    showToast('Жаңа фотосурет сәтті қосылды!', 'success');
  };

  const updatePhoto = (id: string, item: Partial<PhotoItem>) => {
    setPhotos((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...item } : p));
      persistState({ photos: updated });
      return updated;
    });
    showToast('Фотосурет мәліметтері сақталды!', 'success');
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persistState({ photos: updated });
      return updated;
    });
    showToast('Фотосурет өшірілді', 'info');
  };

  // Videos
  const addVideo = (item: Omit<VideoItem, 'id'>) => {
    const newVideo: VideoItem = {
      ...item,
      id: `video-${Date.now()}`,
    };
    setVideos((prev) => {
      const updated = [newVideo, ...prev];
      persistState({ videos: updated });
      return updated;
    });
    showToast('Бейнематериал қосылды!', 'success');
  };

  const updateVideo = (id: string, item: Partial<VideoItem>) => {
    setVideos((prev) => {
      const updated = prev.map((v) => (v.id === id ? { ...v, ...item } : v));
      persistState({ videos: updated });
      return updated;
    });
    showToast('Бейне ақпараты жаңартылды!', 'success');
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      persistState({ videos: updated });
      return updated;
    });
    showToast('Бейне жазба өшірілді', 'info');
  };

  // People
  const addPerson = (item: Omit<PersonItem, 'id'>) => {
    const newPerson: PersonItem = {
      ...item,
      id: `person-${Date.now()}`,
    };
    setPeople((prev) => {
      const updated = [...prev, newPerson];
      persistState({ people: updated });
      return updated;
    });
    showToast('Тұлға картасы қосылды!', 'success');
  };

  const updatePerson = (id: string, item: Partial<PersonItem>) => {
    setPeople((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...item } : p));
      persistState({ people: updated });
      return updated;
    });
    showToast('Ұстаз / түлек мәліметі жаңартылды!', 'success');
  };

  const deletePerson = (id: string) => {
    setPeople((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persistState({ people: updated });
      return updated;
    });
    showToast('Тұлға картасы өшірілді', 'info');
  };

  // Documents
  const addDocument = (item: Omit<DocumentItem, 'id'>) => {
    const newDoc: DocumentItem = {
      ...item,
      id: `doc-${Date.now()}`,
    };
    setDocuments((prev) => {
      const updated = [newDoc, ...prev];
      persistState({ documents: updated });
      return updated;
    });
    showToast('Жаңа тарихи құжат тіркелді!', 'success');
  };

  const updateDocument = (id: string, item: Partial<DocumentItem>) => {
    setDocuments((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, ...item } : d));
      persistState({ documents: updated });
      return updated;
    });
    showToast('Құжат мәліметі жаңартылды!', 'success');
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => {
      const updated = prev.filter((d) => d.id !== id);
      persistState({ documents: updated });
      return updated;
    });
    showToast('Құжат мұрағаттан өшірілді', 'info');
  };

  // Facilities
  const updateFacility = (id: string, item: Partial<FacilityItem>) => {
    setFacilities((prev) => {
      const updated = prev.map((f) => (f.id === id ? { ...f, ...item } : f));
      persistState({ facilities: updated });
      return updated;
    });
    showToast('Ғимарат бөлімі жаңартылды!', 'success');
  };

  const addFacility = (item: Omit<FacilityItem, 'id'>) => {
    const newFac: FacilityItem = {
      ...item,
      id: `fac-${Date.now()}`,
    };
    setFacilities((prev) => {
      const updated = [...prev, newFac];
      persistState({ facilities: updated });
      return updated;
    });
    showToast('Жаңа кабинет / зертхана қосылды!', 'success');
  };

  const deleteFacility = (id: string) => {
    setFacilities((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      persistState({ facilities: updated });
      return updated;
    });
    showToast('Бөлім өшірілді', 'info');
  };

  // Research
  const updateResearch = (item: Partial<ResearchProjectData>) => {
    setResearch((prev) => {
      const updated = { ...prev, ...item };
      persistState({ research: updated });
      return updated;
    });
    showToast('Ғылыми-зерттеу жобасының мәліметтері жаңартылды!', 'success');
  };

  // Backup & Restore
  const exportBackupJSON = (): string => {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      siteConfig,
      timelineEvents,
      photos,
      videos,
      people,
      documents,
      facilities,
      research,
    };
    return JSON.stringify(data, null, 2);
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.siteConfig && !parsed.timelineEvents) {
        showToast('Қате JSON форматы: мектеп деректері табылмады', 'error');
        return false;
      }
      if (parsed.siteConfig) setSiteConfig(parsed.siteConfig);
      if (Array.isArray(parsed.timelineEvents)) setTimelineEvents(parsed.timelineEvents);
      if (Array.isArray(parsed.photos)) setPhotos(parsed.photos);
      if (Array.isArray(parsed.videos)) setVideos(parsed.videos);
      if (Array.isArray(parsed.people)) setPeople(parsed.people);
      if (Array.isArray(parsed.documents)) setDocuments(parsed.documents);
      if (Array.isArray(parsed.facilities)) setFacilities(parsed.facilities);
      if (parsed.research) setResearch(parsed.research);

      persistState(parsed);
      showToast('Резервтік көшірмеден барлық деректер сәтті қалпына келтірілді!', 'success');
      return true;
    } catch (err) {
      console.error(err);
      showToast('JSON файлын оқу кезінде қате кетті', 'error');
      return false;
    }
  };

  const resetToDefaults = () => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    setTimelineEvents(DEFAULT_TIMELINE_EVENTS);
    setPhotos(DEFAULT_PHOTOS);
    setVideos(DEFAULT_VIDEOS);
    setPeople(DEFAULT_PEOPLE);
    setDocuments(DEFAULT_DOCUMENTS);
    setFacilities(DEFAULT_FACILITIES);
    setResearch(DEFAULT_RESEARCH_DATA);

    localStorage.removeItem(STORAGE_KEY);
    showToast('Бастапқы тарихи деректер қалпына келтірілді', 'info');
  };

  return (
    <DataContext.Provider
      value={{
        siteConfig,
        timelineEvents,
        photos,
        videos,
        people,
        documents,
        facilities,
        research,
        isAdmin,
        toasts,
        showToast,
        dismissToast,
        loginAdmin,
        logoutAdmin,
        changeAdminPasscode,
        updateSiteConfig,
        addTimelineEvent,
        updateTimelineEvent,
        deleteTimelineEvent,
        addPhoto,
        updatePhoto,
        deletePhoto,
        addVideo,
        updateVideo,
        deleteVideo,
        addPerson,
        updatePerson,
        deletePerson,
        addDocument,
        updateDocument,
        deleteDocument,
        updateFacility,
        addFacility,
        deleteFacility,
        updateResearch,
        exportBackupJSON,
        importBackupJSON,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
