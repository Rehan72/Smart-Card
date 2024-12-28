import { motion } from "framer-motion";
import {
   Activity,
   ArrowLeft,
   Briefcase,
   Clipboard,
   Home,
   Info,
   LayoutDashboard,
   Phone,
   Users
} from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../../context/Theme-Provider";
import { preText } from "../../utils/Constant";
import Tooltip from "./Tooltip";
const Navbar = () => {
    const { theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Sidebar animation
  const sidebarVariants = {
    open: {
      width: "16rem", // Expanded width
      transition: { type: "spring", stiffness: 70, damping: 10 },
    },
    closed: {
      width: "5rem", // Collapsed width
      transition: { type: "spring", stiffness: 70, damping: 10 },
    },
  };

  // Individual link animation
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Icon hover animation
  const iconHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.2 } },
  };

  const menuItems = [
    { name: "Dashboard", path: `${preText}dashboard`, icon: LayoutDashboard },
    { name: "User", path: `${preText}user`, icon: Users },
    { name: "Home", path:`${preText}home`, icon: Home },
    { name: "Activity", path: "/alter", icon: Activity },
    { name: "About", path: "/about", icon: Info },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Contact", path: "/contact", icon: Phone },
    { name: "Reports", path: "/report", icon: Clipboard },
  ];

  return (
    <motion.aside
      className="min-h-screen bg-navbarBackground border-r border-border"
      variants={sidebarVariants}
      initial="open"
      animate={isOpen ? "open" : "closed"}
    >
      <div className="p-4">
        {/* Toggle Button */}
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
        <Tooltip content={isOpen ? 'Collapse' : 'Expand'} animation="scale" duration={200} theme={theme}
        arrow={false} placement={'right'}
        className="bg-gray-500 text-white px-2 py-1 rounded-md shadow-lg z-50"
      // className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-xl font-semibold text-lg transition-all transform hover:scale-105"
        >
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full shadow-md hover:bg-gray-200 transition-all"
            onClick={toggleDropdown}
            //title={isOpen ? 'Collapse' : 'Expand'}
          >
            <motion.div
              animate={{ rotate: isOpen ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
               <ArrowLeft size={20} color='#000000' />
            </motion.div>
          </button>
          </Tooltip>
        </motion.div>

        {/* Navigation */}
        <nav>
          <motion.ul
            className="space-y-4"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            {menuItems.map((item, index) => (
              <motion.li key={index} variants={linkVariants}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    location.pathname.startsWith(item.path)
                      ? "flex items-center space-x-3 bg-activeNavbarBackground text-white rounded-md p-2 transition-all duration-300 dark:bg-gray-600"
                      : "flex items-center space-x-3 text-foreground hover:bg-muted hover:text-primary rounded-md p-2 transition-all duration-300"
                  }
                >
                  <motion.div
                    variants={iconHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="text-primary"
                  >
                    <item.icon size={20} />
                  </motion.div>
                  {/* Item Name */}
                  <motion.span
                    initial={{ opacity: isOpen ? 1 : 0 }}
                    animate={{ opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {isOpen ? item.name : ""}
                  </motion.span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.aside>
  );
};

export default Navbar;
