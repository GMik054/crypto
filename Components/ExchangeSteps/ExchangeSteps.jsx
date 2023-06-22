import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Slider from "react-slick";

const ExchangeSteps = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    return (
        <section className="exchange-steps-section">
            <Container>
                <Row className="g-5">
                    <Col lg='12'>
                        <Row>
                            <Col lg='2'>
                                <img src="/assets/images/247.png"/>
                            </Col>
                            <Col lg='10' className="d-flex align-items-center">
                                <h3>Exchange in three <span>simple</span> steps</h3>
                            </Col>
                        </Row>

                    </Col>
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
                        <div className="line-text-section">
                            <div className="line-text">
                                <div className="dot">1</div>
                                <p>Choose the direction of exchange</p>
                            </div>
                            <div className="line-text">
                                <div className="dot">2</div>
                                <p>Fill in data</p>
                            </div>
                            <div className="line-text">
                                <div className="dot">3</div>
                                <p>Push the button “Exchange”</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg="12" style={{marginTop: "140px"}}>
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
                    </Col>
                    <Col lg="12" style={{marginTop: "140px"}} className="simply">
                        <Row className="justify-content-md-center d-flex">
                            <Col lg="11">
                                <h3><span>Lorem Ipsum</span> is simply</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has
                                    been the industry's standard dummy text ever since the 1500s, when an unknown
                                    printer took a
                                    galley of type and scrambled it to make a type specimen book. It has survived not
                                    only five
                                    centuries, but also the leap into electronic typesetting, remaining essentially
                                    unchanged.
                                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                                    Ipsum
                                    passages, and more recently with desktop publishing software like Aldus PageMaker
                                    including
                                    versions of Lorem Ipsum.</p>
                                <br/>
                                <p> But also the leap into electronic typesetting, remaining essentially unchanged. It
                                    was
                                    popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing software like Aldus PageMaker
                                    including
                                    versions of Lorem Ipsum.</p>
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ExchangeSteps;