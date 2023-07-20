import React from 'react';
import {Container,Row,Col} from "reactstrap";
import {TbError404} from "react-icons/tb";
import Link from "next/link";

const Error404 = () => {
    return (
        <section className="gallery-section" style={{backgroundImage:"none"}}>
            <Container>
                <Row className='gx-md-2 gx-0 gy-md-0 gy-3 justify-content-center'>
                    <Col md='8' className='m-auto'>
                            <TbError404 size={150} style={{color:"#E8BA4E"}}/>
                    </Col>
                    <Col md='8' className='mx-auto mt-md-5 mt-3'>
                                <h2 className="text-center text-uppercase fw-bold">page not found</h2>
                                <p className="text-center">The page you are looking for doesn't exist or an other error occurred. Go back, or head over to choose a new direction.</p>
                                <Link href={'/'} style={{color:"#E8BA4E"}} className='btn btn-solid-default fw-bold'>
                                    Go To Home Page
                                </Link>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Error404;