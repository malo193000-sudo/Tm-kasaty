import React from 'react';
import { useStore } from '../context/StoreContext';
import { Camera } from 'lucide-react';

interface EditableImageProps {
  fieldPath: string;
  src: string;
  alt: string;
  className?: string;
  label?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  fieldPath,
  src,
  alt,
  className = '',
  label,
}) => {
  const { editMode, openImageEditor } = useStore();

  if (!editMode) {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        openImageEditor(fieldPath, src, label || alt);
      }}
      className={`relative group cursor-pointer overflow-hidden border-2 border-dashed border-purple-500/80 rounded-xl transition-all hover:scale-[1.01]`}
      title="اضغط لتغيير الصورة"
    >
      <img src={src} alt={alt} className={`${className} transition-opacity group-hover:opacity-80`} />
      <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
        <div className="bg-purple-600/95 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg text-xs font-bold transform -translate-y-1 group-hover:translate-y-0 transition-transform">
          <Camera className="w-4 h-4" />
          تغيير الصورة
        </div>
        {label && <span className="text-[11px] mt-1 text-purple-100 line-clamp-1">{label}</span>}
      </div>
    </div>
  );
};
