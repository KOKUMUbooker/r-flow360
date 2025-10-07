import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Heart, Bell, Star, Settings, MapPin, Bed, Bath, Maximize, Trash2, AlertCircle } from "lucide-react"
import { dummyProperties, dummyUsers } from "@/lib/dummy-data"
import Image from "next/image"

export default function UserDashboardPage() {
  const user = dummyUsers[0]
  const savedProperties = dummyProperties.filter((p) => user.savedProperties.includes(p.id))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="container py-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="saved" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Saved</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="gap-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Reviews</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* Saved Properties */}
            <TabsContent value="saved" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Saved Properties</h2>
                  <p className="text-muted-foreground">Properties you've marked as favorites</p>
                </div>
                <Badge variant="secondary">{savedProperties.length} saved</Badge>
              </div>

              {savedProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden group">
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
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-3 right-3 bg-background/90 hover:bg-background"
                        >
                          <Trash2 className="h-4 w-4" />
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center space-y-4">
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

            {/* Alerts */}
            <TabsContent value="alerts" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Property Alerts</h2>
                  <p className="text-muted-foreground">Get notified when new properties match your criteria</p>
                </div>
                <Button>Create Alert</Button>
              </div>

              <div className="grid gap-4">
                {user.alerts.map((alert) => (
                  <Card key={alert.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3 flex-1">
                          <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">New properties in {alert.location}</h3>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
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

            {/* Reviews */}
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">My Reviews</h2>
                  <p className="text-muted-foreground">Reviews you've left for properties</p>
                </div>
              </div>

              <div className="grid gap-4">
                {user.reviews.map((review) => {
                  const property = dummyProperties.find((p) => p.id === review.propertyId)
                  return (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {property && (
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
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
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
                <p className="text-muted-foreground">Manage your account information and preferences</p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <p className="text-sm text-muted-foreground">{user.name}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{user.phone}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Account Type</label>
                        <Badge variant="secondary" className="capitalize">
                          {user.role}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      Edit Information
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about your alerts and inquiries</p>
                      </div>
                      <Badge variant="secondary">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Get text messages for urgent updates</p>
                      </div>
                      <Badge variant="outline">Disabled</Badge>
                    </div>
                    <Button variant="outline" className="bg-transparent">
                      Manage Preferences
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="bg-transparent">
                      Change Password
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      Enable Two-Factor Authentication
                    </Button>
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
