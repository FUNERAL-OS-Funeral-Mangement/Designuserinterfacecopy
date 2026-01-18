'use client';

import { useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LogoUpload } from "./LogoUpload";
import {
  FolderOpen,
  Calendar,
  Phone,
  Users,
  ArrowLeft,
  BookOpen,
  Archive,
  Pencil,
  Check,
} from "lucide-react";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [funeralHomeLogo, setFuneralHomeLogo] = useState('eduardoLogo');
  const [funeralHomeName, setFuneralHomeName] = useState("Eduardo Rivero Funeral Home");
  const [funeralHomeTagline, setFuneralHomeTagline] = useState("Serving families with dignity");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const taglineInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpdate = (newLogoUrl: string) => {
    setFuneralHomeLogo(newLogoUrl);
    console.log('Logo updated:', newLogoUrl);
  };

  const handleNameUpdate = (newName: string) => {
    setFuneralHomeName(newName);
    console.log('Name updated:', newName);
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
    setTimeout(() => nameInputRef.current?.focus(), 0);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    } else if (e.key === 'Escape') {
      setIsEditingName(false);
    }
  };

  const handleTaglineEdit = () => {
    setIsEditingTagline(true);
    setTimeout(() => taglineInputRef.current?.focus(), 0);
  };

  const handleTaglineSave = () => {
    setIsEditingTagline(false);
  };

  const handleTaglineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingTagline(false);
    } else if (e.key === 'Escape') {
      setIsEditingTagline(false);
    }
  };

  const quickActions = [
    {
      icon: Phone,
      label: "First Call Intake",
      description: "Start new case intake",
      path: "/first-call",
      iconBg: "bg-purple-600",
    },
    {
      icon: FolderOpen,
      label: "Cases Management",
      description: "View or Update Cases",
      path: "/cases",
      iconBg: "bg-blue-600",
    },
    {
      icon: Users,
      label: "Appointments & Arrangements",
      description: "Schedule family meetings",
      path: "/appointments",
      iconBg: "bg-teal-600",
    },
    {
      icon: Calendar,
      label: "Weekly Service Schedule",
      description: "See all upcoming services",
      path: "/schedule",
      iconBg: "bg-indigo-600",
    },
    {
      icon: BookOpen,
      label: "My Catalogs",
      description: "Manage product catalogs",
      path: "/catalogs",
      iconBg: "bg-emerald-600",
    },
    {
      icon: Archive,
      label: "Document Library",
      description: "Manage All types of Documents",
      path: "/documents",
      iconBg: "bg-orange-600",
    },
    {
      icon: Users,
      label: "Staff & Vendors",
      description: "Manage teams and vendors",
      path: "/staff-vendors",
      iconBg: "bg-purple-600",
    },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-80 xl:w-96 bg-white border-r border-gray-200 flex-shrink-0 h-screen sticky top-0">
      <div className="flex-1 flex flex-col min-h-0">
        {/* Logo Section - Clean & Minimal */}
        <div className="flex-shrink-0 p-6 text-center border-b border-gray-200 relative">
          {/* Back to Home Button - Top Left */}
          <button
            onClick={() => router.push('/')}
            className="absolute top-6 left-6 z-30 flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <LogoUpload
            currentLogo={funeralHomeLogo}
            funeralHomeName={funeralHomeName}
            onLogoUpdate={handleLogoUpdate}
            onNameUpdate={handleNameUpdate}
            userId="demo-user-123"
            orgId="mock-org-123"
          />
          
          {/* Editable Funeral Home Name */}
          <div className="mt-2 mb-5 group/name relative">
            {isEditingName ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  ref={nameInputRef}
                  type="text"
                  value={funeralHomeName}
                  onChange={(e) => setFuneralHomeName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={handleNameKeyDown}
                  className="text-gray-900 text-base text-center border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleNameSave}
                  className="p-1 text-green-600 hover:text-green-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-gray-900 text-base">
                  {funeralHomeName}
                </h2>
                <button
                  onClick={handleNameEdit}
                  className="opacity-0 group-hover/name:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-all"
                  title="Edit name"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
          
          {/* Editable Funeral Home Tagline */}
          <div className="group/tagline relative">
            {isEditingTagline ? (
              <div className="flex items-center justify-center gap-2">
                <input
                  ref={taglineInputRef}
                  type="text"
                  value={funeralHomeTagline}
                  onChange={(e) => setFuneralHomeTagline(e.target.value)}
                  onBlur={handleTaglineSave}
                  onKeyDown={handleTaglineKeyDown}
                  className="text-gray-900 text-base text-center border border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleTaglineSave}
                  className="p-1 text-green-600 hover:text-green-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-gray-900 text-base">
                  {funeralHomeTagline}
                </h2>
                <button
                  onClick={handleTaglineEdit}
                  className="opacity-0 group-hover/tagline:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-all"
                  title="Edit tagline"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions - Scrollable */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <h3 className="text-gray-900 mb-4 text-xs uppercase tracking-wider">
            Start Here
          </h3>
          <div className="space-y-2.5">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => router.push(action.path)}
                className={`w-full border rounded-xl p-3.5 text-left transition-all duration-200 group ${
                  isActive(action.path)
                    ? 'bg-blue-50 border-blue-300 shadow-md'
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg ${action.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <action.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm mb-0.5 leading-tight transition-colors ${
                      isActive(action.path) ? 'text-blue-700 font-medium' : 'text-gray-900 group-hover:text-blue-700'
                    }`}>
                      {action.label}
                    </h4>
                    <p className="text-xs text-gray-500 leading-tight">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="flex-shrink-0 pt-4 p-8 border-t border-gray-200 flex items-center justify-center">
        <img
          src={'ritePathLogo'}
          alt="RitePath"
          className="h-12 object-contain"
        />
      </div>
    </aside>
  );
}


