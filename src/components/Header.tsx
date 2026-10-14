import React, { useState } from 'react';
import { useStore, CurrencyType } from '../context/StoreContext';
import { EditableText } from './EditableText';
import { EditableImage } from './EditableImage';
import {
  ShoppingCart,
  Sliders,
  Pencil,
  Sparkles,
  Phone,
  Menu,
  X,
  BookOpen,
  FileText,
  HelpCircle,
  Heart,
  ChevronDown,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    config,
    editMode,
    setEditMode,
    currency,
    setCurrency,
    formatPrice,
    storiesCount,
    cartTotal,
    setIsCartOpen,
    setIsAdminModalOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencyOptions: { code: CurrencyType; label: string; flag: string }[] = [
    { code: 'EGP', label: 'جنيه مصري (EGP)', flag: '🇪🇬' },
    { code: 'SAR', label: 'ريال سعودي (SAR)', flag: '🇸🇦' },
    { code: 'AED', label: 'درهم إماراتي (AED)', flag: '🇦🇪' },
    { code: 'USD', label: 'دولار أمريكي (USD)', flag: '🇺🇸' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      {/* Top Announcement Bar */}
      {config.announcementActive && (
        <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-pink-600 text-white text-xs sm:text-sm py-2 px-4 font-bold text-center flex items-center justify-center gap-2 relative shadow-inner">
          <EditableText
            fieldPath="announcementText"
            value={config.announcementText}
            className="text-white drop-shadow-xs"
          />
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 text-right group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 p-1 shadow-md group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
                {config.storeLogoUrl ? (
                  <EditableImage
                    fieldPath="storeLogoUrl"
                    src={config.storeLogoUrl}
                    alt={config.storeName}
                    className="w-full h-full object-contain rounded-xl bg-white/20"
                    label="لوجو المتجر"
                  />
                ) : (
                  <BookOpen className="w-7 h-7 text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <EditableText
                    fieldPath="storeName"
                    value={config.storeName}
                    as="span"
                    className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
                  />
                  <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-ping" />
                </div>
                <EditableText
                  fieldPath="storeTagline"
                  value={config.storeTagline}
                  as="span"
                  className="text-[11px] sm:text-xs text-slate-500 font-medium hidden sm:inline-block"
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 font-bold text-slate-700 text-sm">
            <button
              onClick={() => scrollTo('hero')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollTo('products')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1 flex items-center gap-1 text-purple-700 bg-purple-50 px-3 py-1 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> قصصنا
            </button>
            <button
              onClick={() => scrollTo('why-us')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              لماذا قصتي؟
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              آراء العملاء
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              الأسئلة الشائعة
            </button>
            <button
              onClick={() => scrollTo('blog')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              المقالات
            </button>
          </nav>

          {/* Actions: Currency, Edit Mode, Admin CMS, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 bg-slate-50 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <span>{currencyOptions.find((c) => c.code === currency)?.flag}</span>
                <span className="hidden sm:inline">{currency}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute left-0 sm:right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 text-right animate-fadeIn"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 border-b border-slate-100">
                    اختر عملة العرض:
                  </div>
                  {currencyOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setCurrency(opt.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-purple-50 transition-colors cursor-pointer ${
                        currency === opt.code ? 'text-purple-700 bg-purple-50/60 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.label}</span>
                      </span>
                      {currency === opt.code && <span className="text-purple-600 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Inline Edit Toggle */}
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border ${
                editMode
                  ? 'bg-purple-600 text-white border-purple-600 ring-2 ring-purple-300 animate-pulse'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
              title="تفعيل وضع التعديل المباشر للنصوص والصور بالضغط عليها"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{editMode ? 'وضع التعديل مفعل' : 'تعديل سريع'}</span>
            </button>

            {/* Admin CMS Modal Button */}
            <button
              type="button"
              onClick={() => setIsAdminModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md shadow-amber-100 transition-all cursor-pointer"
              title="فتح لوحة التحكم الشاملة لإدارة المتجر والقصص والمقالات"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-purple-200 transition-transform active:scale-95 cursor-pointer"
              title="عرض سلة التسوق"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-bold">السلة</span>
              {storiesCount > 0 && (
                <span className="bg-white text-purple-700 text-xs font-black px-1.5 py-0.5 rounded-full shadow-xs">
                  {storiesCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-center text-sm font-bold">
            <button
              onClick={() => scrollTo('hero')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollTo('products')}
              className="p-2.5 rounded-xl bg-purple-50 text-purple-700"
            >
              قصصنا (المنتجات)
            </button>
            <button
              onClick={() => scrollTo('why-us')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700"
            >
              لماذا قصتي؟
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700"
            >
              آراء العملاء
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700"
            >
              الأسئلة الشائعة
            </button>
            <button
              onClick={() => scrollTo('blog')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700"
            >
              المقالات
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>دعم العملاء وواتساب:</span>
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-600 font-bold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> {config.whatsappNumber}
            </a>
          </div>
        </div>
      )}

      {/* Floating notice when Edit Mode is active */}
      {editMode && (
        <div className="bg-purple-900 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-3 font-semibold shadow-md border-b border-purple-700">
          <span className="flex items-center gap-1">
            <Pencil className="w-3.5 h-3.5 text-purple-300" />
            وضع التعديل السريع مُفعل: اضغط على أي نص أو صورة في الموقع لتغييرها فوراً!
          </span>
          <button
            onClick={() => setEditMode(false)}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors"
          >
            إنهاء وضع التعديل ✕
          </button>
        </div>
      )}
    </header>
  );
};
