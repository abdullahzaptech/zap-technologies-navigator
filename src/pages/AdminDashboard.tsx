import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, FileText, DollarSign, MessageSquare, Link2, Layout, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/zaplogin', { replace: true });
  };

  const sections = [
    { title: 'Blog Management', icon: FileText, description: 'Create, edit, and manage blog posts', path: '/admin/blog', color: 'text-blue-500' },
    { title: 'Pricing Management', icon: DollarSign, description: 'Manage pricing packages', path: '/admin/pricing', color: 'text-green-500' },
    { title: 'Form Queries', icon: MessageSquare, description: 'View and respond to submissions', path: '/admin/queries', color: 'text-orange-500' },
    { title: 'Links Management', icon: Link2, description: 'Manage site navigation links', path: '/admin/links', color: 'text-purple-500' },
    { title: 'Content Management', icon: Layout, description: 'Edit homepage and site content', path: '/admin/content', color: 'text-pink-500' },
    { title: 'Security & Audit', icon: Shield, description: 'View audit logs and manage users', path: '/admin/security', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="cursor-pointer hover:shadow-md transition-shadow border-border/60"
              onClick={() => navigate(section.path)}
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <section.icon className={`h-6 w-6 ${section.color}`} />
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-border/60">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Dashboard statistics will be available once content is added. Use the sections above to manage your site.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
