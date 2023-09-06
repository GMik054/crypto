import React from 'react';
import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import {useTranslation} from "next-i18next";

const Contact = () => {
    const { t } = useTranslation();

    return (
        <section className="contact-us-section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="7">
                        <div dangerouslySetInnerHTML={{ __html: t('contact') }} />
                        <h4 style={{paddingBottom:"16px"}}>{t('contact1')} {t('contact2')}</h4>
                        <h4><a href="mailto:info@crypto.am">info@crypto.am</a> | <a
                            href={`tel:+374 77 12 22 23`}>+374 77 122223</a></h4>
                    </Col>
                    <Col lg="8">
                        <Form className="contact-form">
                            <Row className="gap-5">
                                <Col lg="12" className="contact-col">
                                    <Label><p>{t('name')}</p></Label>
                                    <Input type="text"/>
                                </Col>
                                <Col lg="12" className="contact-col">
                                    <Label><p>{t('email')}</p></Label>
                                    <Input type="email"/>
                                </Col>
                                <Col lg="12" className="contact-col">
                                    <Label><p>{t('message')}</p></Label>
                                    <Input type="text"/>
                                </Col>
                                <div className="contact-button">
                                    <Button >{t('send')}</Button>
                                </div>
                            </Row>

                        </Form>

                    </Col>
                </Row>
            </Container>
            <Container fluid={true}>
            <Row className='gy-4'>
                <Col lg="12" xs='12' className='p-0'>
                    <div className='location-map'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d453.06803229213386!2d44.5221694721852!3d40.18978938109103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcdf9481fba5%3A0x87d321a93f5a37e2!2sCitadel!5e0!3m2!1sen!2sus!4v1689629025723!5m2!1sen!2sus"
                                loading='lazy' style={{ width: "100%", height: "400px" }}></iframe>
                    </div>
                </Col>
            </Row>
        </Container>
        </section>

    );
};

export default Contact;