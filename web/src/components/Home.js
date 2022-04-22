import { useEffect } from "react";

const Home = () => {


    useEffect(() => {

    }, []);

    return (
        <div>
            <div className="h-100 row align-items-center justify-content-center main">
                <div className="col-6">
                    <h1 className="text-center home-header"><strong>WebDev</strong></h1>
                </div>
            </div>
        </div>
    );
};

export default Home;