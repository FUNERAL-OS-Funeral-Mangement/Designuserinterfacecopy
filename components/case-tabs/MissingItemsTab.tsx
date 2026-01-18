import { CheckCircle2, Lock, AlertCircle } from 'lucide-react';

export function MissingItemsTab() {
  const familyItems = [
    { name: 'Portrait photo', completed: true },
    { name: 'Obituary text', completed: true },
    { name: 'Clothing for preparation', completed: false },
    { name: 'Service preferences', completed: true },
    { name: 'Permit approvals', completed: false },
    { name: 'Music selections', completed: true },
    { name: 'Memorial photos', completed: true },
    { name: 'Guest list', completed: false },
  ];

  const funeralHomeItems = [
    { name: 'Body in care', completed: true },
    { name: 'Prep room assigned', completed: true },
    { name: 'Vehicle scheduled', completed: true },
    { name: 'Escort booked', completed: false },
    { name: 'Flowers ordered', completed: false },
    { name: 'Death certificate submitted', completed: true },
  ];

  const familyCompleted = familyItems.filter(i => i.completed).length;
  const familyTotal = familyItems.length;
  const familyPercentage = Math.round((familyCompleted / familyTotal) * 100);

  const fhCompleted = funeralHomeItems.filter(i => i.completed).length;
  const fhTotal = funeralHomeItems.length;
  const fhPercentage = Math.round((fhCompleted / fhTotal) * 100);

  const getItemIcon = (completed: boolean) => {
    if (completed) {
      return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
    }
    return <AlertCircle className="w-6 h-6 text-orange-500" />;
  };

  return (
    <div>
      <h2 className="text-gray-900 mb-6">Missing Items Checklists</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Family Responsibilities */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Family Responsibilities</h3>
              <span className="text-sm text-gray-900">{familyPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${familyPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {familyCompleted} of {familyTotal} items completed
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {familyItems.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 border ${
                    item.completed 
                      ? 'border-emerald-100 bg-emerald-50/50' 
                      : 'border-orange-100 bg-orange-50/50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {getItemIcon(item.completed)}
                  </div>
                  <span className={`flex-1 ${
                    item.completed 
                      ? 'text-gray-600 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {item.name}
                  </span>
                  {item.completed && (
                    <span className="text-xs text-emerald-600 px-2 py-1 bg-emerald-100 border border-emerald-200">
                      Done
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Badge */}
          {familyPercentage >= 50 && (
            <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-emerald-900">Milestone Unlocked!</p>
                  <p className="text-xs text-emerald-700">Over 50% complete</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Funeral Home Responsibilities */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900">Funeral Home Responsibilities</h3>
              <span className="text-sm text-gray-900">{fhPercentage}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${fhPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {fhCompleted} of {fhTotal} items completed
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {funeralHomeItems.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-3 p-3 border ${
                    item.completed 
                      ? 'border-blue-100 bg-blue-50/50' 
                      : 'border-orange-100 bg-orange-50/50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {getItemIcon(item.completed)}
                  </div>
                  <span className={`flex-1 ${
                    item.completed 
                      ? 'text-gray-600 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {item.name}
                  </span>
                  {item.completed && (
                    <span className="text-xs text-blue-600 px-2 py-1 bg-blue-100 border border-blue-200">
                      Done
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Badge */}
          {fhPercentage >= 50 && (
            <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-900">Milestone Unlocked!</p>
                  <p className="text-xs text-blue-700">Over 50% complete</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
