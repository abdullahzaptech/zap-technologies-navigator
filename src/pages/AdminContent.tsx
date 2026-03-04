import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save } from 'lucide-react';

const AdminContent = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
          <p className="text-sm text-muted-foreground">Edit homepage sections and site content</p>
        </div>

        <Tabs defaultValue="hero">
          <TabsList className="mb-4">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="cta">CTA Section</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input placeholder="Main headline text" />
                </div>
                <div className="space-y-2">
                  <Label>Subheadline</Label>
                  <Textarea placeholder="Supporting text..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CTA Button Text</Label>
                    <Input placeholder="Get Started" />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA Button Link</Label>
                    <Input placeholder="/contact" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Background Image URL</Label>
                  <Input placeholder="https://..." />
                </div>
                <Button><Save className="h-4 w-4 mr-2" />Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Services Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input placeholder="Our Services" />
                </div>
                <div className="space-y-2">
                  <Label>Section Description</Label>
                  <Textarea placeholder="Describe your services..." rows={3} />
                </div>
                <Button><Save className="h-4 w-4 mr-2" />Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">Testimonials Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input placeholder="What Our Clients Say" />
                </div>
                <p className="text-sm text-muted-foreground">Individual testimonials can be managed through the database. This section controls the overall layout.</p>
                <Button><Save className="h-4 w-4 mr-2" />Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cta">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">CTA Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Heading</Label>
                  <Input placeholder="Ready to get started?" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Compelling call to action text..." rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Button Text</Label>
                    <Input placeholder="Contact Us" />
                  </div>
                  <div className="space-y-2">
                    <Label>Button Link</Label>
                    <Input placeholder="/contact" />
                  </div>
                </div>
                <Button><Save className="h-4 w-4 mr-2" />Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminContent;
