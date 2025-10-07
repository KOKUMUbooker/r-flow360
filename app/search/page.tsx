"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { MapPin, Bed, Bath, Maximize, Search, SlidersHorizontal } from "lucide-react"
import { dummyProperties } from "@/lib/dummy-data"
import Image from "next/image"
import { useState } from "react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100000000])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(true)

  // Simple search logic - in real app this would be more sophisticated
  const filteredProperties = dummyProperties.filter((property) => {
    const matchesSearch =
      searchQuery === "" ||
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]

    const matchesType = selectedType === "all" || property.type === selectedType

    const matchesBedrooms = selectedBedrooms === "all" || property.bedrooms.toString() === selectedBedrooms

    return matchesSearch && matchesPrice && matchesType && matchesBedrooms
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2">Search Properties</h1>
            <p className="text-muted-foreground">Find your perfect property with advanced filters</p>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Property Type</Label>
                        <Select value={selectedType} onValueChange={setSelectedType}>
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
                        <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
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
                          max={100000000}
                          step={1000000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="py-4"
                        />
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{priceRange[0].toLocaleString()}</span>
                          <span>{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label>Amenities</Label>
                        <div className="space-y-2">
                          {["Parking", "Security", "Gym", "Swimming Pool", "Garden"].map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                              <Checkbox id={amenity} />
                              <label
                                htmlFor={amenity}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {amenity}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => {
                          setSearchQuery("")
                          setPriceRange([0, 100000000])
                          setSelectedType("all")
                          setSelectedBedrooms("all")
                        }}
                      >
                        Reset Filters
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{filteredProperties.length} properties found</p>
                <Select defaultValue="recent">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <Link key={property.id} href={`/properties/${property.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                          {property.priceType === "rent" ? "For Rent" : "For Sale"}
                        </Badge>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <h3 className="font-semibold line-clamp-2 min-h-[3rem]">{property.title}</h3>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">
                            {property.location}, {property.city}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold text-primary">KSh {property.price.toLocaleString()}</p>
                          {property.priceType === "rent" && (
                            <span className="text-sm text-muted-foreground">/month</span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border">
                          <div className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-4 w-4" />
                            <span>{property.bathrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize className="h-4 w-4" />
                            <span>{property.size} m²</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground">No properties found matching your criteria.</p>
                    <Button
                      variant="outline"
                      className="mt-4 bg-transparent"
                      onClick={() => {
                        setSearchQuery("")
                        setPriceRange([0, 100000000])
                        setSelectedType("all")
                        setSelectedBedrooms("all")
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
  )
}
