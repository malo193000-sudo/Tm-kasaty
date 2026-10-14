import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Review, FaqItem, Article } from '../types/store';
import {
  X,
  Sliders,
  Settings,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  HelpCircle,
  FileText,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Edit2,
  Sparkles,
} from 'lucide-react';

export const AdminCMSModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    config,
    updateField,
    updateProduct,
    addProduct,
    deleteProduct,
    updateReview,
    addReview,
    deleteReview,
    updateFaq,
    addFaq,
    deleteFaq,
    updateArticle,
    addArticle,
    deleteArticle,
    resetToDefault,
    exportBackup,
    importBackup,
    openImageEditor,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'general' | 'hero' | 'products' | 'reviews' | 'faqs' | 'articles' | 'backup'
  >('general');

  // Local editing states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [importJsonText, setImportJsonText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isAdminModalOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartAddProduct = () => {
    const newId = 'story_' + Date.now();
    const newProd: Product = {
      id: newId,
      title: 'قصة جديدة مخصصة',
      subtitle: 'مغامرة مشوقة طفلك هو بطلها الحقيقي',
      description: 'قصة رائعة مليئة بالقيم الإيجابية والألوان الخلابة.',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
      galleryImages: [],
      originalPrice: 650,
      discountPrice: 449,
      ageRange: '3 - 9 سنوات',
      genderTarget: 'both',
      pagesCount: 24,
      rating: 5,
      ratingCount: 1,
      isBestSeller: false,
      themeColor: '#7C3AED',
      samplePages: [
        {
          pageNumber: 1,
          title: 'بداية المغامرة',
          textTemplate: 'استيقظ البطل {childName} في صباح رائع...',
          image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
        },
      ],
    };
    addProduct(newProd);
    setEditingProductId(newId);
    setProductForm(newProd);
    showToast('تمت إضافة القصة الجديدة بنجاح، يمكنك الآن تعديل بياناتها');
  };

  const handleSaveProduct = (id: string) => {
    updateProduct(id, productForm);
    setEditingProductId(null);
    showToast('تم حفظ تعديلات القصة بنجاح');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const ok = importBackup(importJsonText);
    if (ok) {
      showToast('تم استيراد وتطبيق البيانات بنجاح!');
      setImportJsonText('');
    } else {
      alert('صيغة ملف JSON غير صالحة. يرجى التأكد من نسخه بشكل صحيح.');
    }
  };

  const tabs = [
    { id: 'general', label: 'المعلومات والترويسة', icon: Settings },
    { id: 'hero', label: 'البنر الرئيسي', icon: Sparkles },
    { id: 'products', label: `القصص والمنتجات (${config.products.length})`, icon: BookOpen },
    { id: 'reviews', label: `الآراء والتقييمات (${config.reviews.length})`, icon: MessageSquare },
    { id: 'faqs', label: `الأسئلة الشائعة (${config.faqs.length})`, icon: HelpCircle },
    { id: 'articles', label: `المقالات (${config.articles.length})`, icon: FileText },
    { id: 'backup', label: 'النسخ والاحتياطي', icon: Download },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden border border-purple-200 flex flex-col h-[92vh] text-right">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Sliders className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">لوحة التحكم وتعديل المحتوى (CMS)</h2>
              <p className="text-xs text-purple-200">
                تحكّم كامل في جميع صور ونصوص وأسعار ومنتجات متجر قصتي في أي وقت
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast alert */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center animate-fadeIn">
            ✓ {toastMessage}
          </div>
        )}

        {/* Main Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-l border-slate-200 p-2 sm:p-3 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1 shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setEditingProductId(null);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer text-right ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                      : 'text-slate-700 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* 1. General & Header Tab */}
            {activeTab === 'general' && (
              <div className="space-y-5 max-w-3xl">
                <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-2">
                  بيانات المتجر والترويسة
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اسم المتجر</label>
                    <input
                      type="text"
                      value={config.storeName}
                      onChange={(e) => updateField('storeName', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">شعار المتجر اللفظي (الوصف)</label>
                    <input
                      type="text"
                      value={config.storeTagline}
                      onChange={(e) => updateField('storeTagline', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Logo Image */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">شعار المتجر (اللوجو)</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <img
                      src={config.storeLogoUrl}
                      alt="Logo"
                      className="w-14 h-14 object-contain bg-purple-100 rounded-xl p-1"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={config.storeLogoUrl}
                        onChange={(e) => updateField('storeLogoUrl', e.target.value)}
                        placeholder="رابط صورة اللوجو..."
                        className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg mb-1"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => openImageEditor('storeLogoUrl', config.storeLogoUrl, 'لوجو المتجر')}
                        className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5" /> رفع صورة جديدة للوجو من الجهاز
                      </button>
                    </div>
                  </div>
                </div>

                {/* Announcement Bar */}
                <div className="space-y-2 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-purple-900">
                      شريط الإعلانات العلوي
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={config.announcementActive}
                        onChange={(e) => updateField('announcementActive', e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      تفعيل الشريط
                    </label>
                  </div>
                  <input
                    type="text"
                    value={config.announcementText}
                    onChange={(e) => updateField('announcementText', e.target.value)}
                    className="w-full p-2.5 bg-white border border-purple-200 rounded-xl text-xs font-bold text-slate-800"
                  />
                </div>

                {/* Contact and WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم واتساب لاستقبال الطلبات
                    </label>
                    <input
                      type="text"
                      value={config.whatsappNumber}
                      onChange={(e) => updateField('whatsappNumber', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      بريد الدعم الفني
                    </label>
                    <input
                      type="email"
                      value={config.supportEmail}
                      onChange={(e) => updateField('supportEmail', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Promo Code Settings */}
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200 space-y-3">
                  <span className="text-xs font-bold text-amber-900 block">
                    كوبون الخصم الترويجي (STORY10)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">كود الكوبون</label>
                      <input
                        type="text"
                        value={config.promoBanner.code}
                        onChange={(e) => updateField('promoBanner.code', e.target.value)}
                        className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-black uppercase text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">نسبة الخصم %</label>
                      <input
                        type="number"
                        value={config.promoBanner.discountPercent}
                        onChange={(e) => updateField('promoBanner.discountPercent', Number(e.target.value))}
                        className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-black text-center"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">عنوان العرض</label>
                      <input
                        type="text"
                        value={config.promoBanner.title}
                        onChange={(e) => updateField('promoBanner.title', e.target.value)}
                        className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Hero Tab */}
            {activeTab === 'hero' && (
              <div className="space-y-5 max-w-3xl">
                <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-2">
                  تعديل البنر الرئيسي (Hero Section)
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الشارة العلوية (Badge)</label>
                  <input
                    type="text"
                    value={config.heroBadge}
                    onChange={(e) => updateField('heroBadge', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الرئيسي</label>
                    <input
                      type="text"
                      value={config.heroTitle}
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الكلمات الملونة البارزة</label>
                    <input
                      type="text"
                      value={config.heroHighlight}
                      onChange={(e) => updateField('heroHighlight', e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-purple-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الوصف الفرعي (Subtitle)</label>
                  <textarea
                    rows={3}
                    value={config.heroSubtitle}
                    onChange={(e) => updateField('heroSubtitle', e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium leading-relaxed"
                  />
                </div>

                {/* Hero Image */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">صورة البنر الرئيسي</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <img
                      src={config.heroImage}
                      alt="Hero"
                      className="w-20 h-20 object-cover rounded-xl border border-slate-300"
                    />
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={config.heroImage}
                        onChange={(e) => updateField('heroImage', e.target.value)}
                        className="w-full p-2 text-xs bg-white border border-slate-300 rounded-lg"
                        dir="ltr"
                      />
                      <button
                        type="button"
                        onClick={() => openImageEditor('heroImage', config.heroImage, 'صورة البنر الرئيسية')}
                        className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5" /> رفع صورة جديدة من جهازك
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hero Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">الإحصائية 1 (التقييم)</label>
                    <input
                      type="text"
                      value={config.heroStat1Number}
                      onChange={(e) => updateField('heroStat1Number', e.target.value)}
                      className="w-full p-1.5 text-xs font-black bg-white border rounded mb-1"
                    />
                    <input
                      type="text"
                      value={config.heroStat1Label}
                      onChange={(e) => updateField('heroStat1Label', e.target.value)}
                      className="w-full p-1.5 text-xs bg-white border rounded"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">الإحصائية 2 (العائلات)</label>
                    <input
                      type="text"
                      value={config.heroStat2Number}
                      onChange={(e) => updateField('heroStat2Number', e.target.value)}
                      className="w-full p-1.5 text-xs font-black bg-white border rounded mb-1"
                    />
                    <input
                      type="text"
                      value={config.heroStat2Label}
                      onChange={(e) => updateField('heroStat2Label', e.target.value)}
                      className="w-full p-1.5 text-xs bg-white border rounded"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">الإحصائية 3 (الجودة)</label>
                    <input
                      type="text"
                      value={config.heroStat3Number}
                      onChange={(e) => updateField('heroStat3Number', e.target.value)}
                      className="w-full p-1.5 text-xs font-black bg-white border rounded mb-1"
                    />
                    <input
                      type="text"
                      value={config.heroStat3Label}
                      onChange={(e) => updateField('heroStat3Label', e.target.value)}
                      className="w-full p-1.5 text-xs bg-white border rounded"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Products / Stories CMS Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">إدارة القصص والكتب المخصصة</h3>
                    <p className="text-xs text-slate-500">
                      يمكنك تعديل الأسعار، الصور، النصوص، أو إضافة وحذف أي قصة
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartAddProduct}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> إضافة قصة جديدة
                  </button>
                </div>

                {/* List of Products */}
                <div className="grid grid-cols-1 gap-4">
                  {config.products.map((prod, pIdx) => {
                    const isEditingThis = editingProductId === prod.id;
                    return (
                      <div
                        key={prod.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isEditingThis
                            ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-200'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        {isEditingThis ? (
                          /* Edit Form */
                          <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-purple-200">
                              <span className="text-xs font-black text-purple-900">
                                تعديل بيانات القصة
                              </span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleSaveProduct(prod.id)}
                                  className="flex items-center gap-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" /> حفظ التعديلات
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingProductId(null)}
                                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
                                >
                                  إلغاء
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                  عنوان القصة
                                </label>
                                <input
                                  type="text"
                                  value={productForm.title ?? prod.title}
                                  onChange={(e) =>
                                    setProductForm({ ...productForm, title: e.target.value })
                                  }
                                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                  الفئة العمرية
                                </label>
                                <input
                                  type="text"
                                  value={productForm.ageRange ?? prod.ageRange}
                                  onChange={(e) =>
                                    setProductForm({ ...productForm, ageRange: e.target.value })
                                  }
                                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                  السعر الأصلي (ج.م)
                                </label>
                                <input
                                  type="number"
                                  value={productForm.originalPrice ?? prod.originalPrice}
                                  onChange={(e) =>
                                    setProductForm({
                                      ...productForm,
                                      originalPrice: Number(e.target.value),
                                    })
                                  }
                                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                  السعر بعد الخصم (ج.م)
                                </label>
                                <input
                                  type="number"
                                  value={productForm.discountPrice ?? prod.discountPrice}
                                  onChange={(e) =>
                                    setProductForm({
                                      ...productForm,
                                      discountPrice: Number(e.target.value),
                                    })
                                  }
                                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-purple-700"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                  الجنس المخصص
                                </label>
                                <select
                                  value={productForm.genderTarget ?? prod.genderTarget}
                                  onChange={(e) =>
                                    setProductForm({
                                      ...productForm,
                                      genderTarget: e.target.value as any,
                                    })
                                  }
                                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                                >
                                  <option value="both">للأولاد والبنات 👦👧</option>
                                  <option value="boys">للأولاد فقط 👦</option>
                                  <option value="girls">للبنات فقط 👧</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                الوصف المختصر
                              </label>
                              <input
                                type="text"
                                value={productForm.subtitle ?? prod.subtitle}
                                onChange={(e) =>
                                  setProductForm({ ...productForm, subtitle: e.target.value })
                                }
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                الوصف الكامل للقصة
                              </label>
                              <textarea
                                rows={2}
                                value={productForm.description ?? prod.description}
                                onChange={(e) =>
                                  setProductForm({ ...productForm, description: e.target.value })
                                }
                                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                              />
                            </div>

                            {/* Cover Image */}
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                صورة الغلاف
                              </label>
                              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                                <img
                                  src={productForm.coverImage ?? prod.coverImage}
                                  alt=""
                                  className="w-14 h-14 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <input
                                    type="text"
                                    value={productForm.coverImage ?? prod.coverImage}
                                    onChange={(e) =>
                                      setProductForm({ ...productForm, coverImage: e.target.value })
                                    }
                                    className="w-full p-1.5 text-xs border rounded mb-1"
                                    dir="ltr"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      openImageEditor(
                                        `products.${pIdx}.coverImage`,
                                        prod.coverImage,
                                        `غلاف ${prod.title}`
                                      )
                                    }
                                    className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    <ImageIcon className="w-3.5 h-3.5" /> رفع صورة جديدة من جهازك
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Summary Row */
                          <div className="flex items-center gap-4">
                            <img
                              src={prod.coverImage}
                              alt={prod.title}
                              className="w-16 h-20 object-cover rounded-xl border border-slate-200 shrink-0"
                            />
                            <div className="flex-1 text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-black text-slate-900 text-sm">{prod.title}</h4>
                                {prod.isBestSeller && (
                                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                    الأكثر مبيعاً ⭐
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1 mb-1">
                                {prod.subtitle}
                              </p>
                              <div className="flex items-center gap-3 text-xs font-bold">
                                <span className="text-purple-700">{prod.discountPrice} ج.م</span>
                                <span className="text-slate-400 line-through">
                                  {prod.originalPrice} ج.م
                                </span>
                                <span className="text-slate-500 text-[11px]">{prod.ageRange}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProductId(prod.id);
                                  setProductForm(prod);
                                }}
                                className="p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors cursor-pointer"
                                title="تعديل القصة"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`هل أنت متأكد من حذف قصة "${prod.title}"؟`)) {
                                    deleteProduct(prod.id);
                                    showToast('تم حذف القصة');
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                                title="حذف القصة"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-base font-black text-slate-900">إدارة آراء وتقييمات العملاء</h3>
                  <button
                    type="button"
                    onClick={() => {
                      addReview({
                        id: 'rev_' + Date.now(),
                        author: 'أمير م.',
                        isVerified: true,
                        rating: 5,
                        title: 'تجربة رائعة',
                        comment: 'أولادي انبهروا جداً بالقصة وجودة الطباعة ممتازة!',
                        date: 'الآن',
                      });
                      showToast('تمت إضافة رأي جديد');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> إضافة رأي جديد
                  </button>
                </div>

                <div className="space-y-3">
                  {config.reviews.map((rev, idx) => (
                    <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={rev.author}
                          onChange={(e) => updateReview(rev.id, { author: e.target.value })}
                          className="font-bold text-xs bg-white p-1.5 rounded border"
                        />
                        <button
                          type="button"
                          onClick={() => deleteReview(rev.id)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={rev.title}
                        onChange={(e) => updateReview(rev.id, { title: e.target.value })}
                        className="w-full text-xs font-bold bg-white p-1.5 rounded border"
                        placeholder="عنوان التقييم..."
                      />
                      <textarea
                        rows={2}
                        value={rev.comment}
                        onChange={(e) => updateReview(rev.id, { comment: e.target.value })}
                        className="w-full text-xs bg-white p-1.5 rounded border"
                        placeholder="نص التقييم..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. FAQs Tab */}
            {activeTab === 'faqs' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-base font-black text-slate-900">إدارة الأسئلة الشائعة</h3>
                  <button
                    type="button"
                    onClick={() => {
                      addFaq({
                        id: 'faq_' + Date.now(),
                        question: 'سؤال جديد يهم العملاء؟',
                        answer: 'إجابة مفصلة وواضحة توضح للعميل التفاصيل والضمانات.',
                      });
                      showToast('تمت إضافة سؤال جديد');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> إضافة سؤال جديد
                  </button>
                </div>

                <div className="space-y-3">
                  {config.faqs.map((faq) => (
                    <div key={faq.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                          className="w-full font-bold text-xs bg-white p-2 rounded border mr-2"
                        />
                        <button
                          type="button"
                          onClick={() => deleteFaq(faq.id)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                        className="w-full text-xs bg-white p-2 rounded border"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Articles Tab */}
            {activeTab === 'articles' && (
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="text-base font-black text-slate-900">إدارة مقالات المدونة والنصائح</h3>
                  <button
                    type="button"
                    onClick={() => {
                      addArticle({
                        id: 'art_' + Date.now(),
                        title: 'مقال جديد عن تنمية مهارات الطفل',
                        excerpt: 'ملخص مشوق للمقال يظهر في الصفحة الرئيسية...',
                        content: 'محتوى المقال الكامل بالتفصيل والنصائح والإرشادات التربوية.',
                        readTime: '3 دقائق',
                        date: 'اليوم',
                        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
                        category: 'تربية وتعليم',
                      });
                      showToast('تمت إضافة مقال جديد');
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> إضافة مقال جديد
                  </button>
                </div>

                <div className="space-y-4">
                  {config.articles.map((art, idx) => (
                    <div key={art.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <img src={art.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={art.title}
                            onChange={(e) => updateArticle(art.id, { title: e.target.value })}
                            className="w-full text-xs font-black bg-white p-2 rounded-lg border"
                          />
                          <input
                            type="text"
                            value={art.image}
                            onChange={(e) => updateArticle(art.id, { image: e.target.value })}
                            className="w-full text-xs bg-white p-1.5 rounded-lg border"
                            placeholder="رابط الصورة..."
                            dir="ltr"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => deleteArticle(art.id)}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={art.content}
                        onChange={(e) => updateArticle(art.id, { content: e.target.value })}
                        className="w-full text-xs bg-white p-2 rounded-lg border"
                        placeholder="المحتوى الكامل للمقال..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Backup & Reset Tab */}
            {activeTab === 'backup' && (
              <div className="space-y-6 max-w-2xl">
                <h3 className="text-base font-black text-slate-900 border-b border-slate-200 pb-2">
                  النسخ الاحتياطي، التصدير والاستعادة
                </h3>

                {/* Export Backup */}
                <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200 space-y-2">
                  <h4 className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-purple-600" /> تصدير نسخة احتياطية من المتجر
                  </h4>
                  <p className="text-xs text-slate-600">
                    يمكنك تحميل ملف JSON يحتوي على كامل نصوصك وصورك ومنتجاتك لحفظها أو نقلها.
                  </p>
                  <button
                    type="button"
                    onClick={exportBackup}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
                  >
                    تحميل ملف النسخة الاحتياطية (Download JSON)
                  </button>
                </div>

                {/* Import Backup */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-slate-700" /> استيراد واستعادة نسخة سابقة
                  </h4>
                  <textarea
                    rows={4}
                    placeholder="الصق نص ملف JSON للنسخة الاحتياطية هنا..."
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={handleImport}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
                  >
                    تطبيق النسخة الاحتياطية
                  </button>
                </div>

                {/* Reset to Default */}
                <div className="bg-red-50/60 p-4 rounded-2xl border border-red-200 space-y-2">
                  <h4 className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-red-600" /> استعادة الضبط الافتراضي لموقع قصتي
                  </h4>
                  <p className="text-xs text-slate-600">
                    إعادة جميع النصوص والصور والأسعار الأصلية المطابقة لموقع kasaty.store الأصلي.
                  </p>
                  <button
                    type="button"
                    onClick={resetToDefault}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-colors"
                  >
                    استعادة الضبط الافتراضي الأصلي
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium hidden sm:inline">
            ✨ جميع التغييرات تُحفظ تلقائياً في المتصفح وتظهر على الفور
          </span>
          <button
            type="button"
            onClick={() => setIsAdminModalOpen(false)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow cursor-pointer transition-colors mr-auto"
          >
            إغلاق لوحة التحكم
          </button>
        </div>
      </div>
    </div>
  );
};
