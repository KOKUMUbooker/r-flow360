import { Button } from '@/components/ui/button';
import { Building2, User } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Rentflow360</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Search
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/properties">Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/search">Search</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog">Blog</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-transparent"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/user">User Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/agent">Agent Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/admin">Admin Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            asChild
          >
            <Link href="/login">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </Button>

          {/* <Button asChild className="hidden sm:flex">
            <Link href="/properties/new">List Property</Link>
          </Button> */}
        </div>
      </div>
    </header>
  );
}
