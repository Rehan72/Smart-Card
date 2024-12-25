import { motion } from "framer-motion";
import { CreditCard, LogOut, Package, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/Theme-Provider";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Tooltip from "./Tooltip";
function UserProfile() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const handleLogout = () => {
    // logout(); // Call the logout function from useAuth
    navigate("/"); // Redirect the user to the login page after logout
  };
  return (
   <Tooltip content={"User-Profile"} animation="scale" duration={200} theme={theme}
   arrow={false} placement={'top'}
   className="bg-gray-500 text-white px-2 py-1 rounded-md shadow-lg z-50"
   >
    <div className="ml-auto relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent asChild>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-56 bg-white shadow-lg rounded-md dark:bg-gray-800 dark:text-gray-300"
          >
            {/* className="w-56 bg-white shadow-lg rounded-md dark:bg-gray-800 dark:text-gray-300"> */}
            <DropdownMenuLabel className="text-gray-700 dark:text-gray-200 font-semibold">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-t my-2 dark:border-gray-700" />
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <User size={16} /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <CreditCard size={16} /> Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <Users size={16} /> Team
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <Package size={16} /> Subscription
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    </Tooltip>
  );
}

export default UserProfile;
