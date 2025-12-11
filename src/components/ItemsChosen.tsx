import { useState } from 'react';
import { FileText, Upload, AlertCircle, CheckCircle } from 'lucide-react';

interface ItemsChosenProps {
  caseType: 'preneed' | 'at-need';
  caseData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

export function ItemsChosen({ caseType, caseData, onComplete, onBack }: ItemsChosenProps) {
  const [documents, setDocuments] = useState<string[]>([]);
  const [checklist, setChecklist] = useState({
    cremationAuth: false,
    releaseForm: false,
    deathCertificate: false,
    permit: false,
  });

  const catalogItems = caseData.catalogItems || {};
  const selectedPackage = catalogItems.package;
  const selectedAddons = catalogItems.addons || [];
  const total = catalogItems.total || 0;

  const requiredDocuments = [
    { id: 'cremationAuth', label: 'Cremation Authorization', required: selectedPackage?.name.includes('Cremation') },
    { id: 'releaseForm', label: 'Release Form', required: true },
    { id: 'deathCertificate', label: 'Death Certificate Application', required: true },
    { id: 'permit', label: 'Burial/Cremation Permit', required: true },
  ];

  const handleChecklistToggle = (item: string) => {
    setChecklist({ ...checklist, [item]: !checklist[item] });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setDocuments([...documents, ...fileNames]);
    }
  };

  const handleContinue = () => {
    onComplete({ documents, checklist });
  };

  const allRequiredComplete = requiredDocuments
    .filter((doc) => doc.required)
    .every((doc) => checklist[doc.id as keyof typeof checklist]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-gray-900 mb-2">Items Chosen & Required Documents</h2>
        <p className="text-gray-600">
          Review the GPL breakdown, checklist, and upload required documentation.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* GPL Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
            <h3 className="text-gray-900">General Price List</h3>
            <button className="text-teal-600 hover:text-teal-700 text-sm flex items-center gap-1">
              <FileText className="w-4 h-4" />
              Print GPL
            </button>
          </div>

          {/* Professional Services */}
          <div className="mb-6">
            <h4 className="text-gray-700 mb-3">Professional Services</h4>
            {selectedPackage && (
              <div className="space-y-2">
                <div className="flex justify-between text-gray-900">
                  <span>{selectedPackage.name}</span>
                  <span>${selectedPackage.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-600 text-sm">{selectedPackage.description}</p>
              </div>
            )}
          </div>

          {/* Merchandise & Services */}
          {selectedAddons.length > 0 && (
            <div className="mb-6">
              <h4 className="text-gray-700 mb-3">Merchandise & Additional Services</h4>
              <div className="space-y-2">
                {selectedAddons.map((addon: any) => (
                  <div key={addon.id} className="flex justify-between text-gray-700">
                    <span className="text-sm">{addon.name}</span>
                    <span className="text-sm">${addon.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="pt-4 border-t-2 border-gray-300">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700">${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Tax (8.5%)</span>
              <span className="text-gray-700">${(total * 0.085).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${(total * 1.085).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="space-y-6">
          {/* Checklist */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Required Documents Checklist</h3>
            <div className="space-y-3">
              {requiredDocuments.map((doc) => (
                <label
                  key={doc.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    checklist[doc.id as keyof typeof checklist]
                      ? 'border-teal-600 bg-teal-50'
                      : doc.required
                      ? 'border-orange-200 bg-orange-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checklist[doc.id as keyof typeof checklist]}
                    onChange={() => handleChecklistToggle(doc.id)}
                    className="w-5 h-5 text-teal-600 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{doc.label}</span>
                      {doc.required && (
                        <span className="text-xs text-orange-600">Required</span>
                      )}
                    </div>
                  </div>
                  {checklist[doc.id as keyof typeof checklist] ? (
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                  ) : doc.required ? (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  ) : null}
                </label>
              ))}
            </div>

            {!allRequiredComplete && (
              <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  Please complete all required documents before proceeding.
                </p>
              </div>
            )}
          </div>

          {/* Document Upload */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer text-sm"
              >
                Choose Files
              </label>
            </div>

            {documents.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-gray-700 text-sm">Uploaded Files</h4>
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* eSign Packets */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">eSign Packets</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm">Service Agreement</span>
                <span className="text-green-600 text-sm">Signed ✓</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 text-sm">Authorization Form</span>
                <span className="text-yellow-600 text-sm">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!allRequiredComplete}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Review
        </button>
      </div>
    </div>
  );
}
