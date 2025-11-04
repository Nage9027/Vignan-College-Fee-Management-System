import StatsCard from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Users, AlertCircle, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { payments, students } from '@/utils/dummyData';

const modeData = [
  { name: 'Cash', value: 30000, color: '#10b981' },
  { name: 'Card', value: 51500, color: '#3b82f6' },
  { name: 'UPI', value: 51500, color: '#8b5cf6' },
  { name: 'Cheque', value: 0, color: '#f59e0b' },
];

const dailyData = [
  { date: '01 Nov', amount: 145000 },
  { date: '02 Nov', amount: 98000 },
  { date: '03 Nov', amount: 122000 },
  { date: '04 Nov', amount: 133000 },
];

const AdminDashboard = () => {
  const totalCollection = payments.reduce((sum, p) => sum + p.amount, 0);
  const pendingFees = students.reduce((sum, s) => sum + s.pendingBalance, 0);
  const totalStudents = students.length;
  const todayCollection = modeData.reduce((sum, m) => sum + m.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of today's fee collection.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today's Collection"
          value={`₹${todayCollection.toLocaleString('en-IN')}`}
          icon={IndianRupee}
          variant="success"
        />
        <StatsCard
          title="Total Pending Fees"
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
        <StatsCard
          title="Total Collected"
          value={`₹${totalCollection.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          variant="success"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mode-wise Collection (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={modeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₹${value.toLocaleString('en-IN')}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {modeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Collection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
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
                {payments.slice(0, 5).map((payment) => (
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

export default AdminDashboard;
