import { Card, CardContent } from '@/components/ui/card';
import { DummyAgent } from '@/lib/dummy-data';
import { DollarSign, Eye, Home, MessageSquare, TrendingUp } from 'lucide-react';

export function OveriView({
  agent,
  inquiriesCount,
}: {
  agent: DummyAgent;
  inquiriesCount: number;
}) {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-background/50 backdrop-blur">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-muted-foreground">
                Total Listings
              </p>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Home className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold">
              {agent.totalListings}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-primary font-medium">
                {agent.activeListings} active
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-muted-foreground">
                Total Views
              </p>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold">
              {agent.totalViews.toLocaleString()}
            </p>
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-muted-foreground">
                Inquiries
              </p>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold">
              {agent.totalInquiries}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-primary font-medium">
                {inquiriesCount} pending
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background/50 backdrop-blur">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs md:text-sm text-muted-foreground">
                Sold/Rented
              </p>
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl md:text-3xl font-bold">
              {agent.soldListings}
            </p>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
