import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { dummyProperties } from '@/lib/dummy-data';
import { Inquiry } from '@/types';
import { CheckCircle2, Mail, MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export function InquiriesTabSection({
  agentInquiries,
  setSelectedInquiry,
}: {
  agentInquiries: Inquiry[];
  setSelectedInquiry: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">Inquiries</h2>
        <p className="text-sm text-muted-foreground">
          Manage and respond to inquiries from potential buyers and renters
        </p>
      </div>

      <div className="grid gap-4">
        {agentInquiries.map((inquiry) => {
          const property = dummyProperties.find(
            (p) => p.id === inquiry.propertyId
          );
          return (
            <Card
              key={inquiry.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {inquiry.userName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{inquiry.userName}</p>
                          <p className="text-xs text-muted-foreground">
                            {inquiry.createdAt}
                          </p>
                        </div>
                        <Badge
                          variant={
                            inquiry.status === 'pending'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {inquiry.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Property:{' '}
                          </span>
                          <Link
                            href={`/properties/${inquiry.propertyId}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {property?.title}
                          </Link>
                        </p>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg">
                          {inquiry.message}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {inquiry.userEmail}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {inquiry.userPhone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedInquiry(inquiry.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Respond
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Respond to Inquiry</DialogTitle>
                          <DialogDescription>
                            Send a response to {inquiry.userName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="response">Your Response</Label>
                            <Textarea
                              id="response"
                              placeholder="Thank you for your interest. I would be happy to schedule a viewing..."
                              rows={6}
                            />
                          </div>
                          <Button className="w-full">
                            <Mail className="h-4 w-4 mr-2" />
                            Send Response
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Mark Resolved
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      Archive
                    </Button>
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
