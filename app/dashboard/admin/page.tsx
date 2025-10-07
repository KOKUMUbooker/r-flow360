"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Ban,
  UserCheck,
  Settings,
} from "lucide-react"
import { dummyProperties, dummyUsers, dummyAgents, dummyReports, dummyAnalytics } from "@/lib/dummy-data"
import Image from "next/image"
import { useState } from "react"

export default function AdminDashboardPage() {
  const pendingProperties = dummyProperties.filter((p) => p.status === "pending")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-sm md:text-base text-muted-foreground">Platform management and oversight</p>
                </div>
              </div>
              <Button variant="outline" size="lg" className="bg-background w-full md:w-auto">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Properties</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Home className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{dummyAnalytics.totalProperties}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary font-medium">{dummyAnalytics.activeListings} active</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Users</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{dummyAnalytics.totalUsers}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary font-medium">{dummyAnalytics.totalAgents} agents</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Views</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Eye className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{dummyAnalytics.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-primary mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +15% this month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Inquiries</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{dummyAnalytics.totalInquiries.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <Tabs defaultValue="properties" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="properties" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Home className="h-4 w-4" />
                <span className="text-xs md:text-sm">Properties</span>
                {pendingProperties.length > 0 && (
                  <Badge variant="secondary" className="ml-0 md:ml-1 text-xs">
                    {pendingProperties.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Users className="h-4 w-4" />
                <span className="text-xs md:text-sm">Users</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Flag className="h-4 w-4" />
                <span className="text-xs md:text-sm">Reports</span>
                {dummyReports.length > 0 && (
                  <Badge variant="destructive" className="ml-0 md:ml-1 text-xs">
                    {dummyReports.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs md:text-sm">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Property Management</h2>
                  <p className="text-sm text-muted-foreground">Approve, reject, and moderate property listings</p>
                </div>
                {pendingProperties.length > 0 && (
                  <Badge variant="secondary" className="w-fit">
                    {pendingProperties.length} pending approval
                  </Badge>
                )}
              </div>

              <div className="grid gap-4">
                {dummyProperties.slice(0, 5).map((property) => (
                  <Card key={property.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative w-full md:w-48 aspect-video md:aspect-[4/3] rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={property.images[0] || "/placeholder.svg"}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                          <Badge className="absolute top-2 left-2 bg-background/90 text-foreground">
                            {property.priceType === "rent" ? "For Rent" : "For Sale"}
                          </Badge>
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base md:text-lg mb-1">{property.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {property.location}, {property.city}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Listed by: <span className="font-medium">{property.agent.name}</span>
                              </p>
                            </div>
                            <Badge
                              variant={property.status === "available" ? "default" : "outline"}
                              className="capitalize w-fit"
                            >
                              {property.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm">
                            <div>
                              <span className="text-muted-foreground">Price: </span>
                              <span className="font-semibold">KSh {property.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{property.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{property.inquiries}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Listed: </span>
                              <span className="font-semibold">{new Date(property.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 pt-2">
                            <Button asChild variant="outline" size="sm" className="bg-transparent">
                              <Link href={`/properties/${property.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </Button>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent text-destructive hover:text-destructive"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Ban className="h-4 w-4 mr-2" />
                              Suspend
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">User Management</h2>
                <p className="text-sm text-muted-foreground">Manage users and agents on the platform</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* Regular Users */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>Registered Users</span>
                      <Badge variant="secondary">{dummyUsers.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dummyUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{user.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Manage
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Manage User: {user.name}</DialogTitle>
                                <DialogDescription>Update user status and permissions</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                  </div>
                                </div>
                                <div className="grid gap-2">
                                  <Button variant="outline" className="w-full justify-start bg-transparent">
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Verify Account
                                  </Button>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start bg-transparent text-destructive hover:text-destructive"
                                  >
                                    <Ban className="h-4 w-4 mr-2" />
                                    Suspend Account
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Agents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>Agents</span>
                      <Badge variant="secondary">{dummyAgents.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dummyAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                            <AvatarFallback>{agent.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{agent.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{agent.email}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {agent.totalListings} listings • {agent.totalViews} views
                            </p>
                          </div>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Manage Agent: {agent.name}</DialogTitle>
                              <DialogDescription>Update agent status and permissions</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                                  <AvatarFallback>{agent.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">{agent.name}</p>
                                  <p className="text-sm text-muted-foreground">{agent.email}</p>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View All Listings
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent">
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Verify Agent
                                </Button>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start bg-transparent text-destructive hover:text-destructive"
                                >
                                  <Ban className="h-4 w-4 mr-2" />
                                  Suspend Agent
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">Reported Listings</h2>
                  <p className="text-sm text-muted-foreground">Review and handle user reports</p>
                </div>
                {dummyReports.length > 0 && (
                  <Badge variant="destructive" className="w-fit">
                    {dummyReports.length} pending
                  </Badge>
                )}
              </div>

              <div className="grid gap-4">
                {dummyReports.map((report) => {
                  const property = dummyProperties.find((p) => p.id === report.propertyId)
                  return (
                    <Card key={report.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                                  <Flag className="h-5 w-5 text-destructive" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold">{report.reason}</h3>
                                  <p className="text-xs text-muted-foreground">
                                    Reported on: {new Date(report.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <Badge variant={report.status === "pending" ? "destructive" : "secondary"}>
                                  {report.status}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-3">
                                <p className="text-sm">
                                  <span className="text-muted-foreground">Property: </span>
                                  <Link
                                    href={`/properties/${report.propertyId}`}
                                    className="font-medium hover:text-primary transition-colors"
                                  >
                                    {property?.title}
                                  </Link>
                                </p>
                                <p className="text-sm bg-muted/50 p-3 rounded-lg">{report.description}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                            <Button asChild variant="outline" size="sm" className="bg-transparent">
                              <Link href={`/properties/${report.propertyId}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Property
                              </Link>
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="destructive" onClick={() => setSelectedReport(report.id)}>
                                  <Ban className="h-4 w-4 mr-2" />
                                  Remove Listing
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Remove Property Listing</DialogTitle>
                                  <DialogDescription>
                                    This action will remove the property from the platform. Please provide a reason.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="removal-reason">Reason for Removal</Label>
                                    <Textarea
                                      id="removal-reason"
                                      placeholder="Explain why this property is being removed..."
                                      rows={4}
                                    />
                                  </div>
                                  <Button variant="destructive" className="w-full">
                                    Confirm Removal
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <XCircle className="h-4 w-4 mr-2" />
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

            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Platform Analytics</h2>
                <p className="text-sm text-muted-foreground">Monitor platform performance and user engagement</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
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
