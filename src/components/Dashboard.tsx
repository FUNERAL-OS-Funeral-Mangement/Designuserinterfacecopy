import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import eduardoLogo from "figma:asset/4f4413d53848e948d0d7a0a9be4a11765dd0c149.png";
import ritePathLogo from "figma:asset/004a81e9bfe8a591307cff80ff24ed76f8e8a0e0.png";
import {
  FolderOpen,
  FileText,
  Calendar,
  Phone,
  Users,
  LogOut,
  Bell,
  Search,
  HelpCircle,
  TrendingUp,
  ArrowLeft,
  User,
  BookOpen,
  ShoppingBag,
  Archive,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (view: ViewType) => void;
  onLogout: () => void;
}

export function Dashboard({
  onNavigate,
  onLogout,
}: DashboardProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    {
      icon: FolderOpen,
      label: "Active Cases",
      value: "12",
      subtext: "+3 this week",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: FileText,
      label: "Pending Signatures",
      value: "5",
      subtext: "2 urgent",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: Calendar,
      label: "Appointments Today",
      value: "3",
      subtext: "Next at 10:00 AM",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Calendar,
      label: "This Week Services",
      value: "8",
      subtext: "3 scheduled",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  const quickActions = [
    {
      icon: Phone,
      label: "First Call Intake",
      description: "Start new case intake",
      view: "first-call" as ViewType,
      iconBg: "bg-purple-600",
    },
    {
      icon: FolderOpen,
      label: "Cases Management",
      description: "View or Update Cases",
      view: "cases" as ViewType,
      iconBg: "bg-blue-600",
    },
    {
      icon: Users,
      label: "Appointments & Arrangements",
      description: "Schedule family meetings",
      view: "appointments" as ViewType,
      iconBg: "bg-teal-600",
    },
    {
      icon: Calendar,
      label: "Weekly Service Schedule",
      description: "See all upcoming services",
      view: "schedule" as ViewType,
      iconBg: "bg-indigo-600",
    },
  ];

  const todaysSchedule = [
    {
      name: "Johnson Family",
      time: "10:00 AM",
      type: "Arrangement",
      color: "bg-purple-500",
    },
    {
      name: "Smith Service",
      time: "2:00 PM",
      type: "Memorial",
      color: "bg-blue-500",
    },
    {
      name: "Martinez Meeting",
      time: "4:30 PM",
      type: "Planning",
      color: "bg-teal-500",
    },
  ];

  const recentActivity = [
    {
      case: "Jane Doe",
      action: "First call received",
      time: "10 min ago",
    },
    {
      case: "John Smith",
      action: "Contract signed",
      time: "1 hour ago",
    },
    {
      case: "Mary Johnson",
      action: "Meeting scheduled",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Logo & Quick Actions */}
      <aside className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo Section - Clean & Minimal */}
          <div className="flex-shrink-0 p-6 text-center border-b border-gray-200">
            {/* Back to Home Button - Top Left */}
            <button
              onClick={() => window.location.href = '/'}
              className="absolute top-6 left-6 flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center rounded-full overflow-hidden bg-gray-100 border border-gray-300 p-4">
              <img
                src={eduardoLogo}
                alt="Eduardo Rivero"
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-gray-900 mb-5 text-base">
              Eduardo Rivero Funeral HOme
            </h2>
            <p className="text-sm text-gray-500">
              Serving families with dignity
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex-1 px-6 py-6">
            <h3 className="text-gray-900 mb-4 text-xs uppercase tracking-wider">
              Start Here
            </h3>
            <div className="space-y-2.5">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => onNavigate(action.view)}
                  className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-left hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${action.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                    >
                      <action.icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 text-sm mb-0.5 leading-tight group-hover:text-blue-700 transition-colors">
                        {action.label}
                      </h4>
                      <p className="text-xs text-gray-500 leading-tight">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              
              {/* My Products Button */}
              <button
                onClick={() => onNavigate('catalogs')}
                className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-left hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <BookOpen className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 text-sm mb-0.5 leading-tight group-hover:text-blue-700 transition-colors">
                      My Catalogs
                    </h4>
                    <p className="text-xs text-gray-500 leading-tight">
                      Manage product catalogs
                    </p>
                  </div>
                </div>
              </button>
              
              {/* Staff and Vendors Button */}
              <button
                onClick={() => alert('Staff and Vendors coming soon!')}
                className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-left hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <ShoppingBag className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 text-sm mb-0.5 leading-tight group-hover:text-blue-700 transition-colors">
                      Staff and Vendors
                    </h4>
                    <p className="text-xs text-gray-500 leading-tight">
                      Manage inventory & suppliers
                    </p>
                  </div>
                </div>
              </button>
                   
              {/* Document Library */}
              <button
                onClick={() => onNavigate('document-library')}
                className="w-full bg-white border border-gray-200 rounded-xl p-3.5 text-left hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Archive className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-gray-900 text-sm mb-0.5 leading-tight group-hover:text-blue-700 transition-colors">
                      Document Library 
                    </h4>
                    <p className="text-xs text-gray-500 leading-tight">
                      Manage All types of Documents 
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="flex-shrink-0 pt-4 p-8 border-t border-gray-200 flex items-center justify-center">
          <img
            src={ritePathLogo}
            alt="RitePath"
            className="h-12 object-contain"
          />
        </div>
      </aside>

      {/* Right Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile Logo */}
              <div className="flex items-center gap-2 lg:hidden flex-shrink-0">
                <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                  <FolderOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-900">Rite Path</span>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-md lg:mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 focus:bg-white transition-colors rounded-lg"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  className="relative p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </button>
                <button
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  title="Get help and support"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    Need help?
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">
                    Sign out
                  </span>
                </button>
                <button
                  onClick={onLogout}
                  className="sm:hidden p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Scroll Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Welcome Message - Mobile Only */}
            <div className="lg:hidden mb-6">
              <h1 className="text-gray-900 mb-1">
                Welcome, Funeral Director
              </h1>
              <p className="text-gray-500">
                Here's what's happening today
              </p>
            </div>

            {/* Mobile Quick Actions */}
            <div className="lg:hidden mb-8">
              <h2 className="text-gray-900 mb-4">
                Quick actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onNavigate(action.view)}
                    className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-gray-300 hover:shadow-sm transition-all group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg ${action.iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                    >
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-gray-900 text-sm mb-0.5">
                      {action.label}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Analytics Stats */}
            <div className="mb-8">
              <h2 className="text-gray-900 mb-5">
                Today’s Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        <stat.icon
                          className={`w-5 h-5 ${stat.iconColor}`}
                        />
                      </div>
                      <TrendingUp className="w-4 h-4 text-emerald-500 ml-auto" />
                    </div>
                    <p className="text-sm text-gray-500 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400">
                      {stat.subtext}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Layout for Schedule & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-gray-900">
                    Today's schedule
                  </h3>
                  <button
                    onClick={() => onNavigate("schedule")}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-5">
                  {todaysSchedule.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${item.color} mt-2 flex-shrink-0`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate mb-1">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.time} · {item.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
                <h3 className="text-gray-900 mb-6">
                  Recent activity
                </h3>
                <div className="relative">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-6 last:pb-0"
                    >
                      {/* Timeline Connector */}
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        {index !==
                          recentActivity.length - 1 && (
                          <div className="w-px h-full bg-blue-200 mt-2"></div>
                        )}
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0 -mt-0.5">
                        <p className="text-gray-900 mb-0.5 text-sm">
                          {activity.case}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}