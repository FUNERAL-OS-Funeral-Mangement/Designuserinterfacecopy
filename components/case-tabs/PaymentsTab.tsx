import { CreditCard, Plus, DollarSign } from 'lucide-react';

export function PaymentsTab() {
  const totalAmount = 7279;
  const paidAmount = 5000;
  const balance = totalAmount - paidAmount;
  const percentagePaid = Math.round((paidAmount / totalAmount) * 100);

  const transactions = [
    { date: 'Oct 28, 2023', amount: 3000, method: 'Credit Card', status: 'Completed' },
    { date: 'Oct 25, 2023', amount: 2000, method: 'Check', status: 'Completed' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Progress Ring */}
        <div className="bg-white border border-gray-200 p-6 flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 mb-4">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-gray-100"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentagePaid / 100)}`}
                className="text-gray-900 transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl text-gray-900">{percentagePaid}%</p>
                <p className="text-xs text-gray-500">Collected</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">Payment Progress</p>
        </div>

        {/* Balance Cards */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">Total Amount</p>
          </div>
          <p className="text-3xl text-gray-900">${totalAmount.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-50 border border-orange-200 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600">Outstanding Balance</p>
          </div>
          <p className="text-3xl text-gray-900">${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Payments Made */}
      <div className="bg-white border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-gray-900">Payments Made</h3>
          <button className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Payment
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-900">${transaction.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">{transaction.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-900">{transaction.date}</p>
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs border border-emerald-200 mt-1">
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Timeline */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6">Payment Timeline</h3>
        <div className="space-y-6">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                {index < transactions.length - 1 && (
                  <div className="w-px h-full bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-6">
                <p className="text-gray-900 mb-1">${transaction.amount.toLocaleString()} received</p>
                <p className="text-sm text-gray-600">{transaction.date} • {transaction.method}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
