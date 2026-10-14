import React from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import {
  Smile,
  BookOpen,
  Sparkles,
  Gift,
  HeartHandshake,
  ShieldCheck,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Smile,
  BookOpen,
  Sparkles,
  Gift,
  HeartHandshake,
  ShieldCheck,
};

export const WhyKasaty: React.FC = () => {
  const { config } = useStore();

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full uppercase tracking-wider">
            القيمة التي نقدمها لأطفالكم
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
            <EditableText fieldPath="whyUsTitle" value={config.whyUsTitle} as="span" />
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            <EditableText
              fieldPath="whyUsSubtitle"
              value={config.whyUsSubtitle}
              as="span"
              multiline
            />
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.whyUsItems.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <div
                key={item.id}
                className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-amber-100/60 hover:border-purple-200 hover:shadow-lg transition-all duration-300 text-right group hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center mb-5 shadow-md shadow-purple-100 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <EditableText
                  fieldPath={`whyUsItems.${index}.title`}
                  value={item.title}
                  as="h3"
                  className="text-lg font-black text-slate-900 mb-2 group-hover:text-purple-700 transition-colors"
                />
                <EditableText
                  fieldPath={`whyUsItems.${index}.description`}
                  value={item.description}
                  as="p"
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium"
                  multiline
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
