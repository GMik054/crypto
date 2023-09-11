import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Slider from "react-slick";
import {useTranslation} from "next-i18next";
import FadeInSection from "../FadeInSection";
import Steps from "./Steps";

const ExchangeSteps = () => {
    const {t} = useTranslation();

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 740,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 590,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <section className="exchange-steps-section">

            <Container>

                <Row style={{gap: "20px"}}>
                    <Steps title={{__html: t('247')}} step1={t('step1')} step2={t('step2')} step3={t('step3')}/>
                    <FadeInSection>
                        <Col lg="12" style={{marginTop: "calc(70px + (220 - 120) * ((100vw - 320px) / (1920 - 320)))"}}>
                            <Row>

                                <Slider {...settings}>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/Litecoin.png"/>
                                        <h5>Litecoin LTC</h5>
                                        <p>90.90469748 USD</p>
                                    </div>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/Bitcoin.png"/>
                                        <h5>Bitcoin BTC</h5>
                                        <p>15000.90461 USD</p>
                                    </div>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/Zcash.png"/>
                                        <h5>Zcash ZEC</h5>
                                        <p>90.90469748 USD</p>
                                    </div>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/TRON.png"/>

                                        <h5>TRON TRX</h5>
                                        <p>5000.469748 USD</p>
                                    </div>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/Ethereum.png"/>

                                        <h5>Ethereum ETH</h5>
                                        <p>3214.69748 USD</p>
                                    </div>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/Zcash.png"/>
                                        <h5>Zcash ZEC</h5>
                                        <p>90.90469748 USD</p>
                                    </div>
                                    <div className="slider-coins">
                                        <img src="/assets/coins/TRON.png"/>
                                        <h5>TRON TRX</h5>
                                        <p>5000.469748 USD</p>
                                    </div>
                                </Slider>

                            </Row>

                        </Col>
                    </FadeInSection>
                    <FadeInSection>

                        <Col lg="12" style={{marginTop: "calc(70px + (220 - 120) * ((100vw - 320px) / (1920 - 320)))"}}
                             className="simply">
                            <Row className="justify-content-md-center d-flex">
                                <Col lg="11">
                                    {/*<h3>{t('welcome')}</h3>*/}
                                    {/*<h3><span>Lorem Ipsum</span> is simply</h3>*/}

                                    <div dangerouslySetInnerHTML={{__html: t('mainTextTitle')}}/>
                                    <p>{t('mainTextDescription')}</p>
                                </Col>
                            </Row>

                        </Col>
                    </FadeInSection>

                </Row>
            </Container>

        </section>
    );
};

export default ExchangeSteps;