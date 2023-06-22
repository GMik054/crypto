import React from 'react';
import {Col, Container, Row} from "reactstrap";

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="justify-content-md-center d-flex">
                    <Col lg="11">
                        <Row>

                            <Col lg="4">
                                <div className="footer-logos-section">
                                    <img src="/assets/images/footerlogo.png"/>
                                    <Row className="">
                                        <Col lg="3">
                                            <img src="/assets/social/fb.svg"/>
                                        </Col>
                                        <Col lg="3">
                                            <img src="/assets/social/insta.svg"/>
                                        </Col>
                                        <Col lg="3"><img src="/assets/social/twitter.svg"/>
                                        </Col>
                                        <Col lg="3"><img src="/assets/social/tube.svg"/>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col lg="3">
                                <div className="info-pages">
                                    <p>Home</p>
                                    <p>Partners</p>
                                    <p>FAQ</p>
                                    <p>Rules</p>
                                    <p>Contacts</p>
                                </div>

                            </Col>
                            <Col lg="5">
                                <div className="information">

                                    <h4>Contact Us</h4>
                                    <div>
                                        <p>105/1 Teryan street, 0005, Yerevan, Armenia <span>(Citadel Business Center)</span></p>
                                        <div className="email-phone">
                                            <a href="mailto:info@crypto.am">info@crypto.am</a> | <a
                                            href={`tel:+374 77 12 22 23`}>+374 77 122223</a>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;