'use client';

import { PropertyCard, PropertyCardSkeleton } from '@/components/properties';
import { PropertySearchFiltersCard } from '@/components/search';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounce } from '@/hooks';
import { defaultPropertySearchFilters } from '@/lib/dummy-data';
import { PropertySearchFilters } from '@/types';
import { logHandler } from '@/utils';
import { RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetPropertiesQuery } from '../rtk-apis';

export default function SearchPage() {
  const [filters, setFilters] = useState<PropertySearchFilters>(
    defaultPropertySearchFilters
  );
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const setFilterSearchQuery = (debouncedVal: string) => {
    setFilters((prevSt) => ({ ...prevSt, location: debouncedVal }));
  };
  useDebounce(searchQuery || '', 500, setFilterSearchQuery);

  const { data, error, isLoading, isFetching, refetch } =
    useGetPropertiesQuery(filters);

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
            <h1 className="text-3xl font-bold mb-2">Search Properties</h1>
            <p className="text-muted-foreground">
              Find your perfect property with advanced filters
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <PropertySearchFiltersCard
                filters={filters}
                searchQuery={searchQuery}
                setFilters={setFilters}
                setSearchQuery={setSearchQuery}
                setShowFilters={setShowFilters}
                showFilters={showFilters}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {data?.total || 0} properties found
                </p>
                <Button variant={'outline'} size={'icon'} onClick={refetch}>
                  <RotateCcw />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        {data?.properties.map((property, index) => (
                          <PropertyCard key={index} property={property} />
                        ))}
                      </>
                    ) : (
                      <div>Something went wrong</div>
                    )}
                  </>
                )}
              </div>

              {data?.properties.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No properties found matching your criteria.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          priceRange: { from: 0, to: 100_000_000 },
                          amenities: [],
                          bedRooms: undefined,
                          location: undefined,
                          type: undefined,
                        });
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
