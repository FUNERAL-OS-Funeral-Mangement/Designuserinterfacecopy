import { ArrowLeft, Calendar, Clock, MapPin, Users, Building2 } from 'lucide-react';
import { useCaseStore } from '../store/useCaseStore';

interface WeeklyScheduleProps {
  onBack: () => void;
}

export function WeeklySchedule({ onBack }: WeeklyScheduleProps) {
  const getAllCases = useCaseStore((state) => state.getAllCases);
  const allCases = getAllCases();

  // Get current week (7 days starting from today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  // Group cases by service date
  const casesByDate = weekDays.map(date => {
    const dateString = date.toISOString().split('T')[0];
    const casesForDay = allCases.filter(caseItem => {
      if (!caseItem.serviceDate) return false;
      const serviceDate = new Date(caseItem.serviceDate);
      serviceDate.setHours(0, 0, 0, 0);
      return serviceDate.getTime() === date.getTime();
    });
    
    return {
      date,
      dateString,
      cases: casesForDay,
      isToday: date.getTime() === today.getTime(),
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      monthDay: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const totalServices = casesByDate.reduce((sum, day) => sum + day.cases.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <h2 className="text-gray-900">Weekly Service Summary</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
              {totalServices} {totalServices === 1 ? 'service' : 'services'}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {casesByDate.map((day) => (
            <div key={day.dateString}>
              {/* Day Header - Compact */}
              <div className={`flex items-center gap-3 mb-2 px-2 ${day.isToday ? 'opacity-100' : 'opacity-75'}`}>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                  day.isToday ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  <span className="text-xs uppercase tracking-wide">{day.dayName}</span>
                  <span className="text-sm">{day.date.getDate()}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {day.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  {day.isToday && <span className="ml-2 text-blue-600">• Today</span>}
                </div>
                <div className="ml-auto text-xs text-gray-500">
                  {day.cases.length} {day.cases.length === 1 ? 'service' : 'services'}
                </div>
              </div>

              {/* Services - Optimized Layout */}
              {day.cases.length > 0 ? (
                <div className="space-y-2">
                  {day.cases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      {/* Main Info Row */}
                      <div className="px-4 py-3 flex items-start gap-4">
                        {/* Photo */}
                        {caseItem.photoUrl ? (
                          <img
                            src={caseItem.photoUrl}
                            alt={caseItem.deceasedName}
                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-500 text-xl">
                              {caseItem.deceasedName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}

                        {/* Name & Case Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 mb-1">
                            {caseItem.deceasedName}
                          </h4>
                          <div className="text-sm text-gray-500">
                            Case #{caseItem.caseNumber}
                          </div>
                        </div>

                        {/* Service Time - Prominent */}
                        {caseItem.serviceInformation?.time && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{caseItem.serviceInformation.time}</span>
                          </div>
                        )}
                      </div>

                      {/* Details Grid */}
                      <div className="px-4 pb-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Service Location */}
                        {caseItem.serviceInformation?.location && (
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-gray-500 text-xs mb-0.5">Service</div>
                              <div className="text-gray-900">{caseItem.serviceInformation.location}</div>
                              {caseItem.serviceInformation.address && (
                                <div className="text-gray-500 text-xs mt-0.5">{caseItem.serviceInformation.address}</div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Visitation */}
                        {caseItem.visitationInformation?.location && (
                          <div className="flex items-start gap-2 text-sm">
                            <Users className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-gray-500 text-xs mb-0.5">Visitation</div>
                              <div className="text-gray-900">{caseItem.visitationInformation.location}</div>
                              {caseItem.visitationInformation.startTime && caseItem.visitationInformation.endTime && (
                                <div className="text-gray-500 text-xs mt-0.5">
                                  {caseItem.visitationInformation.startTime} - {caseItem.visitationInformation.endTime}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Cemetery */}
                        {caseItem.regulatoryInfo?.cemeteryName && (
                          <div className="flex items-start gap-2 text-sm">
                            <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-gray-500 text-xs mb-0.5">Cemetery</div>
                              <div className="text-gray-900">{caseItem.regulatoryInfo.cemeteryName}</div>
                              {caseItem.regulatoryInfo.cemeteryPhone && (
                                <div className="text-gray-500 text-xs mt-0.5">{caseItem.regulatoryInfo.cemeteryPhone}</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg py-6 text-center">
                  <p className="text-sm text-gray-400">No services scheduled</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {totalServices === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-gray-900 mb-1">No Services This Week</h3>
            <p className="text-sm text-gray-500">Services will appear here when scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}