'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dummyProperties } from '@/lib/dummy-data';
import { Property } from '@/types';
import { Ban, CheckCircle, Eye, MessageSquare, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function AdminPropertiesTab({
  pendingProperties,
}: {
  pendingProperties: Property[];
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Property Management</h2>
          <p className="text-sm text-muted-foreground">
            Approve, reject, and moderate property listings
          </p>
        </div>
        {pendingProperties.length > 0 && (
          <Badge variant="secondary" className="w-fit">
            {pendingProperties.length} pending approval
          </Badge>
        )}
      </div>

      <div className="grid gap-4">
        {dummyProperties.slice(0, 5).map((property) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-48 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={property.images[0] || '/placeholder.svg'}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-background/90 text-foreground">
                    {property.priceType === 'rent' ? 'For Rent' : 'For Sale'}
                  </Badge>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base md:text-lg mb-1">
                        {property.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {property.location}, {property.city}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Listed by:{' '}
                        <span className="font-medium">
                          {property.agent.name}
                        </span>
                      </p>
                    </div>
                    <Badge
                      variant={
                        property.status === 'available' ? 'default' : 'outline'
                      }
                      className="capitalize w-fit"
                    >
                      {property.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Price: </span>
                      <span className="font-semibold">
                        KSh {property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{property.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">
                        {property.inquiries}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Listed: </span>
                      <span className="font-semibold">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-destructive hover:text-destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
