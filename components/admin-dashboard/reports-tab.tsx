'use client';

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
import { dummyProperties, dummyReports } from '@/lib/dummy-data';
import { Ban, Eye, Flag, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';

export function ReportsTab({
  setSelectedReport,
}: {
  setSelectedReport: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Reported Listings</h2>
          <p className="text-sm text-muted-foreground">
            Review and handle user reports
          </p>
        </div>
        {dummyReports.length > 0 && (
          <Badge variant="destructive" className="w-fit">
            {dummyReports.length} pending
          </Badge>
        )}
      </div>

      <div className="grid gap-4">
        {dummyReports.map((report) => {
          const property = dummyProperties.find(
            (p) => p.id === report.propertyId
          );
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                          <Flag className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{report.reason}</h3>
                          <p className="text-xs text-muted-foreground">
                            Reported on:{' '}
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            report.status === 'pending'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <p className="text-sm">
                          <span className="text-muted-foreground">
                            Property:{' '}
                          </span>
                          <Link
                            href={`/properties/${report.propertyId}`}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {property?.title}
                          </Link>
                        </p>
                        <p className="text-sm bg-muted/50 p-3 rounded-lg">
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Link href={`/properties/${report.propertyId}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Property
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setSelectedReport(report.id)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Remove Listing
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Remove Property Listing</DialogTitle>
                          <DialogDescription>
                            This action will remove the property from the
                            platform. Please provide a reason.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="removal-reason">
                              Reason for Removal
                            </Label>
                            <Textarea
                              id="removal-reason"
                              placeholder="Explain why this property is being removed..."
                              rows={4}
                            />
                          </div>
                          <Button variant="destructive" className="w-full">
                            Confirm Removal
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Dismiss Report
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
