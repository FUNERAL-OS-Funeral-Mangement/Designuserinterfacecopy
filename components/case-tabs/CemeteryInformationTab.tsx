import { MapPin, Calendar, FileText, Landmark } from 'lucide-react';

export function CemeteryInformationTab() {
  const cemeteryInfo = [
    { label: 'Cemetery Name', value: 'Graceland Memorial Park', icon: Landmark },
    { label: 'Address', value: '1234 Memorial Drive, Chicago, IL 60614', icon: MapPin },
    { label: 'Section', value: 'Garden of Peace', icon: MapPin },
    { label: 'Plot Number', value: 'Section 12, Row 5, Plot 8', icon: FileText },
  ];

  const intermentInfo = [
    { label: 'Interment Date', value: 'November 6, 2023', icon: Calendar },
    { label: 'Interment Time', value: '10:00 AM', icon: Calendar },
    { label: 'Vault Type', value: 'Standard Concrete Vault', icon: Landmark },
    { label: 'Monument', value: 'Flat Bronze Marker', icon: Landmark },
  ];

  return (
    <div>
      <h2 className="text-gray-900 mb-6">Cemetery Information</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cemetery Details */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Cemetery Details</h3>
          </div>
          <div className="p-6 space-y-5">
            {cemeteryInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interment Details */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Interment Details</h3>
          </div>
          <div className="p-6 space-y-5">
            {intermentInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                  <p className="text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monument Information */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Monument Details</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Marker Type</p>
              <p className="text-gray-900">Flat Bronze Marker</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Size</p>
              <p className="text-gray-900">24" x 12"</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Inscription</p>
              <p className="text-gray-900">Zachary Binx<br />1945 - 2023<br />Beloved Companion</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Installation Date</p>
              <p className="text-gray-900">To be determined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Notes</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">
            Family has requested a private interment ceremony with only immediate family present.
          </p>
        </div>
      </div>
    </div>
  );
}
