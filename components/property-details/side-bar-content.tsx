'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Property } from '@/types';
import { Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SidebarContent({ property }: { property: Property }) {
  const router = useRouter();

  const onReportListing = () => {
    router.push(`/properties/${property.id}/report`);
  };

  const onMakeInquiry = () => {
    router.push(`/properties/${property.id}/inquire`);
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Contact Agent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold text-lg mb-1">{property.agent.name}</p>
          <p className="text-sm text-muted-foreground">
            Licensed Real Estate Agent
          </p>
        </div>

        <Separator />

        <div className="space-y-3">
          <Button className="w-full" size="lg">
            <Phone className="mr-2 h-5 w-5" />
            Call Agent
          </Button>
          <Button variant="outline" className="w-full bg-transparent" size="lg">
            <Mail className="mr-2 h-5 w-5" />
            Email Agent
          </Button>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{property.agent.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="break-all">{property.agent.email}</span>
          </div>
        </div>

        <Separator />

        <Button
          onClick={onMakeInquiry}
          variant="outline"
          className="w-full bg-transparent"
        >
          Make inquiry
        </Button>

        <Button
          variant="ghost"
          className="w-full text-destructive hover:text-destructive"
          onClick={onReportListing}
        >
          Report Listing
        </Button>
      </CardContent>
    </Card>
  );
}
