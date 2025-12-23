import { useState } from 'react';
import { CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { useStore } from '../store/useStore';

interface FirstCallIntakeSectionProps {
  onComplete: (data: any) => void;
}

export function FirstCallIntakeSection({ onComplete }: FirstCallIntakeSectionProps) {
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
  const [notifyRemovalTeam, setNotifyRemovalTeam] = useState(true);
  const [selectedRemovalTeam, setSelectedRemovalTeam] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(['body-release']);

  const toggleDocument = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const documents = [
    {
      id: 'body-release',
      name: 'Body Release Form',
      description: 'Required for body removal',
      required: true
    },
    {
      id: 'cremation-auth',
      name: 'Cremation Authorization',
      description: 'Required for cremation services',
      required: false
    }
  ];

  const requiredDocs = documents.filter(d => d.required);
  const selectedRequiredDocs = selectedDocuments.filter(id => 
    requiredDocs.some(d => d.id === id)
  );

  const handleComplete = () => {
    // Save data to store
    onComplete({
      deceasedName: caseData.deceasedName,
      nextOfKinName,
      callerName,
      callerRelationship,
      callerPhone,
      address,
      nextOfKinPhone,
      weight,
      isWeightKnown,
      readyForPickup,
      readyTime,
      hasStairs,
      isFamilyPresent,
      isVerbalRelease,
      timeOfDeath: caseData.timeOfDeath,
      signaturesTotal: selectedDocuments.length,
      selectedDocuments,
    });
  };

  return (
    <div className="bg-white border border-gray-200 p-8">
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-sm">1</div>
          <h2 className="text-gray-900">First Call Intake</h2>
        </div>
        <p className="text-gray-600">
          Collect basic information. Once complete, the system will automatically prepare documents for signature.
        </p>
      </div>

      <div className="space-y-8 max-w-2xl">
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
                onChange={(e) => updateCaseData({ deceasedName: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Date of birth</label>
              <input
                type="date"
                value={caseData.dateOfBirth || ''}
                onChange={(e) => updateCaseData({ dateOfBirth: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Date of death</label>
                <input
                  type="date"
                  value={caseData.timeOfDeath ? caseData.timeOfDeath.split('T')[0] : ''}
                  onChange={(e) => {
                    const existingTime = caseData.timeOfDeath?.split('T')[1] || '00:00';
                    updateCaseData({ timeOfDeath: `${e.target.value}T${existingTime}` });
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Time of death</label>
                <input
                  type="time"
                  value={caseData.timeOfDeath ? caseData.timeOfDeath.split('T')[1]?.slice(0, 5) : ''}
                  onChange={(e) => {
                    const existingDate = caseData.timeOfDeath?.split('T')[0] || new Date().toISOString().split('T')[0];
                    updateCaseData({ timeOfDeath: `${existingDate}T${e.target.value}` });
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
                onChange={(e) => updateCaseData({ locationOfPickup: e.target.value })}
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
              <label className="block text-gray-700 mb-2">Next of kin</label>
              <input
                type="text"
                value={nextOfKinName}
                onChange={(e) => setNextOfKinName(e.target.value)}
                placeholder="Mary Foster"
                className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Next of kin phone number</label>
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

        {/* Removal Logistics */}
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

            {/* Removal Team Selection - Shows when ready for pickup */}
            {readyForPickup === 'yes' && (
              <div className="pt-4 space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200">
                  <input
                    type="checkbox"
                    id="notify-removal"
                    checked={notifyRemovalTeam}
                    onChange={(e) => setNotifyRemovalTeam(e.target.checked)}
                    className="mt-0.5 w-5 h-5 border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="notify-removal" className="block text-gray-900 cursor-pointer">
                      Notify removal team
                    </label>
                    <p className="text-sm text-gray-600 mt-1">
                      The removal team will be automatically notified once the e-signed release form is received from the family
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Select removal team</label>
                  <select
                    value={selectedRemovalTeam}
                    onChange={(e) => setSelectedRemovalTeam(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-gray-400 transition-colors"
                  >
                    <option value="">Select a team</option>
                    <option value="team-1">Premier Removal Services</option>
                    <option value="team-2">24/7 Body Transport Co.</option>
                    <option value="team-3">Guardian Removal Team</option>
                    <option value="team-4">Care Transport Services</option>
                  </select>
                </div>
              </div>
            )}

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
                  Toggle off if verbal authorization was given
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
                  ✓ Signature step will be skipped. Case marked as verbal release.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Generate Documents Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="mb-6">
            <h2 className="text-gray-900 mb-3">Generate Documents</h2>
            <p className="text-gray-600">
              Select the documents needed for this case. Required documents are pre-selected.
            </p>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => {
              const isSelected = selectedDocuments.includes(doc.id);
              const isRequired = doc.required;

              return (
                <div
                  key={doc.id}
                  className={`border p-4 transition-colors ${
                    isSelected && isRequired
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => !isRequired && toggleDocument(doc.id)}
                      disabled={isRequired}
                      className="mt-0.5 w-5 h-5 border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-900">{doc.name}</span>
                        {isRequired && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>

          {/* Document Summary */}
          <div className="mt-4 p-4 bg-gray-50 border border-gray-200 flex items-center justify-between">
            <div className="text-sm text-blue-600">
              <span>{selectedDocuments.length} document{selectedDocuments.length === 1 ? '' : 's'} selected</span>
              <span className="mx-2">•</span>
              <span>{selectedRequiredDocs.length}/{requiredDocs.length} required documents included</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>

          {/* What happens next - Documents */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200">
            <p className="text-sm text-gray-900 mb-2">✨ What happens next</p>
            <p className="text-sm text-gray-600 mb-2">
              Documents will be auto-filled with intake data and sent to the next of kin for signature.
            </p>
            <p className="text-sm text-gray-600">
              Most families complete signatures within 15-30 minutes.
            </p>
          </div>
        </div>

        {/* Complete Button */}
        <div className="pt-6">
          <button
            onClick={handleComplete}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            <span>Generate & Send for Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
}