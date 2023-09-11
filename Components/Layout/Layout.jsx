import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {useTranslation} from "next-i18next";

const Layout = ({children}) => {

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
