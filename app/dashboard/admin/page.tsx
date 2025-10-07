'use client';

import {
  AdminAnalytics,
  AdminOverview,
  AdminPropertiesTab,
  ReportsTab,
  UserTab,
} from '@/components/admin-dashboard';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyProperties, dummyReports } from '@/lib/dummy-data';
import { BarChart3, Flag, Home, Shield, Users } from 'lucide-react';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const pendingProperties = dummyProperties.filter(
    (p) => p.status === 'pending'
  );
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Platform management and oversight
                  </p>
                </div>
              </div>
            </div>

            <AdminOverview />
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger
                value="properties"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Home className="h-4 w-4" />
                <span className="text-xs md:text-sm">Properties</span>
                {pendingProperties.length > 0 && (
                  <Badge variant="secondary" className="ml-0 md:ml-1 text-xs">
                    {pendingProperties.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Users className="h-4 w-4" />
                <span className="text-xs md:text-sm">Users</span>
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Flag className="h-4 w-4" />
                <span className="text-xs md:text-sm">Reports</span>
                {dummyReports.length > 0 && (
                  <Badge variant="destructive" className="ml-0 md:ml-1 text-xs">
                    {dummyReports.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs md:text-sm">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-6">
              <AdminPropertiesTab pendingProperties={pendingProperties} />
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <UserTab />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportsTab setSelectedReport={setSelectedReport} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AdminAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
