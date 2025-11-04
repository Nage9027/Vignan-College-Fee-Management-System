import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Printer } from 'lucide-react';
import { payments } from '@/utils/dummyData';
import { toast } from 'sonner';

const ReprintReceipt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPayments, setFilteredPayments] = useState(payments);

  const handleSearch = () => {
    const filtered = payments.filter(
      (p) =>
        p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayments(filtered);
  };

  const handleReprint = (receipt: any) => {
    toast.success(`Reprinting receipt ${receipt.receiptNo}`);
    window.print();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reprint Receipt</h1>
        <p className="text-muted-foreground">Search and reprint past fee receipts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Receipt</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter student name or receipt number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Receipt No</th>
                  <th className="text-left p-3 font-semibold">Student Name</th>
                  <th className="text-right p-3 font-semibold">Amount</th>
                  <th className="text-left p-3 font-semibold">Mode</th>
                  <th className="text-left p-3 font-semibold">Date</th>
                  <th className="text-center p-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-muted/30">
                    <td className="p-3 font-medium text-primary">{payment.receiptNo}</td>
                    <td className="p-3">{payment.studentName}</td>
                    <td className="p-3 text-right font-semibold text-accent">
                      ₹{payment.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3">{payment.paymentMode}</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {payment.timestamp.toLocaleDateString('en-IN')}
                    </td>
                    <td className="p-3 text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReprint(payment)}
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Reprint
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPayments.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No receipts found. Try a different search term.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReprintReceipt;
