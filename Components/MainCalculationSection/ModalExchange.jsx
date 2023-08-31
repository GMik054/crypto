import React, {useEffect, useRef, useState} from 'react';
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Modal from "@mui/material/Modal";
import {Col, Form, Input, Label, Row} from "reactstrap";
import * as Yup from 'yup'
import {useFormik} from "formik";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import {
    selectAuth,
    selectLoginToken,
    setIsLoading,
} from "../../src/features/Slices/LoginSlice";
import {useDispatch, useSelector} from "react-redux";
import {FaCheckCircle} from "react-icons/fa";

const ModalExchange = ({valueCurrency1, valueCurrency2, minValue1, maxValue1, currency1, currency2}) => {

    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const loginToken = useSelector(selectLoginToken);
    const auth = useSelector(selectAuth);

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

    let [err, setErr] = useState("")
    const [showModal, setShowModal] = useState(false); // State variable to control modal visibility
    let exchange = () => {

        dispatch(setIsLoading(true));
        let info = {
            name: `${formik.values.first_name} ${formik.values.last_name}`,
            phone: formik.values.phone,
            email: formik.values.email,
            content: `To ${valueCurrency1} ${currency1.name} from ${valueCurrency2} ${currency2.name}`

        }
        fetch(`${APICallUrl}/api/v1/contact/send`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${loginToken.token}`
            },
            body: JSON.stringify(info),
        })
            .then((res) => res.json()).then((res) => {

            if (res.error === false) {
                setShowModal(true);
                handleClose();
                formik.resetForm();
                setErr("");
                dispatch(setIsLoading(false));

            } else {
                setErr(res.message);
                dispatch(setIsLoading(false));
            }

        })
            .catch((error) => {
                dispatch(setIsLoading(false));
                console.error('Failed to Exchange:', error);
            });
    }
    return (
        <>
            <div className="custom-single-button">

                <Button onClick={handleOpen}
                        disabled={Number(valueCurrency1) < Number(minValue1) || Number(valueCurrency1) > Number(maxValue1)}
                        className={`button-area ${Number(valueCurrency1) < Number(minValue1) || Number(valueCurrency1) > Number(maxValue1) ? "" : "active"}`}>
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
                        <Box className="modal-box" >
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
                            <p className="modal-desc" style={{textAlign: "center"}}>Lorem Ipsum
                                is
                                simply dummy text of the printing and typesetting
                                industry.</p>
                            <Button
                                onClick={exchange}
                                className={`modal-exchange-button ${Object.keys(formik.errors).length !== 0 ? "" : "active"}`}
                                disabled={Object.keys(formik.errors).length !== 0}>EXCHANGE</Button>
                            {
                                err.length > 0 &&
                                <div className="d-flex justify-content-center">
                                <span style={{
                                    marginTop: "10px",
                                    color: '#F00',
                                    fontSize: "12px",
                                    fontWeight: "700"
                                }}>{err}</span>
                                </div>
                            }
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <Modal
                open={showModal}>
                <Box className="modal-box">
                    <Button onClick={() => setShowModal(false)} className="close-button">
                        <CloseIcon/>
                    </Button>
                    <div className="text-center modal-success">
                        <h2>Thank you!</h2>
                        <h5 style={{textAlign: "left"}}>Message sent successfully!</h5>
                        <p>We emailed</p><p
                        style={{fontWeight: "500", paddingBottom: "30px"}}>Please check your inbox.</p>
                        <FaCheckCircle color="#FFE500" size={100}/>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ModalExchange;