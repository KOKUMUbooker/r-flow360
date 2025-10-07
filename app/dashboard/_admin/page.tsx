import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Home,
  Users,
  Flag,
  BarChart3,
  CheckCircle,
  XCircle,
  Eye,
  TrendingUp,
  MessageSquare,
  Shield,
} from "lucide-react"
import { dummyProperties, dummyUsers, dummyAgents, dummyReports, dummyAnalytics } from "@/lib/dummy-data"
import Image from "next/image"

export default function AdminDashboardPage() {
  const pendingProperties = dummyProperties.filter((p) => p.status === "pending")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-muted/30">
          <div className="container py-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Platform management and oversight</p>
              </div>
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
                    <p className="text-sm text-muted-foreground mb-1">Total Properties</p>
                    <p className="text-3xl font-bold">{dummyAnalytics.totalProperties}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-accent font-medium">{dummyAnalytics.activeListings} active</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                    <p className="text-3xl font-bold">{dummyAnalytics.totalUsers}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-accent font-medium">{dummyAnalytics.totalAgents} agents</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                    <p className="text-3xl font-bold">{dummyAnalytics.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <p className="text-xs text-accent mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Inquiries</p>
                    <p className="text-3xl font-bold">{dummyAnalytics.totalInquiries.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="properties" className="gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Properties</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="gap-2">
                <Flag className="h-4 w-4" />
                <span className="hidden sm:inline">Reports</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Properties Management */}
            <TabsContent value="properties" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Property Management</h2>
                  <p className="text-muted-foreground">Review and moderate property listings</p>
                </div>
                <Badge variant="secondary">{pendingProperties.length} pending approval</Badge>
              </div>

              <div className="grid gap-4">
                {dummyProperties.slice(0, 5).map((property) => (
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
                              <p className="text-sm text-muted-foreground mt-1">
                                Listed by: <span className="font-medium">{property.agent.name}</span>
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
                              <span className="font-semibold">KSh {property.price.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Views: </span>
                              <span className="font-semibold">{property.views}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Inquiries: </span>
                              <span className="font-semibold">{property.inquiries}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Listed: </span>
                              <span className="font-semibold">{new Date(property.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Link href={`/properties/${property.id}`}>
                                <Eye className="h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button size="sm" className="gap-2 bg-accent text-accent-foreground">
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Management */}
            <TabsContent value="users" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">User Management</h2>
                <p className="text-muted-foreground">Manage users and agents on the platform</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Regular Users */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Registered Users</span>
                      <Badge variant="secondary">{dummyUsers.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dummyUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Agents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Agents</span>
                      <Badge variant="secondary">{dummyAgents.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dummyAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                            <AvatarFallback>{agent.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{agent.name}</p>
                            <p className="text-sm text-muted-foreground">{agent.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {agent.totalListings} listings • {agent.totalViews} views
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Manage
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Reported Listings</h2>
                  <p className="text-muted-foreground">Review and handle user reports</p>
                </div>
                <Badge variant="destructive">{dummyReports.length} pending</Badge>
              </div>

              <div className="grid gap-4">
                {dummyReports.map((report) => {
                  const property = dummyProperties.find((p) => p.id === report.propertyId)
                  return (
                    <Card key={report.id}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Flag className="h-5 w-5 text-destructive" />
                                <h3 className="font-semibold">{report.reason}</h3>
                              </div>
                              <p className="text-sm mb-2">
                                <span className="text-muted-foreground">Property: </span>
                                <Link
                                  href={`/properties/${report.propertyId}`}
                                  className="font-medium hover:text-primary transition-colors"
                                >
                                  {property?.title}
                                </Link>
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                              <p className="text-xs text-muted-foreground">
                                Reported on: {new Date(report.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={report.status === "pending" ? "destructive" : "secondary"}>
                              {report.status}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-border">
                            <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                              <Link href={`/properties/${report.propertyId}`}>
                                <Eye className="h-4 w-4" />
                                View Property
                              </Link>
                            </Button>
                            <Button size="sm" variant="destructive">
                              Remove Listing
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Dismiss Report
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
                <h2 className="text-2xl font-bold mb-2">Platform Analytics</h2>
                <p className="text-muted-foreground">Monitor platform performance and user engagement</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dummyAnalytics.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{activity.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {activity.views} views • {activity.inquiries} inquiries
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{activity.views}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Listings</p>
                          <p className="text-2xl font-bold text-primary">{dummyAnalytics.activeListings}</p>
                        </div>
                        <Home className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                          <p className="text-2xl font-bold text-accent">{dummyAnalytics.totalUsers}</p>
                        </div>
                        <Users className="h-8 w-8 text-accent" />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Agents</p>
                          <p className="text-2xl font-bold text-secondary">{dummyAnalytics.totalAgents}</p>
                        </div>
                        <Shield className="h-8 w-8 text-secondary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Engagement Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{dummyAnalytics.totalViews.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Views</p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <MessageSquare className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <p className="text-2xl font-bold">{dummyAnalytics.totalInquiries.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Inquiries</p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <Home className="h-8 w-8 mx-auto mb-2 text-secondary" />
                        <p className="text-2xl font-bold">{dummyAnalytics.totalProperties}</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Properties</p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-muted/50">
                        <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                        <p className="text-2xl font-bold">+15%</p>
                        <p className="text-sm text-muted-foreground mt-1">Growth Rate</p>
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
