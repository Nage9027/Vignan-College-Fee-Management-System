import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully! (Demo)');
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">
          View and manage your account details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={`https://placehold.co/100x100/2563EB/FFFFFF?text=${getInitials(user?.name || 'U')}`} />
              <AvatarFallback>{getInitials(user?.name || 'User')}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{user?.name}</CardTitle>
            <CardDescription className="text-base capitalize">{user?.role}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div className="flex justify-between">
              <span>Username:</span>
              <span className="font-medium text-foreground">{user?.username}</span>
            </div>
            <div className="flex justify-between">
              <span>User ID:</span>
              <span className="font-mono text-xs text-foreground">{user?.id}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Update your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              <Button type="submit">Change Password</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
