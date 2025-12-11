import { ClipboardList, ShoppingBag, Package } from 'lucide-react';

interface NavigationProps {
  activeView: 'removal' | 'catalog' | 'builder';
  setActiveView: (view: 'removal' | 'catalog' | 'builder') => void;
}

export function Navigation({ activeView, setActiveView }: NavigationProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-teal-700">Funeral Home Management</h1>
          </div>
          
          <nav className="flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveView('removal')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${
                activeView === 'removal'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="hidden sm:inline">Removal</span>
            </button>
            
            <button
              onClick={() => setActiveView('catalog')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${
                activeView === 'catalog'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Catalog</span>
            </button>
            
            <button
              onClick={() => setActiveView('builder')}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors ${
                activeView === 'builder'
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Package className="w-5 h-5" />
              <span className="hidden sm:inline">Builder</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
