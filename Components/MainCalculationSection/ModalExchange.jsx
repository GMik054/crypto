import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Modal from "@mui/material/Modal";
import {Col, Form, Input, Label, Row} from "reactstrap";
import * as Yup from 'yup'
import {useFormik} from "formik";

const ModalExchange = ({valueCurrency1, minValue1, maxValue1}) => {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
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
    return (
        <div className="custom-single-button">

            <Button onClick={handleOpen}
                    disabled={Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1}
                    className={`button-area ${Number(valueCurrency1) < minValue1 || Number(valueCurrency1) > maxValue1 ? "" : "active"}`}>
                <h5
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
                        <h5>Fill in data for exchange</h5>
                        <p className="modal-desc">Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has
                            been the industry's standard.</p>
                        <Form className="form">
                            <Row className="form-row">
                                <Col lg="12">
                                    <Label>Name</Label>
                                    <Input type="text" className="modal-input" name="first_name"
                                           style={formik.touched.first_name && formik.errors.first_name ? {border: "1px solid #F00"} : {border: "none"}}
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
                                <Col lg="12">
                                    <Label>Surname </Label>
                                    <Input type="text" className="modal-input" name="last_name"
                                           style={formik.touched.last_name && formik.errors.last_name ? {border: "1px solid #F00"} : {border: "none"}}
                                           value={ltrim(formik.values.last_name)}
                                           onChange={formik.handleChange}
                                           onBlur={formik.handleBlur}/>
                                    {formik.touched.last_name && formik.errors.last_name && (
                                        <span style={{
                                            color: '#F00',
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}>{formik.errors.last_name}</span>
                                    )}
                                </Col>
                                <Col lg="12">
                                    <Label>E-mail </Label>
                                    <Input type="email" className="modal-input" name="email"
                                           style={formik.touched.email && formik.errors.email ? {border: "1px solid #F00"} : {border: "none"}}

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
                                <Col lg="12">
                                    <Label>Phone Number
                                    </Label>
                                    <Input type="phone" className="modal-input" name="phone"
                                           style={formik.touched.phone && formik.errors.phone ? {border: "1px solid #F00"} : {border: "none"}}
                                           value={formik.values.phone}
                                           onChange={(e) => {
                                               const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                               formik.setFieldValue('phone', phoneNumber);
                                           }}
                                           onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.phone && formik.errors.phone &&
                                        <span style={{
                                            color: '#F00',
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}>{formik.errors.phone}</span>}

                                </Col>
                            </Row>
                        </Form>
                        <p className="modal-desc" style={{paddingBottom: "24px", textAlign: "center"}}>Lorem Ipsum is
                            simply dummy text of the printing and typesetting
                            industry.</p>
                        <Button
                            className={`modal-exchange-button ${Object.keys(formik.errors).length !== 0 ? "" : "active"}`}
                            disabled={Object.keys(formik.errors).length !== 0}>EXCHANGE</Button>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalExchange;