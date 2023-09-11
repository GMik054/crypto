import React from 'react';
import HomeFaq from "../../Components/HomeFaq/HomeFaq";
import Head from "next/head";
import {Col, Container, Row} from "reactstrap";
import Layout from "../../Components/Layout/Layout";
import {Backdrop, CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectIsLoading} from "../features/Slices/LoginSlice";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Steps from "../../Components/ExchangeSteps/Steps";
import {useTranslation} from "next-i18next";

export async function getStaticProps({locale}) {
    return {props: {locale, ...(await serverSideTranslations(locale, ['common', 'footer']))}}
}

const Faq = () => {
    const isLoading = useSelector(selectIsLoading);
    const background = true;
    const title = true;
    const {t} = useTranslation();

    return (
        < >
            <Head>
                <title>Faqs</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <Layout>
                <section className="exchange-steps-section faq-single">
                    <Container>
                        <Row className="justify-content-md-center d-flex">
                            <Col lg="11">
                                <h3 style={{fontFamily:'Montserrat'}}>{t('faqTitle')}</h3>
                            </Col>
                        </Row>
                        <Row style={{gap: "20px",marginTop: "50px"}}>
                            <Steps title={{__html: t('247buy')}} step1={t('step1buy')} step2={t('step2buy')}
                                   step3={t('step3buy')}/>
                        </Row>
                        <Row style={{gap: "20px", marginTop: "50px"}}>
                            <Steps title={{__html: t('247sell')}} step1={t('step1sell')} step2={t('step2sell')}
                                   step3={t('step3sell')}/>

                        </Row>
                    </Container>
                </section>
                <HomeFaq title={title}/>
                {isLoading && (
                    <Backdrop sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1000,
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                    }} open>
                        <CircularProgress style={{color: '#E8BA4E'}}/>
                    </Backdrop>
                )}
            </Layout>
        </>


    );
};

export default Faq;