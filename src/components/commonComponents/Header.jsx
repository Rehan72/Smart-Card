import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/Theme-Provider';
import NotificationBell from './Notification';
import ThemeToggle from './Theme-Toggle';
import Tooltip from './Tooltip';
import UserProfile from './UserProfile';
const Header = () => {
   const navigate = useNavigate();
  const { theme } = useTheme();
  const handleLogout = () => {
  // logout(); // Call the logout function from useAuth
   navigate("/"); // Redirect the user to the login page after logout
 };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 h-20">
      <div className=" mx-[10px] mr-10 mt-3 flex justify-between items-center">
      
        <div className={` ${theme === 'dark' ? 'text-white text-2xl' : 'text-black text-2xl'}`}>
          <Link to="its-smart/dashboard">ITS Smart Card</Link>
        </div>
        <div className="flex gap-4">
        <Tooltip content={'Toggle Theme'} animation="scale" duration={250} theme={theme}
        arrow={false} placement={'right'}
        className="bg-gray-500 text-white px-2 py-1 rounded-md shadow-lg z-50"
      // className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-xl font-semibold text-lg transition-all transform hover:scale-105"
        >
         <ThemeToggle />
        </Tooltip>
          
          <div>
            <NotificationBell />
          </div>
          
           <UserProfile/>
           
        </div>
       
      </div>
    </header>
  );
};

export default Header;