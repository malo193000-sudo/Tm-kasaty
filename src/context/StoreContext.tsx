import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreConfig, Product, CartItem, Review, FaqItem, Article } from '../types/store';
import { initialStoreConfig } from '../data/initialData';

export type CurrencyType = 'EGP' | 'SAR' | 'AED' | 'USD';

interface CurrencyRate {
  rate: number;
  symbol: string;
  name: string;
}

const CURRENCIES: Record<CurrencyType, CurrencyRate> = {
  EGP: { rate: 1, symbol: 'ج.م', name: 'جنيه مصري' },
  SAR: { rate: 0.076, symbol: 'ر.س', name: 'ريال سعودي' },
  AED: { rate: 0.074, symbol: 'د.إ', name: 'درهم إماراتي' },
  USD: { rate: 0.020, symbol: '$', name: 'دولار أمريكي' },
};

interface ImageEditorTarget {
  path: string;
  currentUrl: string;
  label?: string;
}

interface StoreContextType {
  config: StoreConfig;
  editMode: boolean;
  setEditMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (egpPrice: number) => string;
  convertPrice: (egpPrice: number) => number;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  discountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  storiesCount: number;
  freeShippingQualified: boolean;

  // Customizer & modals
  customizingProduct: Product | null;
  openCustomizer: (product: Product) => void;
  closeCustomizer: () => void;

  previewingProduct: Product | null;
  previewChildName: string;
  previewChildPhoto: string;
  openBookPreview: (product: Product, childName?: string, photo?: string) => void;
  closeBookPreview: () => void;

  readingArticle: Article | null;
  openArticle: (article: Article) => void;
  closeArticle: () => void;

  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;

  editingImageTarget: ImageEditorTarget | null;
  openImageEditor: (path: string, currentUrl: string, label?: string) => void;
  closeImageEditor: () => void;
  updateImageAtPath: (path: string, newUrl: string) => void;

  // CMS functions
  updateField: (path: string, value: any) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;
  updateReview: (id: string, updated: Partial<Review>) => void;
  addReview: (newReview: Review) => void;
  deleteReview: (id: string) => void;
  updateFaq: (id: string, updated: Partial<FaqItem>) => void;
  addFaq: (newFaq: FaqItem) => void;
  deleteFaq: (id: string) => void;
  updateArticle: (id: string, updated: Partial<Article>) => void;
  addArticle: (newArticle: Article) => void;
  deleteArticle: (id: string) => void;
  resetToDefault: () => void;
  exportBackup: () => void;
  importBackup: (jsonString: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEY = 'kasaty_store_config_v1';
const CART_STORAGE_KEY = 'kasaty_cart_items_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...initialStoreConfig, ...parsed };
      }
    } catch (e) {
      console.error('Error loading config from localStorage', e);
    }
    return initialStoreConfig;
  });

  const [editMode, setEditMode] = useState<boolean>(false);
  const [currency, setCurrency] = useState<CurrencyType>('EGP');

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Error loading cart', e);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [previewingProduct, setPreviewingProduct] = useState<Product | null>(null);
  const [previewChildName, setPreviewChildName] = useState<string>('آدم');
  const [previewChildPhoto, setPreviewChildPhoto] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingImageTarget, setEditingImageTarget] = useState<ImageEditorTarget | null>(null);

  // Save config on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Error saving config', e);
    }
  }, [config]);

  // Save cart on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cartItems]);

  const convertPrice = (egpPrice: number): number => {
    const rateInfo = CURRENCIES[currency] || CURRENCIES.EGP;
    return Math.round(egpPrice * rateInfo.rate * 100) / 100;
  };

  const formatPrice = (egpPrice: number): string => {
    const rateInfo = CURRENCIES[currency] || CURRENCIES.EGP;
    const converted = convertPrice(egpPrice);
    if (currency === 'USD') {
      return `$${converted.toFixed(2)}`;
    }
    return `${converted.toLocaleString('ar-EG')} ${rateInfo.symbol}`;
  };

  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const newItem: CartItem = {
      ...item,
      cartItemId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    };
    setCartItems((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === config.promoBanner.code.toUpperCase()) {
      setAppliedCoupon(clean);
      setDiscountPercent(config.promoBanner.discountPercent || 10);
      return { success: true, message: `تم تفعيل كود الخصم (${config.promoBanner.discountPercent}%) بنجاح!` };
    }
    return { success: false, message: 'كود الخصم غير صالح أو منتهي الصلاحية' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  const storiesCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, curr) => acc + curr.pricePerUnit * curr.quantity, 0);
  const cartDiscount = Math.round((cartSubtotal * discountPercent) / 100);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  // Free shipping if 3 or more stories are ordered
  const freeShippingQualified = storiesCount >= 3;

  const openCustomizer = (product: Product) => {
    setCustomizingProduct(product);
  };

  const closeCustomizer = () => {
    setCustomizingProduct(null);
  };

  const openBookPreview = (product: Product, childName: string = 'آدم', photo: string = '') => {
    setPreviewingProduct(product);
    setPreviewChildName(childName || 'آدم');
    setPreviewChildPhoto(photo || '');
  };

  const closeBookPreview = () => {
    setPreviewingProduct(null);
  };

  const openArticle = (article: Article) => {
    setReadingArticle(article);
  };

  const closeArticle = () => {
    setReadingArticle(null);
  };

  const openImageEditor = (path: string, currentUrl: string, label?: string) => {
    setEditingImageTarget({ path, currentUrl, label });
  };

  const closeImageEditor = () => {
    setEditingImageTarget(null);
  };

  const updateImageAtPath = (path: string, newUrl: string) => {
    updateField(path, newUrl);
    closeImageEditor();
  };

  // Helper to update deep path (e.g. 'heroTitle' or 'promoBanner.title' or 'products.0.title')
  const updateField = (path: string, value: any) => {
    setConfig((prev) => {
      const clone = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = clone;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (current[part] === undefined) {
          current[part] = {};
        }
        current = current[part];
      }
      current[parts[parts.length - 1]] = value;
      return clone;
    });
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setConfig((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const addProduct = (newProduct: Product) => {
    setConfig((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));
  };

  const deleteProduct = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const updateReview = (id: string, updated: Partial<Review>) => {
    setConfig((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, ...updated } : r)),
    }));
  };

  const addReview = (newReview: Review) => {
    setConfig((prev) => ({
      ...prev,
      reviews: [newReview, ...prev.reviews],
    }));
  };

  const deleteReview = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id),
    }));
  };

  const updateFaq = (id: string, updated: Partial<FaqItem>) => {
    setConfig((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };

  const addFaq = (newFaq: FaqItem) => {
    setConfig((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFaq],
    }));
  };

  const deleteFaq = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setConfig((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === id ? { ...a, ...updated } : a)),
    }));
  };

  const addArticle = (newArticle: Article) => {
    setConfig((prev) => ({
      ...prev,
      articles: [newArticle, ...prev.articles],
    }));
  };

  const deleteArticle = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id),
    }));
  };

  const resetToDefault = () => {
    if (window.confirm('هل أنت متأكد من استعادة المحتوى الافتراضي لمتجر قصتي؟')) {
      setConfig(initialStoreConfig);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kasaty_store_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.products && parsed.storeName) {
        setConfig(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON', e);
    }
    return false;
  };

  return (
    <StoreContext.Provider
      value={{
        config,
        editMode,
        setEditMode,
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        discountPercent,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        storiesCount,
        freeShippingQualified,
        customizingProduct,
        openCustomizer,
        closeCustomizer,
        previewingProduct,
        previewChildName,
        previewChildPhoto,
        openBookPreview,
        closeBookPreview,
        readingArticle,
        openArticle,
        closeArticle,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        editingImageTarget,
        openImageEditor,
        closeImageEditor,
        updateImageAtPath,
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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
