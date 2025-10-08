'use client';

import { InfiniteLoader } from '@/components/infinite-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetPropertyQuery } from '@/rtk-apis';
import { logHandler } from '@/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PropertyGalleryPage() {
  const params = useParams();
  const paramsPropId = params?.id ? `${params.id}` : '';
  const { data, isLoading, error } = useGetPropertyQuery({
    propId: paramsPropId,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (error) logHandler(error);
  }, [error]);

  const nextImage = () => {
    const len = data?.property.images.length || 1;
    setCurrentImageIndex((prev) => (prev + 1) % len);
  };

  const prevImage = () => {
    const len = data?.property.images.length || 1;
    setCurrentImageIndex((prev) => (prev - 1 + len) % len);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h1 className="font-semibold">
            {data?.property?.title || 'Property Gallery'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentImageIndex + 1} of {data?.property?.images.length || 0}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/properties/${paramsPropId}`}>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-1 flex-col justify-center items-center">
          <InfiniteLoader size={64} />
          <div>Fetching property details...</div>
        </div>
      ) : (
        <>
          {data?.property ? (
            <>
              {/* Main Image */}
              <div className="flex-1 relative flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src={
                      data.property.images[currentImageIndex] ||
                      '/placeholder.svg'
                    }
                    alt={`${data.property.title} - Image ${
                      currentImageIndex + 1
                    }`}
                    fill
                    className="object-contain"
                  />
                  {/* Watermark */}
                  <div className="absolute bottom-8 right-8 text-2xl font-bold pointer-events-none select-none">
                    RENTFLOW360
                  </div>
                </div>

                {/* Navigation */}
                {data.property.images.length > 1 && (
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
                  {data.property.images.map((image, index) => (
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
            </>
          ) : (
            <div className="flex flex-1 flex-col justify-center items-center">
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No properties found matching your criteria.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-4 bg-transparent"
                  >
                    <Link href={`/properties/${paramsPropId}`}>Go back</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
