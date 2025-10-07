import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@/types';
import {
  Bath,
  Bed,
  Eye,
  Heart,
  MapPin,
  Maximize,
  MessageSquare,
  Plus,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function SavedPropertiesTab({
  savedProperties,
}: {
  savedProperties: Property[];
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Saved Properties</h2>
          <p className="text-sm text-muted-foreground">
            Properties you've marked as favorites
          </p>
        </div>
        <Button asChild>
          <Link href="/properties">
            <Plus className="h-4 w-4 mr-2" />
            Browse More
          </Link>
        </Button>
      </div>

      {savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {savedProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3]">
                <Link href={`/properties/${property.id}`}>
                  <Image
                    src={property.images[0] || '/placeholder.svg'}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>
                <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">
                  {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
                </Badge>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 bg-background/90 hover:bg-background"
                >
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                </Button>
              </div>
              <CardContent className="p-4 space-y-3">
                <Link href={`/properties/${property.id}`}>
                  <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span className="line-clamp-1">
                    {property.location}, {property.city}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <p className="text-xl font-bold text-primary">
                    KSh {property.price.toLocaleString()}
                  </p>
                  {property.priceType === 'rent' && (
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
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

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link href={`/properties/${property.id}/inquire`}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    asChild
                  >
                    <Link href={`/properties/${property.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 md:p-12 text-center space-y-4">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="font-medium mb-2">No saved properties yet</p>
              <p className="text-sm text-muted-foreground">
                Start browsing and save properties you're interested in
              </p>
            </div>
            <Button asChild>
              <Link href="/properties">Browse Properties</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
