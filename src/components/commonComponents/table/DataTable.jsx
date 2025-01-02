import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import { useState } from "react";
import Pagination from "../../commonComponents/table/Pagination";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "../../ui/table";
import Dropdown from "./ColumnsDropdown";
import Search from "./Search";
 export default function DataTable({
   columns,
   data,
   onSearch,
   pageIndex,
   pageSize,
   totalPages,
   onPageChange,
   onPageSizeChange,
   setPageSize,
   totalRecords,
 }) {
   const [sorting, setSorting] = useState([]);
   const [columnFilters, setColumnFilters] = useState([]);
   const [columnVisibility, setColumnVisibility] = useState({});
   const [rowSelection, setRowSelection] = useState({});
   const [searchValue, setSearchValue] = useState("");
 
   const table = useReactTable({
     data,
     columns,
     onSortingChange: setSorting,
     onColumnFiltersChange: setColumnFilters,
     getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
     getSortedRowModel: getSortedRowModel(),
     getFilteredRowModel: getFilteredRowModel(),
     onColumnVisibilityChange: setColumnVisibility,
     onRowSelectionChange: setRowSelection,
     state: {
       sorting,
       columnFilters,
       columnVisibility,
       rowSelection,
     },
   });
 
   const handleSearch = (value) => {
     setSearchValue(value);
     onSearch(value);
   };
 
   return (
     <div className="w-full p-4">
       {/* Header Controls */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 space-y-4 sm:space-y-0">
         <Search table={table} onSearch={handleSearch} />
         <Dropdown table={table} />
       </div>
 
       {/* Table */}
       <div className="min-w-full table-auto sm:w-auto rounded-lg border bg-white dark:bg-gray-800 shadow overflow-x-auto">
         <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
           <TableHeader>
             {table.getHeaderGroups().map((headerGroup) => (
               <TableRow key={headerGroup.id} className="bg-gray-100 dark:bg-gray-700">
                 {headerGroup.headers.map((header) => (
                   <TableHead
                     key={header.id}
                     className={`px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 ${
                       header.column.getIsSorted() ? "bg-gray-200 dark:bg-gray-600" : ""
                     }`}
                   >
                     {header.isPlaceholder
                       ? null
                       : flexRender(header.column.columnDef.header, header.getContext())}
                     {/* Sorting indicator */}
                     {header.column.getIsSorted() && (
                       <span className={`ml-2 ${header.column.getIsSorted() === "asc" ? "text-blue-500" : "text-red-500"}`}>
                         {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                       </span>
                     )}
                   </TableHead>
                 ))}
               </TableRow>
             ))}
           </TableHeader>
           <TableBody>
             {table.getRowModel().rows?.length ? (
               table.getRowModel().rows.map((row) => (
                 <TableRow
                   key={row.id}
                   className="hover:bg-gray-50 even:bg-gray-100 dark:hover:bg-gray-600 dark:even:bg-gray-700 transition-colors duration-200"
                 >
                   {row.getVisibleCells().map((cell) => (
                     <TableCell
                       key={cell.id}
                       className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300"
                     >
                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </TableCell>
                   ))}
                 </TableRow>
               ))
             ) : (
               <TableRow>
                 <TableCell
                   colSpan={columns.length}
                   className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                 >
                   No results found.
                 </TableCell>
               </TableRow>
             )}
           </TableBody>
         </Table>
       </div>
 
       {/* Pagination */}
       <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
         <span className="text-sm text-gray-600 dark:text-gray-300">
           {`Showing ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()} pages`}
         </span>
         <Pagination
           table={data}
           pageIndex={pageIndex}
           pageSize={pageSize}
           totalPages={totalPages}
           totalRecords={totalRecords}
           onPageChange={onPageChange}
           onPageSizeChange={onPageSizeChange}
           setPageSize={setPageSize}
         />
       </div>
     </div>
     </div>
   );
 }

 // Add PropTypes validation
DataTable.propTypes = {
   columns: PropTypes.array.isRequired,
   data: PropTypes.array.isRequired,
   onSearch: PropTypes.func.isRequired,
   pageIndex: PropTypes.number.isRequired,
   pageSize: PropTypes.number.isRequired,
   totalPages: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
   onPageSizeChange: PropTypes.func.isRequired,
   setPageSize: PropTypes.func.isRequired,
   totalRecords: PropTypes.number.isRequired,
 };