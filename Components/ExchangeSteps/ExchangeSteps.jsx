import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Slider from "react-slick";
import {useTranslation} from "next-i18next";

const ExchangeSteps = () => {
    const { t } = useTranslation();

    const settings = {
        dots: false,
        infinite: true,
        arrows:true,
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
                    arrows:false,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    arrows:false,
                },
            },
        ],
    };

    return (
        <section className="exchange-steps-section">
            <Container>
                <Row style={{gap:"20px"}}>
                    <Col lg='12'>
                        <Row>
                            <Col lg='2' md="3" xs="4">
                                <img style={{maxWidth: "100%"}} src="/assets/images/247.png"/>
                            </Col>
                            <Col lg='10' md='9' xs='8' className="d-flex align-items-center">
                                <h3>Exchange in three <span>simple</span> steps</h3>
                            </Col>
                        </Row>

                    </Col>
                    <Col lg='12'>
                        <Row className="g-4">
                            <Col lg='12'>

                                <div className="line-section">
                                    <div className="dot"/>
                                    <div className="long-line yellow"/>
                                    <div className="dot"/>
                                    <div className="long-line gray"/>
                                    <div className="dot"/>
                                    <div className="long-line gray"/>
                                    <div className="dot"/>
                                </div>
                            </Col>
                            <Col lg='12'>
                                <div className="line-text-section">
                                    <div className="line-text">
                                        <div className="dot">1</div>
                                        <p>Choose the direction of exchange</p>
                                    </div>
                                    <div className="line-text" style={{left: "-6px"}}>
                                        <div className="dot">2</div>
                                        <p>Fill in data</p>
                                    </div>
                                    <div className="line-text" style={{left: "-8px"}}>
                                        <div className="dot">3</div>
                                        <p>Push the button “Exchange”</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Col>
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
                    <Col lg="12" style={{marginTop: "calc(70px + (220 - 120) * ((100vw - 320px) / (1920 - 320)))"}} className="simply">
                        <Row className="justify-content-md-center d-flex">
                            <Col lg="11">
                                {/*<h3>{t('welcome')}</h3>*/}
                                {/*<h3><span>Lorem Ipsum</span> is simply</h3>*/}
                                <div dangerouslySetInnerHTML={{ __html: t('mainTextTitle') }} />
                                <p>{t('mainTextDescription')}</p>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ExchangeSteps;