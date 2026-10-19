import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PersonItem } from '../../types';
import { OrnamentDivider, QoshqarMuiiz } from '../common/KazakhOrnament';
import { User, Award, Plus, Edit2, Trash2, X, Briefcase, GraduationCap, Sparkles, Upload } from 'lucide-react';

export const PeopleSection: React.FC = () => {
  const { people, isAdmin, addPerson, updatePerson, deletePerson } = useData();

  const [activeRole, setActiveRole] = useState<string>('all');
  const [selectedPerson, setSelectedPerson] = useState<PersonItem | null>(null);

  // Add / Edit Modal
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<PersonItem>>({
    name: '',
    role: 'teacher',
    roleLabel: 'Ұстаз',
    yearsActive: '',
    subjectOrProfession: '',
    bio: '',
    achievements: [],
    photoUrl: '',
    isPlaceholder: false,
  });
  const [achievementInput, setAchievementInput] = useState<string>('');

  const roles = [
    { id: 'all', label: 'Барлығы' },
    { id: 'director', label: 'Мектеп басшылары' },
    { id: 'veteran_teacher', label: 'Ардагер ұстаздар' },
    { id: 'teacher', label: 'Педагогтер' },
    { id: 'alumnus', label: 'Құрметті түлектер' },
  ];

  const filteredPeople = people.filter((p) => {
    if (activeRole === 'all') return true;
    return p.role === activeRole;
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      role: 'veteran_teacher',
      roleLabel: 'Ардагер ұстаз',
      yearsActive: '',
      subjectOrProfession: '',
      bio: '',
      achievements: [],
      photoUrl: '',
      isPlaceholder: false,
    });
    setAchievementInput('');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (p: PersonItem) => {
    setFormData(p);
    setAchievementInput('');
    setIsFormOpen(true);
  };

  const handleAddAchievement = () => {
    if (!achievementInput.trim()) return;
    const current = formData.achievements || [];
    setFormData({
      ...formData,
      achievements: [...current, achievementInput.trim()],
    });
    setAchievementInput('');
  };

  const handleRemoveAchievement = (index: number) => {
    const current = formData.achievements || [];
    setFormData({
      ...formData,
      achievements: current.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const roleObj = roles.find((r) => r.id === formData.role);
    const roleLabel = roleObj?.label || 'Ұстаз';

    if (formData.id) {
      updatePerson(formData.id, {
        ...formData,
        roleLabel,
      });
    } else {
      addPerson({
        name: formData.name || '',
        role: (formData.role as any) || 'teacher',
        roleLabel,
        yearsActive: formData.yearsActive || '',
        subjectOrProfession: formData.subjectOrProfession || '',
        bio: formData.bio || '',
        achievements: formData.achievements || [],
        photoUrl: formData.photoUrl || '',
        isPlaceholder: !!formData.isPlaceholder,
      });
    }
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50/30 via-white to-amber-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
            <QoshqarMuiiz className="w-4 h-4 text-amber-600" />
            <span>Педагогикалық құрам және түлектер</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Ұстаздар мен мақтаныш түлектер
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
            1984 жылдан бастап Сазды орта мектебінің білім сапасын көтерген ардагер ұстаздар мен қанат қаққан даңқты шәкірттер.
          </p>

          <div className="p-3 bg-amber-50/90 border border-amber-200/90 rounded-xl text-xs text-amber-900 max-w-xl mx-auto font-sans font-medium">
            <span>ℹ️ Мұрағаттық анықтама: Расталмаған есімдер мен деректер ойдан шығарылмаған. Қажетті мәліметтерді басқару тақтасынан еркін енгізе аласыз.</span>
          </div>
        </div>

        <OrnamentDivider className="my-8" />

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-xs">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRole(r.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeRole === r.id
                    ? 'bg-amber-100 text-amber-900'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Тұлға картасын қосу</span>
            </button>
          )}
        </div>

        {/* People Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className="rounded-2xl bg-white border border-slate-200 hover:border-amber-400 p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
            >
              {/* Admin Actions */}
              {isAdmin && (
                <div
                  className="absolute top-4 right-4 flex items-center gap-1 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleOpenEdit(person)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-amber-800 hover:bg-amber-50 border border-slate-200"
                    title="Өңдеу"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Бұл тұлға картасын өшіруді растайсыз ба?')) {
                        deletePerson(person.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 text-rose-600 hover:text-rose-800 hover:bg-rose-50 border border-slate-200"
                    title="Өшіру"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div>
                {/* Avatar / Portrait */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-amber-50 border-2 border-amber-300 shrink-0 flex items-center justify-center shadow-xs">
                    {person.photoUrl ? (
                      <img
                        src={person.photoUrl}
                        alt={person.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <User className="w-8 h-8 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-800 font-sans mb-1 font-semibold">
                      <span>{person.roleLabel}</span>
                      {person.yearsActive && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="font-mono text-slate-500">{person.yearsActive}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">{person.subjectOrProfession}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-sans">
                  {person.bio}
                </p>

                {person.achievements && person.achievements.length > 0 && (
                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <p className="text-[11px] uppercase tracking-wider text-amber-800 font-bold font-sans">
                      Еңбектері мен марапаттары:
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1 font-sans">
                      {person.achievements.slice(0, 2).map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-amber-800 font-semibold font-sans group-hover:underline">
                Толық өмірбаян мен естеліктерді көру →
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Person Modal */}
        {selectedPerson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-2xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setSelectedPerson(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                aria-label="Жабу"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-amber-50 border-2 border-amber-300 shrink-0 flex items-center justify-center shadow-sm">
                  {selectedPerson.photoUrl ? (
                    <img
                      src={selectedPerson.photoUrl}
                      alt={selectedPerson.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-amber-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-800 font-sans mb-1 font-semibold">
                    <span>{selectedPerson.roleLabel}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="font-mono text-slate-500">{selectedPerson.yearsActive}</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
                    {selectedPerson.name}
                  </h3>
                  <p className="text-sm text-slate-600 font-sans">{selectedPerson.subjectOrProfession}</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-sans">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2 font-sans">
                    Өмірбаяны мен мектеп тарихына қосқан үлесі
                  </h4>
                  <p className="leading-relaxed">{selectedPerson.bio}</p>
                </div>

                {selectedPerson.achievements && selectedPerson.achievements.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-3 font-sans">
                      Жетістіктері мен марапаттары
                    </h4>
                    <ul className="space-y-2">
                      {selectedPerson.achievements.map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                          <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-editorial text-2xl font-bold text-slate-900 mb-6">
                {formData.id ? 'Тұлға картасын өңдеу' : 'Жаңа тұлға картасын қосу'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Аты-жөні (Ф.И.О.) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Мысалы: Бақытжан Сәдуақасұлы"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Рөлі / Санаты *
                    </label>
                    <select
                      value={formData.role || 'teacher'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none text-xs"
                    >
                      <option value="director">Мектеп басшысы</option>
                      <option value="veteran_teacher">Ардагер ұстаз</option>
                      <option value="teacher">Педагог</option>
                      <option value="alumnus">Құрметті түлек</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Қызмет еткен / бітірген жылдары
                    </label>
                    <input
                      type="text"
                      value={formData.yearsActive || ''}
                      onChange={(e) => setFormData({ ...formData, yearsActive: e.target.value })}
                      placeholder="Мысалы: 1984 - 2005 жж."
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Пәні немесе мамандығы / қызметі
                  </label>
                  <input
                    type="text"
                    value={formData.subjectOrProfession || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, subjectOrProfession: e.target.value })
                    }
                    placeholder="Мысалы: Математика пәнінің мұғалімі, Жоғары санат"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Портрет фотосы (Файл немесе URL)
                  </label>

                  {formData.photoUrl && (
                    <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl mb-2">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-amber-300">
                        <img
                          src={formData.photoUrl}
                          alt="Портрет көрінісі"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-xs text-slate-600">
                        <p className="font-semibold text-slate-900">Фото таңдалды</p>
                        <p className="text-[11px] text-slate-500">Алдын ала портрет көрінісі</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, photoUrl: '' })}
                        className="p-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs px-2 flex items-center gap-1 font-medium"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Өшіру</span>
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.photoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      placeholder="https://... немесе файл таңдаңыз"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none text-xs"
                    />
                    <label className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-amber-900 rounded-lg cursor-pointer border border-amber-300 flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
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
                              setFormData({ ...formData, photoUrl: reader.result as string });
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
                    Өмірбаяны мен естеліктері
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio || ''}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Мектептегі еңбек жолы, қосқан үлесі, шәкірттер тәрбиесі..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {/* Achievements List */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Жетістіктері мен марапаттары
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={achievementInput}
                      onChange={(e) => setAchievementInput(e.target.value)}
                      placeholder="Жаңа марапат немесе жетістік енгізіңіз"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddAchievement}
                      className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-xs font-semibold border border-amber-200"
                    >
                      Қосу
                    </button>
                  </div>

                  {formData.achievements && formData.achievements.length > 0 && (
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {formData.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-700"
                        >
                          <span>{ach}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveAchievement(idx)}
                            className="text-rose-500 hover:text-rose-700 p-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
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
