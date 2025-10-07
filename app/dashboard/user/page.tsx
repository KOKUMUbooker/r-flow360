"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import {
  Heart,
  Bell,
  Star,
  Settings,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Trash2,
  AlertCircle,
  Plus,
  Edit,
  Mail,
  MessageSquare,
  Eye,
  TrendingUp,
} from "lucide-react"
import { dummyProperties, dummyUsers } from "@/lib/dummy-data"
import Image from "next/image"

export default function UserDashboardPage() {
  const user = dummyUsers[0]
  const savedProperties = dummyProperties.filter((p) => user.savedProperties.includes(p.id))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-background">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-3 md:p-4 text-center">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 text-primary" />
                  <p className="text-xl md:text-2xl font-bold">{savedProperties.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Saved</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-3 md:p-4 text-center">
                  <Bell className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 text-primary" />
                  <p className="text-xl md:text-2xl font-bold">{user.alerts.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Alerts</p>
                </CardContent>
              </Card>
              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-3 md:p-4 text-center">
                  <Star className="h-5 w-5 md:h-6 md:w-6 mx-auto mb-1 text-primary" />
                  <p className="text-xl md:text-2xl font-bold">{user.reviews.length}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Reviews</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="saved" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Heart className="h-4 w-4" />
                <span className="text-xs md:text-sm">Saved</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Bell className="h-4 w-4" />
                <span className="text-xs md:text-sm">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Star className="h-4 w-4" />
                <span className="text-xs md:text-sm">Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs md:text-sm">Activity</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Saved Properties</h2>
                  <p className="text-sm text-muted-foreground">Properties you've marked as favorites</p>
                </div>
                <Button asChild>
                  <Link href="/properties">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse More
                  </Link>
                </Button>
              </div>

              {savedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {savedProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative aspect-[4/3]">
                        <Link href={`/properties/${property.id}`}>
                          <Image
                            src={property.images[0] || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </Link>
                        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground hover:bg-background">
                          {property.priceType === "rent" ? "For Rent" : "For Sale"}
                        </Badge>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-3 right-3 bg-background/90 hover:bg-background"
                        >
                          <Heart className="h-4 w-4 fill-primary text-primary" />
                        </Button>
                      </div>
                      <CardContent className="p-4 space-y-3">
                        <Link href={`/properties/${property.id}`}>
                          <h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">
                            {property.title}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="line-clamp-1">
                            {property.location}, {property.city}
                          </span>
                        </div>

                        <div className="flex items-baseline gap-1">
                          <p className="text-xl font-bold text-primary">KSh {property.price.toLocaleString()}</p>
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

                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                            <Link href={`/properties/${property.id}/inquire`}>
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                            <Link href={`/properties/${property.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 md:p-12 text-center space-y-4">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium mb-2">No saved properties yet</p>
                      <p className="text-sm text-muted-foreground">
                        Start browsing and save properties you're interested in
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/properties">Browse Properties</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Property Alerts</h2>
                  <p className="text-sm text-muted-foreground">Get notified when new properties match your criteria</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Alert
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Property Alert</DialogTitle>
                      <DialogDescription>
                        Set your preferences and we'll notify you of matching properties
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="alert-location">Location</Label>
                        <Input id="alert-location" placeholder="e.g., Kilimani" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="alert-type">Property Type</Label>
                        <Select>
                          <SelectTrigger id="alert-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="alert-bedrooms">Bedrooms</Label>
                          <Input id="alert-bedrooms" type="number" placeholder="3" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alert-price">Max Price (KSh)</Label>
                          <Input id="alert-price" type="number" placeholder="100000" />
                        </div>
                      </div>
                      <Button className="w-full">Create Alert</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {user.alerts.map((alert) => (
                  <Card key={alert.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Bell className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">New properties in {alert.location}</h3>
                              <Badge variant="secondary" className="mt-1">
                                Active
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-muted-foreground pl-12">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{alert.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              <span>{alert.bedrooms} bedrooms</span>
                            </div>
                            <span>Max: KSh {alert.maxPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You'll receive email notifications when new properties matching your alerts are listed.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">My Reviews</h2>
                  <p className="text-sm text-muted-foreground">Reviews you've left for properties</p>
                </div>
              </div>

              <div className="grid gap-4">
                {user.reviews.map((review) => {
                  const property = dummyProperties.find((p) => p.id === review.propertyId)
                  return (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {property && (
                            <div className="relative w-full sm:w-24 aspect-video sm:aspect-square rounded-lg overflow-hidden shrink-0">
                              <Image
                                src={property.images[0] || "/placeholder.svg"}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 space-y-3">
                            <div>
                              <Link
                                href={`/properties/${review.propertyId}`}
                                className="font-semibold hover:text-primary transition-colors"
                              >
                                {property?.title}
                              </Link>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-sm">{review.comment}</p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Review
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Recent Activity</h2>
                <p className="text-sm text-muted-foreground">Your recent interactions and property views</p>
              </div>

              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Viewed property</p>
                        <p className="text-sm text-muted-foreground">Modern 3-Bedroom Apartment in Kilimani</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Saved property</p>
                        <p className="text-sm text-muted-foreground">2-Bedroom Apartment in Westlands</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Sent inquiry</p>
                        <p className="text-sm text-muted-foreground">4-Bedroom Villa in Karen</p>
                        <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
