import { Download, Send, Printer, X, FileText, PackageIcon, Edit3, DollarSign, CheckCircle, LockIcon } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../store/useStore';
// import emmanuelLogo from "figma:asset/995e9f13c0bef55b3c91329b2a17a777ef793705.png";

interface ContractGeneratorProps {
  onClose: () => void;
}

interface ContractField {
  label: string;
  value: string;
}

export function ContractGenerator({ onClose }: ContractGeneratorProps) {
  const { selectedItems, getTotalPrice, caseData } = useStore();
  const [isSigned, setIsSigned] = useState(false);
  const [signatureName, setSignatureName] = useState('');
  const [showSignModal, setShowSignModal] = useState(false);

  const professionalServices = selectedItems.filter((item) => item.category === 'package');
  const merchandise = selectedItems.filter((item) => item.category === 'addon');

  const subtotal = getTotalPrice();
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleSign = () => {
    if (signatureName.trim()) {
      setIsSigned(true);
      setShowSignModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <div>
              <h2>Evelyn's Statement (1-Unknown)</h2>
              <p className="text-sm text-teal-50">Case ID: {caseData.caseId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Main Content */}
            <div className="flex-1 p-6 sm:p-8">
              {/* Company Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-40">
                    <img 
                      src={'emmanuelLogo'} 
                      alt="Emmanuel Funeral Homes" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-900">Evelyn Baker, Sr. 7331-135</p>
                    <p className="text-gray-600">Peaceful Valley Funeral Home</p>
                    <p className="text-gray-600">Evelyn Home Enterprises- Area State</p>
                    <p className="text-gray-600">(203) 985-6178</p>
                    <p className="text-gray-600">121 N Hickory Ave, Suite 101, Meridian, USXX 87506</p>
                  </div>
                </div>
                <div className="bg-teal-50 px-4 py-3 rounded-lg border border-teal-200">
                  <p className="text-teal-700 text-sm">
                    This document is not a quote and is not a contract: a contract must contain your signature and dates. Federal
                    Trade Commission (FTC) regulations require that you are provided with this form to assist you in selecting
                    the funeral goods and services you desire.
                  </p>
                </div>
              </div>

              {/* Add Products to Statement Button */}
              <button className="w-full mb-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                <PackageIcon className="w-5 h-5" />
                + ADD PRODUCTS TO EVELYN'S STATEMENT
              </button>

              {/* Professional Services */}
              {professionalServices.length > 0 && (
                <div className="mb-8">
                  <div className="bg-gray-100 px-4 py-2 rounded-t-lg border-b-2 border-teal-600 flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="w-4 h-4" />
                    <h3 className="text-gray-900">Graveside Service ($3,500)</h3>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-b-lg p-4">
                    <h4 className="text-gray-900 mb-3">PROFESSIONAL SERVICES</h4>
                    <div className="space-y-2 text-sm">
                      {professionalServices.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <div className="flex-1">
                            <p className="text-gray-900">{item.name}</p>
                            <p className="text-gray-500 text-xs">{item.description}</p>
                            {item.quantity > 1 && (
                              <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                            )}
                          </div>
                          <p className="text-gray-900 ml-4">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Cash Advances */}
              <div className="mb-8">
                <div className="bg-teal-50 px-4 py-3 rounded-lg mb-4">
                  <h3 className="text-teal-700 mb-2">CASH ADVANCES</h3>
                  <p className="text-gray-600 text-sm">
                    A cash advance item is an item of service or merchandise that is purchased on your behalf and for
                    which we charge you the actual amount. Examples include flowers, clergy honorariums, obituary
                    notices, certified copies of death certificates.
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Suggested Clergy Honorarium</span>
                    <span className="text-gray-900">$150.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Obituary</span>
                    <span className="text-gray-900">$300.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Birth/Death Certificate (First Certificate, 4)</span>
                    <span className="text-gray-900">$40.00</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-900">TOTAL CASH ADVANCES ITEMS:</span>
                    <span className="text-teal-700">$530.00</span>
                  </div>
                </div>
              </div>

              {/* Merchandise */}
              {merchandise.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-gray-900 mb-4 pb-2 border-b border-gray-200">MERCHANDISE</h3>
                  <div className="space-y-3 text-sm">
                    {merchandise.map((item) => (
                      <div key={item.id} className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-900">{item.name}</p>
                          <p className="text-gray-500 text-xs">{item.description}</p>
                          {item.quantity > 1 && (
                            <p className="text-gray-500 text-xs">Quantity: {item.quantity}</p>
                          )}
                          {item.notes && (
                            <p className="text-teal-600 text-xs mt-1">Note: {item.notes}</p>
                          )}
                        </div>
                        <p className="text-gray-900 ml-4">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total Service Fees */}
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Service Fees</span>
                    <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Merchandise Fees</span>
                    <span className="text-gray-900">
                      ${merchandise.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Cash Advance Fees</span>
                    <span className="text-gray-900">$530.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-300 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900">TOTAL</span>
                    <span className="text-teal-700">${(total + 530).toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mt-4">
                  The sums set forth above represent only an estimate (statement) of cost for which you (representatives) or
                  your estate may become liable. If any item is subject to a charge in addition to the basic charge indicated
                  such additional charge will be listed and added to the total shown.
                </p>
              </div>

              {/* State Requirements */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-xs text-gray-600 space-y-2">
                <p>State Buyer Consumer supported by cemetery.</p>
                <p className="font-medium">STATE LICENSE DISCLOSURE:</p>
                <p>
                  Evelyn Home Enterprises- Area State (FD-FE) is a licensed funeral establishment that has combined its
                  funeral license with a merchandise license in another location. The merchandise license is a license to sell
                  funeral merchandise such as caskets, alternative containers, and various other casket vaults, burial liners,
                  memorials, and various other merchandise from a central location or warehouse separate from a funeral
                  home facility. Evelyn Home Enterprises- Area State (FD-FE) conducts its funeral license operations at 121 N
                  Hickory Ave, Suite 101, Meridian, (203) 985-6178, and other locations throughout the state.
                </p>
              </div>

              {/* Signature Section */}
              {!isSigned && (
                <div className="mt-6 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Edit3 className="w-5 h-5 text-yellow-700" />
                    <p className="text-yellow-900">Signature Required</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    By signing below, you agree to the terms and conditions of this statement.
                  </p>
                  <button
                    onClick={() => setShowSignModal(true)}
                    className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Sign Statement
                  </button>
                </div>
              )}

              {isSigned && (
                <div className="mt-6 p-6 bg-teal-50 border-2 border-teal-600 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-teal-700" />
                    <p className="text-teal-900">Statement Signed</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 text-sm">Signed by:</span>
                    <span className="text-gray-900">{signatureName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">Date:</span>
                    <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Actions */}
            <div className="lg:w-64 bg-gray-50 border-l border-gray-200 p-4 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <LockIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Freeze Statement</span>
              </button>

              <button
                onClick={() => setShowSignModal(true)}
                disabled={isSigned}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Edit3 className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Sign Statement</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Print Draft</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">View Fee Info</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <PackageIcon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">View Package Total</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Enter Payment</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Configure Statement</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Modal */}
      {showSignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-gray-900 mb-4">Sign Statement</h3>
            <p className="text-gray-600 text-sm mb-4">
              Please enter your full legal name to electronically sign this statement.
            </p>
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignModal(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSign}
                disabled={!signatureName.trim()}
                className="flex-1 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}