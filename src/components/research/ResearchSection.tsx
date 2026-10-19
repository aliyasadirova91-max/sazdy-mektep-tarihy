import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ResearchProjectData } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { BookOpen, Target, CheckSquare, Compass, Award, FileText, Printer, Edit2, X, Plus, Trash2 } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const { research, isAdmin, updateResearch } = useData();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<ResearchProjectData>({ ...research });

  const handleOpenEdit = () => {
    setFormData({ ...research });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateResearch(formData);
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50/40 via-white to-slate-50 relative print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold print:hidden">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Ғылыми-ізденіс жобасы</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight print:text-black">
            «Сазды орта мектебінің тарихы»
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed print:text-gray-700">
            {research.subTitle}
          </p>
        </div>

        <OrnamentDivider className="my-8 print:hidden" />

        {/* Action bar (Print & Admin edit) */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Ғылыми жоба төлқұжаты және бөлімдері</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
            >
              <Printer className="w-4 h-4 text-amber-600" />
              <span>Басып шығару / PDF</span>
            </button>

            {isAdmin && (
              <button
                onClick={handleOpenEdit}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Edit2 className="w-4 h-4" />
                <span>Жобаны өңдеу</span>
              </button>
            )}
          </div>
        </div>

        {/* Research Passport / Header Card */}
        <div className="rounded-2xl bg-white border-2 border-amber-300/80 p-6 sm:p-8 mb-8 shadow-md print:border-gray-300 print:bg-white print:p-4">
          <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-amber-200 print:text-black">
            Жоба паспорты мен орындаушылар құрамы
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-sans">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-xs block mb-0.5">Білім беру ұйымы:</span>
              <span className="text-slate-900 font-bold print:text-black">{research.schoolName}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80">
              <span className="text-amber-800 text-xs block mb-0.5 font-semibold">Зерттеу тақырыбы:</span>
              <span className="text-slate-900 font-bold print:text-black">{research.title}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-xs block mb-0.5">Зерттеуші оқушы:</span>
              <span className="text-slate-900 font-semibold print:text-black">{research.authorName} ({research.authorGrade})</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-xs block mb-0.5">Ғылыми жетекші:</span>
              <span className="text-slate-900 font-semibold print:text-black">{research.supervisorName} ({research.supervisorRole})</span>
            </div>
          </div>
        </div>

        {/* Main Content Modules */}
        <div className="space-y-6 text-slate-800 font-sans">
          {/* 1. Өзектілігі */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm print:bg-transparent print:border-gray-200">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Compass className="w-4 h-4 text-amber-700 shrink-0" />
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 print:text-black">
                1. Зерттеу жұмысының өзектілігі
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 font-sans print:text-black">
              {research.relevance}
            </p>
          </div>

          {/* 2. Мақсаты мен Міндеттері */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm print:bg-transparent print:border-gray-200">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-700 shrink-0" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-slate-900 print:text-black">
                  2. Зерттеудің мақсаты
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 font-sans print:text-black">
                {research.aim}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm print:bg-transparent print:border-gray-200">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4 text-amber-700 shrink-0" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-slate-900 print:text-black">
                  3. Зерттеудің міндеттері
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-sans">
                {research.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-mono text-amber-800 font-bold shrink-0">{i + 1}.</span>
                    <span className="print:text-black">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Зерттеу әдістері */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm print:bg-transparent print:border-gray-200">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-700 shrink-0" />
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 print:text-black">
                4. Зерттеу әдістері мен тәсілдері
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {research.methods.map((method, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 print:bg-white print:text-black print:border-gray-200 flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                  <span>{method}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Зерттеу нәтижелері */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm print:bg-transparent print:border-gray-200">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Award className="w-4 h-4 text-emerald-700 shrink-0" />
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 print:text-black">
                5. Зерттеудің негізгі ғылыми нәтижелері
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-sans">
              {research.findings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-slate-50/70 rounded-xl border border-slate-200/70">
                  <span className="font-mono font-bold text-emerald-700 shrink-0 mt-0.5">
                    [0{idx + 1}]
                  </span>
                  <span className="print:text-black leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Қорытынды */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50/70 to-white border-2 border-amber-300 shadow-sm print:bg-transparent print:border-gray-200">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-800 shrink-0" />
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 print:text-black">
                6. Қорытынды тұжырым
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-800 font-sans print:text-black">
              {research.conclusion}
            </p>
          </div>

          {/* 6. Пайдаланылған әдебиеттер */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm print:bg-transparent print:border-gray-200">
            <h3 className="font-editorial text-xl font-bold text-slate-900 mb-4 print:text-black">
              7. Пайдаланылған әдебиеттер мен мұрағаттық дереккөздер тізімі
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 font-sans print:text-black">
              {research.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed p-1.5 rounded hover:bg-slate-50">
                  {ref}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-3xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                Ғылыми-зерттеу жобасының мәліметтерін өңдеу
              </h3>

              <form onSubmit={handleSave} className="space-y-4 text-sm font-sans">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Жоба авторы (Оқушы)
                    </label>
                    <input
                      type="text"
                      value={formData.authorName}
                      onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Сыныбы
                    </label>
                    <input
                      type="text"
                      value={formData.authorGrade}
                      onChange={(e) => setFormData({ ...formData, authorGrade: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ғылыми жетекшісі
                    </label>
                    <input
                      type="text"
                      value={formData.supervisorName}
                      onChange={(e) => setFormData({ ...formData, supervisorName: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Жетекші қызметі мен пәні
                    </label>
                    <input
                      type="text"
                      value={formData.supervisorRole}
                      onChange={(e) => setFormData({ ...formData, supervisorRole: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Зерттеудің өзектілігі
                  </label>
                  <textarea
                    rows={4}
                    value={formData.relevance}
                    onChange={(e) => setFormData({ ...formData, relevance: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Зерттеудің мақсаты
                  </label>
                  <textarea
                    rows={3}
                    value={formData.aim}
                    onChange={(e) => setFormData({ ...formData, aim: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Қорытынды тұжырым
                  </label>
                  <textarea
                    rows={4}
                    value={formData.conclusion}
                    onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Бас тарту
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm"
                  >
                    Сақтау
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
