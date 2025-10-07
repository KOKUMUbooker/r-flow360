import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Property } from '@/types';
import { Edit, Eye, MessageSquare, Plus, Trash2, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ListingTabSection({
  agentProperties,
}: {
  agentProperties: Property[];
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">My Listings</h2>
          <p className="text-sm text-muted-foreground">
            Create, manage, and track your property listings
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {agentProperties.map((property) => (
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
                      <span className="font-semibold text-primary">
                        KSh {property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{property.views}</span>
                      <span className="text-muted-foreground">views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">
                        {property.inquiries}
                      </span>
                      <span className="text-muted-foreground">inquiries</span>
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
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Link href={`/properties/${property.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Photos
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
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
