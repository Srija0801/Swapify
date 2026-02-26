export default function RequestTabs({
  activetab,
  setActivetab,
  incomingRequests = [],
  outgoingRequests = [],
}) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => setActivetab('incoming')}
        className={`flex-1 py-4 px-6 font-medium transition-colors ${
          activetab === 'incoming'
            ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Incoming Requests (
        {incomingRequests.filter(r => r.status === 'pending').length})
      </button>

      <button
        onClick={() => setActivetab('outgoing')}
        className={`flex-1 py-4 px-6 font-medium transition-colors ${
          activetab === 'outgoing'
            ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Outgoing Requests (
        {outgoingRequests.filter(r => r.status === 'pending').length})
      </button>
    </div>
  );
}
