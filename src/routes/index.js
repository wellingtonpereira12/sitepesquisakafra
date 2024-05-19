import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import useAuth from "../contexts/hooks/useAuth";

const Private = ({ Item }) => {
    const { signed } = useAuth();
    return signed > 0 ? <Item /> : <Signin />;
};
  
const RoutesApp = () => {
    return (
        <div>
            <BrowserRouter>
            <Fragment>
                <Routes>
                <Route exact path="/home" element={<Private Item={Home} />} />
                <Route path="/" element={<Signin />} />
                <Route path="*" element={<Signin />} />
                </Routes>
            </Fragment>
            </BrowserRouter>
        </div>
    );
};

export default RoutesApp;
