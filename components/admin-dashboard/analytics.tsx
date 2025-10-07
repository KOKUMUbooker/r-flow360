'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dummyAnalytics } from '@/lib/dummy-data';
import {
  Eye,
  Home,
  MessageSquare,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';

export function AdminAnalytics() {
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Platform Analytics
        </h2>
        <p className="text-sm text-muted-foreground">
          Monitor platform performance and user engagement
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyAnalytics.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{activity.date}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.views} views • {activity.inquiries} inquiries
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{activity.views}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Active Listings
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {dummyAnalytics.activeListings}
                  </p>
                </div>
                <Home className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-accent">
                    {dummyAnalytics.totalUsers}
                  </p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
                <div>
                  <p className="text-sm text-muted-foreground">Total Agents</p>
                  <p className="text-2xl font-bold text-secondary">
                    {dummyAnalytics.totalAgents}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-6 rounded-lg bg-muted/50">
                <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">
                  {dummyAnalytics.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Views
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/50">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">
                  {dummyAnalytics.totalInquiries.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Inquiries
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/50">
                <Home className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <p className="text-2xl font-bold">
                  {dummyAnalytics.totalProperties}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total Properties
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-muted/50">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">+15%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Growth Rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
