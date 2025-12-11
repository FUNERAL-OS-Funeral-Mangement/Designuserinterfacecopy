import { useState } from 'react';
import { Upload, ArrowLeft } from 'lucide-react';

interface CreateCaseProps {
  onBack: () => void;
  onContinue: () => void;
  formData: {
    callerName: string;
    callerPhone: string;
    deceasedName: string;
    dateOfDeath: string;
    timeOfDeath: string;
    locationOfDeath: string;
    address: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
    weight: string;
    readyTime: string;
  };
}

export function CreateCase({ onBack, onContinue, formData }: CreateCaseProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const caseNumber = 1;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const infoRows = [
    { label: 'Name of caller', value: formData.callerName },
    { label: "Caller's phone", value: formData.callerPhone },
    { label: 'Name of deceased', value: formData.deceasedName },
    { label: 'Date of death', value: formData.dateOfDeath },
    { label: 'Time of death', value: formData.timeOfDeath },
    { label: 'Location of death', value: formData.locationOfDeath },
    { label: 'Address', value: formData.address },
    { label: 'Next of kin', value: formData.nextOfKinName },
    { label: 'Next of kin phone', value: formData.nextOfKinPhone },
    { label: 'Weight', value: formData.weight ? `${formData.weight} lbs` : '' },
    { label: 'Ready for pickup', value: formData.readyTime },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div>
            <h1 className="text-gray-900 mb-1">Create case</h1>
            <p className="text-gray-600">Review the first call information and continue</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-4xl">
        {/* Case Card */}
        <div className="bg-white border border-gray-200">
          {/* Case Number */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Case number</p>
            <p className="text-gray-900">#{caseNumber}</p>
          </div>

          {/* Photo Upload */}
          <div className="px-5 sm:px-8 py-6 sm:py-8 border-b border-gray-100 flex justify-center">
            <div className="relative">
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer block"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden hover:border-gray-300 transition-colors">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Deceased"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">Upload photo</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* First Call Information */}
          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <h3 className="text-gray-900 mb-5 sm:mb-6">First call information</h3>
            
            <div className="space-y-4 sm:space-y-6">
              {infoRows.map((row, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                  <p className="text-sm text-gray-500">{row.label}</p>
                  <p className="col-span-1 sm:col-span-2 text-gray-900">{row.value || '—'}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 sm:px-8 py-5 sm:py-6 bg-gray-50 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <button
              onClick={onBack}
              className="w-full sm:w-auto text-center sm:text-left text-gray-600 hover:text-gray-900 transition-colors py-2 sm:py-0"
            >
              Edit details
            </button>
            <button
              onClick={onContinue}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}