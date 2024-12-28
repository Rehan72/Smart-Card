
function UserCardSkeleton() {
  return (
   <div className="space-y-6">
   {/* Skeleton for TopWidgetCard */}
   <div className="w-full h-48 bg-gray-300 rounded-md skeleton"></div>

   {/* Skeleton for Card Details */}
   <div className="flex space-x-4">
     <div className="w-16 h-16 bg-gray-300 rounded-full skeleton"></div>
     <div className="flex-1">
       <div className="w-32 h-4 bg-gray-300 rounded-md skeleton mb-2"></div>
       <div className="w-40 h-4 bg-gray-300 rounded-md skeleton"></div>
     </div>
   </div>

   {/* Skeleton for Permanent Address */}
   <div className="space-y-2">
     <div className="w-48 h-4 bg-gray-300 rounded-md skeleton"></div>
     <div className="w-64 h-4 bg-gray-300 rounded-md skeleton"></div>
   </div>

   {/* Skeleton for Delivery Details */}
   <div className="space-y-2">
     <div className="w-48 h-4 bg-gray-300 rounded-md skeleton"></div>
     <div className="w-64 h-4 bg-gray-300 rounded-md skeleton"></div>
   </div>
 </div>

  );
}

export default UserCardSkeleton