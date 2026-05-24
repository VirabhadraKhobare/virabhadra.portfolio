import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "../lib/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { GlassCard } from "../components/ui/GlassCard.jsx";
import { CrudPanel } from "../components/admin/CrudPanel.jsx";
import toast from "react-hot-toast";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "blogs", label: "Blogs" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experiences", label: "Experiences" },
  { id: "certificates", label: "Certificates" },
  { id: "testimonials", label: "Testimonials" },
  { id: "messages", label: "Messages" },
  { id: "analytics", label: "Analytics" },
];

const blogFields = [
  { name: "title", label: "Title" },
  { name: "excerpt", label: "Excerpt", type: "textarea", rows: 3 },
  { name: "content", label: "Content (Markdown)", type: "textarea", rows: 10 },
  { name: "slug", label: "Slug" },
  { name: "coverImage", label: "Cover image URL" },
  { name: "author", label: "Author" },
  { name: "status", label: "Status" },
  { name: "featured", label: "Featured", type: "checkbox" },
];

const projectFields = [
  { name: "title", label: "Title" },
  { name: "summary", label: "Summary", type: "textarea", rows: 3 },
  { name: "description", label: "Description", type: "textarea", rows: 6 },
  { name: "slug", label: "Slug" },
  { name: "coverImage", label: "Cover image URL" },
  { name: "techStack", label: "Tech stack (comma separated)" },
  { name: "liveUrl", label: "Live URL" },
  { name: "githubUrl", label: "GitHub URL" },
  { name: "category", label: "Category" },
  { name: "featured", label: "Featured", type: "checkbox" },
];

const skillFields = [
  { name: "name", label: "Name" },
  { name: "category", label: "Category" },
  { name: "level", label: "Level", type: "number" },
  { name: "order", label: "Order", type: "number" },
  { name: "icon", label: "Icon URL" },
];

const experienceFields = [
  { name: "company", label: "Company" },
  { name: "role", label: "Role" },
  { name: "location", label: "Location" },
  { name: "startDate", label: "Start date" },
  { name: "endDate", label: "End date" },
  { name: "summary", label: "Summary", type: "textarea", rows: 4 },
  { name: "highlights", label: "Highlights (comma separated)" },
  { name: "type", label: "Type" },
];

const certificateFields = [
  { name: "title", label: "Title" },
  { name: "issuer", label: "Issuer" },
  { name: "issuedAt", label: "Issued at" },
  { name: "thumbnailUrl", label: "Thumbnail URL" },
  { name: "pdfUrl", label: "PDF URL" },
  { name: "verificationUrl", label: "Verification URL" },
  { name: "category", label: "Category" },
];

const testimonialFields = [
  { name: "name", label: "Name" },
  { name: "role", label: "Role" },
  { name: "company", label: "Company" },
  { name: "quote", label: "Quote", type: "textarea", rows: 5 },
  { name: "avatarUrl", label: "Avatar URL" },
  { name: "featured", label: "Featured", type: "checkbox" },
];

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("overview");
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/dashboard");
        setSummary(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load dashboard",
        );
      }
    };

    load();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <Helmet>
        <title>Admin Dashboard | Virbhadra Khobare</title>
      </Helmet>
      <div className="mx-auto max-w-7xl space-y-6">
        <GlassCard>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
                Admin dashboard
              </p>
              <h1 className="mt-2 font-display text-3xl font-black">
                {user?.name || "Virbhadra Khobare"}
              </h1>
              <p className="text-sm text-[var(--muted)]">
                Manage blogs, projects, messages, analytics, and portfolio
                content.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="control-surface rounded-full px-4 py-2 text-sm font-semibold focus-ring"
            >
              Logout
            </button>
          </div>
        </GlassCard>

        <div className="flex flex-wrap gap-2">
          {tabs.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setTab(entry.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold focus-ring ${tab === entry.id ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200" : "control-surface"}`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        {tab === "overview" && summary ? (
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {Object.entries(summary.counts).map(([label, value]) => (
              <GlassCard key={label}>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  {label}
                </p>
                <p className="mt-4 text-4xl font-black">{value}</p>
              </GlassCard>
            ))}
          </div>
        ) : null}

        {tab === "blogs" ? (
          <CrudPanel
            title="Blog posts"
            description="Create and manage SEO-ready articles"
            endpoint="/blogs"
            fields={blogFields}
            transformOut={(form) => ({
              ...form,
              tags: form.tags
                ? form.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : [],
            })}
            transformIn={(item) => ({
              ...item,
              tags: item.tags?.join(", ") || "",
            })}
          />
        ) : null}
        {tab === "projects" ? (
          <CrudPanel
            title="Projects"
            description="Manage featured work and tech stacks"
            endpoint="/projects"
            fields={projectFields}
            transformOut={(form) => ({
              ...form,
              techStack: form.techStack
                ? form.techStack
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : [],
            })}
            transformIn={(item) => ({
              ...item,
              techStack: item.techStack?.join(", ") || "",
            })}
          />
        ) : null}
        {tab === "skills" ? (
          <CrudPanel
            title="Skills"
            description="Update capability groups"
            endpoint="/skills"
            fields={skillFields}
          />
        ) : null}
        {tab === "experiences" ? (
          <CrudPanel
            title="Experiences"
            description="Maintain timeline cards"
            endpoint="/experiences"
            fields={experienceFields}
            transformOut={(form) => ({
              ...form,
              highlights: form.highlights
                ? form.highlights
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : [],
            })}
            transformIn={(item) => ({
              ...item,
              highlights: item.highlights?.join(", ") || "",
            })}
          />
        ) : null}
        {tab === "certificates" ? (
          <CrudPanel
            title="Certificates"
            description="Upload certificate references and previews"
            endpoint="/certificates"
            fields={certificateFields}
          />
        ) : null}
        {tab === "testimonials" ? (
          <CrudPanel
            title="Testimonials"
            description="Publish social proof cards"
            endpoint="/testimonials"
            fields={testimonialFields}
          />
        ) : null}
        {tab === "messages" ? (
          <CrudPanel
            title="Messages"
            description="Review incoming contact form submissions"
            endpoint="/contact/messages"
            fields={[]}
            readOnly
            listKey=""
          />
        ) : null}
        {tab === "analytics" ? (
          <GlassCard>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">
              Analytics
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Visitor activity
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {summary?.recentVisitors?.slice(0, 6).map((visitor) => (
                <div
                  key={visitor._id}
                  className="rounded-2xl border border-[var(--border)] bg-white/5 p-4 text-sm text-[var(--muted)]"
                >
                  <p className="font-semibold text-[var(--text)]">
                    {visitor.path}
                  </p>
                  <p className="mt-1">{visitor.country || "Unknown country"}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        ) : null}
      </div>
    </div>
  );
}
