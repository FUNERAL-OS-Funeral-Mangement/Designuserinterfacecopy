import { ArrowLeft } from 'lucide-react';

interface WeeklyScheduleProps {
  onBack: () => void;
}

export function WeeklySchedule({ onBack }: WeeklyScheduleProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDay = new Date().getDay();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-gray-900">Weekly Schedule</h2>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-200">
            {days.map((day, index) => (
              <div
                key={day}
                className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${
                  index === currentDay - 1 ? 'bg-teal-50' : ''
                }`}
              >
                <p className={`text-sm ${index === currentDay - 1 ? 'text-teal-700' : 'text-gray-600'}`}>
                  {day}
                </p>
              </div>
            ))}
          </div>
          
          <div className="p-8 text-center text-gray-500">
            <p>No scheduled services this week</p>
          </div>
        </div>
      </div>
    </div>
  );
}
