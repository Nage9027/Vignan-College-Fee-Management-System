import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { courses, sections } from '@/utils/dummyData';

const AcademicManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Academic Management</h1>
        <p className="text-muted-foreground">Manage courses, streams, and sections</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Courses/Streams</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Courses</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Course Code</th>
                      <th className="text-left p-3 font-semibold">Course Name</th>
                      <th className="text-center p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b hover:bg-muted/30">
                        <td className="p-3 font-medium text-primary">{course.code}</td>
                        <td className="p-3">{course.name}</td>
                        <td className="p-3">
                          <div className="flex gap-2 justify-center">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Sections</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-3 font-semibold">Section Name</th>
                      <th className="text-left p-3 font-semibold">Course</th>
                      <th className="text-left p-3 font-semibold">Year</th>
                      <th className="text-center p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sections.map((section) => {
                      const course = courses.find((c) => c.id === section.courseId);
                      return (
                        <tr key={section.id} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-medium">{section.name}</td>
                          <td className="p-3">{course?.code}</td>
                          <td className="p-3 text-muted-foreground">{section.year}</td>
                          <td className="p-3">
                            <div className="flex gap-2 justify-center">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">Delete</Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default AcademicManagement;
