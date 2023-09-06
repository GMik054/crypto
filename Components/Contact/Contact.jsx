import React from 'react';
import {Button, Col, Container, Form, Input, Label, Row} from "reactstrap";
import {useTranslation} from "next-i18next";
import * as Yup from "yup";
import {useFormik} from "formik";

const Contact = () => {
    const {t} = useTranslation();
    const initialValues = {
        first_name: "",
        email: "",
        message: ""
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required(t('required')),
        email: Yup.string().email(t('emailError')).required(t('required')),
        message: Yup.string().required(t('required')),

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    return (
        <section className="contact-us-section">
            <Container>
                <Row className="justify-content-center">
                    <Col lg="7">
                        <div dangerouslySetInnerHTML={{__html: t('contact')}}/>
                        <h4 style={{paddingBottom: "16px"}}>{t('contact1')} {t('contact2')}</h4>
                        <h4><a href="mailto:info@crypto.am">info@crypto.am</a> | <a
                            href={`tel:+374 77 12 22 23`}>+374 77 122223</a></h4>
                    </Col>
                    <Col lg="8">
                        <Form className="contact-form">
                            <Row className="gap-5">
                                <Col lg="12" className="contact-col">
                                    <Label><p>{t('name')}</p></Label>
                                    <Input type="text" name="first_name"
                                           value={ltrim(formik.values.first_name)}

                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}/>
                                    {formik.touched.first_name && formik.errors.first_name && (
                                        <span style={{
                                            color: '#F00',
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}>{formik.errors.first_name}</span>
                                    )}
                                </Col>
                                <Col lg="12" className="contact-col">
                                    <Label><p>{t('email')}</p></Label>
                                    <Input type="email" name="email"

                                           value={formik.values.email}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <span style={{
                                            color: '#F00',
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}>{formik.errors.email}</span>
                                    )}
                                </Col>
                                <Col lg="12" className="contact-col">
                                    <Label><p>{t('message')}</p></Label>
                                    <Input type="text" name="message"

                                           value={formik.values.message}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.message && formik.errors.message && (
                                        <span style={{
                                            color: '#F00',
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}>{formik.errors.email}</span>
                                    )}
                                </Col>
                                <div className="contact-button">
                                    <Button disabled={
                                        !formik.values.first_name ||
                                        !formik.values.email ||
                                        !formik.values.message ||
                                        formik.errors.first_name ||
                                        formik.errors.email ||
                                        formik.errors.message
                                    }>{t('send')}</Button>
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
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d453.06803229213386!2d44.5221694721852!3d40.18978938109103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abcdf9481fba5%3A0x87d321a93f5a37e2!2sCitadel!5e0!3m2!1sen!2sus!4v1689629025723!5m2!1sen!2sus"
                                loading='lazy' style={{width: "100%", height: "400px"}}></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

    );
};

export default Contact;