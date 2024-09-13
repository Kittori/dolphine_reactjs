import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "../Navbars/navbars.component";
import IndexHeader from "../Headers/header.component";
import AboutPage from "../Content/about.component";
import Footer from "../Footers/footer.component";

function MainIndex() {
    React.useEffect(() => {
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });
    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <IndexHeader />
                <div className="main">
                    <AboutPage />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default MainIndex;