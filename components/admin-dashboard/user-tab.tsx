'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { dummyAgents, dummyUsers } from '@/lib/dummy-data';
import { Ban, Eye, UserCheck } from 'lucide-react';

export function UserTab() {
  return (
    <>
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2">User Management</h2>
        <p className="text-sm text-muted-foreground">
          Manage users and agents on the platform
        </p>
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
                    <AvatarImage
                      src={user.avatar || '/placeholder.svg'}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user.email}
                    </p>
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
                        <DialogDescription>
                          Update user status and permissions
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={user.avatar || '/placeholder.svg'}
                              alt={user.name}
                            />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start bg-transparent"
                          >
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
                    <AvatarImage
                      src={agent.avatar || '/placeholder.svg'}
                      alt={agent.name}
                    />
                    <AvatarFallback>{agent.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{agent.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {agent.email}
                    </p>
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
                      <DialogDescription>
                        Update agent status and permissions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={agent.avatar || '/placeholder.svg'}
                            alt={agent.name}
                          />
                          <AvatarFallback>{agent.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {agent.email}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View All Listings
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                        >
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
    </>
  );
}
