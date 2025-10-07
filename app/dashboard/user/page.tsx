'use client';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertsTab, Overview, ReviewsTab } from '@/components/user-dashboard';
import { SavedPropertiesTab } from '@/components/user-dashboard/saved-properties';
import { dummyProperties, dummyUsers } from '@/lib/dummy-data';
import { Bell, Heart, Mail, Settings, Star } from 'lucide-react';

export default function UserDashboardPage() {
  const user = dummyUsers[0];
  const savedProperties = dummyProperties.filter((p) =>
    user.savedProperties.includes(p.id)
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/20">
                <AvatarImage
                  src={user.avatar || '/placeholder.svg'}
                  alt={user.name}
                />
                <AvatarFallback className="text-lg">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  {user.name}
                </h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-background">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
              <Overview savedProperties={savedProperties} user={user} />
            </div>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger
                value="saved"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Heart className="h-4 w-4" />
                <span className="text-xs md:text-sm">Saved</span>
              </TabsTrigger>
              <TabsTrigger
                value="alerts"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Bell className="h-4 w-4" />
                <span className="text-xs md:text-sm">Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Star className="h-4 w-4" />
                <span className="text-xs md:text-sm">Reviews</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="space-y-6">
              <SavedPropertiesTab savedProperties={savedProperties} />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <AlertsTab user={user} />
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <ReviewsTab user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
