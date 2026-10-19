import React from 'react';

export const QoshqarMuiiz: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 text-amber-600' }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} aria-hidden="true">
    <path d="M50 12 C42 12 36 18 36 26 C36 34 42 38 46 42 C40 40 30 38 22 42 C12 47 10 58 15 67 C20 76 32 78 40 72 C45 68 47 62 48 55 C48 70 52 70 52 55 C53 62 55 68 60 72 C68 78 80 76 85 67 C90 58 88 47 78 42 C70 38 60 40 54 42 C58 38 64 34 64 26 C64 18 58 12 50 12 Z M50 20 C54 20 57 23 57 26 C57 30 53 34 50 38 C47 34 43 30 43 26 C43 23 46 20 50 20 Z" />
  </svg>
);

export const OrnamentDivider: React.FC<{ title?: string; className?: string }> = ({
  title,
  className = 'my-8',
}) => (
  <div className={`flex items-center justify-center gap-4 ${className}`}>
    <div className="h-px bg-gradient-to-r from-transparent via-amber-400/60 to-amber-500 flex-1 max-w-xs" />
    <div className="flex items-center gap-2 text-amber-700 shrink-0">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
      {title && (
        <span className="text-xs uppercase tracking-widest font-sans font-bold text-amber-800 px-2">
          {title}
        </span>
      )}
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    </div>
    <div className="h-px bg-gradient-to-l from-transparent via-amber-400/60 to-amber-500 flex-1 max-w-xs" />
  </div>
);

export const CornerOrnament: React.FC<{ position?: 'tl' | 'tr' | 'bl' | 'br'; className?: string }> = ({
  position = 'tl',
  className = 'w-6 h-6 text-amber-400/40',
}) => {
  const rotation = {
    tl: '',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90',
  }[position];

  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={`absolute ${rotation} ${className}`}
      aria-hidden="true"
    >
      <path d="M0,0 L18,0 C12,4 6,10 6,18 L6,40 L0,40 Z M12,0 C12,12 28,12 28,28 L34,28 C34,8 14,8 12,0 Z" />
    </svg>
  );
};
