'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Property } from '@/types';
import {
  AlertTriangle,
  Bath,
  Bed,
  Calendar,
  CheckCircle2,
  Eye,
  Heart,
  MapPin,
  Maximize,
  Share2,
} from 'lucide-react';

export function MainContent({ property }: { property: Property }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title and Price */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>
                {property.location}, {property.city}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div>
            <span className="text-4xl font-bold text-primary">
              KSh {property.price.toLocaleString()}
            </span>
            <span className="text-lg text-muted-foreground">/month</span>
          </div>
          {property.featured && (
            <Badge className="bg-accent text-accent-foreground">Featured</Badge>
          )}
          <Badge variant="outline" className="capitalize">
            {property.status}
          </Badge>
        </div>

        {/* Property Stats */}
        {property.type !== 'commercial' && (
          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              <span>
                {property.bedrooms} Bedroom
                {property.bedrooms > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5" />
              <span>
                {property.bathrooms} Bathroom
                {property.bathrooms > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="h-5 w-5" />
              <span>{property.size} sqm</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span>{property.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>
                Posted {new Date(property.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </div>

      <Separator />

      {/* Amenities */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {property.amenities.map((amenity) => (
            <div key={amenity} className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>{amenity}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Safety Tips */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Safety Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            • Always verify the property and agent credentials before making any
            payments
          </p>
          <p>
            • Visit the property in person before committing to rent or purchase
          </p>
          <p>• Never send money to unverified accounts or individuals</p>
          <p>
            • Report suspicious listings or agents to Rentflow360 immediately
          </p>
          <p>• Use secure payment methods and keep all transaction records</p>
        </CardContent>
      </Card>
    </div>
  );
}
