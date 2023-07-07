import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {Col, Form, Input, Label, Row} from "reactstrap";
import * as Yup from 'yup'
import {useFormik} from "formik";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     maxWidth: "648px",
//     width: "100%",
//     bgcolor: '#3F3F3F',
//     border: '2px solid #000',
//     boxShadow: 24,
//     padding: "48px",
//     borderRadius: "16px",
// };

// const modalButtonStyle = {
//     backgroundColor: '#FFE500',
//     position: 'absolute',
//     overflow: 'hidden',
//     cursor: 'pointer',
//     transform: 'skewX(-45deg)',
//     alignItems: 'center',
//     display: 'flex',
//     justifyContent: 'center',
//     height: '100%',
//     width: '100%',
//
// };
const ModalExchange = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialValues = {
        name: "",
        surName: "",
        email: "",
        phone: "",
        // password: ""
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        surName: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    function ltrim(str) {
        if (!str) return str;
        return str.replace(/^\s+/g, '');
    }

    useEffect(() => {
        formik.validateForm();
    }, [])
    // console.log(formik, "FORMIK")
    return (
        <div className="custom-single-button">
            {/*<div className="button-area">*/}
            {/*    <h5 className="text">EXCHANGE</h5>*/}
            {/*</div>*/}

            <Button onClick={handleOpen} className="button-area"><h5
                className="text">EXCHANGE</h5></Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className="modal-box">
                        <Button onClick={handleClose} className="close-button">
                            <CloseIcon/>
                        </Button>
                        <h4>Fill in data for exchange</h4>
                        <p className="modal-desc">Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has
                            been the industry's standard.</p>
                        <Form className="form">
                            <Row className="form-row">
                                <Col lg="12">
                                    <Label>
                                        <p>Name</p>
                                    </Label>
                                    <Input type="text" className="modal-input" name="name"
                                           value={ltrim(formik.values.name)}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}/>
                                    {formik.touched.name && formik.errors.name && (
                                        <span style={{color: 'red'}}>{formik.errors.name}</span>
                                    )}
                                </Col>
                                <Col lg="12">
                                    <Label>
                                        <p>Surname</p>
                                    </Label>
                                    <Input type="text" className="modal-input" name="surName"
                                           value={ltrim(formik.values.surName)}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}/>
                                    {formik.touched.surName && formik.errors.surName && (
                                        <span style={{color: 'red'}}>{formik.errors.surName}</span>
                                    )}
                                </Col>
                                <Col lg="12">
                                    <Label>
                                        <p>E-mail</p>
                                    </Label>
                                    <Input type="email" className="modal-input" name="email"
                                           value={formik.values.email}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}

                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <span style={{color: 'red'}}>{formik.errors.email}</span>
                                    )}
                                </Col>
                                <Col lg="12">
                                    <Label>
                                        <p>Phone Number</p>
                                    </Label>
                                    <Input type="phone" className="modal-input" name="phone"
                                           value={formik.values.phone}
                                           onChange={(e) => {
                                               const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                               formik.setFieldValue('phone', phoneNumber); // Update the formik value
                                           }}
                                           onBlur={formik.handleBlur}
                                    />
                                    {/*{errors.phone && <span style={{color: 'red'}}>Phone is Required</span>}*/}
                                    {formik.touched.phone && formik.errors.phone &&
                                        <span style={{color: 'red'}}>{formik.errors.phone}</span>}

                                </Col>
                            </Row>
                        </Form>
                        <p className="modal-desc" style={{paddingBottom: "24px", textAlign: "center"}}>Lorem Ipsum is
                            simply dummy text of the printing and typesetting
                            industry.</p>
                        <Button className={`modal-exchange-button ${Object.keys(formik.errors).length !== 0 ?"": "active"}`}
                                disabled={Object.keys(formik.errors).length !== 0}>EXCHANGE</Button>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalExchange;