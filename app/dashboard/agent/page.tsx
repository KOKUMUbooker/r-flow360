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
  MessageSquare,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  DollarSign,
  Upload,
  Settings,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react"
import { dummyProperties, dummyAgents, dummyInquiries } from "@/lib/dummy-data"
import Image from "next/image"
import { useState } from "react"

export default function AgentDashboardPage() {
  const agent = dummyAgents[0]
  const agentProperties = dummyProperties.filter((p) => agent.properties.includes(p.id))
  const agentInquiries = dummyInquiries.filter((inq) => agentProperties.some((prop) => prop.id === inq.propertyId))
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="container py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary/20">
                  <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                  <AvatarFallback className="text-lg">{agent.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{agent.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {agent.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4" />
                    {agent.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild size="lg" className="flex-1 md:flex-none">
                  <Link href="/properties/new">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Property
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-background">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Total Listings</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Home className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{agent.totalListings}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary font-medium">{agent.activeListings} active</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Total Views</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Eye className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{agent.totalViews.toLocaleString()}</p>
                  <p className="text-xs text-primary mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12% this month
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
                  <p className="text-2xl md:text-3xl font-bold">{agent.totalInquiries}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-primary font-medium">{agentInquiries.length} pending</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">Sold/Rented</p>
                    <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{agent.soldListings}</p>
                  <p className="text-xs text-muted-foreground mt-1">This year</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="container py-6 md:py-8">
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="listings" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <Home className="h-4 w-4" />
                <span className="text-xs md:text-sm">Listings</span>
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs md:text-sm">Inquiries</span>
                <Badge variant="secondary" className="ml-0 md:ml-1 text-xs">
                  {agentInquiries.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex-col gap-1 py-2 md:flex-row md:gap-2 md:py-2.5">
                <BarChart3 className="h-4 w-4" />
                <span className="text-xs md:text-sm">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold">My Listings</h2>
                  <p className="text-sm text-muted-foreground">Create, manage, and track your property listings</p>
                </div>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/properties/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {agentProperties.map((property) => (
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
                              <span className="font-semibold text-primary">KSh {property.price.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{property.views}</span>
                              <span className="text-muted-foreground">views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{property.inquiries}</span>
                              <span className="text-muted-foreground">inquiries</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 pt-2">
                            <Button asChild variant="outline" size="sm" className="bg-transparent">
                              <Link href={`/properties/${property.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="bg-transparent">
                              <Link href={`/properties/${property.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Upload className="h-4 w-4 mr-2" />
                              Photos
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-transparent text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
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

            <TabsContent value="inquiries" className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Inquiries</h2>
                <p className="text-sm text-muted-foreground">
                  Manage and respond to inquiries from potential buyers and renters
                </p>
              </div>

              <div className="grid gap-4">
                {agentInquiries.map((inquiry) => {
                  const property = dummyProperties.find((p) => p.id === inquiry.propertyId)
                  return (
                    <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="space-y-4">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    {inquiry.userName[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-semibold">{inquiry.userName}</p>
                                  <p className="text-xs text-muted-foreground">{inquiry.createdAt}</p>
                                </div>
                                <Badge variant={inquiry.status === "pending" ? "secondary" : "outline"}>
                                  {inquiry.status}
                                </Badge>
                              </div>

                              <div className="space-y-2 mb-3">
                                <p className="text-sm">
                                  <span className="text-muted-foreground">Property: </span>
                                  <Link
                                    href={`/properties/${inquiry.propertyId}`}
                                    className="font-medium hover:text-primary transition-colors"
                                  >
                                    {property?.title}
                                  </Link>
                                </p>
                                <p className="text-sm bg-muted/50 p-3 rounded-lg">{inquiry.message}</p>
                              </div>

                              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-sm bg-muted/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{inquiry.userEmail}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">{inquiry.userPhone}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" onClick={() => setSelectedInquiry(inquiry.id)}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Respond
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Respond to Inquiry</DialogTitle>
                                  <DialogDescription>Send a response to {inquiry.userName}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="response">Your Response</Label>
                                    <Textarea
                                      id="response"
                                      placeholder="Thank you for your interest. I would be happy to schedule a viewing..."
                                      rows={6}
                                    />
                                  </div>
                                  <Button className="w-full">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Response
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mark Resolved
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

            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Performance Analytics</h2>
                <p className="text-sm text-muted-foreground">Track your listing performance and engagement metrics</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performing Listings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {agentProperties
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((property, index) => (
                        <div key={property.id} className="flex items-center gap-3 md:gap-4">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-sm md:text-base">{property.title}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">{property.views} views</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {property.inquiries} inquiries
                          </Badge>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Eye className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm md:text-base">234 new views</p>
                        <p className="text-xs md:text-sm text-muted-foreground">In the last 7 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm md:text-base">12 new inquiries</p>
                        <p className="text-xs md:text-sm text-muted-foreground">In the last 7 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm md:text-base">45 profile views</p>
                        <p className="text-xs md:text-sm text-muted-foreground">In the last 7 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg">Listing Status Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      <div className="text-center p-4 md:p-6 rounded-lg bg-primary/10">
                        <p className="text-2xl md:text-3xl font-bold text-primary">{agent.activeListings}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Active</p>
                      </div>
                      <div className="text-center p-4 md:p-6 rounded-lg bg-muted">
                        <p className="text-2xl md:text-3xl font-bold">
                          {agent.totalListings - agent.activeListings - agent.soldListings}
                        </p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Pending</p>
                      </div>
                      <div className="text-center p-4 md:p-6 rounded-lg bg-primary/10">
                        <p className="text-2xl md:text-3xl font-bold text-primary">{agent.soldListings}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">Sold/Rented</p>
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
