import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br to-muted min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1   bg-app-background  px-10 py-8">
        {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;