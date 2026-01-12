import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useFirstCallStore } from '../store/useFirstCallStore';
import { FIRST_CALL_STATUS_LABELS } from '../types/firstCall';

interface ActiveCasesDockProps {
  onNewCall: () => void;
}

export function ActiveCasesDock({ onNewCall }: ActiveCasesDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { activeCaseId, switchCase, getAllActiveCases } = useFirstCallStore();
  
  const activeCases = getAllActiveCases();
  const activeCount = activeCases.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Don't show if no active cases
  if (activeCount === 0) {
    return null;
  }

  // If only 1 case, show simple badge (not clickable)
  if (activeCount === 1) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700">
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        <span>Active Case (1)</span>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Compact Badge Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
      >
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        <span>Active Cases ({activeCount})</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 shadow-xl z-50">
          {/* Cases List */}
          <div className="max-h-80 overflow-y-auto">
            {activeCases.map((caseItem) => {
              const isActive = caseItem.id === activeCaseId;
              const statusLabel = FIRST_CALL_STATUS_LABELS[caseItem.status];
              
              return (
                <button
                  key={caseItem.id}
                  onClick={() => {
                    switchCase(caseItem.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full px-4 py-3 text-left border-b border-gray-100 transition-colors
                    ${isActive 
                      ? 'bg-blue-50 border-l-4 border-l-blue-600' 
                      : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {caseItem.deceasedName || 'New Case'}
                      </p>
                      <p className={`text-xs ${statusLabel.color} mt-1`}>
                        {statusLabel.emoji} {statusLabel.label}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* New Call CTA */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => {
                onNewCall();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New First Call</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}