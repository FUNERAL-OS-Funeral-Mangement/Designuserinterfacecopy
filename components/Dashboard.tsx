import { useMemo } from "react";
import {
  FolderOpen,
  FileText,
  Calendar,
  Phone,
  Users,
  TrendingUp,
} from "lucide-react";
import { useAppointmentStore } from "../store/useAppointmentStore";

interface DashboardProps {
  onNavigate: (view: any) => void;
  onLogout: () => void;
}

export function Dashboard({
  onNavigate,
  onLogout,
}: DashboardProps) {
  // Get appointments from store
  const appointments = useAppointmentStore((state) => state.appointments);

  // Memoize today's appointments to prevent infinite loops
  const todaysAppointments = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter((apt) => apt.date === today);
  }, [appointments]);

  // Get next appointment time
  const nextAppointmentTime = todaysAppointments.length > 0 ? todaysAppointments[0].time : 'None today';

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
      value: todaysAppointments.length.toString(),
      subtext: nextAppointmentTime !== 'None today' ? `Next at ${nextAppointmentTime}` : 'None today',
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
    <>
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
                    onClick={() => onNavigate(action.path)}
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
                    onClick={() => onNavigate("/schedule")}
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
    </>
  );
}