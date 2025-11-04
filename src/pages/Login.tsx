import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(username, password);

    if (success) {
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-in fade-in-50 duration-500">
        <CardHeader className="text-center">
          <img
            src="https://vignyanpucollege.com/assets/images/logo.png"
            alt="Vignan PU College Logo"
            className="w-32 mx-auto mb-4"
          />
          <CardTitle className="text-2xl">Vignan PU College</CardTitle>
          <CardDescription>Fee Management Portal Login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6 p-4 bg-muted rounded-md text-sm">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>Admin: admin / admin123</p>
            <p>Principal: principal / principal123</p>
            <p>Cashier: cashier / cashier123</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="link" className="text-sm text-muted-foreground">
                Having trouble? Contact Admin
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Contact Information</AlertDialogTitle>
                <AlertDialogDescription className="space-y-2 pt-2">
                  <p>
                    If you are facing any issues, please contact the
                    administrator:
                  </p>
                  <p>
                    <strong>Phone:</strong> 9392528692
                  </p>
                  <p>
                    <strong>Email:</strong> nagendradaddnla8008@gmail.com
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;