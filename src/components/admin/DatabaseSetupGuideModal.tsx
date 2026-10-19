import React from 'react';
import { X, Database, Shield, HardDrive, Key, CheckCircle, ExternalLink } from 'lucide-react';
import { QoshqarMuiiz } from '../common/KazakhOrnament';

interface DatabaseSetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatabaseSetupGuideModal: React.FC<DatabaseSetupGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-3xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative text-slate-800 font-sans">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Жабу"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl font-bold text-slate-900">
              Дерекқор және бұлттық сақтау нұсқаулығы
            </h3>
            <p className="text-xs text-slate-500 font-sans">
              Деректердің сақталуы мен бұлттық жүйеге қосылу жолы
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 font-sans">
          {/* Current Working Status */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Қазіргі сақтау жүйесі толықтай белсенді:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Барлық жасалған өзгерістер, жаңадан қосылған оқиғалар, жүктелген фотосуреттер мен құжаттар
              браузердің қауіпсіз тұрақты жадында (LocalStorage) автоматты түрде сақталады және парақшаны
              жаңартқанда немесе қайта ашқанда <strong>өшпейді</strong>.
            </p>
            <p className="text-xs text-amber-900 font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">
              💡 Кеңес: «Деректерді сақтау» бөлімінен кез келген уақытта <strong>.JSON резервтік көшірмесін</strong> жүктеп алып, сақтап қоюға болады.
            </p>
          </div>

          {/* Firebase / Cloud database setup steps */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-amber-700" />
              <span>Бұлттық Firebase / Supabase дерекқорын қосу қадамдары</span>
            </h4>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-mono font-bold">1</span>
                  <span>Firebase немесе Supabase жобасын ашу</span>
                </div>
                <p className="text-slate-600 pl-7 text-xs">
                  Google Firebase Console немесе Supabase платформасында тегін аккаунт ашып, жаңа веб-жоба жасаңыз.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-mono font-bold">2</span>
                  <span>Authentication (Аутентификация) және бірінші әкімшіні тіркеу</span>
                </div>
                <p className="text-slate-600 pl-7 text-xs">
                  «Email/Password» әдісін қосып, әкімші электрондық поштасы мен сенімді құпия сөзін белгілеңіз.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-mono font-bold">3</span>
                  <span>Firestore деректер кестелері (Collections)</span>
                </div>
                <p className="text-slate-600 pl-7 text-xs">
                  Келесі топтамаларды құрыңыз: <code className="text-amber-800 font-mono font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">timeline</code>, <code className="text-amber-800 font-mono font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">photos</code>, <code className="text-amber-800 font-mono font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">videos</code>, <code className="text-amber-800 font-mono font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">people</code>, <code className="text-amber-800 font-mono font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">documents</code>, <code className="text-amber-800 font-mono font-bold bg-amber-50 px-1 py-0.5 rounded border border-amber-200">research</code>.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs font-mono font-bold">4</span>
                  <span>Қауіпсіздік ережелері (Security Rules)</span>
                </div>
                <p className="text-slate-600 pl-7 text-xs">
                  Жалпы жұртшылыққа тек «оқу» (read) рұқсатын беріңіз, ал «жазу» (write) мен өңдеуді тек авторизацияланған әкімшілерге шектеңіз:
                  <code className="block mt-1.5 p-2 bg-amber-50 border border-amber-200 rounded-lg font-mono text-xs text-amber-950 font-semibold">
                    allow read: if true; allow write: if request.auth != null;
                  </code>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm"
            >
              Түсінікті, рақмет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
