import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DummyAgent } from '@/lib/dummy-data';
import { Property } from '@/types';
import { Eye, MessageSquare, Users } from 'lucide-react';

export function AgentAnalytics({
  agentProperties,
  agent,
}: {
  agentProperties: Property[];
  agent: DummyAgent;
}) {
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Performance Analytics
        </h2>
        <p className="text-sm text-muted-foreground">
          Track your listing performance and engagement metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Listings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agentProperties
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map((property, index) => (
                <div
                  key={property.id}
                  className="flex items-center gap-3 md:gap-4"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-sm md:text-base">
                      {property.title}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {property.views} views
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {property.inquiries} inquiries
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base">
                  234 new views
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  In the last 7 days
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base">
                  12 new inquiries
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  In the last 7 days
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base">
                  45 profile views
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  In the last 7 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Listing Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center p-4 md:p-6 rounded-lg bg-primary/10">
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {agent.activeListings}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Active
                </p>
              </div>
              <div className="text-center p-4 md:p-6 rounded-lg bg-muted">
                <p className="text-2xl md:text-3xl font-bold">
                  {agent.totalListings -
                    agent.activeListings -
                    agent.soldListings}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Pending
                </p>
              </div>
              <div className="text-center p-4 md:p-6 rounded-lg bg-primary/10">
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {agent.soldListings}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Sold/Rented
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
