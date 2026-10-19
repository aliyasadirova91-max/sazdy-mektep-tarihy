import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';
import { QoshqarMuiiz } from '../common/KazakhOrnament';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = useData();
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Құпия сөзді енгізіңіз');
      return;
    }

    const success = loginAdmin(passcode);
    if (success) {
      setPasscode('');
      setErrorMsg('');
      onSuccess();
      onClose();
    } else {
      setErrorMsg('Құпия сөз қате. Әдепкі құпия сөз: admin1984');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white border-2 border-amber-300 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Жабу"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-center mx-auto text-amber-700 shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-editorial text-2xl font-bold text-slate-900">
            Әкімші тақтасына кіру
          </h3>
          <p className="text-xs text-slate-600 font-sans">
            Сайт мазмұнын өңдеу және жариялау үшін құпия сөзді енгізіңіз
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 font-sans">
              Әкімші құпия сөзі (Пароль)
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Құпия сөзді жазыңыз"
                className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-slate-900 pr-10 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-600 mt-1.5 font-medium">{errorMsg}</p>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-700 space-y-1 font-sans">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>Әдепкі кіру дерегі:</span>
            </div>
            <p>Бастапқы құпия сөз: <code className="text-amber-900 font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded">admin1984</code></p>
            <p className="text-slate-500 text-[11px]">(Кіргеннен кейін баптаулар бөлімінен өзгерте аласыз)</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Тақтаға кіру</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
