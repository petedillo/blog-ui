import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { EnvironmentBanner } from '../EnvironmentBanner';
import { EnvironmentBadge } from '../EnvironmentBadge';

const Layout = () => (
    <div className="flex flex-col min-h-screen">
        <EnvironmentBanner />
        <EnvironmentBadge />
        <Header />
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default Layout;