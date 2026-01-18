'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { InlineWidget, PopupButton } from 'react-calendly';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

// DRY: Reusable Calendly Modal Component
export function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Calendly Widget */}
        <div className="w-full h-full">
          <InlineWidget
            url={url}
            styles={{
              height: '100%',
              width: '100%',
            }}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '06b6d4',
              textColor: '1e293b',
            }}
          />
        </div>
      </div>
    </div>
  );
}

