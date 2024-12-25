import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const TopWidgetCard = ({ data, itemsPerPage = 5, onCardSelect }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Memoized current data
  const currentData = useMemo(
    () => data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage),
    [currentPage, data, itemsPerPage]
  );

  const goToNextPage = () => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1);
  const goToPreviousPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

  const handleCardClick = (item) => {
    setSelectedCard(item);
    onCardSelect?.(item);
    console.log(item,"item");
    
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.03 },
  };

  return (
    <div className="w-full">
      <Carousel className="">
        <CarouselContent className="flex flex-wrap -ml-2 md:-ml-4">
          {currentData.map((item, index) => (
            <motion.div
              key={item.id || index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`md:basis-1/4 lg:basis-1/5 w-full pl-2 md:pl-4 ${
                selectedCard === item ? 'bg-blue-500 border border-blue-500' : ''
              }`}
            >
              <CarouselItem>
                <div className="p-1">
                  <Card
                    onClick={() => handleCardClick(item)}
                    tabIndex={0}
                    className={`cursor-pointer shadow-lg rounded-lg transition-transform ${
                      selectedCard === item ? 'ring-2 ring-blue-500' : ''
                    }`}
                    aria-selected={selectedCard === item}
                  >
                    <CardContent className="flex items-center justify-center p-6 h-40">
                      <span className="text-2xl font-semibold">{item.title || `Item ${index + 1}`}</span>
                      {item.value && <span className="text-xl">{item.value}</span>}
                      {item.icon && <img src={item.icon} alt="icon" className="icon" />}
                    </CardContent>
                  </Card>
                </div>
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
