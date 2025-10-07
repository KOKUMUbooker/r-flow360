'use client';

import { Button } from '@/components/ui/button';
import { Property } from '@/types';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

interface ImageGalleryProps {
  property: Property;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

export function ImageGallery(props: ImageGalleryProps) {
  const { property, currentImageIndex, setCurrentImageIndex } = props;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + property.images.length) % property.images.length
    );
  };

  return (
    <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden mb-8 group">
      <Image
        src={property.images[currentImageIndex] || '/placeholder.svg'}
        alt={property.title}
        fill
        className="object-cover"
      />

      {/* Navigation Arrows */}
      {property.images.length > 1 && (
        <>
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={prevImage}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={nextImage}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Image Counter */}
      <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded-md text-sm">
        {currentImageIndex + 1} / {property.images.length}
      </div>

      {/* Full Screen Button */}
      <Link href={`/properties/${property.id}/gallery`}>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}
