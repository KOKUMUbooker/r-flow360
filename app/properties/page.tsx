'use client';

import { PropertyCard, PropertyCardSkeleton } from '@/components/properties';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { logHandler } from '@/utils';
import Link from 'next/link';
import { useEffect } from 'react';
import { useGetPropertiesQuery } from '../../rtk-apis';
import { RotateCw } from 'lucide-react';

export default function PropertiesPage() {
  const { data, error, isLoading, isFetching, refetch } =
    useGetPropertiesQuery();

  const isGettingProps = isLoading || isFetching;

  useEffect(() => {
    if (error) logHandler(error);
  }, [error]);

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
              {data?.total || 0} properties found
            </p>
            <div className="flex flex-row items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/search">Advanced Search</Link>
              </Button>
              <Button
                onClick={refetch}
                disabled={isGettingProps}
                variant="outline"
              >
                <RotateCw />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isGettingProps ? (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </>
            ) : (
              <>
                {data?.properties ? (
                  <>
                    {data.properties.map((property, index) => (
                      <PropertyCard key={index} property={property} />
                    ))}
                  </>
                ) : (
                  <div>Something went wrong</div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
