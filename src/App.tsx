/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturesBanner } from './components/FeaturesBanner';
import { ProductGrid } from './components/ProductGrid';
import { WhyKasaty } from './components/WhyKasaty';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { CustomizerModal } from './components/CustomizerModal';
import { BookPreviewModal } from './components/BookPreviewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { ImageEditorModal } from './components/ImageEditorModal';
import { FloatingOffer } from './components/FloatingOffer';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
        {/* Sticky Header with Announcement, Currency & Navigation */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* 4-Step Process Highlights */}
          <FeaturesBanner />

          {/* Product Catalog & Stories */}
          <ProductGrid />

          {/* Why Kasaty - 6 Educational & Value Propositions */}
          <WhyKasaty />

          {/* Customer Reviews & Testimonials */}
          <TestimonialsSection />

          {/* FAQs Accordion */}
          <FaqSection />

          {/* Parenting & Education Blog Articles */}
          <BlogSection />
        </main>

        {/* Footer with Policies & Contacts */}
        <Footer />

        {/* Global Floating Offer Countdown & WhatsApp Support */}
        <FloatingOffer />

        {/* Interactive Modals */}
        <CustomizerModal />
        <BookPreviewModal />
        <CartDrawer />
        <CheckoutModal />
        <AdminCMSModal />
        <ImageEditorModal />
      </div>
    </StoreProvider>
  );
}
