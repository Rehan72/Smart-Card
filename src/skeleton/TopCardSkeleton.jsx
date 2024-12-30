import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel';
import useScreenSize from '../hooks/useScreenSize';

const TopWidgetCard = () => {
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

  return (
    <div>
      <Carousel className="flex items-center justify-center mr-4">
        <CarouselContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {placeholderData.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="animate-pulse"
            >
              <CarouselItem>
                <Card className="cursor-pointer shadow-lg rounded-lg border-2 border-lightgray">
                  <CardContent className="flex items-center p-4 h-40">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg mr-4"></div>
                    <div className="flex flex-col space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                      <div className="h-6 bg-gray-300 rounded w-32"></div>
                      <div className="h-6 bg-gray-300 rounded w-28"></div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </motion.div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TopWidgetCard;
