import StatsCard from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IndianRupee,
  Users,
  AlertCircle,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { payments, students } from '@/utils/dummyData';
import { formatCurrency } from '@/utils/formatCurrency';

const modeData = [
  { name: 'Cash', value: 5500, color: '#10b981' },
  { name: 'Card', value: 5100, color: '#3b82f6' },
  { name: 'UPI', value: 51500, color: '#8b5cf6' },
  { name: 'Cheque', value: 1000, color: '#f59e0b' },
];

const modeColors: Record<string, string> = {
  Cash: '#10b981',
  Card: '#3b82f6',
  UPI: '#8b5cf6',
  Cheque: '#f59e0b',
};

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
  const cashierCount = 0;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">

      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src="https://vignyanpucollege.com/assets/images/logo.png"
          alt="Vignan PU College Logo"
          className="h-12"
        />
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of today's fee collection.
          </p>
        </div>
      </div>

      {/* Stats Card Row */}
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
        <StatsCard title="Today's Collection" value={formatCurrency(todayCollection)} icon={IndianRupee} variant="success" />
        <StatsCard title="Total Pending Fees" value={formatCurrency(pendingFees)} icon={AlertCircle} variant="warning" />
        <StatsCard title="Total Students" value={String(totalStudents)} icon={Users} variant="default" />
        <StatsCard title="Active Cashiers" value={String(cashierCount)} icon={UserCheck} variant="default" />
        <StatsCard title="Total Collected" value={formatCurrency(totalCollection)} icon={TrendingUp} variant="success" />
      </div>

      {/* Chart Section */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Mode-wise Collection (Today)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">

              <ResponsiveContainer width="60%" height={280}>
                <PieChart>
                  <Pie data={modeData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={false}>
                    {modeData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [formatCurrency(Number(value)), name]} />
                </PieChart>
              </ResponsiveContainer>

              {/* Right-side legend with color + amount */}
              <div className="space-y-2 text-sm w-44">
                {modeData.map((item) => (
                  <div key={item.name} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Daily Collection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(val) => formatCurrency(val)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="amount" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Recent Payments Table */}
      <Card className="hover:shadow-lg transition-shadow">
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
                    <td className="p-3 font-semibold">{formatCurrency(payment.amount)}</td>

                    {/* ✅ Mode badge with color square */}
                    <td className="p-3">
                      <span className="flex items-center gap-2 font-medium text-sm">
                        <span
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: modeColors[payment.paymentMode] }}
                        ></span>
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
