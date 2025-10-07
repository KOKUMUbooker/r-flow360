import { PropertyCard } from '@/components/properties';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { dummyProperties } from '@/lib/dummy-data';
import Link from 'next/link';

export default function PropertiesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2">Property Listings</h1>
            <p className="text-muted-foreground">
              Browse all available properties
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {dummyProperties.length} properties found
            </p>
            <Button asChild variant="outline">
              <Link href="/search">Advanced Search</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyProperties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
