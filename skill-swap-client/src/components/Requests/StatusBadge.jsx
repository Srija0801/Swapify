import { Clock } from 'lucide-react';

export default function StatusBadge({ status }) {
  switch (status) {
    case 'pending':
      return (
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Pending</span>
        </span>
      );
    case 'accepted':
      return (
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
          Accepted
        </span>
      );
    case 'rejected':
      return (
        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
          Rejected
        </span>
      );
    case 'completed':
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          Completed
        </span>
      );
    default:
      return null;
  }
}
