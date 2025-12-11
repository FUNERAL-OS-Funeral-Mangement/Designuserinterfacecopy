import { User, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function PrepRoomTab() {
  const teamMembers = [
    { name: 'Robert Martinez', role: 'Lead Technician', avatar: 'RM' },
    { name: 'Jennifer Lee', role: 'Assistant', avatar: 'JL' },
  ];

  const requirements = [
    { name: 'Hair styling', status: 'completed' as const },
    { name: 'Makeup application', status: 'completed' as const },
    { name: 'Dressing', status: 'in-progress' as const },
    { name: 'Refrigeration', status: 'completed' as const },
    { name: 'Embalming', status: 'not-started' as const },
    { name: 'Cremation prep', status: 'not-started' as const },
  ];

  const workflow = [
    { step: 'Body Arrived', completed: true, time: 'Oct 23, 10:30 AM' },
    { step: 'In Prep', completed: true, time: 'Oct 23, 2:00 PM' },
    { step: 'Ready for Viewing', completed: false, time: 'Pending' },
    { step: 'Transferred to Chapel', completed: false, time: 'Pending' },
  ];

  const completedCount = requirements.filter(r => r.status === 'completed').length;
  const totalCount = requirements.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const getStatusBadge = (status: 'completed' | 'in-progress' | 'not-started') => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs border border-blue-200">
            <Clock className="w-3.5 h-3.5" />
            In Progress
          </span>
        );
      case 'not-started':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-gray-700 text-xs border border-gray-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Not Started
          </span>
        );
    }
  };

  return (
    <div>
      <h2 className="text-gray-900 mb-6">Prep Room Team</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Progress Ring */}
        <div className="bg-white border border-gray-200 p-6 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-100"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                className="text-gray-900 transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl text-gray-900">{percentage}%</p>
                <p className="text-xs text-gray-500">Complete</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">Prep Room Completion</p>
        </div>

        {/* Team Members */}
        <div className="lg:col-span-2 bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Assigned Staff</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                    <span>{member.avatar}</span>
                  </div>
                  <div>
                    <p className="text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Case Requirements</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {requirements.map((req, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <span className="text-gray-900">{req.name}</span>
                {getStatusBadge(req.status)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Timeline */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Workflow Timeline</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {workflow.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    item.completed 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'bg-white border-gray-300'
                  }`}>
                    {item.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </div>
                  {index < workflow.length - 1 && (
                    <div className={`w-px h-full mt-2 ${
                      item.completed ? 'bg-emerald-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <p className={`mb-1 ${
                    item.completed ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {item.step}
                  </p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Special Instructions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <p className="text-gray-900">Family has requested natural makeup application</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <p className="text-gray-900">Blue suit provided by family for dressing</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-500 flex-shrink-0">•</span>
              <p className="text-gray-900">Tattoo on left forearm should remain visible</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
