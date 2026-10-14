export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  secondaryImage?: string;
  galleryImages: string[];
  originalPrice: number; // in EGP
  discountPrice: number; // in EGP
  ageRange: string;
  genderTarget: 'both' | 'boys' | 'girls';
  pagesCount: number;
  rating: number;
  ratingCount: number;
  isBestSeller?: boolean;
  themeColor: string;
  samplePages: {
    pageNumber: number;
    title: string;
    textTemplate: string; // contains {childName}
    image: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  isVerified: boolean;
  rating: number;
  title: string;
  comment: string;
  date: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  childName: string;
  childAge: number;
  childGender: 'boy' | 'girl';
  childPhotoUrl?: string;
  storyLanguage: 'ar' | 'en';
  dedicationText: string;
  giftPackaging: boolean;
  quantity: number;
  pricePerUnit: number;
}

export interface StoreConfig {
  storeName: string;
  storeTagline: string;
  storeLogoUrl: string;
  supportPhone: string;
  supportEmail: string;
  whatsappNumber: string;
  
  announcementText: string;
  announcementActive: boolean;

  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroImage: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroStat1Number: string;
  heroStat1Label: string;
  heroStat2Number: string;
  heroStat2Label: string;
  heroStat3Number: string;
  heroStat3Label: string;

  promoBanner: {
    active: boolean;
    title: string;
    code: string;
    discountPercent: number;
    expireHours: number;
  };

  whyUsTitle: string;
  whyUsSubtitle: string;
  whyUsItems: {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[];

  featuresBar: {
    id: string;
    icon: string;
    title: string;
    description: string;
  }[];

  products: Product[];
  reviews: Review[];
  faqs: FaqItem[];
  articles: Article[];

  footerAbout: string;
  footerCopyright: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  totalAmount: number;
  currency: string;
  items: CartItem[];
  status: 'new' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

