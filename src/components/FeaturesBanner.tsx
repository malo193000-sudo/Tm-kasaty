import React from 'react';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { Camera, PenTool, BookOpen, Gift, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Camera,
  PenTool,
  BookOpen,
  Gift,
};

export const FeaturesBanner: React.FC = () => {
  const { config } = useStore();

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-100/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {config.featuresBar.map((step, index) => {
          const Icon = iconMap[step.icon] || BookOpen;
          return (
            <div
              key={step.id}
              className="flex items-start gap-4 p-3 rounded-2xl hover:bg-purple-50/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-200 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-right flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-full">
                    خطوة {index + 1}
                  </span>
                  <EditableText
                    fieldPath={`featuresBar.${index}.title`}
                    value={step.title}
                    as="h4"
                    className="font-bold text-slate-800 text-sm sm:text-base"
                  />
                </div>
                <EditableText
                  fieldPath={`featuresBar.${index}.description`}
                  value={step.description}
                  as="p"
                  className="text-xs text-slate-500 leading-relaxed font-medium"
                  multiline
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
