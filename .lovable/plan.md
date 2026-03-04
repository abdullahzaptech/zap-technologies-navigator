

# Admin Panel for Zap Technologies

## Important Prerequisite

Your project is **not connected to Supabase** yet. The admin panel requires a database for storing blog posts, pricing packages, form queries, links, and content — plus authentication for admin login. We need to connect Supabase (or Lovable Cloud) before building this.

I recommend using **Lovable Cloud** (spins up a backend automatically) or connecting an external Supabase project.

## Phased Implementation Plan

Given the scope, I recommend building this in **3 phases** to keep things manageable and testable.

---

### Phase 1: Database, Auth, and Admin Login

**Database tables** (via Supabase migrations):
- `pricing_packages` — name, price, description, features (jsonb), delivery_time, category, is_active
- `blog_posts` — title, slug, content, excerpt, category, featured_image, author_name, author_role, tags (jsonb), published, publish_date
- `form_queries` — name, email, subject, message, status (new/read/resolved), created_at
- `managed_links` — name, url, target, category (header/footer/external), sort_order
- `site_content` — section_key, content (jsonb) for hero, testimonials, etc.
- `user_roles` — user_id, role (admin enum) with security-definer `has_role()` function
- `audit_log` — user_id, action, table_name, details (jsonb), created_at

**RLS policies**: All tables protected; only users with `admin` role can read/write.

**Admin login page** (`/admin/zaplogin`):
- Supabase Auth email/password login
- Role check after login — redirect non-admins
- Strong password requirement enforced at signup

---

### Phase 2: Admin Layout and Core CRUD Pages

**Admin layout** with sidebar navigation:
- Dashboard, Pricing, Blog, Queries, Links, Content sections
- Sidebar using shadcn Sidebar component
- Protected route wrapper checking admin role

**Pages to create**:
1. `/admin/dashboard` — stats cards (blog count, package count, recent queries, recent updates)
2. `/admin/pricing` — table of packages with add/edit/delete modals
3. `/admin/blog` — table of posts with add/edit form (rich text via textarea + markdown), publish toggle
4. `/admin/queries` — table of form submissions with status management and detail view
5. `/admin/links` — table of managed links with CRUD
6. `/admin/content` — editable sections for hero, testimonials, featured projects

---

### Phase 3: Connect Frontend to Database

- Migrate existing hardcoded data (pricing packages in `Pricing.tsx`, blog posts in `blogData.ts`) to read from Supabase
- Contact form submissions write to `form_queries` table
- Admin changes reflect on the public site in real-time

---

## Technical Approach

- **Auth**: Supabase Auth with email/password; role stored in `user_roles` table with `has_role()` security-definer function
- **Frontend**: React + shadcn UI components (Table, Dialog, Form, Sidebar, Tabs, Accordion)
- **Data fetching**: TanStack React Query with Supabase client
- **Routing**: New admin routes under `/admin/*` in App.tsx with a protected layout component
- **No external admin libraries** — built with existing shadcn components for consistency

## Next Step

**Please connect Supabase** (either via Lovable Cloud or an external project) so I can create the database schema and begin implementation. You can do this from **Settings > Integrations > Supabase**.

