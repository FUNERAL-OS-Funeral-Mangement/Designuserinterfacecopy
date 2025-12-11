import { useState } from 'react';
import { User, Calendar, MapPin, FileText } from 'lucide-react';

interface VitalStatisticsProps {
  caseType: 'preneed' | 'at-need';
  caseData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function VitalStatistics({ caseType, caseData, onComplete, onBack }: VitalStatisticsProps) {
  // Auto-populate from removal workflow (simulated data)
  const [formData, setFormData] = useState({
    firstName: caseData.vitalStats?.firstName || 'John',
    middleName: caseData.vitalStats?.middleName || '',
    lastName: caseData.vitalStats?.lastName || 'Doe',
    dateOfBirth: caseData.vitalStats?.dateOfBirth || '1955-03-15',
    dateOfPassing: caseData.vitalStats?.dateOfPassing || '2024-11-25',
    gender: caseData.vitalStats?.gender || 'male',
    ssn: caseData.vitalStats?.ssn || '',
    placeOfBirth: caseData.vitalStats?.placeOfBirth || '',
    placeOfDeath: caseData.vitalStats?.placeOfDeath || 'Memorial Hospital, Suite 304',
    maritalStatus: caseData.vitalStats?.maritalStatus || '',
    occupation: caseData.vitalStats?.occupation || '',
    education: caseData.vitalStats?.education || '',
    militaryService: caseData.vitalStats?.militaryService || '',
    fatherName: caseData.vitalStats?.fatherName || '',
    motherName: caseData.vitalStats?.motherName || '',
    spouseName: caseData.vitalStats?.spouseName || '',
    residence: caseData.vitalStats?.residence || '',
    removalNotes: caseData.vitalStats?.removalNotes || 'Auto-populated from removal workflow',
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ vitalStats: formData });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2">Vital Statistics</h2>
          <p className="text-gray-600">
            Please review and complete the vital information for death certificate registration.
            Information from the removal workflow has been auto-populated.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <User className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">About</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Middle Name</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => handleChange('middleName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Gender *</label>
                <div className="flex gap-3">
                  {['male', 'female', 'other'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="w-4 h-4 text-teal-600"
                      />
                      <span className="text-gray-700 capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dates & Location */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <Calendar className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Important Dates</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Date of Passing *</label>
                <input
                  type="date"
                  value={formData.dateOfPassing}
                  onChange={(e) => handleChange('dateOfPassing', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <MapPin className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Location Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Place of Birth</label>
                <input
                  type="text"
                  value={formData.placeOfBirth}
                  onChange={(e) => handleChange('placeOfBirth', e.target.value)}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Place of Death *</label>
                <input
                  type="text"
                  value={formData.placeOfDeath}
                  onChange={(e) => handleChange('placeOfDeath', e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-teal-50"
                />
                <p className="text-xs text-teal-700 mt-1">Auto-populated from removal workflow</p>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Residence Address</label>
                <input
                  type="text"
                  value={formData.residence}
                  onChange={(e) => handleChange('residence', e.target.value)}
                  placeholder="Street Address, City, State, ZIP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <FileText className="w-5 h-5 text-teal-600" />
              <h3 className="text-gray-900">Additional Information</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Social Security Number</label>
                <input
                  type="text"
                  value={formData.ssn}
                  onChange={(e) => handleChange('ssn', e.target.value)}
                  placeholder="XXX-XX-XXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Marital Status</label>
                <select
                  value={formData.maritalStatus}
                  onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={(e) => handleChange('occupation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select...</option>
                  <option value="high-school">High School</option>
                  <option value="some-college">Some College</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Military Service</label>
                <input
                  type="text"
                  value={formData.militaryService}
                  onChange={(e) => handleChange('militaryService', e.target.value)}
                  placeholder="Branch, Years"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div>
            <h3 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">Family Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Father's Full Name</label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleChange('fatherName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mother's Maiden Name</label>
                <input
                  type="text"
                  value={formData.motherName}
                  onChange={(e) => handleChange('motherName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Spouse's Name</label>
                <input
                  type="text"
                  value={formData.spouseName}
                  onChange={(e) => handleChange('spouseName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Removal Notes */}
          {formData.removalNotes && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h3 className="text-gray-900 mb-2">Removal Notes</h3>
              <p className="text-gray-700 text-sm">{formData.removalNotes}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Continue to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
