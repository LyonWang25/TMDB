import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import { useLayoutLoadingStore } from '../stores/useLayoutLoadingStore'
import Footer from '../components/Footer';

const Layout = () => {
  const { isLoading } = useLayoutLoadingStore();
  return (
    <div>
      <div className="relative z-0">
        <Header/>
        {isLoading && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="w-10 h-10 border-t-transparent border-b-transparent border-r-transparent border-l-transparent border-4 rounded-full animate-spin border-white">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;