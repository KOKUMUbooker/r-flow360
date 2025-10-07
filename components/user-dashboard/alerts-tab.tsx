import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DummyUser } from '@/lib/dummy-data';
import {
  AlertCircle,
  Bed,
  Bell,
  Edit,
  MapPin,
  Plus,
  Trash2,
} from 'lucide-react';

export function AlertsTab({ user }: { user: DummyUser }) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Property Alerts</h2>
          <p className="text-sm text-muted-foreground">
            Get notified when new properties match your criteria
          </p>
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
                      <h3 className="font-semibold">
                        New properties in {alert.location}
                      </h3>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent"
                  >
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
          You'll receive email notifications when new properties matching your
          alerts are listed.
        </AlertDescription>
      </Alert>
    </>
  );
}
