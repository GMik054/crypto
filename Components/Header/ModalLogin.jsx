import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {useDispatch} from "react-redux";
import {
    setAuth, setIsLoading,
    setLoginToken,
} from "../../src/features/Slices/LoginSlice";
import {useTranslation} from "next-i18next";

const ModalLogin = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let dispatch = useDispatch();

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
    let [err, setErr] = useState("");

    const login = () => {

        dispatch(setIsLoading(true));

        fetch(`${APICallUrl}/api/v1/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify({
                email: formik.values.email,
                password: formik.values.password
            }),
        })
            .then((res) => res.json()).then((res) => {
            if (res.error === false) {
                dispatch(setLoginToken(res.data));
                dispatch(setAuth(res.error));
                setOpen(false);
                dispatch(setIsLoading(false));

                fetch(`${APICallUrl}/api/v1/me`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: `Bearer ${res.data.token}`
                    }
                })
                    .then((res) => res.json()).then((res) => {
                    // dispatch(setUser(res));
                    setOpen(false);
                    dispatch(setIsLoading(false));
                })
                    .catch((error) => {
                        // Handle error if the second fetch fails
                        console.error('Failed to fetch user data:', error);
                        dispatch(setIsLoading(false));
                    });
            } else {
                // Handle error if the first fetch returns an error
                console.error('Login failed:', res.message);
                setErr(res.message)
                dispatch(setIsLoading(false));
            }
        })
            .catch((error) => {
                // Handle general fetch error
                console.error('Failed to login:', error);
                dispatch(setIsLoading(false));
            });
    }
    const { t } = useTranslation();

    return (
        <div className="header-buttons">
            <Button className="login" onClick={handleOpen}>{t('login')}</Button>

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
                        <h5>  <p>{t('login')}</p></h5>
                        <p className="modal-desc">{t('loginText')}</p>
                        <Form className="form">
                            <Row className="form-row">
                                <Col lg="12">
                                    <Label>{t('email')}</Label>
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
                                    <Label>{t('password')}</Label>
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
                            className={`modal-exchange-button text-uppercase ${Object.keys(formik.errors).length !== 0 ? "" : "active"}`}
                            disabled={Object.keys(formik.errors).length !== 0}
                            onClick={login}
                        >{t('login')}</Button>
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


    );
};

export default ModalLogin;