'use client';

import type React from 'react';
import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  isLoading: boolean;
  roleSt: [string, React.Dispatch<React.SetStateAction<string>>];
  passwordSt: [string, React.Dispatch<React.SetStateAction<string>>];
  emailSt: [string, React.Dispatch<React.SetStateAction<string>>];
  handleLogin: (e: React.FormEvent<Element>) => Promise<void>;
}

export function LoginForm(props: LoginFormProps) {
  const { emailSt, isLoading, passwordSt, roleSt, handleLogin } = props;
  const [password, setPassword] = passwordSt;
  const [email, setEmail] = emailSt;
  const [role, setRole] = roleSt;

  return (
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="w-full space-y-2">
            <Label htmlFor="role">Account Type</Label>
            <Select value={role} onValueChange={setRole} required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">Buyer/Renter</SelectItem>
                <SelectItem value="agent">Seller/Agent</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </CardContent>
    </>
  );
}
