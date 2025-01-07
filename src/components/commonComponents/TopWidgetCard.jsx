import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import useScreenSize from '../../hooks/useScreenSize';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const TopWidgetCard = ({ data=[],  onCardSelect }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
 // Adjust itemsPerPage based on screen width
 const screenWidth = useScreenSize();
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
   if (screenWidth < 640) setItemsPerPage(1); // Small screens
   else if (screenWidth < 768) setItemsPerPage(2); // Medium screens
   else if (screenWidth < 1024) setItemsPerPage(3); // Large screens
   else if (screenWidth < 1280) setItemsPerPage(4); // Extra large screens and above
   else setItemsPerPage(5); // Extra large screens and above
 }, [screenWidth]);

 const placeholderData = Array.from({ length: itemsPerPage });
//  useEffect(() => {
//   setItemsPerPage(3); // Always display 3 cards per page
// }, []);
  
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const currentData = useMemo(
    () => data?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [currentPage, data, itemsPerPage]
  );

  const goToNextPage = () => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

  const handleCardClick = (item) => {
    setSelectedCard(item);
    onCardSelect?.(item);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
  };

  return (
    <div>
      <Carousel className=" flex items-center justify-center mr-4">
       <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {currentData?.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <CarouselItem>
                <Card
                  onClick={() => handleCardClick(item)}
                  onMouseEnter={() => setHoveredCard(item)}
                  onMouseLeave={() => setHoveredCard(null)}
                  tabIndex={0}
                  style={{
                    border: selectedCard === item
                      ? '2px solid blue' // Selected card border
                      : hoveredCard === item
                      ? '2px solid gray' // Hover border
                      : '1px solid lightgray', // Default border
                      //minWidth: '380px', 
                      width: '250px',
                  }}
                  className={`cursor-pointer shadow-lg rounded-lg ${
                    selectedCard === item ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <CardContent className="flex items-center p-4 h-40">
                    {item.icon && <img src={item.icon} alt="icon" className="w-20 h-20 rounded-lg border-2 border-black mr-4" />}
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-bold text-gray-700">ITS ID</p>
                      <p className="text-base font-medium text-gray-900">{item.title}</p>
                      <p className="text-base font-medium text-gray-900">{item.name || 'Name'}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </motion.div>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="transition duration-500 ease-in-out"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          aria-label="Previous Page"
        />
        <CarouselNext
          className="transition duration-500 ease-in-out"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Next Page"
        />
      </Carousel>
    </div>
  );
};

export default TopWidgetCard;
