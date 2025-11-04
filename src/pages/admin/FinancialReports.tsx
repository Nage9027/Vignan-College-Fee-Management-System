import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { payments, students } from '@/utils/dummyData';
import { toast } from 'sonner';

const FinancialReports = () => {
  const handleExport = (type: string) => {
    toast.success(`Exporting ${type} report...`);
  };

  const modeWiseCollection = [
    { mode: 'Cash', amount: 30000, transactions: 1 },
    { mode: 'Card', amount: 51500, transactions: 1 },
    { mode: 'UPI', amount: 51500, transactions: 1 },
    { mode: 'Cheque', amount: 0, transactions: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">View and export fee collection reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('Excel')}>
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily Collection</TabsTrigger>
          <TabsTrigger value="mode">Mode-wise</TabsTrigger>
          <TabsTrigger value="pending">Pending Fees</TabsTrigger>
          <TabsTrigger value="cashier">Cashier Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Collection Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-left p-3 font-semibold">Receipt No</th>
                      <th className="text-left p-3 font-semibold">Student Name</th>
                      <th className="text-right p-3 font-semibold">Amount</th>
                      <th className="text-left p-3 font-semibold">Mode</th>
                      <th className="text-left p-3 font-semibold">Cashier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b hover:bg-muted/30">
                        <td className="p-3">{payment.timestamp.toLocaleDateString('en-IN')}</td>
                        <td className="p-3 font-medium">{payment.receiptNo}</td>
                        <td className="p-3">{payment.studentName}</td>
                        <td className="p-3 text-right font-semibold text-accent">
                          ₹{payment.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3">{payment.paymentMode}</td>
                        <td className="p-3 text-muted-foreground">{payment.cashierName}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 bg-muted">
                      <td colSpan={3} className="p-3 font-bold">Total Collection</td>
                      <td className="p-3 text-right font-bold text-lg text-primary">
                        ₹{payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('en-IN')}
                      </td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mode">
          <Card>
            <CardHeader>
              <CardTitle>Mode-wise Collection Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Payment Mode</th>
                      <th className="text-center p-3 font-semibold">No. of Transactions</th>
                      <th className="text-right p-3 font-semibold">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modeWiseCollection.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-muted/30">
                        <td className="p-3 font-medium">{item.mode}</td>
                        <td className="p-3 text-center">{item.transactions}</td>
                        <td className="p-3 text-right font-semibold text-accent">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 bg-muted">
                      <td className="p-3 font-bold">Total</td>
                      <td className="p-3 text-center font-bold">
                        {modeWiseCollection.reduce((sum, m) => sum + m.transactions, 0)}
                      </td>
                      <td className="p-3 text-right font-bold text-lg text-primary">
                        ₹{modeWiseCollection.reduce((sum, m) => sum + m.amount, 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Fees Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Roll Number</th>
                      <th className="text-left p-3 font-semibold">Student Name</th>
                      <th className="text-left p-3 font-semibold">Course/Section</th>
                      <th className="text-right p-3 font-semibold">Total Fee</th>
                      <th className="text-right p-3 font-semibold">Paid</th>
                      <th className="text-right p-3 font-semibold">Pending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.filter(s => s.pendingBalance > 0).map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/30">
                        <td className="p-3 font-medium">{student.rollNumber}</td>
                        <td className="p-3">{student.name}</td>
                        <td className="p-3 text-muted-foreground">{student.course} - {student.section}</td>
                        <td className="p-3 text-right">₹{student.totalFee.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right text-accent">₹{student.paidAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right font-semibold text-destructive">
                          ₹{student.pendingBalance.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 bg-muted">
                      <td colSpan={5} className="p-3 font-bold">Total Pending</td>
                      <td className="p-3 text-right font-bold text-lg text-destructive">
                        ₹{students.reduce((sum, s) => sum + s.pendingBalance, 0).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashier">
          <Card>
            <CardHeader>
              <CardTitle>Cashier-wise Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Cashier Name</th>
                      <th className="text-center p-3 font-semibold">Transactions</th>
                      <th className="text-right p-3 font-semibold">Total Collection</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium">Priya Sharma</td>
                      <td className="p-3 text-center">3</td>
                      <td className="p-3 text-right font-semibold text-accent">
                        ₹133,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReports;
