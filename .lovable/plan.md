

## Free Resources Landing Page — Implementation Plan

This is a significant feature requiring new database tables, a new public-facing page, and admin management UI. Here's the approach:

### 1. Database Changes (Migration)

Create a new `resources` table to store downloadable files/links:

```sql
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id uuid REFERENCES public.landing_pages(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  file_url text,           -- uploaded file or external URL
  resource_type text NOT NULL DEFAULT 'free',  -- 'free' or 'premium'
  category text,
  download_count integer NOT NULL DEFAULT 0,
  sort_order integer DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
```

RLS policies:
- Admins: full access
- Public: SELECT on active resources where the linked landing page is visible
- Public: UPDATE on `download_count` only (via an RPC function for safe incrementing)

Create an `increment_download_count` database function (SECURITY DEFINER) so anonymous users can safely bump the counter without broad UPDATE access.

Add `landing_page_type` enum value `'resource'` so we can distinguish resource pages from other landing page types.

### 2. New Public Page: `/p/:slug` Enhancement

Update `src/pages/LandingPage.tsx` to handle `page_type === 'resource'`:

- **Hero Section**: Already renders from page title/description — works as-is
- **"What We Do" Section**: Already supported via `landing_page_sections` (heading + text)
- **Submission Form**: Already exists — just needs the right form fields (Name optional, Email required, WhatsApp required)
- **NEW — Resource Download Section** (shown after form submission):
  - Query `resources` table filtered by `landing_page_id`
  - Display cards with title, description, category badge, download button
  - Track downloads by calling the `increment_download_count` RPC
  - Show download count per resource
  - Highlight popular downloads (highest download_count)
  - Social sharing buttons (WhatsApp, Twitter/X, LinkedIn, copy link)

### 3. Admin Panel: Resource Management

Extend `src/pages/AdminLandingPages.tsx`:

- Add a **"Resources"** tab (alongside Settings, Sections, Form Fields) when editing a resource-type page
- Resource management UI:
  - Add/edit/remove resources with title, description, file upload or external URL, category, free/premium toggle
  - Drag-to-reorder resources
  - View download count per resource
- **Analytics sub-tab**: Show total submissions, total downloads, downloads per resource (bar chart using recharts)
- Submission viewer already exists — just reuse it

### 4. Pre-configured Defaults

When creating a new landing page with type `'resource'`:
- Auto-populate form fields: Name (optional), Email (required), WhatsApp Number (required)
- Auto-populate sections: Hero heading + "What We Do" text block
- Set CTA text in content metadata

### 5. FAQ Section

Add a simple FAQ component rendered on resource-type landing pages. FAQ data stored as a JSON array in `landing_page_sections` with `section_type` — will need to add `'faq'` to the `section_type` enum.

### Summary of Changes

| Area | Files/Tables |
|------|-------------|
| Database migration | New `resources` table, `increment_download_count` function, new enum values (`resource` page type, `faq` section type) |
| Public page | `src/pages/LandingPage.tsx` — add resource cards, social sharing, download tracking, FAQ rendering |
| Admin panel | `src/pages/AdminLandingPages.tsx` — add Resources tab, analytics dashboard, resource CRUD |
| New component | `src/components/landing/SocialShareButtons.tsx` |

