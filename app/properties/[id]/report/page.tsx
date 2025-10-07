'use client';

import type React from 'react';

import { useState, use } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle2, AlertCircle, Flag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { dummyProperties } from '@/lib/dummy-data';

const reportReasons = [
  'Incorrect pricing information',
  'Misleading description',
  'Property no longer available',
  'Duplicate listing',
  'Fraudulent listing',
  'Inappropriate content',
  'Wrong location',
  'Poor quality images',
  'Other',
];

export default function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const property = dummyProperties.find((p) => p.id === resolvedParams.id);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    reason: '',
    description: '',
    reporterName: '',
    reporterEmail: '',
    user_id: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, reason: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (
      !formData.reason ||
      !formData.description ||
      !formData.reporterName ||
      !formData.reporterEmail
    ) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        router.push(`/properties/${resolvedParams.id}`);
      }, 2000);
    }, 1500);
  };

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center space-y-4">
              <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="font-medium mb-2">Property not found</p>
                <p className="text-sm text-muted-foreground">
                  The property you're looking for doesn't exist
                </p>
              </div>
              <Button asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/properties/${resolvedParams.id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Property
              </Link>
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Flag className="h-5 w-5 text-destructive" />
              </div>
              <h1 className="text-3xl font-bold">Report Property</h1>
            </div>
            <p className="text-muted-foreground">
              Help us maintain quality by reporting issues with this listing
            </p>
          </div>

          {success && (
            <Alert className="mb-6 border-green-500 bg-green-500/10">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                Thank you for your report. Our team will review it shortly.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={property.images[0] || '/placeholder.svg'}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-2 mb-2">
                      {property.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {property.location}, {property.city}
                    </p>
                    <p className="text-lg font-bold text-primary mt-2">
                      KSh {property.price.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Report Details</CardTitle>
                  <CardDescription>
                    Please provide detailed information about the issue you're
                    reporting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reason">
                        Reason for Report{' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.reason}
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger id="reason">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Detailed Description{' '}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Please provide as much detail as possible about the issue..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Include specific details that will help us investigate
                        this report
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reporterName">
                        Your Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="reporterName"
                        name="reporterName"
                        placeholder="John Doe"
                        value={formData.reporterName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reporterEmail">
                        Your Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="reporterEmail"
                        name="reporterEmail"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.reporterEmail}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        We may contact you if we need more information
                      </p>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        False reports may result in account suspension. Please
                        only report genuine issues.
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        variant="destructive"
                        className="flex-1"
                      >
                        {isLoading ? 'Submitting...' : 'Submit Report'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        asChild
                        className="bg-transparent"
                      >
                        <Link href={`/properties/${resolvedParams.id}`}>
                          Cancel
                        </Link>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
