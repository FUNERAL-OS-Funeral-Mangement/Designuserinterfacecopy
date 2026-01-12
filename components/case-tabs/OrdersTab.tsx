import { Flower2, Car, Users, Cake, Bird, FileText, Edit, Package, ShoppingBag, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCaseStore } from '../../store/useCaseStore';
import { StaffCatalogView } from '../StaffCatalogView';

interface OrdersTabProps {
  caseId: string;
}

export function OrdersTab({ caseId }: OrdersTabProps) {
  const [showCatalog, setShowCatalog] = useState(false);
  const catalogItems = useCaseStore((state) => state.getCatalogItems(caseId));
  const selectedPackage = catalogItems?.package;
  const addons = catalogItems?.addons || [];

  if (showCatalog) {
    return <StaffCatalogView caseId={caseId} onBack={() => setShowCatalog(false)} />;
  }

  // Combine package and addons into orders array
  const orders = [
    ...(selectedPackage ? [{
      id: selectedPackage.id,
      name: selectedPackage.name,
      category: 'Package',
      quantity: 1,
      status: 'ordered' as const,
      price: selectedPackage.price,
      description: selectedPackage.description,
    }] : []),
    ...addons.map(addon => ({
      id: addon.id,
      name: addon.name,
      category: addon.category === 'addon' ? 'Add-On' : 'Service',
      quantity: addon.quantity || 1,
      status: addon.status || 'pending' as const,
      price: addon.price,
      description: addon.description,
    }))
  ];

  // Icon mapping based on item name
  const getIconForItem = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('floral') || lowerName.includes('flower')) return Flower2;
    if (lowerName.includes('limousine') || lowerName.includes('car') || lowerName.includes('transportation')) return Car;
    if (lowerName.includes('escort') || lowerName.includes('police')) return Users;
    if (lowerName.includes('catering') || lowerName.includes('reception')) return Cake;
    if (lowerName.includes('dove')) return Bird;
    if (lowerName.includes('program') || lowerName.includes('card') || lowerName.includes('printing')) return FileText;
    if (lowerName.includes('package')) return Package;
    return ShoppingBag;
  };

  const orderedCount = orders.filter(o => o.status === 'ordered').length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const totalValue = orders.reduce((sum, o) => sum + o.price, 0);

  const getStatusBadge = (status: 'ordered' | 'pending') => {
    if (status === 'ordered') {
      return (
        <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200">
          Ordered
        </span>
      );
    }
    return (
      <span className="inline-block px-2.5 py-1 bg-orange-50 text-orange-700 text-xs border border-orange-200">
        Pending
      </span>
    );
  };

  return (
    <div>
      {/* Header with Add Items Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Orders & Add-Ons</h3>
          <p className="text-sm text-gray-600">Manage service packages and additional items</p>
        </div>
        <button
          onClick={() => setShowCatalog(true)}
          className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded-lg flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          {orders.length > 0 ? 'Modify Package' : 'Select Package'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 p-5">
          <p className="text-sm text-gray-600 mb-2">Total Add-Ons</p>
          <p className="text-3xl text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white border border-gray-200 p-5">
          <p className="text-sm text-gray-600 mb-2">Pending Orders</p>
          <p className="text-3xl text-gray-900">{pendingCount}</p>
        </div>
        <div className="bg-white border border-gray-200 p-5">
          <p className="text-sm text-gray-600 mb-2">Total Value</p>
          <p className="text-3xl text-gray-900">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.length > 0 ? (
          orders.map((order) => {
            const IconComponent = getIconForItem(order.name);
            return (
              <div key={order.id} className="bg-white border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <h3 className="text-gray-900 mb-1">{order.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{order.category}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="text-gray-900">{order.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-gray-900">${order.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                  <button className="w-full text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Order
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 mb-2">No Orders or Add-Ons</p>
            <p className="text-sm text-gray-500">Items selected from the catalog will appear here automatically</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600" onClick={() => setShowCatalog(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Add Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}