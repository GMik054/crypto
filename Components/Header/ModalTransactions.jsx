import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    selectAuth,
    selectAuthUser,
    selectLoginToken,
} from "../../src/features/Slices/LoginSlice";
import * as Yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Col, Form, Input, Label, Row} from "reactstrap";

const ModalTransactions = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let dispatch = useDispatch();

    let auth = useSelector(selectAuth);
    let authUser = useSelector(selectAuthUser);
    let loginToken = useSelector(selectLoginToken);
    // console.log(auth, "auth")
    // console.log(authUser, "authUser")
    // console.log(loginToken, "loginToken")

    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid format").required("Required"),
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 characters minimum.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
                'Password must include at least one uppercase letter, one lowercase letter, and one number.'
            ),

    })

    const formik = useFormik({
        initialValues,
        validationSchema,
    })

    useEffect(() => {
        formik.validateForm();
    }, [])

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="header-buttons" style={{justifyContent:"end"}}>
            <Button className="register" onClick={handleOpen}>Transactions</Button>

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
                        <h5>My Transactions</h5>
                        <p className="modal-desc">Use Your email address & password to login</p>
                        <Form className="form">
                            <Row className="form-row">
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

                                <Col lg='12'>
                                    <Label>Password</Label>
                                    <div className='password-input-container'>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            style={formik.touched.password && formik.errors.password ? {border: "1px solid #F00"} : {border: "none"}}

                                            className='modal-input'
                                            name='password'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <div
                                            className={`password-toggle-icon ${showPassword ? 'show' : ''}`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <i className='fas fa-eye-slash'></i>
                                            ) : (
                                                <i className='fas fa-eye'></i>
                                            )}
                                        </div>
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <span style={{
                                            color: '#F00',
                                            fontSize: "12px",
                                            fontWeight: "700"
                                        }}>{formik.errors.password}</span>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                        <Button
                            className={`modal-exchange-button active`}
                            onClick={handleClose}
                        >Close</Button>

                    </Box>
                </Fade>
            </Modal>
        </div>


    );
};

export default ModalTransactions;