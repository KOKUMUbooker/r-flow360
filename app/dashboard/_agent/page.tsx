import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Home, MessageSquare, BarChart3, Plus, Eye, Edit, Trash2, TrendingUp, Users, DollarSign } from "lucide-react"
import { dummyProperties, dummyAgents, dummyInquiries } from "@/lib/dummy-data"
import Image from "next/image"

export default function AgentDashboardPage() {
  const agent = dummyAgents[0]
  const agentProperties = dummyProperties.filter((p) => agent.properties.includes(p.id))
  const agentInquiries = dummyInquiries.filter((inq) => agentProperties.some((prop) => prop.id === inq.propertyId))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="container py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                  <AvatarFallback>{agent.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{agent.name}</h1>
                  <p className="text-muted-foreground">Licensed Real Estate Agent</p>
                </div>
              </div>
              <Button asChild size="lg" className="gap-2">
                <Link href="/properties/new">
                  <Plus className="h-5 w-5" />
                  Add Property
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Listings</p>
                    <p className="text-3xl font-bold">{agent.totalListings}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-accent font-medium">{agent.activeListings} active</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                    <p className="text-3xl font-bold">{agent.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <p className="text-xs text-accent mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Inquiries</p>
                    <p className="text-3xl font-bold">{agent.totalInquiries}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-accent font-medium">{agentInquiries.length} pending</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sold/Rented</p>
                    <p className="text-3xl font-bold">{agent.soldListings}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">This year</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="listings" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">My Listings</span>
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Inquiries</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* My Listings */}
            <TabsContent value="listings" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">My Listings</h2>
                  <p className="text-muted-foreground">Manage your property listings</p>
                </div>
                <Button asChild className="gap-2">
                  <Link href="/properties/new">
                    <Plus className="h-4 w-4" />
                    Add Property
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {agentProperties.map((property) => (
                  <Card key={property.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="relative w-48 h-32 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={property.images[0] || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {property.location}, {property.city}
                              </p>
                            </div>
                            <Badge
                              variant={property.status === "available" ? "secondary" : "outline"}
                              className="capitalize"
                            >
                              {property.status}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-muted-foreground">Price: </span>
                              <span className="font-semibold text-primary">KSh {property.price.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Views: </span>
                              <span className="font-semibold">{property.views}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Inquiries: </span>
                              <span className="font-semibold">{property.inquiries}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Link href={`/properties/${property.id}`}>
                                <Eye className="h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Inquiries */}
            <TabsContent value="inquiries" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Inquiries</h2>
                <p className="text-muted-foreground">Manage inquiries from potential buyers and renters</p>
              </div>

              <div className="grid gap-4">
                {agentInquiries.map((inquiry) => {
                  const property = dummyProperties.find((p) => p.id === inquiry.propertyId)
                  return (
                    <Card key={inquiry.id}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback>{inquiry.userName[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">{inquiry.userName}</p>
                                  <p className="text-xs text-muted-foreground">{inquiry.createdAt}</p>
                                </div>
                              </div>
                              <p className="text-sm mb-2">
                                <span className="text-muted-foreground">Property: </span>
                                <Link
                                  href={`/properties/${inquiry.propertyId}`}
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {property?.title}
                                </Link>
                              </p>
                              <p className="text-sm text-muted-foreground mb-3">{inquiry.message}</p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">Email: </span>
                                  <span className="font-medium">{inquiry.userEmail}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Phone: </span>
                                  <span className="font-medium">{inquiry.userPhone}</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant={inquiry.status === "pending" ? "secondary" : "outline"}>
                              {inquiry.status}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-border">
                            <Button size="sm">Respond</Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Mark as Read
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Archive
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Performance Analytics</h2>
                <p className="text-muted-foreground">Track your listing performance and engagement</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Listings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {agentProperties
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((property, index) => (
                        <div key={property.id} className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{property.title}</p>
                            <p className="text-sm text-muted-foreground">{property.views} views</p>
                          </div>
                          <Badge variant="secondary">{property.inquiries} inquiries</Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Eye className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">234 new views</p>
                        <p className="text-sm text-muted-foreground">In the last 7 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">12 new inquiries</p>
                        <p className="text-sm text-muted-foreground">In the last 7 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">45 profile views</p>
                        <p className="text-sm text-muted-foreground">In the last 7 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Listing Status Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-accent/10">
                        <p className="text-3xl font-bold text-accent">{agent.activeListings}</p>
                        <p className="text-sm text-muted-foreground mt-1">Active</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted">
                        <p className="text-3xl font-bold">
                          {agent.totalListings - agent.activeListings - agent.soldListings}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Pending</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-primary/10">
                        <p className="text-3xl font-bold text-primary">{agent.soldListings}</p>
                        <p className="text-sm text-muted-foreground mt-1">Sold/Rented</p>
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
