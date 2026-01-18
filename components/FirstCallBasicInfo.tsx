import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

interface FirstCallBasicInfoProps {
  onComplete: () => void;
  caseId?: string;
}

export function FirstCallBasicInfo({ onComplete, caseId }: FirstCallBasicInfoProps) {
  const { caseData, updateCaseData } = useStore();

  const [callerName, setCallerName] = useState('');
  const [callerRelationship, setCallerRelationship] = useState('');
  const [callerPhone, setCallerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [nextOfKinName, setNextOfKinName] = useState('');
  const [nextOfKinPhone, setNextOfKinPhone] = useState('');
  const [weight, setWeight] = useState('');
  const [isWeightKnown, setIsWeightKnown] = useState<'known' | 'unknown' | ''>('');
  const [readyForPickup, setReadyForPickup] = useState<'yes' | 'no' | ''>('');
  const [readyTime, setReadyTime] = useState('');
  const [hasStairs, setHasStairs] = useState<'yes' | 'no' | ''>('');
  const [isFamilyPresent, setIsFamilyPresent] = useState<'yes' | 'no' | ''>('');
  const [isVerbalRelease, setIsVerbalRelease] = useState(false);

  const handleSave = () => {
    // Save data to store
    onComplete();
  };

  return (
    <div className="max-w-2xl">
      {/* Progress Indicator */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <div className="w-6 h-6 bg-gray-900 text-white flex items-center justify-center text-xs">1</div>
          <span className="text-gray-900">Complete basic information</span>
        </div>
        <p className="text-sm text-gray-500 ml-8">
          After saving, you'll be able to generate and send documents for signature
        </p>
      </div>

      <div className="space-y-6">
        {/* Caller Information */}
        <div>
          <h3 className="text-gray-900 mb-4">Caller Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name of caller</label>
              <input
                type="text"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                placeholder="Mary Foster"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Relationship of caller</label>
              <input
                type="text"
                value={callerRelationship}
                onChange={(e) => setCallerRelationship(e.target.value)}
                placeholder="Family/Nurse/Police"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Caller's phone number</label>
              <input
                type="tel"
                value={callerPhone}
                onChange={(e) => setCallerPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Deceased Information */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-gray-900 mb-4">Deceased Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name of deceased</label>
              <input
                type="text"
                value={caseData.deceasedName || ''}
                onChange={(e) =>
                  updateCaseData({
                    deceasedName: e.target.value,
                  })
                }
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date of birth</label>
              <input
                type="date"
                value={caseData.dateOfBirth || ''}
                onChange={(e) =>
                  updateCaseData({
                    dateOfBirth: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Date of death</label>
                <input
                  type="date"
                  value={
                    caseData.timeOfDeath
                      ? caseData.timeOfDeath.split('T')[0]
                      : ''
                  }
                  onChange={(e) => {
                    const existingTime =
                      caseData.timeOfDeath?.split('T')[1] ||
                      '00:00';
                    updateCaseData({
                      timeOfDeath: `${e.target.value}T${existingTime}`,
                    });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Time of death</label>
                <input
                  type="time"
                  value={
                    caseData.timeOfDeath
                      ? caseData.timeOfDeath
                          .split('T')[1]
                          ?.slice(0, 5)
                      : ''
                  }
                  onChange={(e) => {
                    const existingDate =
                      caseData.timeOfDeath?.split('T')[0] ||
                      new Date().toISOString().split('T')[0];
                    updateCaseData({
                      timeOfDeath: `${existingDate}T${e.target.value}`,
                    });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location of death</label>
              <input
                type="text"
                value={caseData.locationOfPickup || ''}
                onChange={(e) =>
                  updateCaseData({
                    locationOfPickup: e.target.value,
                  })
                }
                placeholder="North Shore Hospital"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="1232 NE 18th Place, Miami FL"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Next of Kin */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-gray-900 mb-4">Next of Kin</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={nextOfKinName}
                onChange={(e) => setNextOfKinName(e.target.value)}
                placeholder="Mary Foster"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Phone number</label>
              <input
                type="tel"
                value={nextOfKinPhone}
                onChange={(e) => setNextOfKinPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-gray-900 mb-4">Removal Logistics</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Weight (lbs)</label>
              <div className="flex gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => setIsWeightKnown('known')}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    isWeightKnown === 'known'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  Known
                </button>
                <button
                  type="button"
                  onClick={() => setIsWeightKnown('unknown')}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    isWeightKnown === 'unknown'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  Unknown
                </button>
              </div>

              {isWeightKnown === 'known' && (
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="180"
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Ready for pickup</label>
              <div className="flex gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setReadyForPickup('yes');
                    if (readyForPickup !== 'yes') {
                      setReadyTime('');
                    }
                  }}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    readyForPickup === 'yes'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReadyForPickup('no');
                    setReadyTime('');
                  }}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    readyForPickup === 'no'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  No
                </button>
              </div>

              {readyForPickup === 'yes' && (
                <input
                  type="text"
                  value={readyTime}
                  onChange={(e) => setReadyTime(e.target.value)}
                  placeholder="30 minutes"
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Are there stairs at the location?</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setHasStairs('yes')}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    hasStairs === 'yes'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasStairs('no')}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    hasStairs === 'no'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Is the family present?</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsFamilyPresent('yes')}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    isFamilyPresent === 'yes'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIsFamilyPresent('no')}
                  className={`flex-1 px-4 py-3 border transition-colors ${
                    isFamilyPresent === 'no'
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Verbal Release Toggle */}
        <div className="pt-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-900 mb-1">
                  Is a signed release required from the family?
                </p>
                <p className="text-sm text-gray-600">
                  Skip e-signature process if verbal authorization was given
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsVerbalRelease(!isVerbalRelease)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isVerbalRelease ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isVerbalRelease ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {isVerbalRelease && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  ✓ Case will be marked as verbal release. No e-signature required.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Release Form Information - Only show if NOT verbal release */}
        {!isVerbalRelease && (
          <div className="pt-6">
            <div className="bg-gray-900 px-6 py-5">
              <p className="text-white leading-relaxed">
                A release form will be automatically sent to the next of kin via text message for e-signature.
              </p>
            </div>
          </div>
        )}

        {/* Save and Continue */}
        <div className="pt-8 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <span>{isVerbalRelease ? 'Create Case' : 'Send Release Form'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-sm text-gray-500 mt-3">
            {isVerbalRelease 
              ? 'Next: Case will be created with verbal release' 
              : 'Next: Generate release documents and send for signature'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
