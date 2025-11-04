import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter } from 'lucide-react';
import { students } from '@/utils/dummyData';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || student.feeStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Fully Paid':
        return 'default';
      case 'Partially Paid':
        return 'secondary';
      case 'Pending':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-muted-foreground">Manage all student records and fee details</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Fully Paid">Fully Paid</SelectItem>
                <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-semibold">Roll Number</th>
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Course</th>
                  <th className="text-left p-3 font-semibold">Section</th>
                  <th className="text-right p-3 font-semibold">Total Fee</th>
                  <th className="text-right p-3 font-semibold">Paid Amount</th>
                  <th className="text-right p-3 font-semibold">Pending</th>
                  <th className="text-center p-3 font-semibold">Status</th>
                  <th className="text-center p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium text-primary">{student.rollNumber}</td>
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.course}</td>
                    <td className="p-3 text-sm text-muted-foreground">{student.section}</td>
                    <td className="p-3 text-right font-semibold">₹{student.totalFee.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right text-accent font-semibold">₹{student.paidAmount.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right text-destructive font-semibold">₹{student.pendingBalance.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-center">
                      <Badge variant={getStatusVariant(student.feeStatus)}>
                        {student.feeStatus}
                      </Badge>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentManagement;
