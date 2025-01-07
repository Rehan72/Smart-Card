import { Edit, Eye, MoreHorizontal, Plus, ToggleLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/commonComponents/table/DataTable";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Button } from "../../components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { getUserData } from "../../services/UserService";

function User() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Example page size
  const [totalPages, setTotalPages] = useState(2);
  const [sorting, setSorting] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        itsId: searchValue,
        // page: pageIndex + 1, // Assuming 1-based page indexing on the server
        // size: pageSize,
      };
      try {
        const data = await getUserData(params); // Call the function from the service
        setUserData(data.list); // Update state with the fetched data
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [searchValue, pageIndex, pageSize]);

  //   console.log(userData,"userData");
  //   console.log(totalRecords,"totalRecords in user");

  const handleSearch = (value) => {
    setSearchValue(value);
    // console.log(value,"USer get search value");
  };
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
    // console.log(newPageIndex,"newPageSize in user");
  };
  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    // console.log(newPageSize,"newPageSize in user");
  };

  const columns = [
    { header: "ITSID", accessorKey: "itsId" },
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone Number", accessorKey: "phoneNumber" },
    {
      header: "Role",
      accessorKey: "roles",
      cell: ({ row }) => {
        const roles = row.getValue("roles");
        return <span>{roles?.join(", ") || "No Roles"}</span>; // Join roles with a comma or show fallback
      },
    },
    { header: "Status", accessorKey: "status" },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Edit className="w-5 h-5 text-blue-500" />
              <span>Edit User</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="w-5 h-5 text-green-500" />
              <span>View User</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ToggleLeft className="w-5 h-5 text-yellow-500" />
              <span>Change Status</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-2 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text min-h-screen">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/its-smart/dashboard" className="uppercase font-bold">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="uppercase font-bold">User</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>{import.meta.VITE_APP_DEV_BASE_URL}</div>
      <div className="flex justify-end">
        <Link to={"add-user"}>
          <Button className="mt-9">
          <Plus className="h-4 w-4" />
          Add New User</Button>
        </Link>
      </div>
      <div className="flex items-center justify-between"></div>
      <div className="container mx-auto py-10">
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={userData}
            searchValue={searchValue}
            pageIndex={pageIndex}
            pageSize={pageSize}
            totalPages={totalPages}
            totalRecords={totalRecords}
            setPageSize={setPageSize}
            setTotalPages={setTotalPages}
            onSearch={handleSearch}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            // onSortingChange={setSorting}
          />
        </div>
      </div>
    </div>
  );
}

export default User;
