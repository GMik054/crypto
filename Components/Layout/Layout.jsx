import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({children, mainMenu, data}) => {
    const QuestionTab = true;
    return (
        <>
            <Header/>
            {/*<StarterLoader />*/}
            {/*<Header mainMenu={mainMenu}/>*/}
            {children}
            <Footer data={data}/>
        </>
    );
};
export default Layout;
