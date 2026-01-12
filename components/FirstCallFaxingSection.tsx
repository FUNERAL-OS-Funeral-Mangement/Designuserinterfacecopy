import { useState } from 'react';
import { Send, FileText, CheckCircle2, Mail, Phone, Calendar, Clock } from 'lucide-react';

interface FirstCallFaxingSectionProps {
  faxesSent: number;
  faxesTotal: number;
  onFaxSent: () => void;
  deceasedName?: string;
  nextOfKinName?: string;
  nextOfKinPhone?: string;
}

export function FirstCallFaxingSection({ 
  faxesSent, 
  faxesTotal, 
  onFaxSent,
  deceasedName = 'Deceased',
  nextOfKinName = '',
  nextOfKinPhone = '',
}: FirstCallFaxingSectionProps) {
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'fax' | 'email'>('email');
  const [emailAddress, setEmailAddress] = useState('');
  
  // Appointment scheduling state
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentHour, setAppointmentHour] = useState('');
  const [appointmentMinute, setAppointmentMinute] = useState('');
  const [appointmentPeriod, setAppointmentPeriod] = useState('AM');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [showAppointmentSection, setShowAppointmentSection] = useState(false);

  // Mock documents - in real app, this would come from state
  const documents = [
    { id: '1', name: 'Body Release Form' },
    { id: '2', name: 'GPL Receipt' },
    { id: '3', name: 'Cremation Authorization' },
  ];

  const commonFaxRecipients = [
    { name: 'County Coroner', fax: '(555) 123-4567' },
    { name: 'Medical Examiner', fax: '(555) 234-5678' },
    { name: 'State Vital Records', fax: '(555) 345-6789' },
  ];

  const commonEmailRecipients = [
    { name: 'County Coroner', email: 'coroner@county.gov' },
    { name: 'Medical Examiner', email: 'me@county.gov' },
    { name: 'North Shore Hospital', email: 'records@northshore.org' },
    { name: 'State Vital Records', email: 'vital.records@state.gov' },
  ];

  const pendingDocs = documents.slice(faxesSent);
  const sentDocs = documents.slice(0, faxesSent);

  const handleSendDocument = () => {
    if (deliveryMethod === 'fax' && !selectedRecipient) return;
    if (deliveryMethod === 'email' && !emailAddress) return;
    onFaxSent();
    setSelectedRecipient('');
    setEmailAddress('');
  };

  const isReadyToSend = deliveryMethod === 'fax' ? !!selectedRecipient : !!emailAddress;

  return (
    <div className="bg-white border border-gray-200 p-4 md:p-8">
      {/* Section Header */}
      <div className="mb-6 md:mb-8 pb-4 md:pb-6 border-b border-gray-200">
        <h2 className="text-gray-900 mb-3">Send Documents</h2>
        <p className="text-gray-600">
          {faxesSent} of {faxesTotal} documents sent · All documents are signed and ready to send
        </p>
      </div>

      <div className="max-w-2xl">
        {pendingDocs.length > 0 ? (
          <div className="space-y-6">
            {/* Ready to Send */}
            <div className="bg-blue-50 border-2 border-blue-200 p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-900 mb-2">Ready to send</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    All signatures complete. Choose delivery method and send to required parties.
                  </p>

                  {/* Document to send */}
                  <div className="bg-white border border-blue-200 p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-gray-900">{pendingDocs[0].name}</p>
                        <p className="text-sm text-gray-600">Signed and ready to send</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                  </div>

                  {/* Delivery Method Selection */}
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-900">Choose delivery method:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`
                          block border-2 p-3 md:p-4 cursor-pointer transition-all
                          ${deliveryMethod === 'email'
                            ? 'border-blue-500 bg-white'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            checked={deliveryMethod === 'email'}
                            onChange={() => setDeliveryMethod('email')}
                            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                          />
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-900 text-sm">Email</span>
                        </div>
                      </label>
                      <label
                        className={`
                          block border-2 p-3 md:p-4 cursor-pointer transition-all
                          ${deliveryMethod === 'fax'
                            ? 'border-blue-500 bg-white'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            checked={deliveryMethod === 'fax'}
                            onChange={() => setDeliveryMethod('fax')}
                            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                          />
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-900 text-sm">Fax</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Email Recipients */}
                  {deliveryMethod === 'email' && (
                    <div className="space-y-3 mb-4">
                      <p className="text-sm text-gray-900">Select or enter email address:</p>
                      
                      {/* Quick select common recipients */}
                      <div className="space-y-2">
                        {commonEmailRecipients.map((recipient) => (
                          <label
                            key={recipient.name}
                            className={`
                              block border p-3 cursor-pointer transition-all
                              ${emailAddress === recipient.email
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="emailRecipient"
                                checked={emailAddress === recipient.email}
                                onChange={() => setEmailAddress(recipient.email)}
                                className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                              />
                              <div className="flex-1">
                                <p className="text-gray-900 text-sm">{recipient.name}</p>
                                <p className="text-gray-600 text-xs">{recipient.email}</p>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Or enter custom email */}
                      <div className="pt-2">
                        <label className="block text-xs text-gray-600 mb-2">Or enter custom email:</label>
                        <input
                          type="email"
                          value={commonEmailRecipients.some(r => r.email === emailAddress) ? '' : emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          placeholder="recipient@hospital.org"
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Fax Recipients */}
                  {deliveryMethod === 'fax' && (
                    <div className="space-y-3 mb-4">
                      <p className="text-sm text-gray-900">Select fax recipient:</p>
                      {commonFaxRecipients.map((recipient) => (
                        <label
                          key={recipient.name}
                          className={`
                            block border p-3 cursor-pointer transition-all
                            ${selectedRecipient === recipient.name
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="recipient"
                              checked={selectedRecipient === recipient.name}
                              onChange={() => setSelectedRecipient(recipient.name)}
                              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                            />
                            <div className="flex-1">
                              <p className="text-gray-900 text-sm">{recipient.name}</p>
                              <p className="text-gray-600 text-xs">{recipient.fax}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Send Button */}
                  <button
                    onClick={handleSendDocument}
                    disabled={!isReadyToSend}
                    className={`
                      w-full px-6 py-3 flex items-center justify-center gap-2 transition-colors
                      ${!isReadyToSend
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                    `}
                  >
                    {deliveryMethod === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                    <span className="text-sm md:text-base">
                      {deliveryMethod === 'email' 
                        ? `Send Email${emailAddress ? ` to ${emailAddress.split('@')[0]}...` : ''}` 
                        : `Send Fax${selectedRecipient ? ` to ${selectedRecipient}` : ''}`
                      }
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-gray-50 border border-gray-200 p-4 md:p-5">
              <p className="text-xs md:text-sm text-gray-900 mb-1">✨ What happens next</p>
              <p className="text-xs md:text-sm text-gray-600">
                {deliveryMethod === 'email' 
                  ? 'Email will be sent immediately with the signed document as a PDF attachment. You\'ll receive confirmation once delivered.'
                  : 'Fax will be sent immediately. You\'ll receive confirmation once delivered.'
                }
              </p>
            </div>
          </div>
        ) : (
          /* All documents sent - Auto-advances to complete */
          <div className="bg-green-50 border border-green-200 p-4 md:p-6">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              <div>
                <h3 className="text-gray-900 mb-1">All documents sent</h3>
                <p className="text-sm text-gray-600">
                  System is advancing to completion...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sent Documents */}
        {sentDocs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Sent ({sentDocs.length})
            </h3>
            <div className="space-y-3">
              {sentDocs.map((doc) => (
                <div key={doc.id} className="border border-green-200 bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">{doc.name}</p>
                      <p className="text-sm text-gray-600">Sent to County Coroner</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Appointment Section */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowAppointmentSection(!showAppointmentSection)}
                className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="text-gray-900">Schedule Appointment</p>
                    <p className="text-sm text-gray-600">Set arrangement meeting with family</p>
                  </div>
                </div>
                <span className="text-blue-600 text-sm">
                  {showAppointmentSection ? '− Collapse' : '+ Add'}
                </span>
              </button>

              {showAppointmentSection && (
                <div className="mt-4 bg-white border border-gray-200 p-4 md:p-6 space-y-6">
                  {/* Appointment Type */}
                  <div>
                    <label className="block text-sm text-gray-900 mb-3">
                      Appointment type <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label
                        className={`block border-2 p-4 cursor-pointer transition-all ${
                          appointmentType === 'virtual'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="appointmentType"
                            checked={appointmentType === 'virtual'}
                            onChange={() => setAppointmentType('virtual')}
                            className="mt-0.5 w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                          />
                          <div>
                            <p className="text-gray-900">Service Planning - Virtual</p>
                            <p className="text-sm text-gray-600">
                              Plan service details remotely via video call
                            </p>
                          </div>
                        </div>
                      </label>

                      <label
                        className={`block border-2 p-4 cursor-pointer transition-all ${
                          appointmentType === 'in-person'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="appointmentType"
                            checked={appointmentType === 'in-person'}
                            onChange={() => setAppointmentType('in-person')}
                            className="mt-0.5 w-4 h-4 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0"
                          />
                          <div>
                            <p className="text-gray-900">Service Planning - On Location</p>
                            <p className="text-sm text-gray-600">
                              In-person meeting at funeral home for service planning
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <div>
                      <label className="block text-sm text-gray-900 mb-2">
                        Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Time */}
                    <div>
                      <label className="block text-sm text-gray-900 mb-2">
                        Time <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select
                            value={appointmentHour}
                            onChange={(e) => setAppointmentHour(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                          >
                            <option value="">--</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                              <option key={hour} value={hour.toString().padStart(2, '0')}>
                                {hour.toString().padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <select
                          value={appointmentMinute}
                          onChange={(e) => setAppointmentMinute(e.target.value)}
                          className="w-20 px-3 py-2.5 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="">--</option>
                          <option value="00">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </select>
                        <select
                          value={appointmentPeriod}
                          onChange={(e) => setAppointmentPeriod(e.target.value)}
                          className="w-20 px-3 py-2.5 bg-white border border-gray-200 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm text-gray-900 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      value={appointmentNotes}
                      onChange={(e) => setAppointmentNotes(e.target.value)}
                      placeholder="Add any additional information about this appointment..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Confirmation Message */}
                  {nextOfKinName && (
                    <div className="bg-blue-50 border border-blue-200 p-4">
                      <p className="text-sm text-gray-900">
                        A confirmation will be sent to{' '}
                        <span className="font-medium">{nextOfKinName}</span>
                        {nextOfKinPhone && ` at ${nextOfKinPhone}`} with the appointment details.
                      </p>
                    </div>
                  )}

                  {/* Schedule Button */}
                  <button
                    onClick={() => {
                      // In real app, this would save to database and add to dashboard appointments
                      if (!appointmentType || !appointmentDate || !appointmentHour || !appointmentMinute) {
                        alert('Please fill in all required fields');
                        return;
                      }
                      
                      // TODO: Save appointment to state/database
                      const appointmentDetails = {
                        caseId: 'current-case-id',
                        deceasedName,
                        type: appointmentType,
                        date: appointmentDate,
                        time: `${appointmentHour}:${appointmentMinute} ${appointmentPeriod}`,
                        notes: appointmentNotes,
                        nextOfKinName,
                        nextOfKinPhone,
                      };
                      console.log('Scheduling appointment:', appointmentDetails);
                      
                      alert('Appointment scheduled successfully! It will appear on your dashboard.');
                      setShowAppointmentSection(false);
                      // Reset form
                      setAppointmentType('');
                      setAppointmentDate('');
                      setAppointmentHour('');
                      setAppointmentMinute('');
                      setAppointmentPeriod('AM');
                      setAppointmentNotes('');
                    }}
                    disabled={!appointmentType || !appointmentDate || !appointmentHour || !appointmentMinute}
                    className={`w-full px-6 py-3 flex items-center justify-center gap-2 transition-colors ${
                      !appointmentType || !appointmentDate || !appointmentHour || !appointmentMinute
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Schedule Appointment</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="bg-gray-50 border border-gray-200 p-4 md:p-5 mt-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs md:text-sm text-gray-900">Sending progress</p>
            <p className="text-xs md:text-sm text-gray-600">{faxesSent} / {faxesTotal}</p>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(faxesSent / faxesTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}