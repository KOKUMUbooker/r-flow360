import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Search, MapPin, Home, TrendingUp, Shield, Users } from "lucide-react"
import { dummyProperties } from "@/lib/dummy-data"
import Image from "next/image"

export default function HomePage() {
  const featuredProperties = dummyProperties.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-muted/50 to-background py-20 md:py-32">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
                Find Your Perfect Property in Kenya
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                Discover, filter, and interact with property listings across Kenyan cities. Your dream home is just a
                search away.
              </p>

              {/* Quick Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="Location (e.g., Kilimani, Westlands)" className="pl-10 h-12" />
                </div>
                <Button asChild size="lg" className="sm:w-auto">
                  <Link href="/search">
                    <Search className="mr-2 h-5 w-5" />
                    Search Properties
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="text-muted-foreground">Popular:</span>
                <Link href="/search?location=Kilimani" className="hover:text-primary transition-colors">
                  Kilimani
                </Link>
                <Link href="/search?location=Westlands" className="hover:text-primary transition-colors">
                  Westlands
                </Link>
                <Link href="/search?location=Karen" className="hover:text-primary transition-colors">
                  Karen
                </Link>
                <Link href="/search?type=apartment" className="hover:text-primary transition-colors">
                  Apartments
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Trending Properties</h2>
                <p className="text-muted-foreground">Explore our most popular listings</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/properties">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                        {property.priceType === "rent" ? "For Rent" : "For Sale"}
                      </Badge>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                        <TrendingUp className="h-4 w-4 text-accent shrink-0" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{property.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primary">
                          KSh {property.price.toLocaleString()}
                          {property.priceType === "rent" && <span className="text-sm font-normal">/month</span>}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{property.bedrooms} beds</span>
                        <span>•</span>
                        <span>{property.bathrooms} baths</span>
                        <span>•</span>
                        <span>{property.size} m²</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Rentflow360?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We provide a comprehensive platform for all your real estate needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Wide Selection</h3>
                  <p className="text-muted-foreground">
                    Browse thousands of properties across Kenya, from apartments to luxury villas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Verified Listings</h3>
                  <p className="text-muted-foreground">
                    All properties are verified by our team to ensure accuracy and prevent fraud
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Agents</h3>
                  <p className="text-muted-foreground">
                    Connect with professional agents who understand the local market
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Dream Property?</h2>
                  <p className="text-lg text-primary-foreground/90">
                    Join thousands of satisfied users who found their perfect home through Rentflow360
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary">
                      <Link href="/search">Start Searching</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    >
                      <Link href="/properties/new">List Your Property</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
