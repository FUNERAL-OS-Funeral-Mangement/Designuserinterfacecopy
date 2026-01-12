'use client';

import { useMemo, useState } from "react";
import Link from 'next/link';
import {
  Menu,
  X,
  Heart,
  Phone,
  FileText,
  Clipboard,
  PenTool,
  ArrowRight,
  CheckCircle,
  Users,
  Star,
  ListChecks,
} from "lucide-react";

type NavItem = { label: string; href?: string };
type Feature = { title: string; description: string; icon: React.ReactNode };
type Step = { step: number; label: string; title: string; body: string[]; icon: React.ReactNode; mockup: React.ReactNode; flip?: boolean };
type Testimonial = { quote: string; name: string; role: string; company: string };
type Benefit = { title: string; description: string };

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function Pill({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full">
      {icon}
      <span className="text-sm text-slate-600 uppercase tracking-wide">{children}</span>
    </div>
  );
}

function PrimaryButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-8 py-4 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-200",
        className
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-8 py-4 text-base text-white bg-slate-600 border-2 border-gray/400 rounded-full hover:bg-slate/600 hover:shadow-xl hover:scale-105 transition-all duration-200 backdrop-blur-sm",
        className
      )}
    >
      {children}
    </button>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100", className)}>
      {children}
    </div>
  );
}

function SectionHeading({
  pill,
  title,
  subtitle,
  center,
}: {
  pill?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-10", center && "text-center mx-auto max-w-3xl")}>
      {pill && <div className={cn("mb-4", center && "flex justify-center")}>{pill}</div>}
      <h2 className={cn("text-4xl sm:text-5xl text-gray-900 mb-4", center && "lg:text-6xl")}>{title}</h2>
      {subtitle && <p className="text-xl text-gray-600 leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function LandingPageClient() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Content in one place (easy to tweak, short component)
  const content = {
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
        icon: <FileText className="w-6 h-6" />,
      },
      {
        title: "Information in one place",
        description: "All your case information in one place, accessible from any phone, computer, or tablet.",
        icon: <Users className="w-6 h-6" />,
      },
      {
        title: "Digital signatures",
        description: "Get all your forms signed instantly.",
        icon: <CheckCircle className="w-6 h-6" />,
      },
      {
        title: "Checklists",
        description: "Stay on top of your cases with organized checklists.",
        icon: <ListChecks className="w-6 h-6" />,
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
        icon: <Phone className="w-5 h-5 text-slate-600" />,
        mockup: (
          <div className="space-y-4">
            {[
              { icon: <CheckCircle className="w-6 h-6 text-slate-600" />, active: true },
              { icon: <Phone className="w-6 h-6 text-gray-500" />, active: false },
              { icon: <FileText className="w-6 h-6 text-gray-500" />, active: false },
            ].map((row, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border",
                  row.active
                    ? "bg-indigo-50 border-indigo-100"
                    : "bg-gray-50 border-gray-100"
                )}
              >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", row.active ? "bg-indigo-100" : "bg-gray-200")}>
                  {row.icon}
                </div>
                <div className="flex-1">
                  <div className={cn("h-3 rounded w-3/4 mb-2", row.active ? "bg-indigo-200" : "bg-gray-200")} />
                  <div className={cn("h-2 rounded w-1/2", row.active ? "bg-indigo-100" : "bg-gray-100")} />
                </div>
              </div>
            ))}
          </div>
        ),
      },
      {
        step: 2,
        label: "Step 2",
        title: "Centralized Case Management",
        body: [
          "Organize vital statistics, documents, and family preferences in one secure place. Track your desktop and mobile workflow rankings from any location and plot your full case history on interactive dashboards.",
          "Set up automated notifications to be sent to your team, so you'll never forget to check important case progress or miss critical deadlines.",
        ],
        icon: <Clipboard className="w-5 h-5 text-slate-600" />,
        flip: true,
        mockup: (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="h-3 bg-indigo-200 rounded w-32" />
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-indigo-100 rounded w-full" />
                <div className="h-2 bg-indigo-100 rounded w-5/6" />
                <div className="h-2 bg-indigo-100 rounded w-4/6" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="h-2 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-2/3" />
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        step: 3,
        label: "Step 3",
        title: "Digital Family Catalog",
        body: [
          "Share packages and services with families via secure digital links. Let families browse and select options from the comfort of their home, giving them time to make thoughtful decisions.",
          "Real-time updates ensure both you and the family are always on the same page, with transparent pricing and package customization options.",
        ],
        icon: <FileText className="w-5 h-5 text-slate-600" />,
        mockup: (
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                <div className="aspect-square bg-indigo-100 rounded-lg mb-3" />
                <div className="h-2 bg-indigo-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-indigo-300 rounded w-1/2" />
              </div>
            ))}
          </div>
        ),
      },
      {
        step: 4,
        label: "Step 4",
        title: "Instant E-Signatures",
        body: [
          "Generate contracts and collect digital signatures instantly. No more printing, scanning, or waiting for documents to be signed and returned.",
          "Legal, secure, and compliant e-signatures with automated filing ensure your paperwork is always organized and accessible when you need it.",
        ],
        icon: <PenTool className="w-5 h-5 text-slate-600" />,
        flip: true,
        mockup: (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-3 bg-indigo-200 rounded w-1/3" />
                <div className="w-8 h-8 bg-indigo-500 rounded-full" />
              </div>
              <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-white">
                <div className="h-16 bg-indigo-100 rounded mb-3" />
                <div className="h-2 bg-indigo-200 rounded w-full mb-2" />
                <div className="h-2 bg-indigo-200 rounded w-4/5" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 bg-indigo-500 rounded-xl p-3">
                <div className="h-2 bg-white/50 rounded w-3/4 mx-auto" />
              </div>
              <div className="flex-1 bg-gray-100 rounded-xl p-3">
                <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto" />
              </div>
            </div>
          </div>
        ),
      },
    ] as Step[],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 sm:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <a href="#" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-2xl text-slate-700">Rite Path</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-black"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
              {content.nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="relative hidden md:inline-flex group">
              <Link href="/auth/login">
                <button className="inline-flex items-center justify-center w-full px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 hover:shadow-lg transition-all">
                  Sign In
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-6 bg-white backdrop-blur-lg rounded-2xl border border-slate-200 p-6 shadow-xl">
              <div className="flex flex-col space-y-6">
                {content.nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href ?? "#"}
                    className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
                  >
                    {item.label}
                  </a>
                ))}
                <Link href="/auth/login">
                  <button className="inline-flex items-center justify-center w-full px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 hover:shadow-lg transition-all">
                    Sign In
                  </button>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 sm:pb-24 lg:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
        </div>

        <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            <div>
              <h1 className="text-5xl text-slate-800 sm:text-6xl lg:text-7xl leading-tight">
                First Call.{" "}
                <span className="relative inline-block">
                  <span className="text-indigo-600">Done Rite.</span>
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path
                      d="M1 5.5C20 2.5 40 1 60 2C80 3 100 4.5 120 4C140 3.5 160 2 180 3C185 3.2 190 3.5 199 4"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="text-indigo-400"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                Modern Funeral case management. <br />
                From first call to final documentation. When the workflow is right, families get better care — and your
                team gets back time.
              </p>

              <div className="mt-10">
                <div className="flex flex-wrap gap-4">
                  <Link href="/auth/login">
                    <PrimaryButton>Sign In →</PrimaryButton>
                  </Link>
                  <SecondaryButton>Contact Us</SecondaryButton>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["from-teal-400 to-teal-500", "from-teal-500 to-teal-600", "from-cyan-400 to-cyan-500", "from-teal-600 to-cyan-600"].map(
                        (g, i) => (
                          <div key={i} className={cn("w-10 h-10 rounded-full bg-gradient-to-br border-2 border-white", g)} />
                        )
                      )}
                    </div>
                    <span className="text-slate-700">500+ funeral homes</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-slate-700">4.9/5 from 2,400+ reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform rotate-6" />
              <Card>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-indigo-100">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="h-4 w-32 bg-indigo-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-purple-100 rounded" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-4 gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                        <div className="h-2 w-16 bg-gradient-to-r from-slate-500 to-indigo-500 rounded mb-3" />
                        <div className="h-6 w-12 bg-indigo-100 rounded" />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl" />
                        <div className="flex-1">
                          <div className="h-3 w-32 bg-indigo-100 rounded mb-2" />
                          <div className="h-2 w-24 bg-indigo-50 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            <div className="space-y-8">
              <div>
                <Pill icon={<ListChecks className="w-5 h-5 text-slate-600" />}>Organize</Pill>
                <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4 mt-4">Stay organized</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Never lose another form, get signatures immediately, eliminate the search for case files, and stay more
                  organized than ever.
                </p>
              </div>

              <div className="space-y-4">
                {content.features.map((f) => (
                  <div key={f.title} className="group relative">
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center shrink-0 text-slate-600 group-hover:scale-110 transition-transform">
                          {f.icon}
                        </div>
                        <div>
                          <h4 className="text-lg text-gray-900 mb-2">{f.title}</h4>
                          <p className="text-gray-600">{f.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform rotate-6" />
              <Card>
                <div className="p-12 flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 text-slate-600" />
                  </div>
                  <p className="text-2xl text-gray-700">Digital Case Management</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            center
            title="Better in every way"
            subtitle="Streamlined workflows designed to help you serve families with compassion while reducing administrative burden by up to 70%."
          />

          <div className="space-y-32 max-w-6xl mx-auto">
            {content.steps.map((s) => {
              const Text = (
                <div>
                  <Pill icon={s.icon}>{s.label}</Pill>
                  <h3 className="text-3xl sm:text-4xl text-gray-900 mb-6 mt-6">{s.title}</h3>
                  {s.body.map((p) => (
                    <p key={p} className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {p}
                    </p>
                  ))}
                  <button className="inline-flex items-center gap-2 px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );

              const Visual = (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30" />
                  <Card className="p-8">{s.mockup}</Card>
                </div>
              );

              return (
                <div key={s.step} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  {s.flip ? (
                    <>
                      <div className="order-2 lg:order-1">{Visual}</div>
                      <div className="order-1 lg:order-2">{Text}</div>
                    </>
                  ) : (
                    <>
                      <div>{Text}</div>
                      <div>{Visual}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform -rotate-6" />
              <Card>
                <div className="p-6 space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
                        <CheckCircle className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-indigo-100 rounded w-3/4 mb-2" />
                        <div className="h-2 bg-indigo-50 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="order-1 lg:order-2">
              <Pill>Benefits</Pill>
              <h2 className="text-4xl sm:text-5xl text-gray-900 mb-6 mt-6">Built for Compassionate Care</h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Every feature is designed with both funeral directors and grieving families in mind.
              </p>

              <div className="space-y-6">
                {content.benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl text-gray-900 mb-2">{b.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeading
            center
            pill={<Pill>Testimonials</Pill>}
            title="Trusted by Funeral Homes"
            subtitle="See what funeral directors are saying about Rite Path"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((t) => (
              <div key={t.name} className="relative group">
                <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="flex mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 flex-grow text-lg leading-relaxed italic">"{t.quote}"</p>
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-900 text-lg">{t.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{t.role}</p>
                    <p className="text-sm text-indigo-500 mt-1">{t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-slate-600 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of funeral homes using Rite Path to serve families with dignity, efficiency, and compassion.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/auth/login">
              <button className="inline-flex items-center justify-center px-8 py-4 text-base text-slate-700 bg-white rounded-full hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-200">
                Sign In →
              </button>
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-4 text-base text-white bg-white/10 border-2 border-white/30 rounded-full hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-200 backdrop-blur-sm">
              Schedule Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-white/70">Secure login • Professional funeral home management</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-xl text-slate-700">Rite Path</span>
              </div>
              <p className="text-sm text-slate-600">Compassionate care through every step.</p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Security"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Compliance"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm text-slate-900 mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-slate-600 hover:text-slate-900">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600">© 2026 Rite Path. All rights reserved.</p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn"].map((s) => (
                <a key={s} href="#" className="text-sm text-slate-600 hover:text-slate-900">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

