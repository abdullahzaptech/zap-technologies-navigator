

## Admin-Controlled Landing Pages System

This is a significant feature that adds a dynamic landing page builder to the admin panel, allowing creation and management of Job, Services, and Course Request pages with custom forms and visibility controls.

### Database Changes

**New tables:**

1. **`landing_pages`** - Core page management
   - `id`, `title`, `slug` (unique), `page_type` (enum: job, services, course_request, custom), `is_visible` (boolean), `meta_title`, `meta_description`, `sort_order`, `created_at`, `updated_at`
   - RLS: public SELECT where `is_visible = true`, admin ALL

2. **`landing_page_sections`** - Content blocks per page
   - `id`, `landing_page_id` (FK), `section_type` (enum: heading, text, image, form, rich_text), `title`, `content` (jsonb), `sort_order`, `created_at`, `updated_at`
   - RLS: public SELECT via visible parent page, admin ALL

3. **`landing_page_form_fields`** - Custom form field definitions per page
   - `id`, `landing_page_id` (FK), `field_label`, `field_type` (text, email, phone, textarea, select, file), `is_required`, `options` (jsonb for select options), `sort_order`
   - RLS: public SELECT via visible parent page, admin ALL

4. **`landing_page_submissions`** - Form submission storage
   - `id`, `landing_page_id` (FK), `form_data` (jsonb), `attachment_urls` (jsonb), `created_at`
   - RLS: public INSERT, admin SELECT/ALL

**New enums:** `landing_page_type`, `section_type`, `form_field_type`

### Frontend: Admin Panel

**New page: `AdminLandingPages.tsx`**
- List all landing pages with visibility toggle, type badge, edit/delete actions
- Create/Edit dialog with:
  - Page settings (title, slug, type, SEO meta fields, visibility toggle)
  - Content sections manager - add/reorder/remove sections (heading, rich text, image)
  - Form builder - add/reorder/remove form fields with type selection and required toggle
- Submissions viewer per page (table with data, expandable rows, CSV export button)

**Sidebar update:** Add "Landing Pages" menu item to `AdminSidebar.tsx`

### Frontend: Public Pages

**New page: `LandingPage.tsx`**
- Dynamic route `/p/:slug` that fetches page data by slug where `is_visible = true`
- Renders sections in order (headings, text blocks, images)
- Renders the custom form with validation, file upload support
- Submissions saved to `landing_page_submissions` + email notification via existing edge function pattern
- 404 if page not found or hidden

**New route in `App.tsx`:** `<Route path="/p/:slug" element={<LandingPage />} />`

### Edge Function

**`send-landing-submission-email/index.ts`** - Sends notification email to admin when a form is submitted on a landing page, using the same Gmail SMTP pattern as existing contact/booking email functions.

### Implementation Scope

Given the complexity, this will be built in phases:

**Phase 1 (Core):**
- Database tables + enums + RLS
- Admin CRUD for landing pages with visibility toggle
- Content sections (text/heading/image) management
- Public dynamic page rendering

**Phase 2 (Forms):**
- Form field builder in admin
- Public form rendering with validation + file uploads
- Submissions storage + admin viewer
- Email notifications

**Phase 3 (Polish):**
- CSV export of submissions
- SEO meta tags on public pages
- Rich text editor (using contentEditable or a lightweight library)
- Page type templates (pre-fill sections/forms for Job, Services, Course types)

### Technical Notes

- Rich text will use a simple markdown/HTML textarea initially (full WYSIWYG would require adding a library like TipTap)
- File uploads reuse the existing `form-attachments` storage bucket
- Section reordering uses `sort_order` integer field, managed via up/down buttons in the admin UI
- The `page_type` field serves as a template hint - when creating a page of type "job", default form fields (Name, Email, CV upload) are pre-populated

