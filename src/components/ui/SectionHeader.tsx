import React, { ReactNode } from 'react';

export function SectionHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
      <div className="p-2 bg-white/5 rounded-lg border border-white/10 shadow-inner">
        {icon}
      </div>
      {title}
    </h2>
  );
}
