'use client';

// import { LoginForm } from '@/components/login';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { activeAdminAccount } from '@/lib/active-accounts';
import { setAuthState } from '@/store/auth';
import { Role } from '@/types';
import { logHandler } from '@/utils';
import { Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
// import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  // const emailSt = useState('');
  // const passwordSt = useState('');
  // const roleSt = useState<string>('');
  // const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = async (e: React.FormEvent) => {
  //   const email = emailSt[0];
  //   const role = roleSt[0];
  //   const password = passwordSt[0];
  //   e.preventDefault();

  //   if (!email || !password || !role) {
  //     logHandler({ message: 'Please fill in all fields' }, 'error');
  //     return;
  //   }

  //   setIsLoading(true);

  //   // Simulate login - in real app, this would call an API
  //   setTimeout(() => {
  //     setIsLoading(false);

  //     // Redirect based on role
  //     if (role === 'buyer') {
  //       router.push('/dashboard/user');
  //     } else if (role === 'agent') {
  //       router.push('/dashboard/agent');
  //     } else if (role === 'admin') {
  //       router.push('/dashboard/admin');
  //     }
  //   }, 1000);
  // };

  const onLogin = (role: Role) => {
    switch (role) {
      case Role.Admin:
        dispatch(setAuthState(activeAdminAccount));
        router.push('/dashboard/admin');
        break;

      case Role.Agent_Seller:
        dispatch(setAuthState(activeAdminAccount));
        router.push('/dashboard/agent');
        break;

      case Role.Reg_User:
        dispatch(setAuthState(activeAdminAccount));
        router.push('/dashboard/user');
        break;

      default:
        logHandler({ message: 'Invalid role provided' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your Rentflow360 account
            </p>
          </div>

          <Card>
            <div className="text-center text-sm space-y-2">
              Login using accounts of pre-exisitng users
            </div>
            <div className="space-y-3 flex flex-col justify-center px-4">
              <Button
                variant={'secondary'}
                onClick={onLogin.bind(null, Role.Reg_User)}
              >
                Login using a regular user account
              </Button>
              <Button
                variant={'outline'}
                onClick={onLogin.bind(null, Role.Agent_Seller)}
              >
                Login using a seller/agent account
              </Button>
              <Button onClick={onLogin.bind(null, Role.Admin)}>
                Login using an admin account
              </Button>
            </div>
            {/* <LoginForm
              roleSt={roleSt}
              emailSt={emailSt}
              isLoading={isLoading}
              passwordSt={passwordSt}
              handleLogin={handleLogin}
            /> */}
          </Card>

          {/* <Card>
            <CardContent className="pt-6">
              <div className="text-center text-sm space-y-2">
                <p className="text-muted-foreground">Don't have an account?</p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  asChild
                >
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card> */}

          {/* <div className="text-center text-xs text-muted-foreground">
            <p>Demo credentials for testing:</p>
            <p className="mt-1">Buyer: buyer@example.com / password</p>
            <p>Agent: agent@example.com / password</p>
            <p>Admin: admin@example.com / password</p>
          </div> */}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
