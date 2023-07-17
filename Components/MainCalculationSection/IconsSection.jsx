import React from 'react';
import {Col, Container, Row} from "reactstrap";

const IconsSection = ({background}) => {

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
    return (
        <Container >
            <Row className="icons-info justify-content-center">
                <Col lg="11">
                    <Row className="justify-content-center g-4">

                {customerService.map((elem) => {
                    return (
                        <Col xl='3' sm='6' xs='6' key={elem.id}>
                            <div className='service-wrap'>
                                <div className='service-icon'>{elem.svg}</div>
                                <div className='service-content'>
                                    <h4 className='mb-2 mt-2'>{elem.title}</h4>
                                    <p className='font-light'>{elem.subtitle}</p>
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