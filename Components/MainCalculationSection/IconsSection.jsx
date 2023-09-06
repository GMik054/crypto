import React from 'react';
import {Col, Container, Row} from "reactstrap";
import {useTranslation} from "next-i18next";

const IconsSection = ({top}) => {

    const customerService = [
        {
            id: 1,
            svg: <img src='/assets/CustomerService/Fast.svg' ></img>,
            title: 'We are Fast',
            subtitle: 'It will take you less than 5 min to use our services.'
        },
        {
            id: 2,
            svg: <img src='/assets/CustomerService/Trusted.svg' ></img>,
            title: 'We are Trusted',
            subtitle: 'We have been providing high-quality cryptocurrency exchange services for over 2 years.'
        },
        {
            id: 3,
            svg: <img src='/assets/CustomerService/Rates.svg' ></img>,
            title: 'Best Rates',
            subtitle: 'We guarantee to offer best price in the international market along with superior customer services.'
        },
        {
            id: 4,
            svg: <img src='/assets/CustomerService/Global.svg' ></img>,
            title: 'We are Global',
            subtitle: 'We provide cryptocurrency exchange services worldwide.'
        },
    ]
    const { t } = useTranslation(); // Initialize the translation hook

    const info = t('info', { returnObjects: true });
    return (
        <Container >
            <Row className={`icons-info justify-content-center ${top? "mt-0 pt-0 pb-0":""}`}>
                <Col lg="11">
                    <Row className="justify-content-center g-4" >

                {info.map((elem,i) => {
                    return (
                        <Col xl='3' sm='6' xs='6' key={i}>
                            <div className='service-wrap'>
                                <div className='service-icon'>
                                    <img src={elem.img} ></img>
                                </div>
                                <div className='service-content'>
                                    <h4 className='mb-2 mt-2'>{elem.title}</h4>
                                    <p className='font-light'>{elem.description}</p>
                                </div>
                            </div>
                        </Col>
                    );
                })}
                    </Row>

                </Col>

            </Row>
        </Container>
    );
};

export default IconsSection;