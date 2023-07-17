import React from 'react';
import {Col, Container, Row} from "reactstrap";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="justify-content-md-center d-flex">
                    <Col lg="11">
                        <Row className="g-4">

                            <Col lg="4" md="4">
                                <div className="footer-logos-section">

                                    <Link href={`/`}>
                                        <img src="/assets/images/footerlogo.png"/>
                                    </Link>
                                    <Row>
                                        <Col lg="3" xs="3">
                                            <img src="/assets/social/fb.svg"/>
                                        </Col>
                                        <Col lg="3" xs="3">
                                            <img src="/assets/social/insta.svg"/>
                                        </Col>
                                        <Col lg="3" xs="3"><img src="/assets/social/twitter.svg"/>
                                        </Col>
                                        <Col lg="3" xs="3"><img src="/assets/social/tube.svg"/>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            <Col lg="3" md="3">
                                <div className="info-pages">
                                    <Link href={`/`}>
                                        <p>Home</p>
                                    </Link>
                                    <Link href={`/partners`}>
                                        <p>Partners</p>
                                    </Link>
                                    <Link href={`/faq`}>
                                        <p>FAQ</p>
                                    </Link>
                                    <Link href={`/gallery`}>
                                        <p>Gallery</p>
                                    </Link>
                                    <Link href={`/contact-us`}>
                                        <p>Contacts</p>
                                    </Link>
                                </div>

                            </Col>
                            <Col lg="5" md="5">
                                <div className="information">

                                    <h3><span>Contact</span> Us</h3>
                                    <div>
                                        <p>105/1 Teryan street, 0005, Yerevan,
                                            Armenia <span>(Citadel Business Center)</span></p>
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