import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <div className="flex">
        <Navbar />
        <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;