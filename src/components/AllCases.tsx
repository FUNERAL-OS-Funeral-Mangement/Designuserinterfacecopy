import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Plus, BarChart3 } from 'lucide-react';
import { CaseCard } from './CaseCard';
import { useCaseStore } from '../store/useCaseStore';
import { CasesReportModal } from './CasesReportModal';

interface AllCasesProps {
  onBack: () => void;
  onCreateCase: () => void;
  onCaseClick: (caseData: any) => void;
}

export function AllCases({ onBack, onCreateCase, onCaseClick }: AllCasesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'At-Need' | 'Pre-Need'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'service-date'>('newest');

  // Get cases from store
  const getAllCases = useCaseStore((state) => state.getAllCases);
  const updateServiceDate = useCaseStore((state) => state.updateServiceDate);
  const storeCases = getAllCases();

  // Sample case data (demo data)
  const demoCases = [
    {
      caseId: 'case-001',
      caseNumber: 'RTP-202306-0001',
      dateCreated: 'Jun 1, 2023',
      deceasedName: 'Tamera Blackly',
      caseType: 'At-Need' as const,
      serviceType: 'Sea Scattering of Ashes',
      location: undefined,
      photoUrl: 'https://images.unsplash.com/photo-1547199315-ddabe87428ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ3ODMyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stepsCompleted: 0,
      totalSteps: 5,
      tasksCompleted: 1,
      totalTasks: 31,
      price: 2960,
      assignedTo: 'Daniel',
    },
    {
      caseId: 'case-002',
      caseNumber: 'RTP-202310-0002',
      dateCreated: 'Oct 28, 2023',
      deceasedName: 'Kathy Truman',
      caseType: 'At-Need' as const,
      serviceType: 'Sea Scattering of Ashes',
      location: 'Chapel A',
      photoUrl: 'https://images.unsplash.com/photo-1657670716702-01a6bc82c67f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR1cmUlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDc5NDYwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stepsCompleted: 3,
      totalSteps: 5,
      tasksCompleted: 15,
      totalTasks: 25,
      price: 7279,
      assignedTo: 'Daniel',
    },
    {
      caseId: 'case-003',
      caseNumber: 'RTP-202310-0003',
      dateCreated: 'Oct 23, 2023',
      deceasedName: 'Zachary Binx',
      caseType: 'At-Need' as const,
      serviceType: 'Pet Cremation with Ashes',
      location: undefined,
      photoUrl: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NDY5MjI4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stepsCompleted: 0,
      totalSteps: 5,
      tasksCompleted: 0,
      totalTasks: 9,
      price: 850,
      assignedTo: 'Daniel',
    },
    {
      caseId: 'case-004',
      caseNumber: 'RTP-202309-0004',
      dateCreated: 'Sep 22, 2023',
      deceasedName: 'Jameson Menely',
      caseType: 'At-Need' as const,
      serviceType: 'Direct Cremation + Ceremony',
      location: 'Prep Room',
      photoUrl: 'https://images.unsplash.com/photo-1762885590877-0829975f2cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0NzE3MjIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stepsCompleted: 2,
      totalSteps: 4,
      tasksCompleted: 14,
      totalTasks: 41,
      price: 8499,
      assignedTo: 'Emma',
    },
    {
      caseId: 'case-005',
      caseNumber: 'RTP-202309-0005',
      dateCreated: 'Sep 15, 2023',
      deceasedName: 'Margaret Anderson',
      caseType: 'Pre-Need' as const,
      serviceType: 'Traditional Burial Service',
      location: 'Chapel B',
      photoUrl: 'https://images.unsplash.com/photo-1664813495783-a7b19be83624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc2NDc5NDYwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stepsCompleted: 5,
      totalSteps: 5,
      tasksCompleted: 15,
      totalTasks: 15,
      price: 12500,
      assignedTo: 'Sarah',
    },
    {
      caseId: 'case-006',
      caseNumber: 'RTP-202308-0006',
      dateCreated: 'Aug 30, 2023',
      deceasedName: 'Robert Chen',
      caseType: 'At-Need' as const,
      serviceType: 'Direct Cremation',
      location: 'Chapel A',
      photoUrl: 'https://images.unsplash.com/photo-1647748530961-4f3a5d47160b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ3ODMyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      stepsCompleted: 1,
      totalSteps: 3,
      tasksCompleted: 12,
      totalTasks: 20,
      price: 5200,
      assignedTo: 'Daniel',
    }
  ];

  // Initialize demo catalog data in the store
  const initializeCase = useCaseStore((state) => state.initializeCase);

  useEffect(() => {
    // Initialize case 1 with catalog items
    initializeCase({
      id: 'case-001',
      caseNumber: '001',
      deceasedName: 'Tamera Blackly',
      caseType: 'At-Need',
      dateCreated: 'Jun 1, 2023',
      catalogSelections: {
        package: {
          id: 'pkg-celebration',
          name: 'Celebration of Life Package',
          description: 'Comprehensive celebration with personalized touches',
          price: 4200,
          category: 'package',
          status: 'ordered',
          included: [
            'Professional service of funeral director and staff',
            'Transfer of remains to funeral home',
            'Embalming and body preparation',
            'Use of facilities for visitation (4 hours)',
            'Use of facilities for funeral ceremony',
            'Hearse for local transport',
            'Basic memorial printed materials',
            'Coordination with cemetery/crematory'
          ]
        },
        addons: [
          {
            id: 'addon-floral',
            name: 'Rose Bouquet Arrangement',
            description: 'Custom floral arrangements and wreaths',
            price: 300,
            category: 'addon',
            quantity: 2,
            status: 'ordered',
          },
          {
            id: 'addon-limousine',
            name: 'Limousine Service',
            description: 'Professional limousine service for family',
            price: 450,
            category: 'addon',
            quantity: 1,
            status: 'pending',
          },
          {
            id: 'addon-dove-release',
            name: 'Dove Release',
            description: 'Ceremonial white dove release',
            price: 350,
            category: 'addon',
            quantity: 6,
            status: 'pending',
          },
        ],
        memorials: [
          {
            id: 'memorial-prayer-cards',
            name: 'Prayer Cards',
            description: 'Custom printed prayer cards (set of 100)',
            price: 150,
            category: 'memorial',
            status: 'completed',
            imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
          },
          {
            id: 'memorial-program-8pg',
            name: 'Memorial Programs (8-page)',
            description: 'Professionally designed 8-page memorial program',
            price: 320,
            category: 'memorial',
            status: 'draft',
            imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
          },
          {
            id: 'memorial-photo-enlargement',
            name: 'Photo Enlargements',
            description: 'Professional photo enlargement and framing',
            price: 250,
            category: 'memorial',
            status: 'ordered',
            imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400',
          },
        ],
      },
    });

    // Initialize case 2 with catalog items
    initializeCase({
      id: 'case-002',
      caseNumber: '002',
      deceasedName: 'Kathy Truman',
      caseType: 'At-Need',
      dateCreated: 'Oct 28, 2023',
      catalogSelections: {
        package: {
          id: 'pkg-premium',
          name: 'Premium Memorial Package',
          description: 'Full-service premium memorial experience',
          price: 6500,
          category: 'package',
          status: 'ordered',
        },
        addons: [
          {
            id: 'addon-catering',
            name: 'Reception Catering',
            description: 'Full catering service for reception',
            price: 800,
            category: 'addon',
            quantity: 1,
            status: 'pending',
          },
          {
            id: 'addon-tribute-video',
            name: 'Tribute Video / Slideshow',
            description: 'Professional video tribute with music',
            price: 400,
            category: 'addon',
            quantity: 1,
            status: 'ordered',
          },
        ],
        memorials: [
          {
            id: 'memorial-program-12pg',
            name: 'Memorial Programs (12-page)',
            description: 'Premium 12-page keepsake program',
            price: 450,
            category: 'memorial',
            status: 'draft',
            imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400',
          },
          {
            id: 'memorial-guest-register',
            name: 'Guest Register Book',
            description: 'Elegant guest book with custom cover',
            price: 85,
            category: 'memorial',
            status: 'completed',
            imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=400',
          },
        ],
      },
    });

    // Initialize empty cases for the rest
    [3, 4, 5, 6].forEach((num) => {
      initializeCase({
        id: `case-00${num}`,
        caseNumber: `00${num}`,
        deceasedName: demoCases[num - 1].deceasedName,
        caseType: demoCases[num - 1].caseType,
        dateCreated: demoCases[num - 1].dateCreated,
        catalogSelections: {
          addons: [],
          memorials: [],
        },
      });
    });
  }, []);

  // Merge demo cases with store cases
  const allCases = [
    ...demoCases,
    ...storeCases
      .filter(storeCase => !demoCases.some(demoCase => demoCase.caseId === storeCase.id))
      .map(storeCase => ({
        caseId: storeCase.id,
        caseNumber: storeCase.caseNumber,
        dateCreated: storeCase.dateCreated,
        deceasedName: storeCase.deceasedName,
        caseType: storeCase.caseType as 'At-Need' | 'Pre-Need',
        serviceType: 'First Call', // Default service type for First Call cases
        location: undefined,
        photoUrl: storeCase.photoUrl,
        serviceDate: storeCase.serviceDate,
        stepsCompleted: 0,
        totalSteps: 5,
        tasksCompleted: 0,
        totalTasks: 0,
        price: 0,
        assignedTo: 'Unassigned',
      }))
  ];

  // Parse date for sorting
  const parseDate = (dateStr: string) => {
    return new Date(dateStr).getTime();
  };

  // Filter and sort cases
  let filteredCases = allCases
    .filter((caseItem) => {
      // Search filter
      const matchesSearch = caseItem.deceasedName.toLowerCase().includes(searchQuery.toLowerCase());
      // Type filter
      const matchesType = filterType === 'all' || caseItem.caseType === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return parseDate(b.dateCreated) - parseDate(a.dateCreated);
      } else if (sortBy === 'oldest') {
        return parseDate(a.dateCreated) - parseDate(b.dateCreated);
      } else if (sortBy === 'service-date') {
        // Sort by service date (cases without service date go to bottom)
        if (!a.serviceDate && !b.serviceDate) return 0;
        if (!a.serviceDate) return 1;
        if (!b.serviceDate) return -1;
        return parseDate(a.serviceDate) - parseDate(b.serviceDate);
      }
      return 0;
    });

  const handleServiceDateChange = (caseId: string, serviceDate: string) => {
    updateServiceDate(caseId, serviceDate);
  };

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
          
          {/* Desktop: Single Row Layout */}
          <div className="hidden lg:flex lg:items-center lg:gap-6 mb-8">
            <div className="flex-shrink-0">
              <h1 className="text-gray-900 mb-1">Cases</h1>
              <p className="text-gray-600">{allCases.length} active cases</p>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors rounded-lg"
                />
              </div>
            </div>
            
            <button
              onClick={() => setShowReportModal(true)}
              className="flex-shrink-0 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 rounded-lg"
            >
              <BarChart3 className="w-5 h-5" />
              Reports
            </button>
            
            <button
              onClick={onCreateCase}
              className="flex-shrink-0 px-4 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              New case
            </button>
          </div>

          {/* Mobile: Original Stacked Layout */}
          <div className="lg:hidden">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
              <div>
                <h1 className="text-gray-900 mb-1">Cases</h1>
                <p className="text-gray-600">{allCases.length} active cases</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Reports
                </button>
                <button
                  onClick={onCreateCase}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New case
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Sort Bar */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Filter by Type */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Filter:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filterType === 'all'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('At-Need')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filterType === 'At-Need'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                At-Need
              </button>
              <button
                onClick={() => setFilterType('Pre-Need')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  filterType === 'Pre-Need'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Pre-Need
              </button>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'service-date')}
              className="px-3 py-1.5 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:border-gray-400 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="service-date">Service Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-8">
        {filteredCases.map((caseItem) => (
          <div key={caseItem.caseId} onClick={() => onCaseClick(caseItem)} className="cursor-pointer">
            <CaseCard {...caseItem} onServiceDateChange={handleServiceDateChange} />
          </div>
        ))}
      </div>
      
      {/* Reports Modal */}
      <CasesReportModal 
        show={showReportModal} 
        onClose={() => setShowReportModal(false)} 
        cases={storeCases}
      />
    </div>
  );
}