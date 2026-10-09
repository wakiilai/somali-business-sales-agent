export interface Crumb {
  label: string;
  href?: string;
}

export interface StaffRouteMeta {
  title: string;
  description: string;
  crumbs: Crumb[];
}

interface SegmentConfig {
  title: string;
  description: string;
}

const segments: Record<string, SegmentConfig> = {
  dashboard: { title: "Dashboard", description: "Operational overview" },
  conversations: {
    title: "Conversations",
    description: "Customer chat threads and handoffs",
  },
  leads: { title: "Leads", description: "Sales pipeline and follow-ups" },
  quotations: {
    title: "Quotations",
    description: "Drafted and approved quotes",
  },
  approvals: { title: "Approvals", description: "Human approval queue" },
  automations: {
    title: "Automations",
    description: "Workflow runs and lifecycle",
  },
  audit: {
    title: "Audit",
    description: "Redacted, tenant-scoped event trail",
  },
};

export function resolveStaffCrumbs(pathname: string): StaffRouteMeta {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0] ?? "";

  const config = segments[first];
  if (!config) {
    return {
      title: "Hilaac Electronics",
      description: "Staff operations console",
      crumbs: [{ label: "Staff console" }],
    };
  }

  const crumbs: Crumb[] = [];
  const detail = parts[1];

  if (detail) {
    crumbs.push({ label: config.title, href: `/${first}` });
    crumbs.push({ label: detail });
  } else {
    crumbs.push({ label: config.title });
  }

  return {
    title: config.title,
    description: config.description,
    crumbs,
  };
}