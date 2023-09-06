import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useTranslation} from "next-i18next";

const Layout = ({children}) => {
    // const links = [
    //     {value: '', label: 'Home'},
    //     // {value: 'partners', label: 'Partners'},
    //     {value: 'faq', label: 'FAQ'},
    //     {value: 'gallery', label: 'Gallery'},
    //     {value: 'contact-us', label: 'Contacts'},
    // ];
    const {t} = useTranslation(); // Initialize the translation hook
    const links = t('links', {returnObjects: true});
    return (
        <>
            <Header links={links}/>
            {children}
            <Footer links={links}/>
        </>
    );
};
export default Layout;
