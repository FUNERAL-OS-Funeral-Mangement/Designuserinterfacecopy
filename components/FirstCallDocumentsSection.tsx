import { useState, useEffect } from 'react';
import { FileText, Plus, Loader, CheckCircle2 } from 'lucide-react';

interface FirstCallDocumentsSectionProps {
  onDocumentsGenerated: (count: number) => void;
  intakeData: any;
}

export function FirstCallDocumentsSection({ onDocumentsGenerated, intakeData }: FirstCallDocumentsSectionProps) {
  const availableTemplates = [
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
    },
  ];

  // Pre-select all required documents on mount
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(() => {
    const initialSelection = new Set<string>();
    availableTemplates.forEach(template => {
      if (template.required) {
        initialSelection.add(template.id);
      }
    });
    return initialSelection;
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTemplate = (templateId: string) => {
    const newSelected = new Set(selectedTemplates);
    if (newSelected.has(templateId)) {
      newSelected.delete(templateId);
    } else {
      newSelected.add(templateId);
    }
    setSelectedTemplates(newSelected);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate document generation
    setTimeout(() => {
      setIsGenerating(false);
      onDocumentsGenerated(selectedTemplates.size);
    }, 2000);
  };

  const requiredCount = availableTemplates.filter(t => t.required).length;
  const requiredSelected = availableTemplates.filter(t => t.required && selectedTemplates.has(t.id)).length;

  return (
    <div className="bg-white border border-gray-200 p-8">
      {/* Section Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center text-sm">2</div>
          <h2 className="text-gray-900">Generate Documents</h2>
        </div>
        <p className="text-gray-600">
          Select the documents needed for this case. Required documents are pre-selected.
        </p>
      </div>

      <div className="max-w-2xl">
        {/* Template Selection */}
        <div className="space-y-3 mb-8">
          {availableTemplates.map((template) => {
            const isSelected = selectedTemplates.has(template.id);
            
            return (
              <label
                key={template.id}
                className={`
                  block border-2 p-5 cursor-pointer transition-all
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleTemplate(template.id)}
                    disabled={template.required}
                    className="mt-1 w-5 h-5 border-2 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <p className="text-gray-900">{template.name}</p>
                      {template.required && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>

        {/* Selection Summary */}
        <div className="bg-gray-50 border border-gray-200 p-5 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-gray-900 mb-1">
                {selectedTemplates.size} document{selectedTemplates.size !== 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-gray-600">
                {requiredSelected}/{requiredCount} required documents included
              </p>
            </div>
            {requiredSelected === requiredCount && (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-amber-50 border border-amber-200 p-5 mb-8">
          <p className="text-sm text-gray-900 mb-2">✨ What happens next</p>
          <p className="text-sm text-gray-600 mb-3">
            Documents will be auto-filled with intake data and sent to the next of kin for signature.
          </p>
          <p className="text-sm text-gray-600">
            Most families complete signatures within 15–30 minutes.
          </p>
        </div>

        {/* Generate Button */}
        <div className="pt-6">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || requiredSelected < requiredCount}
            className={`
              w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 transition-colors
              ${isGenerating || requiredSelected < requiredCount
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {isGenerating ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Generating documents...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate & Send for Signature</span>
              </>
            )}
          </button>
          
          {requiredSelected < requiredCount && (
            <p className="text-sm text-orange-600 mt-3">
              Please select all required documents to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}