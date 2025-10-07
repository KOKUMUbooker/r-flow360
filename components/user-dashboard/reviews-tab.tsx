import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dummyProperties, DummyUser } from '@/lib/dummy-data';
import { Edit, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ReviewsTab({ user }: { user: DummyUser }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">My Reviews</h2>
          <p className="text-sm text-muted-foreground">
            Reviews you've left for properties
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {user.reviews.map((review) => {
          const property = dummyProperties.find(
            (p) => p.id === review.propertyId
          );
          return (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {property && (
                    <div className="relative w-full sm:w-24 aspect-video sm:aspect-square rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={property.images[0] || '/placeholder.svg'}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-3">
                    <div>
                      <Link
                        href={`/properties/${review.propertyId}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {property?.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Review
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
