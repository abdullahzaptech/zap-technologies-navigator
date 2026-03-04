import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, MessageSquare, Link2, TrendingUp, Users } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Blog Posts', value: '0', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Pricing Packages', value: '0', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Form Queries', value: '0', icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'Managed Links', value: '0', icon: Link2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome to the Zap Technologies Admin Panel</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-border/60">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No recent activity. Start by adding blog posts or pricing packages.</p>
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Recent Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No form submissions yet. Queries from your contact form will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
