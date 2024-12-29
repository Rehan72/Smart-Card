import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const TopWidgetCard = ({ data, itemsPerPage = 4, onCardSelect }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);

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
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentData.map((item, index) => (
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
                  tabIndex={0}
                  className={`cursor-pointer shadow-lg rounded-lg border ${
                    selectedCard === item ? 'ring-2 ring-blue-500' : 'border-gray-200'
                  }`}
                  aria-selected={selectedCard === item}
                >
                  <CardContent className="flex items-center p-4 h-40">
                    {item.icon && <img src={item.icon} alt="icon" className="w-20 h-20 rounded-lg border-2 border-black mr-4" />}
                    <div>
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
