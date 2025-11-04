import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Label } from "@/components/ui/label";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useTheme } from "@/providers/ThemeProvider"; // ✅ Custom hook
  
  const Settings = () => {
    const { theme, setTheme } = useTheme();
  
    return (
      <div className="space-y-6 animate-in fade-in-50 duration-500">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application preferences.
          </p>
        </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Customize the look and feel of the application.
            </CardDescription>
          </CardHeader>
  
          <CardContent>
            <div className="space-y-2">
              <Label>Theme</Label>
  
              <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
  
              <p className="text-sm text-muted-foreground">
                Your theme preference will be saved automatically.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default Settings;
  