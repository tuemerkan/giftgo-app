import Login from "../Login.jsx";
import {Link} from "react-router-dom";


function MainHeader() {
    return (
        <header className="relative flex flex-col items-center justify-center p-4 w-full">
            <h1 className="z-10 text-5xl font-extrabold tracking-tight">GiftGo</h1>
            <div className="absolute top-0 left-0 m-4 flex items-center space-x-2">
                <Link to="/create-post" className="bg-white hover:bg-gray-100 text-blue-700 font-semibold py-2 px-4 rounded shadow">
                    New Post
                </Link>
            </div>
            <div className="absolute top-0 right-0 m-4">
                <Login/>
            </div>
            <div className="mt-3 rounded p-4 backdrop-blur">
                <p className="text-2xl font-semibold tracking-wide">
                    The app to give away.
                </p>
            </div>
        </header>
    );
}




export default MainHeader;
