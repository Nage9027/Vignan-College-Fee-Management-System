import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { auditLogs } from '@/utils/dummyData';

const AuditLogs = () => {
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'principal':
        return 'secondary';
      case 'cashier':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground">View all system activities and user actions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Timestamp</th>
                  <th className="text-left p-3 font-semibold">User</th>
                  <th className="text-left p-3 font-semibold">Role</th>
                  <th className="text-left p-3 font-semibold">Action</th>
                  <th className="text-left p-3 font-semibold">Record ID</th>
                  <th className="text-left p-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 text-sm">
                      {log.timestamp.toLocaleDateString('en-IN')} {log.timestamp.toLocaleTimeString('en-IN')}
                    </td>
                    <td className="p-3 font-medium">{log.user}</td>
                    <td className="p-3">
                      <Badge variant={getRoleBadgeVariant(log.role)} className="capitalize">
                        {log.role}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium text-primary">{log.action}</td>
                    <td className="p-3 text-muted-foreground text-sm font-mono">{log.recordId}</td>
                    <td className="p-3 text-sm">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
