'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { dummyProperties } from '@/lib/dummy-data';

export default function PropertyGalleryPage() {
  const params = useParams();
  const property = dummyProperties.find((p) => p.id === params.id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return null;
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h1 className="font-semibold">{property.title}</h1>
          <p className="text-sm text-muted-foreground">
            {currentImageIndex + 1} of {property.images.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/properties/${property.id}`}>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Image */}
      <div className="flex-1 relative flex items-center justify-center p-8">
        <div className="relative w-full h-full">
          <Image
            src={property.images[currentImageIndex] || '/placeholder.svg'}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-contain"
          />
          {/* Watermark */}
          <div className="absolute bottom-8 right-8 text-2xl font-bold pointer-events-none select-none">
            RENTFLOW360
          </div>
        </div>

        {/* Navigation */}
        {property.images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2 overflow-x-auto">
          {property.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                index === currentImageIndex
                  ? 'border-primary'
                  : 'border-transparent'
              }`}
            >
              <Image
                src={image || '/placeholder.svg'}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
