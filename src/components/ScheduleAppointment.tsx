import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Phone } from 'lucide-react';
import { useAppointmentStore } from '../store/useAppointmentStore';

interface ScheduleAppointmentProps {
  onBack: () => void;
  onScheduled: () => void;
  caseId: string;
  familyName: string;
  nextOfKinName: string;
  nextOfKinPhone: string;
}

export function ScheduleAppointment({
  onBack,
  onScheduled,
  caseId,
  familyName,
  nextOfKinName,
  nextOfKinPhone,
}: ScheduleAppointmentProps) {
  const addAppointment = useAppointmentStore((state) => state.addAppointment);

  const [appointmentType, setAppointmentType] = useState<
     'Service Planning - Virtual' | 'Service Planning - On Location' | ''
  >('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [period, setPeriod] = useState('');
  const [notes, setNotes] = useState('');

  // Generate hour options (1-12)
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  
  // Generate minute options (00, 15, 30, 45)
  const minutes = ['00', '15', '30', '45'];
  
  // Period options
  const periods = ['AM', 'PM'];

  const appointmentTypes = [

    {
      value: 'Service Planning - Virtual',
      label: 'Service Planning - Virtual',
      description: 'Plan service details remotely via video call',
      color: 'bg-blue-50 border-blue-200 hover:border-blue-300',
      selectedColor: 'bg-blue-100 border-blue-400',
    },
    {
      value: 'Service Planning - On Location',
      label: 'Service Planning - On Location',
      description: 'In-person meeting at funeral home for service planning',
      color: 'bg-teal-50 border-teal-200 hover:border-teal-300',
      selectedColor: 'bg-teal-100 border-teal-400',
    },
  ];

  const handleSchedule = () => {
    if (!appointmentType || !date || !hour || !minute || !period) {
      alert('Please fill in all required fields');
      return;
    }

    addAppointment({
      familyName,
      caseId,
      type: appointmentType as  'Service Planning - Virtual' | 'Service Planning - On Location',
      date,
      time: `${hour}:${minute} ${period}`,
      contactName: nextOfKinName,
      contactPhone: nextOfKinPhone,
      notes,
    });

    onScheduled();
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div>
            <h1 className="text-gray-900 mb-2">Schedule appointment</h1>
            <p className="text-gray-600">
              Set a time for the family to visit the funeral home
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-3xl">
        <div className="space-y-8">
          {/* Appointment Type Selection */}
          <div>
            <label className="block text-gray-700 mb-3">
              Appointment type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {appointmentTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setAppointmentType(type.value as any)}
                  className={`w-full text-left p-5 border-2 transition-all ${
                    appointmentType === type.value
                      ? type.selectedColor
                      : type.color
                  }`}
                >
                  <p className="text-gray-900 mb-1">{type.label}</p>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <div className="flex gap-2">
                  <select
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    className="flex-1 pl-12 pr-2 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                    }}
                  >
                    <option value="" disabled>--</option>
                    {hours.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  <select
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    className="flex-1 px-2 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                    }}
                  >
                    <option value="" disabled>--</option>
                    {minutes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="flex-1 px-2 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                    }}
                  >
                    <option value="" disabled>--</option>
                    {periods.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional information about this appointment..."
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          {/* Confirmation Info */}
          <div className="bg-blue-50 border border-blue-200 p-5">
            <p className="text-sm text-blue-900 leading-relaxed">
              A confirmation will be sent to <strong>{nextOfKinName}</strong> at{' '}
              <strong>{nextOfKinPhone}</strong> with the appointment details.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 mt-12 pt-12 border-t border-gray-200">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleSchedule}
            className="px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!appointmentType || !date || !hour || !minute || !period}
          >
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
}