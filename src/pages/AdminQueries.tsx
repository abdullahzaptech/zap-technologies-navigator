import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, Loader2, Eye } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

type FormQuery = {
  id: string; name: string; email: string; subject: string | null;
  message: string | null; status: 'new' | 'read' | 'resolved'; created_at: string;
};

const statusColors = { new: 'destructive', read: 'secondary', resolved: 'default' } as const;

const AdminQueries = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuery, setSelectedQuery] = useState<FormQuery | null>(null);
  const queryClient = useQueryClient();

  const { data: queries = [], isLoading } = useQuery({
    queryKey: ['admin-queries'],
    queryFn: async () => {
      const { data, error } = await supabase.from('form_queries').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data as FormQuery[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'new' | 'read' | 'resolved' }) => {
      const { error } = await supabase.from('form_queries').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-queries'] });
      toast.success('Status updated!');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = queries.filter(q => {
    const matchSearch = q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      (q.subject || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Form Queries</h1>
          <p className="text-sm text-muted-foreground">View and manage form submissions</p>
        </div>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search queries..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="w-[80px]">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No form submissions yet.</p>
                      </TableCell>
                    </TableRow>
                  ) : filtered.map(q => (
                    <TableRow key={q.id}>
                      <TableCell className="font-medium">{q.name}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{q.email}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{q.subject || '—'}</TableCell>
                      <TableCell>
                        <Badge variant={statusColors[q.status]}>{q.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                        {new Date(q.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => {
                          setSelectedQuery(q);
                          if (q.status === 'new') updateStatusMutation.mutate({ id: q.id, status: 'read' });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!selectedQuery} onOpenChange={(open) => { if (!open) setSelectedQuery(null); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Query from {selectedQuery?.name}</DialogTitle>
            </DialogHeader>
            {selectedQuery && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedQuery.email}</span></div>
                  <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{new Date(selectedQuery.created_at).toLocaleString()}</span></div>
                </div>
                {selectedQuery.subject && (
                  <div className="text-sm"><span className="text-muted-foreground">Subject:</span> <span className="font-medium">{selectedQuery.subject}</span></div>
                )}
                <div className="bg-muted/50 rounded-lg p-4 text-sm whitespace-pre-wrap">{selectedQuery.message || 'No message'}</div>
                <div className="flex gap-2">
                  <Select value={selectedQuery.status} onValueChange={(v) => {
                    updateStatusMutation.mutate({ id: selectedQuery.id, status: v as 'new' | 'read' | 'resolved' });
                    setSelectedQuery({ ...selectedQuery, status: v as 'new' | 'read' | 'resolved' });
                  }}>
                    <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminQueries;
