export interface NavItem {
  label: string;
  href?: string;
}

export interface Feature {
  title: string;
  description: string;
  iconName: 'FileText' | 'Users' | 'CheckCircle' | 'ListChecks';
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Step {
  step: number;
  label: string;
  title: string;
  body: string[];
  iconName: 'Phone' | 'Clipboard' | 'FileText' | 'PenTool';
  flip?: boolean;
}

export const landingPageContent = {
  nav: [
    { label: "Services" },
    { label: "Features" },
    { label: "About Us" },
    { label: "Support" },
  ] as NavItem[],

  features: [
    {
      title: "All forms digitalized",
      description: "Simplifying your paperwork with all your forms at your fingertips.",
      iconName: 'FileText' as const,
    },
    {
      title: "Information in one place",
      description: "All your case information in one place, accessible from any phone, computer, or tablet.",
      iconName: 'Users' as const,
    },
    {
      title: "Digital signatures",
      description: "Get all your forms signed instantly.",
      iconName: 'CheckCircle' as const,
    },
    {
      title: "Checklists",
      description: "Stay on top of your cases with organized checklists.",
      iconName: 'ListChecks' as const,
    },
  ] as Feature[],

  testimonials: [
    {
      quote:
        "Rite Path has transformed how we serve families. The digital catalog feature alone has saved us countless hours.",
      name: "Michael Thompson",
      role: "Funeral Director",
      company: "Thompson Memorial Services",
    },
    {
      quote:
        "Our families love being able to review and select services from home. It gives them time to make thoughtful decisions.",
      name: "Sarah Martinez",
      role: "Owner",
      company: "Martinez & Sons Funeral Home",
    },
    {
      quote: "The first call workflow ensures we never miss critical information. It's been a game-changer for our team.",
      name: "Robert Chen",
      role: "Managing Director",
      company: "Chen Family Funeral Care",
    },
  ] as Testimonial[],

  benefits: [
    { title: "Save Time", description: "Reduce administrative work by up to 70% with automated workflows" },
    { title: "Increase Transparency", description: "Families can view and approve arrangements from their own devices" },
    { title: "Stay Compliant", description: "Built-in GPL generation and FTC compliance features" },
    { title: "Mobile-First", description: "Access your cases from anywhere, on any device" },
  ] as Benefit[],

  steps: [
    {
      step: 1,
      label: "Step 1",
      title: "First Call Made Simple",
      body: [
        "Capture essential information during the initial family contact with guided forms. Our intuitive interface ensures you never miss critical details during this sensitive time.",
        "Everything is encrypted and auto-saved, so you can focus on providing compassionate support to families in their time of need.",
      ],
      iconName: 'Phone' as const,
    },
    {
      step: 2,
      label: "Step 2",
      title: "Centralized Case Management",
      body: [
        "Organize vital statistics, documents, and family preferences in one secure place. Track your desktop and mobile workflow rankings from any location and plot your full case history on interactive dashboards.",
        "Set up automated notifications to be sent to your team, so you'll never forget to check important case progress or miss critical deadlines.",
      ],
      iconName: 'Clipboard' as const,
      flip: true,
    },
    {
      step: 3,
      label: "Step 3",
      title: "Digital Family Catalog",
      body: [
        "Share packages and services with families via secure digital links. Let families browse and select options from the comfort of their home, giving them time to make thoughtful decisions.",
        "Real-time updates ensure both you and the family are always on the same page, with transparent pricing and package customization options.",
      ],
      iconName: 'FileText' as const,
    },
    {
      step: 4,
      label: "Step 4",
      title: "Instant E-Signatures",
      body: [
        "Generate contracts and collect digital signatures instantly. No more printing, scanning, or waiting for documents to be signed and returned.",
        "Legal, secure, and compliant e-signatures with automated filing ensure your paperwork is always organized and accessible when you need it.",
      ],
      iconName: 'PenTool' as const,
      flip: true,
    },
  ] as Step[],
};

