import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({children, data}) => {
    const links = [
        {value: '', label: 'Home'},
        // {value: 'partners', label: 'Partners'},
        {value: 'faq', label: 'FAQ'},
        {value: 'gallery', label: 'Gallery'},
        {value: 'contact-us', label: 'Contacts'},
    ];
    return (
        <>
            <Header links={links}/>
            {children}
            <Footer links={links} data={data}/>
        </>
    );
};
export default Layout;
