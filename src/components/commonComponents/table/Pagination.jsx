import PropTypes from "prop-types";
import { Button } from "../../ui/button";

const Pagination = ({ pageIndex, totalRecords, pageSize, onPageChange, table }) => {
   console.log(table,"Pagination");
   console.log(pageIndex,"Pagination pageIndex");
   console.log(totalRecords,"Pagination totalRecords");
   console.log(pageSize,"Pagination pageSize");
   // console.log(onPageChange,"Pagination onPageChange");
   
  const totalPages = Math.ceil(totalRecords / pageSize);

  const handlePrevious = () => {
    if (pageIndex > 0) {
      onPageChange(pageIndex - 1);
    }
  };

  const handleNext = () => {
    if (pageIndex < totalPages - 1) {
      onPageChange(pageIndex + 1);
    }
  };

  const getPaginationItems = () => {
    const items = [];
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <PaginationItem key={i} active={pageIndex === i}>
          <PaginationLink onClick={() => onPageChange(i)}>{i + 1}</PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

//   // Check if pagination should be displayed
//   if (totalRecords === 0 || table?.length === 0) {
//     return null; // Hide pagination if no data is available
//   }

  return (
    <div className="pagination-wrapper dark:bg-gray-800 dark:text-white">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevious} disabled={pageIndex === 0}>
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {getPaginationItems()}

        <PaginationItem>
          <PaginationNext onClick={handleNext} disabled={pageIndex >= totalPages - 1}>
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

// Helper Components
const PaginationContent = ({ children }) => {
  return <div className="flex space-x-2">{children}</div>;
};

const PaginationItem = ({ children, active }) => {
  return (
    <div
      className={`mr-2 rounded-lg cursor-pointer transition-colors duration-200 ${
        active
          ? "bg-blue-500 text-white dark:bg-blue-400 dark:text-white"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {children}
    </div>
  );
};

const PaginationLink = ({ children, onClick }) => {
  return (
    <Button
      variant="link"
      size="sm"
      onClick={onClick}
      className="text-sm py-1 px-3 transition-colors duration-200"
    >
      {children}
    </Button>
  );
};

const PaginationPrevious = ({ children, onClick, disabled }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="mr-2 transition-colors duration-200"
    >
      {children}
    </Button>
  );
};

const PaginationNext = ({ children, onClick, disabled }) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className="ml-2 transition-colors duration-200"
    >
      {children}
    </Button>
  );
};

// PropTypes for validation
PaginationItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
};

PaginationPrevious.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

PaginationContent.propTypes = {
  children: PropTypes.node.isRequired,
};

PaginationLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

PaginationNext.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

Pagination.propTypes = {
  pageIndex: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  data: PropTypes.any, // Add data prop
};

export default Pagination;
