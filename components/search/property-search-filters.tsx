'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { PropertySearchFilters, PropertyType } from '@/types';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface PropertySearchFiltersCardProps {
  searchQuery: string;
  showFilters: boolean;
  filters: PropertySearchFilters;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<PropertySearchFilters>>;
}

export function PropertySearchFiltersCard(
  props: PropertySearchFiltersCardProps
) {
  const { filters, setFilters, setShowFilters } = props;
  const { showFilters, searchQuery, setSearchQuery } = props;

  const onSetPropType = (val: string) => {
    setFilters((prevSt) => ({ ...prevSt, type: val as PropertyType }));
  };
  const onSetBedroom = (val: string) => {
    setFilters((prevSt) => ({ ...prevSt, bedRooms: +val ? +val : undefined }));
  };
  const onSetPriceRange = (data: { from: number; to: number }) => {
    setFilters((prevSt) => ({ ...prevSt, priceRange: data }));
  };

  const onSetAmenities = (amenity: string) => {
    setFilters((prevSt) => {
      let amenities = prevSt.amenities ? [...prevSt.amenities] : [];
      if (amenities.includes(amenity)) {
        amenities = amenities.filter((am) => am !== amenity);
      } else amenities.push(amenity);

      return { ...prevSt, amenities };
    });
  };

  return (
    <Card className="sticky top-20">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {showFilters && (
          <>
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location, keywords..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value.trim())}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select
                value={filters?.type ? `${filters.type}` : 'all'}
                onValueChange={onSetPropType}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <Select
                value={filters?.bedRooms ? `${filters.bedRooms}` : 'all'}
                onValueChange={onSetBedroom}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="1">1 Bedroom</SelectItem>
                  <SelectItem value="2">2 Bedrooms</SelectItem>
                  <SelectItem value="3">3 Bedrooms</SelectItem>
                  <SelectItem value="4">4 Bedrooms</SelectItem>
                  <SelectItem value="5">5+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Price Range (KSh)</Label>
              <Slider
                min={0}
                max={10000000}
                step={1000000}
                value={[filters.priceRange.from, filters.priceRange.to]}
                onValueChange={([from, to]: [number, number]) => {
                  onSetPriceRange({ from, to });
                }}
                className="py-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{filters.priceRange.from.toLocaleString()}</span>
                <span>{filters.priceRange.to.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Amenities</Label>
              <div className="space-y-2">
                {['Parking', 'Security', 'Gym', 'Swimming Pool', 'Garden'].map(
                  (amenity, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-3"
                    >
                      <Checkbox
                        checked={
                          filters?.amenities &&
                          filters.amenities.includes(amenity)
                        }
                        onCheckedChange={onSetAmenities}
                        name={amenity}
                        id={amenity}
                      />
                      <Button
                        variant={'ghost'}
                        size={'sm'}
                        className="flex-1 flex flex-col gap-1 text-left items-start pl-0 py-0 hover:bg-transparent hover:text-foreground"
                        onClick={onSetAmenities.bind(null, amenity)}
                      >
                        <Label>{amenity}</Label>
                      </Button>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-transparent"
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
              Reset Filters
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
