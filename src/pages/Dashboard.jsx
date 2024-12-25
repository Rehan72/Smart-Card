import { Suspense, useState } from 'react';
import TopWidgetCard from '../components/commonComponents/TopWidgetCard';

function Dashboard() {

   const [selectedCardDetails, setSelectedCardDetails] = useState(null);

   // Function to handle card selection
   const handleCardSelect = (card) => {
  
     setSelectedCardDetails(card);  // Update the selected card details
   };
   const user = {
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
      bio: 'Software Engineer with 5 years of experience in web development.',
      skills: ['React', 'JavaScript', 'CSS']
    };

    const data = [
      { title: 'Card 1', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 2', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 3', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 4', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 5', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 6', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 7', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 8', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 0', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 10', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 11', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 12', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 13', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 14', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 15', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 16', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 17', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 18', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 19', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 20', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 21', value: '300', icon: '/path/to/icon3.png' },
      { title: 'Card 22', value: '100', icon: '/path/to/icon1.png' },
      { title: 'Card 23', value: '200', icon: '/path/to/icon2.png' },
      { title: 'Card 24', value: '300', icon: '/path/to/icon3.png' },
    ];

   
    
  return (

  <>

      <TopWidgetCard  data={data} onCardSelect={handleCardSelect} />
    


   <section className="mt-6">
        <form className="space-y-8">
          <div className="p-4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg shadow">
            <h3 className="text-lg font-semibold">Form Section</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            <Suspense fallback={<div>Loading...</div>}>
        {selectedCardDetails && (
          <div className="selected-card-details mt-4 transition-opacity duration-500 ease-in-out opacity-100">
            <h2>Selected Card Details</h2>
            <p><strong>Title:</strong> {selectedCardDetails.title}</p>
            <p><strong>Value:</strong> {selectedCardDetails.value}</p>
            <p><strong>Description:</strong> {selectedCardDetails.description}</p>
          </div>
        )}
      </Suspense>
            </div>
          </div>
        </form>
      </section>
   
  </>
  
  )
}

export default Dashboard