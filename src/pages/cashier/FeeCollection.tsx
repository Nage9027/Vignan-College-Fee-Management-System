import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, CreditCard, Printer } from 'lucide-react';
import { students } from '@/utils/dummyData';
import { Student } from '@/types';
import { toast } from 'sonner';

const FeeCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [remarks, setRemarks] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const handleSearch = () => {
    const found = students.find(
      (s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             s.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (found) {
      setSelectedStudent(found);
      toast.success('Student found!');
    } else {
      toast.error('Student not found');
    }
  };

  const handleSubmitPayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const receipt = {
      receiptNo: `RCP/2024/${Math.floor(Math.random() * 1000)}`,
      studentName: selectedStudent?.name,
      rollNumber: selectedStudent?.rollNumber,
      amount: parseFloat(amount),
      paymentMode,
      remarks,
      date: new Date().toLocaleString('en-IN'),
    };

    setReceiptData(receipt);
    setShowReceipt(true);
    toast.success('Payment processed successfully!');

    // Reset form
    setAmount('');
    setRemarks('');
  };

  const handlePrintReceipt = () => {
    window.print();
    toast.success('WhatsApp and Email notification sent to parent');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Fee Collection</h1>
        <p className="text-muted-foreground">Search student and process fee payment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Student</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter student name or roll number..."
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

      {selectedStudent && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Student Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold">{selectedStudent.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p className="font-semibold">{selectedStudent.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Course & Section</p>
                  <p className="font-semibold">{selectedStudent.course} - {selectedStudent.section}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fee Status</p>
                  <p className="font-semibold">{selectedStudent.feeStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Fee</p>
                  <p className="font-semibold text-lg">₹{selectedStudent.totalFee.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Paid Amount</p>
                  <p className="font-semibold text-lg text-accent">₹{selectedStudent.paidAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Balance</p>
                  <p className="font-semibold text-lg text-destructive">₹{selectedStudent.pendingBalance.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Mode</Label>
                <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Card" id="card" />
                    <Label htmlFor="card">Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="UPI" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Cheque" id="cheque" />
                    <Label htmlFor="cheque">Cheque</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks (Optional)</Label>
                <Textarea
                  id="remarks"
                  placeholder="Enter any additional remarks..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              <Button onClick={handleSubmitPayment} className="w-full" size="lg">
                <CreditCard className="h-5 w-5 mr-2" />
                Submit Payment
              </Button>
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
          </DialogHeader>
          {receiptData && (
            <div className="space-y-4">
              <div className="border-2 border-dashed p-4 space-y-3">
                <div className="text-center border-b pb-3">
                  <h3 className="font-bold text-lg">College Fee Receipt</h3>
                  <p className="text-sm text-muted-foreground">Receipt No: {receiptData.receiptNo}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Student Name:</span>
                    <span className="font-semibold">{receiptData.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roll Number:</span>
                    <span className="font-semibold">{receiptData.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid:</span>
                    <span className="font-bold text-lg text-accent">₹{receiptData.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Mode:</span>
                    <span className="font-semibold">{receiptData.paymentMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date & Time:</span>
                    <span className="font-semibold">{receiptData.date}</span>
                  </div>
                  {receiptData.remarks && (
                    <div>
                      <span className="text-muted-foreground">Remarks:</span>
                      <p className="text-sm mt-1">{receiptData.remarks}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Button onClick={handlePrintReceipt} className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  WhatsApp and Email notification will be sent to parent
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeeCollection;
