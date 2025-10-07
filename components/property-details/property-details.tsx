'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ImageGallery } from './img-gallery';
import { MainContent } from './main-content';
import { SidebarContent } from './side-bar-content';
import { Property } from '@/types';

export function PropertyDetails({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-foreground">
          Properties
        </Link>
        <span>/</span>
        <span className="text-foreground">{property.title}</span>
      </div>

      {/* Image Gallery */}
      <ImageGallery
        currentImageIndex={currentImageIndex}
        property={property}
        setCurrentImageIndex={setCurrentImageIndex}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <MainContent property={property} />

        {/* Sidebar - Agent Contact */}
        <div className="lg:col-span-1">
          <SidebarContent property={property} />
        </div>
      </div>
    </div>
  );
}
