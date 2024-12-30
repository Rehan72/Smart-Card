import { Card, CardContent } from '../components/ui/card';

const UserCardSkeleton = () => (
  <section className="mt-6 overflow-hidden">
    <h1 className="text-black text-xl font-semibold mb-2">CARD DETAILS</h1>
    <div>
      {/* First Card Skeleton */}
      <Card className="w-full shadow-md rounded-lg border animate-pulse">
        <div className="ml-4 mt-2 h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
        <CardContent className="mt-4 flex">
          {/* Profile Image Placeholder */}
          <div className="w-50 h-50 p-4 mt-2 bg-gray-300 rounded-lg border-2 border-gray-200 mr-4"></div>

          {/* Form Skeleton */}
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="relative col-span-2">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Second Card Skeleton */}
      <Card className="w-full shadow-md rounded-lg border mt-6 animate-pulse">
        <div className="ml-4 mt-4 h-6 w-1/3 bg-gray-300 rounded mb-4"></div>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="relative col-span-3">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-3">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1 mt-4">
              <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1 mt-4">
              <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1 mt-4">
              <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Third Card Skeleton */}
      <Card className="w-full shadow-md rounded-lg border mt-6 animate-pulse">
        <div className="flex justify-between items-center p-4">
          <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          <div className="flex space-x-4">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="relative col-span-3">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-3">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="relative col-span-1">
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default UserCardSkeleton;
