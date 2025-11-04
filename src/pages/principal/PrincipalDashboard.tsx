import StatsCard from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Users, AlertCircle } from 'lucide-react';
import { payments, students } from '@/utils/dummyData';

const PrincipalDashboard = () => {
  const totalCollection = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingFees = students.reduce((sum, s) => sum + s.pendingBalance, 0);
  const totalStudents = students.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Principal Dashboard</h1>
        <p className="text-muted-foreground">Overview of college fee management</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Collection"
          value={`₹${totalCollection.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          variant="success"
        />
        <StatsCard
          title="Pending Fees"
          value={`₹${pendingFees.toLocaleString('en-IN')}`}
          icon={AlertCircle}
          variant="warning"
        />
        <StatsCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          variant="default"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments (Read-only)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Receipt No</th>
                  <th className="text-left p-3">Student Name</th>
                  <th className="text-left p-3">Amount</th>
                  <th className="text-left p-3">Mode</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">{payment.receiptNo}</td>
                    <td className="p-3">{payment.studentName}</td>
                    <td className="p-3 font-semibold">₹{payment.amount.toLocaleString('en-IN')}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                        {payment.paymentMode}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {payment.timestamp.toLocaleDateString('en-IN')}
                    </td>
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

export default PrincipalDashboard;
