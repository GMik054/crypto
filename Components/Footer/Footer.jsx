import React, {Fragment} from 'react';
import {Col, Container, Row} from "reactstrap";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const Footer = ({links}) => {

    const router = useRouter();
    const {t} = useTranslation();

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
                                            <a href="https://t.me/cryptoamsupport" target="_blank"
                                               rel="noopener noreferrer" >
                                                <img src="/assets/social/telegram.svg" width="32"  height="32" alt="Telegram"/>
                                            </a>
                                        </Col>

                                        <Col lg="3" xs="3">
                                            <a href="https://wa.me/37477122223" target="_blank"
                                               rel="noopener noreferrer">
                                                <img src="/assets/social/whatsapp.svg" width="32" height="32" alt="WhatsApp"/>
                                            </a>
                                        </Col>
                                        <Col lg="3" xs="3">
                                            <a href={`viber://chat?number=${encodeURIComponent('37477122223')}`} target="_blank" rel="noopener noreferrer">
                                                <img src="/assets/social/viber.svg" width="32" height="32" alt="Viber"/>
                                            </a>
                                        </Col>
                                        <Col lg="3" xs="3">
                                            {/*<img src="/assets/social/tube.svg"/>*/}
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col lg="3" md="3">
                                <div className="info-pages">
                                    {
                                        links?.map((el, i) => {
                                            return (
                                                <Fragment key={i}>
                                                    <Link href={`/${el?.value}`}>
                                                        <p className={`${router.asPath === `/${el.value}` ? "active-link" : ""}`}> {el?.label}</p>
                                                    </Link>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </div>

                            </Col>
                            <Col lg="5" md="5">
                                <div className="information">

                                    <div dangerouslySetInnerHTML={{__html: t('contact')}}/>
                                    <div>
                                        <p>{t('contact1')}<span> {t('contact2')}</span></p>
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