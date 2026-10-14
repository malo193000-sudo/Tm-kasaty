import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, Search, PlusCircle } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { config, editMode, setIsAdminModalOpen } = useStore();
  const [filter, setFilter] = useState<'all' | 'boys' | 'girls' | 'bestseller'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = config.products.filter((p) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'boys' && (p.genderTarget === 'boys' || p.genderTarget === 'both')) ||
      (filter === 'girls' && (p.genderTarget === 'girls' || p.genderTarget === 'both')) ||
      (filter === 'bestseller' && p.isBestSeller);

    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> قصصنا الأكثر طلباً
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            اختر القصة المفضلة لطفلك
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-medium">
            كل قصة مكتوبة بعناية لتناسب عمر طفلك، مع دمج اسمه وصورته بأسلوب سحري وممتع
          </p>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Gender / Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs w-full sm:w-auto justify-center">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              جميع القصص ({config.products.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('bestseller')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'bestseller'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الأكثر مبيعاً ⭐
            </button>
            <button
              type="button"
              onClick={() => setFilter('boys')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'boys'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              للأولاد 👦
            </button>
            <button
              type="button"
              onClick={() => setFilter('girls')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                filter === 'girls'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              للبنات 👧
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث عن قصة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const originalIndex = config.products.findIndex((p) => p.id === product.id);
              return <ProductCard key={product.id} product={product} index={originalIndex} />;
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 font-bold mb-3">لم يتم العثور على أي قصة مطابقة للبحث</p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="text-purple-600 font-bold text-sm underline cursor-pointer"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}

        {/* Add Product Button if in edit mode */}
        {editMode && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 border-2 border-dashed border-purple-400 rounded-2xl text-purple-700 font-bold text-sm hover:bg-purple-100 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              إضافة قصة جديدة إلى المتجر
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
