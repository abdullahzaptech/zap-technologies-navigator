import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Search, DollarSign, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { Json } from '@/integrations/supabase/types';

type PricingPackage = {
  id: string; name: string; price: string; description: string | null;
  features: Json | null; delivery_time: string | null; category: string | null;
  is_active: boolean; sort_order: number | null; created_at: string;
};

const defaultForm = {
  name: '', price: '', description: '', features: '', delivery_time: '',
  category: '', is_active: true, sort_order: 0,
};

const AdminPricing = () => {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const queryClient = useQueryClient();

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['admin-pricing'],
    queryFn: async () => {
      const { data, error } = await supabase.from('pricing_packages').select('*').order('sort_order');
      if (error) throw error;
      return data as PricingPackage[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (f: typeof form) => {
      const payload = {
        name: f.name, price: f.price, description: f.description || null,
        features: f.features ? f.features.split('\n').filter(Boolean) : [],
        delivery_time: f.delivery_time || null, category: f.category || null,
        is_active: f.is_active, sort_order: f.sort_order,
      };
      if (editingId) {
        const { error } = await supabase.from('pricing_packages').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pricing_packages').insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
      toast.success(editingId ? 'Package updated!' : 'Package created!');
      resetForm();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pricing_packages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
      toast.success('Package deleted!');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const resetForm = () => { setForm(defaultForm); setEditingId(null); setIsDialogOpen(false); };

  const openEdit = (pkg: PricingPackage) => {
    const feats = Array.isArray(pkg.features) ? (pkg.features as string[]).join('\n') : '';
    setForm({
      name: pkg.name, price: pkg.price, description: pkg.description || '',
      features: feats, delivery_time: pkg.delivery_time || '',
      category: pkg.category || '', is_active: pkg.is_active, sort_order: pkg.sort_order || 0,
    });
    setEditingId(pkg.id);
    setIsDialogOpen(true);
  };

  const filtered = packages.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Pricing Management</h1>
            <p className="text-sm text-muted-foreground">Manage pricing packages and plans</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { if (!open) resetForm(); else setIsDialogOpen(true); }}>
            <DialogTrigger asChild>
              <Button><Plus className="h-4 w-4 mr-2" />New Package</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit' : 'Create'} Pricing Package</DialogTitle>
              </DialogHeader>
              <form onSubmit={e => { e.preventDefault(); saveMutation.mutate(form); }} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Package Name</Label>
                  <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Basic Web Development" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="$999" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Time</Label>
                    <Input value={form.delivery_time} onChange={e => setForm({ ...form, delivery_time: e.target.value })} placeholder="2-4 weeks" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Web Development" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the package..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label>Features (one per line)</Label>
                  <Textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={"Responsive design\nSEO optimization\n5 pages"} rows={5} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div className="flex items-end pb-2">
                    <div className="flex items-center gap-2">
                      <Switch id="active" checked={form.is_active} onCheckedChange={v => setForm({ ...form, is_active: v })} />
                      <Label htmlFor="active">Active</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button type="submit" disabled={saveMutation.isPending}>
                    {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingId ? 'Update' : 'Save'} Package
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search packages..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <DollarSign className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No pricing packages yet.</p>
                      </TableCell>
                    </TableRow>
                  ) : filtered.map(pkg => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{pkg.price}</TableCell>
                      <TableCell className="hidden md:table-cell">{pkg.category || '—'}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={pkg.is_active ? 'default' : 'secondary'}>{pkg.is_active ? 'Active' : 'Inactive'}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(pkg)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(pkg.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPricing;
