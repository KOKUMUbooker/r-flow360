import { Card, CardContent } from '@/components/ui/card';
import { DummyUser } from '@/lib/dummy-data';
import { Property } from '@/types';
import { Bell, Heart, Star } from 'lucide-react';

export function Overview({
  user,
  savedProperties,
}: {
  user: DummyUser;
  savedProperties: Property[];
}) {
  return (
    <>
      <Card className="bg-background/50 backdrop-blur">
        <CardContent className="p-3 md:p-4 text-center">
          <Heart className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 text-primary" />
          <p className="text-xl md:text-2xl font-bold">
            {savedProperties.length}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">Saved</p>
        </CardContent>
      </Card>
      <Card className="bg-background/50 backdrop-blur">
        <CardContent className="p-3 md:p-4 text-center">
          <Bell className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 text-primary" />
          <p className="text-xl md:text-2xl font-bold">{user.alerts.length}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Alerts</p>
        </CardContent>
      </Card>
      <Card className="bg-background/50 backdrop-blur">
        <CardContent className="p-3 md:p-4 text-center">
          <Star className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 text-primary" />
          <p className="text-xl md:text-2xl font-bold">{user.reviews.length}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Reviews</p>
        </CardContent>
      </Card>
    </>
  );
}
