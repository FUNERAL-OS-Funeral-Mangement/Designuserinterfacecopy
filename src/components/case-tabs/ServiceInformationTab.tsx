import { Calendar, MapPin, User, FileText, Clock, Landmark } from 'lucide-react';

export function ServiceInformationTab() {
  const serviceDetails = [
    { label: 'Service Type', value: 'Pet Cremation with Ashes', icon: FileText },
    { label: 'Service Date', value: 'November 5, 2023', icon: Calendar },
    { label: 'Service Time', value: '2:00 PM - 4:00 PM', icon: Clock },
    { label: 'Location', value: 'Chapel A - Main Building', icon: MapPin },
    { label: 'Officiant', value: 'Rev. Michael Thompson', icon: User },
  ];

  const visitationDetails = [
    { label: 'Visitation Date', value: 'November 4, 2023', icon: Calendar },
    { label: 'Visitation Time', value: '5:00 PM - 8:00 PM', icon: Clock },
    { label: 'Location', value: 'Viewing Room B', icon: MapPin },
    { label: 'Expected Guests', value: '40-50 people', icon: User },
  ];

  const cemeteryDetails = [
    { label: 'Cemetery Name', value: 'Graceland Memorial Park', icon: Landmark },
    { label: 'Address', value: '1234 Memorial Drive, Chicago, IL 60614', icon: MapPin },
    { label: 'Section', value: 'Garden of Peace', icon: MapPin },
    { label: 'Plot Number', value: 'Section 12, Row 5, Plot 8', icon: FileText },
  ];

  const intermentDetails = [
    { label: 'Interment Date', value: 'November 6, 2023', icon: Calendar },
    { label: 'Interment Time', value: '10:00 AM', icon: Clock },
    { label: 'Vault Type', value: 'Standard Concrete Vault', icon: Landmark },
    { label: 'Monument', value: 'Flat Bronze Marker', icon: Landmark },
  ];

  const timeline = [
    { time: '1:30 PM', event: 'Family arrival', status: 'upcoming' },
    { time: '2:00 PM', event: 'Service begins', status: 'upcoming' },
    { time: '2:30 PM', event: 'Eulogy', status: 'upcoming' },
    { time: '3:30 PM', event: 'Closing remarks', status: 'upcoming' },
    { time: '4:00 PM', event: 'Service ends', status: 'upcoming' },
  ];

  return (
    <div>
      <h2 className="text-gray-900 mb-6">Service Information</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Service Details */}
        <div className="lg:col-span-2 bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Service Details</h3>
          </div>
          <div className="p-6 space-y-5">
            {serviceDetails.map((item, index) => (
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

        {/* Service Timeline */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Timeline</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-px h-full bg-gray-200 mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm text-gray-900">{item.time}</p>
                    <p className="text-sm text-gray-600">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Special Instructions */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-gray-900">Special Instructions</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 leading-relaxed">
            Family has requested a special prayer card design featuring the pet's photo. 
            They would also like to display a photo collage during the service.
          </p>
        </div>
      </div>

      {/* Visitation Information */}
      <div className="mb-6">
        <h3 className="text-gray-900 mb-4">Visitation Information</h3>
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Visitation Details</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {visitationDetails.map((item, index) => (
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

      {/* Cemetery Information */}
      <div>
        <h3 className="text-gray-900 mb-4">Cemetery Information</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Cemetery Details */}
          <div className="bg-white border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900">Cemetery Details</h3>
            </div>
            <div className="p-6 space-y-5">
              {cemeteryDetails.map((item, index) => (
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
              {intermentDetails.map((item, index) => (
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

        {/* Cemetery Notes */}
        <div className="bg-white border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-gray-900">Cemetery Notes</h3>
          </div>
          <div className="p-6">
            <p className="text-gray-600 leading-relaxed">
              Family has requested a private interment ceremony with only immediate family present.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
