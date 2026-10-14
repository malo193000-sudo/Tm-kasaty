import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTextProps {
  fieldPath?: string;
  value: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
  onCustomSave?: (newVal: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({
  fieldPath,
  value,
  className = '',
  as: Component = 'span',
  multiline = false,
  onCustomSave,
}) => {
  const { editMode, updateField } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  // Keep draft in sync if value changes externally
  React.useEffect(() => {
    setDraft(value);
  }, [value]);

  if (!editMode) {
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = () => {
    if (onCustomSave) {
      onCustomSave(draft);
    } else if (fieldPath) {
      updateField(fieldPath, draft);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative inline-block w-full my-1 z-30">
        {multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="w-full p-2.5 text-sm rounded-lg border-2 border-purple-500 bg-white text-slate-900 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full p-2 text-sm rounded-lg border-2 border-purple-500 bg-white text-slate-900 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
        )}
        <div className="flex items-center gap-1.5 mt-1.5 justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold shadow transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" /> حفظ
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-xs font-semibold shadow transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" /> إلغاء
          </button>
        </div>
      </div>
    );
  }

  return (
    <Component
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`relative group cursor-pointer border border-dashed border-purple-400/60 rounded px-1 -mx-1 hover:bg-purple-50/70 transition-colors ${className}`}
      title="اضغط للتعديل المباشر"
    >
      {value}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 -left-3 bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded shadow flex items-center gap-0.5 z-20 pointer-events-none">
        <Pencil className="w-2.5 h-2.5" /> تعديل
      </span>
    </Component>
  );
};
