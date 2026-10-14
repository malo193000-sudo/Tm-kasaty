import React from 'react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import { Star, Wand2, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { formatPrice, openCustomizer, openBookPreview } = useStore();

  const discountPercentage = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Cover Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <EditableImage
          fieldPath={`products.${index}.coverImage`}
          src={product.coverImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          label={`غلاف ${product.title}`}
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> الأكثر مبيعاً
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-xs text-purple-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            {product.genderTarget === 'girls'
              ? 'مخصص للبنات 👧'
              : product.genderTarget === 'boys'
              ? 'مخصص للأولاد 👦'
              : 'متوفر للأولاد والبنات 👦👧'}
          </span>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md">
            خصم {discountPercentage}%
          </div>
        )}

        {/* Quick preview hover button */}
        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => openBookPreview(product)}
            className="px-4 py-2 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-purple-600" /> تصفح صفحات من القصة
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col text-right">
        {/* Rating & Ages */}
        <div className="flex items-center justify-between mb-2 text-xs">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-slate-500 text-[11px]">({product.ratingCount})</span>
          </div>
          <span className="text-slate-500 font-medium text-[11px] bg-slate-100 px-2 py-0.5 rounded-md">
            {product.ageRange}
          </span>
        </div>

        {/* Title */}
        <EditableText
          fieldPath={`products.${index}.title`}
          value={product.title}
          as="h3"
          className="text-lg font-black text-slate-900 mb-1 group-hover:text-purple-700 transition-colors"
        />

        {/* Subtitle / Excerpt */}
        <EditableText
          fieldPath={`products.${index}.subtitle`}
          value={product.subtitle}
          as="p"
          className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1"
          multiline
        />

        {/* Price Row */}
        <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-purple-700">
              {formatPrice(product.discountPrice)}
            </span>
            {product.originalPrice > product.discountPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold">
            + تغليف هدية مجاني 🎁
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => openCustomizer(product)}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm shadow-md shadow-purple-100 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <Wand2 className="w-4 h-4 text-amber-300" />
          خصص القصة لطفلك الآن
        </button>
      </div>
    </div>
  );
};
