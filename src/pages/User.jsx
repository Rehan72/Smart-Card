import { useEffect, useState } from "react";
import DataTable from "../components/commonComponents/table/DataTable";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "../components/ui/breadcrumb";


// const fetchUserData = async (params) => {
//    const response = await fetch(`/api/users?search=${params.searchValue}&page=${params.pageIndex}&size=${params.pageSize}&sort=${JSON.stringify(params.sorting)}`);
//    const data = await response.json();
//    return data;
//  };
// Simulated API call (you can replace this with your actual fetch API)
const fetchUserData = async (params) => {
   // Simulating the API response
   const apiResponse = [
     { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", age: 25, status: "Active" },
     { id: 2, name: "Bob Smith", email: "bob.smith@example.com", age: 32, status: "Inactive" },
     { id: 3, name: "Carol White", email: "carol.white@example.com", age: 29, status: "Active" },
     { id: 4, name: "David Lee", email: "david.lee@example.com", age: 41, status: "Pending" },
     { id: 5, name: "Emma Brown", email: "emma.brown@example.com", age: 23, status: "Active" },
     { id: 6, name: "Frank Harris", email: "frank.harris@example.com", age: 36, status: "Inactive" },
     { id: 7, name: "Grace Cooper", email: "grace.cooper@example.com", age: 28, status: "Pending" },
     { id: 8, name: "Henry Walker", email: "henry.walker@example.com", age: 39, status: "Active" },
     { id: 9, name: "Irene Scott", email: "irene.scott@example.com", age: 34, status: "Inactive" },
     { id: 10, name: "Jack Taylor", email: "jack.taylor@example.com", age: 30, status: "Pending" },
     { id: 11, name: "Kelly Green", email: "kelly.green@example.com", age: 27, status: "Active" },
     { id: 12, name: "Leo Adams", email: "leo.adams@example.com", age: 31, status: "Inactive" },
     { id: 13, name: "Mia Carter", email: "mia.carter@example.com", age: 26, status: "Pending" },
     { id: 14, name: "Nathan Parker", email: "nathan.parker@example.com", age: 38, status: "Active" },
     { id: 15, name: "Olivia Mitchell", email: "olivia.mitchell@example.com", age: 33, status: "Inactive" }
   ];
 
   // Simulate pagination and filtering based on the params
   const filteredData = apiResponse.filter((user) => {
     if (params.searchValue) {
       return (
         user.name.toLowerCase().includes(params.searchValue.toLowerCase()) ||
         user.email.toLowerCase().includes(params.searchValue.toLowerCase())
       );
     }
     return true;
   });
 
   // Paginate data (simple example for pageSize and pageIndex)
   const start = params.pageIndex * params.pageSize;
   const paginatedData = filteredData.slice(start, start + params.pageSize);
 
   return {
     items: paginatedData,
     totalPages: Math.ceil(filteredData.length / params.pageSize)
   };
 };

function User() {
   const [columns, setColumns] = useState([
      { header: "Name", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Age", accessor: "age" },
      { header: "Status", accessor: "status" },
      { header: "Search", accessor: "search" }
    ]);
    const [data, setData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Example page size
    const [totalPages, setTotalPages] = useState(1);
    const [sorting, setSorting] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const params = { searchValue, pageIndex, pageSize, sorting };
        const fetchedData = await fetchUserData(params);
        setData(fetchedData.items);
        setTotalPages(fetchedData.totalPages);
      };
  
      fetchData();
    }, [searchValue, pageIndex, pageSize, sorting]);
  
    const handleSearch = (value) => setSearchValue(value);
    const handlePageChange = (newPageIndex) => setPageIndex(newPageIndex);
    const handlePageSizeChange = (newPageSize) => setPageSize(newPageSize);
  
   // const [data, setData] = useState([]);
   // const [searchValue, setSearchValue] = useState("");
   // const [pageIndex, setPageIndex] = useState(0);
   // const [pageSize, setPageSize] = useState(10);
   // const [totalPages, setTotalPages] = useState(1);
   // const [sorting, setSorting] = useState([]);
 
   // useEffect(() => {
   //   const fetchData = async () => {
   //     const params = { searchValue, pageIndex, pageSize, sorting };
   //     const fetchedData = await fetchUserData(params);
   //     setData(fetchedData.items);
   //     setTotalPages(fetchedData.totalPages);
   //   };
 
   //   fetchData();
   // }, [searchValue, pageIndex, pageSize, sorting]);
 
   // const handleSearch = (value) => setSearchValue(value);
   // const handlePageChange = (newPageIndex) => setPageIndex(newPageIndex);
   // const handlePageSizeChange = (newPageSize) => setPageSize(newPageSize);

   // const data = [
   //    { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", age: 25, status: "Active" },
   //    { id: 2, name: "Bob Smith", email: "bob.smith@example.com", age: 32, status: "Inactive" },
   //    { id: 3, name: "Carol White", email: "carol.white@example.com", age: 29, status: "Active" },
   //    { id: 4, name: "David Lee", email: "david.lee@example.com", age: 41, status: "Pending" },
   //    { id: 5, name: "Emma Brown", email: "emma.brown@example.com", age: 23, status: "Active" },
   //    { id: 6, name: "Frank Harris", email: "frank.harris@example.com", age: 36, status: "Inactive" },
   //    { id: 7, name: "Grace Cooper", email: "grace.cooper@example.com", age: 28, status: "Pending" },
   //    { id: 8, name: "Henry Walker", email: "henry.walker@example.com", age: 39, status: "Active" },
   //    { id: 9, name: "Irene Scott", email: "irene.scott@example.com", age: 34, status: "Inactive" },
   //    { id: 10, name: "Jack Taylor", email: "jack.taylor@example.com", age: 30, status: "Pending" },
   //    { id: 11, name: "Kelly Green", email: "kelly.green@example.com", age: 27, status: "Active" },
   //    { id: 12, name: "Leo Adams", email: "leo.adams@example.com", age: 31, status: "Inactive" },
   //    { id: 13, name: "Mia Carter", email: "mia.carter@example.com", age: 26, status: "Pending" },
   //    { id: 14, name: "Nathan Parker", email: "nathan.parker@example.com", age: 38, status: "Active" },
   //    { id: 15, name: "Olivia Mitchell", email: "olivia.mitchell@example.com", age: 33, status: "Inactive" },
   //  ];
//   const columns = [
//     {
//       id: "email", // Ensure 'id' matches what the filter references
//       header: "Email",
//       accessorKey: "email",
//       cell: ({ row }) => (
//         <a href={`mailto:${row.getValue("email")}`}>{row.getValue("email")}</a>
//       ),
//     },
//     {
//       header: "ID",
//       accessorKey: "id", // Field name in the data
//       cell: ({ row }) => <span>{row.getValue("id")}</span>, // Optional custom cell
//     },
//     {
//       header: "Name",
//       accessorKey: "name",
//       cell: ({ row }) => <span>{row.getValue("name")}</span>,
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//       cell: (info) => info.getValue(),
//     },
//     {
//       accessorKey: "age",
//       header: "Age",
//       cell: (info) => info.getValue(),
//     },
//     {
//       header: "Role",
//       accessorKey: "role",
//       cell: ({ row }) => <span>{row.getValue("role")}</span>,
//     },
//     {
//       header: "Status",
//       accessorKey: "status",
//       cell: ({ row }) => (
//         <span
//           className={`px-2 py-1 rounded ${
//             row.getValue("status") === "Active"
//               ? "bg-green-100 text-green-800"
//               : "bg-red-100 text-red-800"
//           }`}
//         >
//           {row.getValue("status")}
//         </span>
//       ),
//     },
//     {
//       id: "actions",
//       enableHiding: false,
//       header: "Action",
//       accessorKey: "",
//       cell: ({ row }) => {
//         return (
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuItem
//                 // onClick={() => handleEditUser(row)}
//                 className="flex items-center space-x-2 hover:bg-gray-100"
//               >
//                 <Edit className="w-5 h-5 text-blue-500" />
//                 <span>Edit User</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 // onClick={() => handleViewUser(row)}
//                 className="flex items-center space-x-2 hover:bg-gray-100"
//               >
//                 <Eye className="w-5 h-5 text-green-500" />
//                 <span>View User</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 //  onClick={() => handleUserStatus(row)}
//                 className="flex items-center space-x-2 hover:bg-gray-100"
//               >
//                 <ToggleLeft className="w-5 h-5 text-yellow-500" />
//                 <span>Change Status</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         );
//       },
//     },
//   ];

  return (
    <div className="p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <div className="ml-6">
      <Button className="lg:grid-cols-4" onClick={() => setShowUploader(true)}> <Upload className="w-5 h-5" size={20} />  Bulk-Upload</Button>
     
   </div> */}
      </div>

      <div className="flex items-center justify-between">
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
     <TopWidgetCard
       icon={Users}
       title="Active Users"
       value="12,345"
       description="Active users this month"
     />
     <TopWidgetCard
       icon={Users}
       title="Inactive Users"
       value="345"
       description="Inactive users this month"
     />
   </div> */}

        {/* <Link to="/user/add-user">
       <Button>
         <CirclePlus size={20} />
         <span className="ml-2">Add user</span>
       </Button>
     </Link> */}
      </div>
      <div className="container mx-auto py-10">
        <div className="overflow-x-auto">
        <DataTable
      columns={columns}
      data={data}
      searchValue={searchValue}
      pageIndex={pageIndex}
      pageSize={pageSize}
      totalPages={totalPages}
      sorting={sorting}
      onSearch={handleSearch}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSortingChange={setSorting}
    />
        </div>
      </div>
    </div>
  );
}

export default User;
