import { X, Calendar, Clock, MapPin, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ServiceInformation } from '../store/useCaseStore';

interface ServiceInformationModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (serviceInfo: ServiceInformation) => void;
  packageName: string;
  initialData?: ServiceInformation;
}

export function ServiceInformationModal({ 
  show, 
  onClose, 
  onSave, 
  packageName,
  initialData 
}: ServiceInformationModalProps) {
  const [serviceInfo, setServiceInfo] = useState<ServiceInformation>({
    date: '',
    time: '',
    location: '',
    address: '',
    notes: '',
  });

  useEffect(() => {
    if (initialData) {
      setServiceInfo(initialData);
    }
  }, [initialData]);

  if (!show) return null;

  const handleSave = () => {
    onSave(serviceInfo);
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-start justify-between">
          <div>
            <h2 className="text-gray-900 mb-1">Service Information</h2>
            <p className="text-gray-600">
              You've selected <span className="text-gray-900">{packageName}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Let's capture the service details. This information will be used throughout the case and in all documents.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-8 space-y-6">
          {/* Date & Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Service Date */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Service Date
              </label>
              <input
                type="date"
                value={serviceInfo.date}
                onChange={(e) => setServiceInfo({ ...serviceInfo, date: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            {/* Service Time */}
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                Service Time
              </label>
              <input
                type="time"
                value={serviceInfo.time}
                onChange={(e) => setServiceInfo({ ...serviceInfo, time: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Location Name
            </label>
            <input
              type="text"
              value={serviceInfo.location}
              onChange={(e) => setServiceInfo({ ...serviceInfo, location: e.target.value })}
              placeholder="e.g., Chapel A, Main Hall, Garden Pavilion"
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Address */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              Full Address
            </label>
            <input
              type="text"
              value={serviceInfo.address}
              onChange={(e) => setServiceInfo({ ...serviceInfo, address: e.target.value })}
              placeholder="Street address, city, state, zip"
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-gray-400" />
              Additional Notes
            </label>
            <textarea
              value={serviceInfo.notes}
              onChange={(e) => setServiceInfo({ ...serviceInfo, notes: e.target.value })}
              placeholder="Any special instructions or details about the service..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <span className="text-gray-900">💡 You can update this information anytime</span> from the Service Information section in the case dashboard.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={handleSkip}
            className="px-6 py-3 text-gray-700 hover:text-gray-900 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg"
          >
            Save Service Information
          </button>
        </div>
      </div>
    </div>
  );
}
