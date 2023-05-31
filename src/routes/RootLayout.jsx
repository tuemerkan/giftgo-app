import { Outlet } from 'react-router-dom';

import MainHeader from '../components/MainHeader';

function RootLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-700 to-purple-800 text-white">
            <MainHeader />
            <Outlet className="overflow-auto p-4" />
        </div>
    );
}

export default RootLayout;
