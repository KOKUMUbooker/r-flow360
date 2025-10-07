'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@/types';
import { Bath, Bed, Eye, MapPin, Maximize } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();

  const onGoToDetails = () => {
    router.push(`/properties/${property.id}`);
  };

  return (
    <Link key={property.id} href={`/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative aspect-[4/3]">
          <Image
            src={property.images[0] || '/placeholder.svg'}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground border">
            {property.type}
          </Badge>
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>
        </div>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold line-clamp-2 min-h-[3rem]">
            {property.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="line-clamp-1">
              {property.location}, {property.city}
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold text-primary">
              KSh {(+property.price ? +property.price : 0).toLocaleString()}
            </p>
            {property.priceType === 'rent' && (
              <span className="text-sm text-muted-foreground">/month</span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.size} m²</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <Eye className="h-3 w-3" />
            <span>{property.views} views</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
