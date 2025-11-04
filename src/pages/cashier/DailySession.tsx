import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, Lock, Unlock } from 'lucide-react';
import { dailySessions } from '@/utils/dummyData';
import { toast } from 'sonner';

const DailySession = () => {
  const currentSession = dailySessions.find((s) => s.isOpen);
  const [isOpen, setIsOpen] = useState(currentSession?.isOpen || false);
  const [showClosingSummary, setShowClosingSummary] = useState(false);
  const [sessionData, setSessionData] = useState(currentSession);

  const handleStartDay = () => {
    setIsOpen(true);
    const newSession = {
      id: String(dailySessions.length + 1),
      date: new Date().toISOString().split('T')[0],
      openedBy: 'Priya Sharma',
      openedAt: new Date(),
      isOpen: true,
      totalTransactions: 0,
      totalAmount: 0,
      cashAmount: 0,
      cardAmount: 0,
      upiAmount: 0,
      chequeAmount: 0,
    };
    setSessionData(newSession);
    toast.success('Day opening completed successfully');
  };

  const handleCloseDay = () => {
    setShowClosingSummary(true);
  };

  const confirmClosing = () => {
    setIsOpen(false);
    setShowClosingSummary(false);
    toast.success('Day closing completed successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Daily Session Control</h1>
        <p className="text-muted-foreground">Manage daily opening and closing for fee collection</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-lg ${isOpen ? 'bg-accent' : 'bg-muted'}`}>
                {isOpen ? (
                  <Unlock className="h-8 w-8 text-accent-foreground" />
                ) : (
                  <Lock className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {isOpen ? 'Session Open' : 'Session Closed'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isOpen ? 'Fee collection is active' : 'Start day opening to begin'}
                </p>
              </div>
            </div>

            {isOpen && sessionData && (
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Opened at:</span>
                  <span className="font-semibold">
                    {sessionData.openedAt.toLocaleTimeString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Opened by:</span>
                  <span className="font-semibold">{sessionData.openedBy}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {!isOpen ? (
                <Button onClick={handleStartDay} className="w-full" size="lg">
                  <Unlock className="h-5 w-5 mr-2" />
                  Start Day Opening
                </Button>
              ) : (
                <Button onClick={handleCloseDay} className="w-full" size="lg" variant="destructive">
                  <Lock className="h-5 w-5 mr-2" />
                  Perform Day Closing
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isOpen && sessionData && (
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Collection</p>
                  <p className="text-3xl font-bold text-primary">
                    ₹{sessionData.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Transactions</p>
                    <p className="text-2xl font-bold">{sessionData.totalTransactions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Cash</p>
                    <p className="text-lg font-semibold text-accent">
                      ₹{sessionData.cashAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Card</p>
                    <p className="text-lg font-semibold text-accent">
                      ₹{sessionData.cardAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">UPI</p>
                    <p className="text-lg font-semibold text-accent">
                      ₹{sessionData.upiAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showClosingSummary} onOpenChange={setShowClosingSummary}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Day Closing Summary</DialogTitle>
          </DialogHeader>
          {sessionData && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Transactions:</span>
                  <span className="font-bold text-lg">{sessionData.totalTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-bold text-2xl text-accent">
                    ₹{sessionData.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Mode-wise Breakdown:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted rounded">
                    <p className="text-sm text-muted-foreground">Cash</p>
                    <p className="font-semibold">₹{sessionData.cashAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-sm text-muted-foreground">Card</p>
                    <p className="font-semibold">₹{sessionData.cardAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-sm text-muted-foreground">UPI</p>
                    <p className="font-semibold">₹{sessionData.upiAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-3 bg-muted rounded">
                    <p className="text-sm text-muted-foreground">Cheque</p>
                    <p className="font-semibold">₹{sessionData.chequeAmount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-destructive font-semibold mb-4">
                  ⚠️ After closing, no new transactions can be recorded for today.
                </p>
                <Button onClick={confirmClosing} className="w-full" variant="destructive">
                  Confirm Day Closing
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DailySession;
