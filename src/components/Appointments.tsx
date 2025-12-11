import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface AppointmentsProps {
  onBack: () => void;
}

export function Appointments({ onBack }: AppointmentsProps) {
  const appointments = [
    {
      id: 1,
      family: 'Johnson Family',
      type: 'Arrangement Conference',
      date: 'Nov 28, 2024',
      time: '10:00 AM',
    },
    {
      id: 2,
      family: 'Smith Family',
      type: 'Service Planning',
      date: 'Nov 28, 2024',
      time: '2:00 PM',
    },
    {
      id: 3,
      family: 'Martinez Family',
      type: 'Final Arrangements',
      date: 'Nov 29, 2024',
      time: '11:00 AM',
    },
  ];

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
        <h2 className="text-gray-900">Appointments</h2>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-gray-900 mb-1">{appointment.family}</h3>
                  <p className="text-gray-600 text-sm">{appointment.type}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
