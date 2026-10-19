export interface TimelineEvent {
  id: string;
  year: number | string;
  title: string;
  period: string; // e.g. "1984-1990 жж."
  description: string;
  fullDetails?: string;
  imageUrl?: string;
  isConfirmedFact?: boolean;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'historical' | 'teachers_pupils' | 'events' | 'keleshek_2025' | 'archive';
  categoryLabel: string;
  year?: string;
  dateStr?: string;
  description: string;
  imageUrl: string;
  sourceNote?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  videoUrl: string; // YouTube URL or direct MP4/video link
  thumbnailUrl?: string;
  duration?: string;
}

export interface PersonItem {
  id: string;
  name: string;
  role: 'director' | 'veteran_teacher' | 'teacher' | 'alumnus';
  roleLabel: string;
  yearsActive: string; // e.g. "1984 - 2005 жж." or "2000 жылғы түлек"
  subjectOrProfession: string;
  bio: string;
  achievements?: string[];
  photoUrl?: string;
  isPlaceholder?: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  accessionCode: string; // e.g. "ҚҰЖ-1984/01"
  dateStr: string;
  category: string;
  description: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: 'pdf' | 'image' | 'doc';
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  capacity?: string;
  features: string[];
}

export interface ResearchProjectData {
  title: string;
  subTitle: string;
  authorName: string;
  authorGrade: string;
  supervisorName: string;
  supervisorRole: string;
  schoolName: string;
  relevance: string; // Жобаның өзектілігі
  aim: string; // Мақсаты
  objectives: string[]; // Міндеттері
  hypotheses?: string; // Болжам
  methods: string[]; // Зерттеу әдістері
  findings: string[]; // Зерттеу нәтижелері
  conclusion: string; // Қорытынды
  references: string[]; // Пайдаланылған әдебиеттер тізімі
}

export interface SiteConfig {
  schoolName: string;
  fullProjectTitle: string;
  foundedYear: number;
  keleshekYear: number;
  address: string;
  contactEmail: string;
  contactPhone: string;
  heroHeadline: string;
  heroSubheadline: string;
  welcomeMessage: string;
  heroImageUrl: string;
  keleshekImageUrl: string;
  historyArchiveImageUrl: string;
  documentsArchiveImageUrl: string;
}
