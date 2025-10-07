import Link from 'next/link';
import {
  Building2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Rentflow360</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted platform for discovering properties across Kenya.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Advanced Search
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/user"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Saved Properties
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Agents</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/properties/new"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  List Property
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/agent"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Agent Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms & Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Rentflow360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
