import { MapPin, User, Upload, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

interface CaseCardProps {
  caseNumber: string | number;
  dateCreated: string;
  deceasedName: string;
  caseType: 'At-Need' | 'Pre-Need';
  serviceType: string;
  location?: string;
  photoUrl?: string;
  stepsCompleted: number;
  totalSteps: number;
  tasksCompleted: number;
  totalTasks: number;
  price: number;
  assignedTo: string;
  onPhotoUpload?: (caseNumber: string | number, file: File) => void;
}

export function CaseCard({
  caseNumber,
  dateCreated,
  deceasedName,
  caseType,
  serviceType,
  location,
  photoUrl,
  stepsCompleted,
  totalSteps,
  tasksCompleted,
  totalTasks,
  price,
  assignedTo,
  onPhotoUpload,
}: CaseCardProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(photoUrl || null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Call the optional callback
      if (onPhotoUpload) {
        onPhotoUpload(caseNumber, file);
      }
    }
  };

  // Calculate completion percentages
  const stepsProgress = totalSteps > 0 ? (stepsCompleted / totalSteps) * 100 : 0;
  const tasksProgress = totalTasks > 0 ? (tasksCompleted / totalTasks) * 100 : 0;
  const isStepsComplete = stepsCompleted === totalSteps && totalSteps > 0;
  const isTasksComplete = tasksCompleted === totalTasks && totalTasks > 0;

  return (
    <div className="border-2 border-gray-300 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group" style={{ backgroundColor: '#000921' }}>
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">#{caseNumber}</span>
          <span className="text-sm text-gray-400">{dateCreated}</span>
        </div>
        
        {/* Photo Upload */}
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <input
              type="file"
              id={`photo-upload-${caseNumber}`}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <label
              htmlFor={`photo-upload-${caseNumber}`}
              className="cursor-pointer block"
            >
              <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0 hover:border-blue-400 transition-colors relative group/photo">
                {uploadedPhoto ? (
                  <>
                    <img 
                      src={uploadedPhoto} 
                      alt={deceasedName} 
                      className="w-full h-full object-cover"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <User className="w-5 h-5 text-gray-400 group-hover/photo:hidden" />
                    <Upload className="w-5 h-5 text-gray-300 hidden group-hover/photo:block" />
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white truncate mb-1">{deceasedName}</h3>
            <p className="text-sm text-gray-400">{serviceType}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{location || 'No location set'}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 py-5 grid grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Steps</p>
            {isStepsComplete && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className={`text-white mb-2 ${isStepsComplete ? 'text-emerald-400' : ''}`}>
            {stepsCompleted}/{totalSteps}
          </p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                isStepsComplete ? 'bg-emerald-400' : 'bg-blue-500'
              }`}
              style={{ width: `${stepsProgress}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Tasks</p>
            {isTasksComplete && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className={`text-white mb-2 ${isTasksComplete ? 'text-emerald-400' : ''}`}>
            {tasksCompleted}/{totalTasks}
          </p>
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                isTasksComplete ? 'bg-emerald-400' : 'bg-blue-500'
              }`}
              style={{ width: `${tasksProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="px-6 py-5 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-1">Total</p>
        <p className="text-2xl text-white">${price.toLocaleString()}</p>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-black/30 border-t border-gray-700 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500">Family Attended By</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs text-white">{assignedTo.charAt(0)}</span>
            </div>
            <span className="text-sm text-gray-300">{assignedTo}</span>
          </div>
        </div>
        <span className="text-sm text-gray-400 px-2 py-1 bg-gray-800 border border-gray-600 rounded">{caseType}</span>
      </div>
    </div>
  );
}