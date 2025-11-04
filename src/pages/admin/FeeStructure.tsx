import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Save } from 'lucide-react';
import { feeHeads } from '@/utils/dummyData';
import { toast } from 'sonner';

const FeeStructure = () => {
  const handleSave = () => {
    toast.success('Fee structure updated successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fee Structure</h1>
          <p className="text-muted-foreground">Define fee heads and amounts for different courses</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Fee Heads</CardTitle>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Fee Head
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Fee Head Name</th>
                  <th className="text-right p-3 font-semibold">Amount (₹)</th>
                  <th className="text-center p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeHeads.map((head) => (
                  <tr key={head.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <Input defaultValue={head.name} />
                    </td>
                    <td className="p-3">
                      <Input
                        type="number"
                        defaultValue={head.amount}
                        className="text-right"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 bg-muted">
                  <td className="p-3 font-bold">Total Fee</td>
                  <td className="p-3 text-right font-bold text-lg text-primary">
                    ₹{feeHeads.reduce((sum, h) => sum + h.amount, 0).toLocaleString('en-IN')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course-wise Fee Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Assign fee structures to specific courses, years, and sections. The total fee above will be applied.
          </p>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">MPC - First Year</h4>
                <span className="text-lg font-bold text-primary">₹51,500</span>
              </div>
              <p className="text-sm text-muted-foreground">Applied to: First Year A, First Year B</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">BiPC - First Year</h4>
                <span className="text-lg font-bold text-primary">₹51,500</span>
              </div>
              <p className="text-sm text-muted-foreground">Applied to: First Year A, First Year B</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeeStructure;
