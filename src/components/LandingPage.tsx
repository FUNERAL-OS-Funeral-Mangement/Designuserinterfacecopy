import { useState } from "react";
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
} from "lucide-react";

interface LandingPageProps {
  onNavigate: (view: "login" | "dashboard") => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Transparent with hero background */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4 sm:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <a href="#" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-2xl text-slate-700">
                  Rite Path
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-white"
                onClick={() =>
                  setMobileMenuOpen(!mobileMenuOpen)
                }
                aria-expanded={mobileMenuOpen}
              >
                {!mobileMenuOpen ? (
                  <Menu className="w-7 h-7" />
                ) : (
                  <X className="w-7 h-7" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden ml-10 mr-auto space-x-10 lg:ml-20 lg:space-x-12 md:flex md:items-center md:justify-start">
              <a
                href="#"
                className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
              >
                Services
              </a>
              <a
                href="#"
                className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#"
                className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
              >
                Support
              </a>
            </nav>

            {/* CTA Button */}
            <div className="relative hidden md:inline-flex group">
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 hover:shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-6 bg-white backdrop-blur-lg rounded-2xl border border-slate-200 p-6 shadow-xl">
              <div className="flex flex-col space-y-6">
                <a
                  href="#"
                  className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="text-base text-slate-700 transition-all duration-200 hover:text-slate-900"
                >
                  Support
                </a>

                <button
                  onClick={() => onNavigate("login")}
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 hover:shadow-lg transition-all"
                >
                  Get Started
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 sm:pb-24 lg:pb-32">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="px-4 mx-auto relative sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl text-slate-800 sm:text-6xl lg:text-7xl leading-tight">
                First Call.{" "}
                <span className="relative inline-block">
                  <span className="text-indigo-600 animate-typing">
                    Done Rite.
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="8"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                Modern Funeral case management. <br />From first call
                to final documentation. When the
                workflow is right, families get better care- and
                your team gets back time.
              </p>

              {/* CTA Buttons */}
              <div className="mt-10">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => onNavigate('login')}
                    className="inline-flex items-center justify-center px-8 py-4 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    Start Free Trial →
                  </button>
                  <button className="inline-flex items-center justify-center px-8 py-4 text-base text-white bg-slate-600 border-2 border-gray/400 rounded-full hover:bg-slate/600 hover:shadow-xl hover:scale-105 transition-all duration-200 backdrop-blur-sm">
                    Contact Us
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Avatars and funeral homes count */}
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 border-2 border-white"></div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 border-2 border-white"></div>
                    </div>
                    <span className="text-slate-700">
                      500+ funeral homes
                    </span>
                  </div>

                  {/* Stars and rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-slate-700">
                      4.9/5 from 2,400+ reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Dashboard Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border-b border-indigo-100">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="h-4 w-32 bg-indigo-200 rounded mb-2"></div>
                      <div className="h-3 w-24 bg-purple-100 rounded"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100"
                        >
                          <div className="h-2 w-16 bg-gradient-to-r from-slate-500 to-indigo-500 rounded mb-3"></div>
                          <div className="h-6 w-12 bg-indigo-100 rounded"></div>
                        </div>
                      ))}
                    </div>

                    {/* List Items */}
                    <div className="space-y-3 pt-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl"></div>
                          <div className="flex-1">
                            <div className="h-3 w-32 bg-indigo-100 rounded mb-2"></div>
                            <div className="h-2 w-24 bg-indigo-50 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Organize */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            {/* Left - Feature Cards */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
                  <svg
                    className="w-5 h-5 text-slate-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                  <span className="text-sm text-slate-600 uppercase tracking-wide">
                    Organize
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl text-gray-900 mb-4">
                  Stay organized
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Never lose another form, get signatures
                  immediately, eliminate the search for case
                  files, and stay more organized than ever.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4">
                {[
                  {
                    title: "All forms digitalized",
                    description:
                      "Simplifying your paperwork with all your forms at your fingertips.",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Information in one place",
                    description:
                      "All your case information in one place, accessible from any phone, computer, or tablet.",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Digital signatures",
                    description:
                      "Get all your forms signed instantly.",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ),
                  },
                  {
                    title: "Checklists",
                    description:
                      "Stay on top of your cases with organized checklists.",
                    icon: (
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        />
                      </svg>
                    ),
                  },
                ].map((feature, index) => (
                  <div key={index} className="group relative">
                    <div className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center shrink-0 text-slate-600 group-hover:scale-110 transition-transform">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="text-lg text-gray-900 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Visual Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-12 flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6">
                    <svg
                      className="w-12 h-12 text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-2xl text-gray-700">
                    Digital Case Management
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Center Message then Steps */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          {/* Center Message */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              Better in every way
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Streamlined workflows designed to help you serve
              families with compassion while reducing
              administrative burden by up to 70%.
            </p>
          </div>

          {/* Steps - Alternating Layout */}
          <div className="space-y-32 max-w-6xl mx-auto">
            {/* Step 1 - Image Right */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                  <Phone className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-600 uppercase tracking-wide">
                    Step 1
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl text-gray-900 mb-6">
                  First Call Made Simple
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Capture essential information during the
                  initial family contact with guided forms. Our
                  intuitive interface ensures you never miss
                  critical details during this sensitive time.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Everything is encrypted and auto-saved, so you
                  can focus on providing compassionate support
                  to families in their time of need.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-indigo-200 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-indigo-100 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FileText className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div className="h-3 bg-indigo-200 rounded w-32"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-indigo-100 rounded w-full"></div>
                        <div className="h-2 bg-indigo-100 rounded w-5/6"></div>
                        <div className="h-2 bg-indigo-100 rounded w-4/6"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                        >
                          <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                  <Clipboard className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-600 uppercase tracking-wide">
                    Step 2
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl text-gray-900 mb-6">
                  Centralized Case Management
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Organize vital statistics, documents, and
                  family preferences in one secure place. Track
                  your desktop and mobile workflow rankings from
                  any location and plot your full case history
                  on interactive dashboards.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Set up automated notifications to be sent to
                  your team, so you'll never forget to check
                  important case progress or miss critical
                  deadlines.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Step 3 - Image Right */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                  <FileText className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-600 uppercase tracking-wide">
                    Step 3
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl text-gray-900 mb-6">
                  Digital Family Catalog
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Share packages and services with families via
                  secure digital links. Let families browse and
                  select options from the comfort of their home,
                  giving them time to make thoughtful decisions.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Real-time updates ensure both you and the
                  family are always on the same page, with
                  transparent pricing and package customization
                  options.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100"
                        >
                          <div className="aspect-square bg-indigo-100 rounded-lg mb-3"></div>
                          <div className="h-2 bg-indigo-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-indigo-300 rounded w-1/2"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 - Image Left */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-3 bg-indigo-200 rounded w-1/3"></div>
                        <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                      </div>
                      <div className="border-2 border-dashed border-indigo-200 rounded-xl p-6 bg-white">
                        <div className="h-16 bg-indigo-100 rounded mb-3"></div>
                        <div className="h-2 bg-indigo-200 rounded w-full mb-2"></div>
                        <div className="h-2 bg-indigo-200 rounded w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-indigo-500 rounded-xl p-3">
                        <div className="h-2 bg-white/50 rounded w-3/4 mx-auto"></div>
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-xl p-3">
                        <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                  <PenTool className="w-5 h-5 text-slate-600" />
                  <span className="text-sm text-slate-600 uppercase tracking-wide">
                    Step 4
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl text-gray-900 mb-6">
                  Instant E-Signatures
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Generate contracts and collect digital
                  signatures instantly. No more printing,
                   scanning, or waiting for documents to be
                  signed and returned.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Legal, secure, and compliant e-signatures with
                  automated filing ensure your paperwork is
                  always organized and accessible when you need
                  it.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 text-base text-white bg-slate-600 rounded-full hover:bg-slate-700 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16">
            {/* Left - Mockup */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30 transform -rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-6 space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-indigo-200">
                        <svg
                          className="w-5 h-5 text-indigo-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-indigo-100 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-indigo-50 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Benefits List */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
                <span className="text-sm text-indigo-600 uppercase tracking-wide">
                  Benefits
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl text-gray-900 mb-6">
                Built for Compassionate Care
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Every feature is designed with both funeral
                directors and grieving families in mind.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Save Time",
                    description:
                      "Reduce administrative work by up to 70% with automated workflows",
                  },
                  {
                    title: "Increase Transparency",
                    description:
                      "Families can view and approve arrangements from their own devices",
                  },
                  {
                    title: "Stay Compliant",
                    description:
                      "Built-in GPL generation and FTC compliance features",
                  },
                  {
                    title: "Mobile-First",
                    description:
                      "Access your cases from anywhere, on any device",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xl text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-4">
              <span className="text-sm text-indigo-600 uppercase tracking-wide">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              Trusted by Funeral Homes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what funeral directors are saying about Rite
              Path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
                quote:
                  "The first call workflow ensures we never miss critical information. It's been a game-changer for our team.",
                name: "Robert Chen",
                role: "Managing Director",
                company: "Chen Family Funeral Care",
              },
            ].map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-white border-2 border-gray-100 rounded-3xl p-8 hover:border-indigo-300 hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 flex-grow text-lg leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-900 text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-indigo-500 mt-1">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-slate-600 via-indigo-600 to-purple-600 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl relative">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of funeral homes using Rite Path to
              serve families with dignity, efficiency, and
              compassion.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center justify-center px-8 py-4 text-base text-slate-700 bg-white rounded-full hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Start Free Trial →
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 text-base text-white bg-white/10 border-2 border-white/30 rounded-full hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-200 backdrop-blur-sm">
                Schedule Demo
              </button>
            </div>

            <p className="mt-6 text-sm text-white/70">
              No credit card required • 14-day free trial •
              Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-xl text-slate-700">
                  Rite Path
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Compassionate care through every step.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm text-slate-900 mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm text-slate-900 mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm text-slate-900 mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600">
              © 2025 Rite Path. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}