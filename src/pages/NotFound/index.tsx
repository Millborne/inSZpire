const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
                <p className="mt-2 text-gray-600">
                    Sorry, the page you are looking for does not exist.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
