import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
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
  searchValue,
  pageIndex,
  pageSize,
  totalPages,
  sorting,
  onSearch,
  onPageChange,
  onPageSizeChange,
  onSortingChange,
}) {
  // Internal states
  const [internalSorting, setInternalSorting] = useState(sorting);
  const [internalPageIndex, setInternalPageIndex] = useState(pageIndex);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [internalSearchValue, setInternalSearchValue] = useState(searchValue);

  // React Table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: internalSorting,
      pagination: {
        pageIndex: internalPageIndex,
        pageSize: internalPageSize,
      },
      columnFilters: [
        {
          id: "search",
          value: internalSearchValue,
        },
      ], // You can filter based on search value
    },
    onSortingChange: (newSorting) => {
      setInternalSorting(newSorting);
      onSortingChange && onSortingChange(newSorting); // Update the parent
    },
    onPaginationChange: (newPagination) => {
      setInternalPageIndex(newPagination.pageIndex);
      setInternalPageSize(newPagination.pageSize);
      onPageChange && onPageChange(newPagination.pageIndex);
      onPageSizeChange && onPageSizeChange(newPagination.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Effect to handle search value change and trigger onSearch prop
  useEffect(() => {
    if (onSearch) {
      onSearch(internalSearchValue);
    }
  }, [internalSearchValue, onSearch]);

  // Handle internal search change
  const handleSearchChange = (value) => {
    setInternalSearchValue(value);
    setInternalPageIndex(0); // Reset to first page when search value changes
  };

  return (
    <div className="w-full p-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 space-y-4 sm:space-y-0">
        <Search value={internalSearchValue} onSearch={handleSearchChange} />
        <Dropdown table={table} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 even:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="px-4 py-4 text-center text-sm text-gray-500"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4">
        <span className="text-sm text-gray-600">
          {`Showing ${
            table.getState().pagination.pageIndex + 1
          } of ${table.getPageCount()} pages`}
        </span>
        <Pagination table={table} />
      </div>
    </div>
  );
}
