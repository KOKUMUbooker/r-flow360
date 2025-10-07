'use client';

import {
  AgentAnalytics,
  InquiriesTabSection,
  ListingTabSection,
} from '@/components/agent-dashboard';
import { OveriView } from '@/components/agent-dashboard/overview';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyAgents, dummyInquiries, dummyProperties } from '@/lib/dummy-data';
import {
  BarChart3,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AgentDashboardPage() {
  const agent = dummyAgents[0];
  const agentProperties = dummyProperties.filter((p) =>
    agent.properties.includes(p.id)
  );
  const agentInquiries = dummyInquiries.filter((inq) =>
    agentProperties.some((prop) => prop.id === inq.propertyId)
  );
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/20">
                  <AvatarImage
                    src={agent.avatar || '/placeholder.svg'}
                    alt={agent.name}
                  />
                  <AvatarFallback className="text-lg">
                    {agent.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {agent.name}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {agent.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {agent.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild size="lg" className="flex-1 md:flex-none">
                  <Link href="/properties/new">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Property
                  </Link>
                </Button>
              </div>
            </div>

            <OveriView agent={agent} inquiriesCount={agentInquiries.length} />
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger
                value="listings"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <Home className="h-4 w-4" />
                <span className="text-xs md:text-sm">Listings</span>
              </TabsTrigger>
              <TabsTrigger
                value="inquiries"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs md:text-sm">Inquiries</span>
                <Badge variant="secondary" className="ml-0 md:ml-1 text-xs">
                  {agentInquiries.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs md:text-sm">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-6">
              <ListingTabSection agentProperties={agentProperties} />
            </TabsContent>

            <TabsContent value="inquiries" className="space-y-6">
              <InquiriesTabSection
                agentInquiries={agentInquiries}
                setSelectedInquiry={setSelectedInquiry}
              />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AgentAnalytics agent={agent} agentProperties={agentProperties} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
