import { X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface IncludedItemDetail {
  title: string;
  description: string;
  explanation: string;
  images: string[];
  whyItMatters?: string;
}

interface IncludedItemModalProps {
  onClose: () => void;
  includedItemsData: Record<string, IncludedItemDetail>;
  itemKey: string;
}

export function IncludedItemModal({ onClose, includedItemsData, itemKey }: IncludedItemModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const item = includedItemsData[itemKey];
  
  if (!item) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="inline-block bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded mb-2">
                Included in Package
              </div>
              <h2 className="text-gray-900 mb-1">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-6">
          {/* Image Slideshow */}
          {item.images && item.images.length > 0 && (
            <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[16/10]">
              <img
                src={item.images[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-colors shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-full">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-gray-900 text-lg mb-3">What This Means</h3>
            <p className="text-gray-700 leading-relaxed">{item.explanation}</p>
          </div>

          {/* Why It Matters */}
          {item.whyItMatters && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h3 className="text-gray-900 text-lg mb-3">Why This Matters</h3>
              <p className="text-gray-700 leading-relaxed">{item.whyItMatters}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper data for included items
export const includedItemsData: Record<string, IncludedItemDetail> = {
  'professional-service': {
    title: 'Professional Service of Funeral Director and Staff',
    description: 'Guidance and support from our experienced team',
    explanation: 'Our professional staff will be with you every step of the way, handling all coordination, paperwork, and logistics. This includes meeting with your family, answering questions, coordinating with third parties, and ensuring every detail is managed with care and precision.',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'
    ],
    whyItMatters: 'During this difficult time, having experienced professionals manage complex details allows you to focus on what truly matters—honoring your loved one and being present with family and friends.'
  },
  'transfer-remains': {
    title: 'Transfer of Remains to Funeral Home',
    description: 'Safe and dignified transportation',
    explanation: 'We will carefully transfer your loved one from their place of passing to our facility. This is done with the utmost respect and care, using our specialized vehicles and trained staff, available 24/7.',
    images: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'
    ],
    whyItMatters: 'This service ensures your loved one is transported safely and with dignity, providing you peace of mind during the immediate hours after a loss.'
  },
  'embalming-preparation': {
    title: 'Embalming and Body Preparation',
    description: 'Professional care and presentation',
    explanation: 'Embalming is a process that temporarily preserves the body, allowing for viewings and services. Our licensed embalmers perform this service with great care, followed by dressing, cosmetics, and final preparation to ensure your loved one looks peaceful and natural.',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
    ],
    whyItMatters: 'This allows family and friends to say goodbye in person, which many find to be an important part of the healing process. It also provides time for family members traveling from out of town.'
  },
  'visitation-facilities': {
    title: 'Use of Facilities for Visitation',
    description: 'Comfortable space for gathering',
    explanation: 'Our visitation rooms provide a warm, comfortable environment where family and friends can gather to pay their respects. We provide seating, climate control, and all necessary amenities. Our staff will be available to assist with any needs during the visitation period.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ],
    whyItMatters: 'A dedicated space for visitation allows mourners to come together, share memories, and support one another in a dignified setting.'
  },
  'ceremony-facilities': {
    title: 'Use of Facilities for Funeral Ceremony',
    description: 'Beautiful chapel for the service',
    explanation: 'Our chapel provides a serene and respectful setting for the funeral or memorial service. We can accommodate various religious and cultural traditions, with audio/visual capabilities, seating for guests, and coordination of all ceremonial elements.',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f29da8c19f?w=800',
      'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800'
    ],
    whyItMatters: 'A meaningful ceremony helps family and friends honor and celebrate the life of your loved one, providing closure and a shared experience of remembrance.'
  },
  'hearse-transport': {
    title: 'Hearse for Local Transport',
    description: 'Dignified transportation to final destination',
    explanation: 'Our professional hearse will transport your loved one from our facility to the cemetery, crematory, or place of service. This includes a trained driver and vehicle maintained to the highest standards.',
    images: [
      'https://images.unsplash.com/photo-1583483425010-c566431a7710?w=800'
    ],
    whyItMatters: 'Professional transportation ensures your loved one arrives at their final destination with dignity and respect, while coordinating with the processional.'
  },
  'memorial-materials': {
    title: 'Basic Memorial Printed Materials',
    description: 'Programs and remembrance keepsakes',
    explanation: 'We provide printed materials including memorial folders, prayer cards, or programs that can be distributed to guests. These include the service details, photos, and special readings or poems you select.',
    images: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800'
    ],
    whyItMatters: 'These keepsakes give attendees something tangible to hold onto as a remembrance of your loved one and the service.'
  },
  'coordination-services': {
    title: 'Coordination with Cemetery/Crematory',
    description: 'Seamless arrangements with third parties',
    explanation: 'We handle all communication and coordination with the cemetery, crematory, or other facilities. This includes scheduling, paperwork, permits, and ensuring all parties are informed and prepared.',
    images: [
      'https://images.unsplash.com/photo-1500099817043-86d46000d58f?w=800'
    ],
    whyItMatters: 'Complex logistics are handled by our experienced staff, ensuring smooth coordination and eliminating confusion during an already stressful time.'
  }
};