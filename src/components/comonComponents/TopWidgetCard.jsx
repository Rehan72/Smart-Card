import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const TopWidgetCard = ({ data, itemsPerPage = 5,onCardSelect }) => {
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const totalPages = Math.ceil(data.length / itemsPerPage); // Total pages
  const [selectedCard, setSelectedCard] = useState(null);
  // Get the data for the current page
  const currentData = data?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // Handle next page click
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

   // Handle card click
   const handleCardClick = (item) => {
      setSelectedCard(item);
    if (onCardSelect) {
      onCardSelect(item);  // Pass the selected card data to the parent
    }
    };

  
    

  return (
<>
<div>
      <Carousel className="w-full" 
      style={{ transitionDuration: '500ms', transitionTimingFunction: 'ease-in-out' }} 
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {currentData.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5 pl-2 md:pl-4">
              <div className="p-1">
                <Card onClick={() => handleCardClick(item)} className="cursor-pointer">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{item.title || `Item ${index + 1}`}</span>
                    {item.value && <span className="text-xl">{item.value}</span>}
                    {item.icon && <img src={item.icon} alt="icon" className="icon" />}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Previous Button */}
        <CarouselPrevious
          className="transition duration-500 ease-in-out"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
        />
        {/* Next Button */}
        <CarouselNext
          className="transition duration-500 ease-in-out"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
        />
      </Carousel>

      
    </div>


</>
  );
};

export default TopWidgetCard;
