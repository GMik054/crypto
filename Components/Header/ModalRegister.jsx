import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {Col, Form, Input, Label, Row} from "reactstrap";
import {APICallUrl} from "../../halpers/useWindowDimensions";
import {FaCheckCircle} from "react-icons/fa";
import {setIsLoading} from "../../src/features/Slices/LoginSlice";
import {useDispatch} from "react-redux";
import {useTranslation} from "next-i18next";


const ModalRegister = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let dispatch = useDispatch();

    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string().email("Invalid format").required("Required"),
        phone: Yup.string()
            .matches(
                /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
                "Invalid phone number").required("Required").max(18, "Invalid phone number"),
        password: Yup.string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 characters minimum.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,30}$/,
                'Password must include at least one uppercase letter, one lowercase letter, and one number.'
            ),
        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please repeat your password.'),
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

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowPRepeatPassword] = useState(false);
    let [err, setErr] = useState("")
    const [showModal, setShowModal] = useState(false); // State variable to control modal visibility

    const register = () => {

        dispatch(setIsLoading(true));

        fetch(`${APICallUrl}/api/v1/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(formik.values),
        })
            .then((res) => res.json()).then((res) => {
                if (res.error === false) {
                setShowModal(true);
                handleClose();
                formik.resetForm();
                setErr("");
                dispatch(setIsLoading(false));
            } else {
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
        <>
            <div className="header-buttons">
                <Button className="register" onClick={handleOpen}>{t('register')}</Button>

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
                            <h5>{t('register')}</h5>
                            {/*<p className="modal-desc">Lorem Ipsum is simply dummy text of the printing and typesetting*/}
                            {/*    industry. Lorem Ipsum has*/}
                            {/*    been the industry's standard.</p>*/}
                            <Form className="form">
                                <Row className="form-row">
                                    <Col lg="6">
                                        <Label>{t('name')}</Label>
                                        <Input type="text" className="modal-input" name="first_name"
                                               value={ltrim(formik.values.first_name)}
                                               style={formik.touched.first_name && formik.errors.first_name ? {border: "1px solid #F00"} : {border: "none"}}
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
                                    <Col lg="6">
                                        <Label>{t('surName')}</Label>
                                        <Input type="text" className="modal-input" name="last_name"
                                               value={ltrim(formik.values.last_name)}
                                               style={formik.touched.last_name && formik.errors.last_name ? {border: "1px solid #F00"} : {border: "none"}}
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
                                    <Col lg="12">
                                        <Label>{t('phone')}</Label>
                                        <Input type="phone" className="modal-input" name="phone"
                                               style={formik.touched.phone && formik.errors.phone ? {border: "1px solid #F00"} : {border: "none"}}
                                               value={formik.values.phone}
                                               onChange={(e) => {
                                                   const phoneNumber = e.target.value.replace(/[^0-9+()-]/g, ''); // Remove non-numeric characters except 0-9, +, ()
                                                   formik.setFieldValue('phone', phoneNumber); // Update the formik value
                                               }}
                                               onBlur={formik.handleBlur}
                                        />
                                        {/*{errors.phone && <span style={{color: 'red'}}>Phone is Required</span>}*/}
                                        {formik.touched.phone && formik.errors.phone &&
                                            <span style={{
                                                color: '#F00',
                                                fontSize: "12px",
                                                fontWeight: "700"
                                            }}>{formik.errors.phone}</span>}

                                    </Col>
                                    <Col lg='6'>
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
                                    <Col lg='6'>
                                        <Label>{t('repeatPassword')}</Label>
                                        <div className='password-input-container'>

                                            <input
                                                type={showRepeatPassword ? 'text' : 'password'}
                                                style={formik.touched.password_confirmation && formik.errors.password_confirmation ? {border: "1px solid #F00"} : {border: "none"}}

                                                className='modal-input'
                                                name='password_confirmation'
                                                value={formik.values.password_confirmation}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <div
                                                className={`password-toggle-icon ${showRepeatPassword ? 'show' : ''}`}
                                                onClick={() => setShowPRepeatPassword(!showRepeatPassword)}
                                            >
                                                {showRepeatPassword ? (
                                                    <i className='fas fa-eye-slash'></i>
                                                ) : (
                                                    <i className='fas fa-eye'></i>
                                                )}
                                            </div>
                                        </div>

                                        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                            <span style={{
                                                color: '#F00',
                                                fontSize: "12px",
                                                fontWeight: "700"
                                            }}>{formik.errors.password_confirmation}</span>
                                        )}
                                    </Col>
                                </Row>
                            </Form>
                            <Button
                                className={`modal-exchange-button ${Object.keys(formik.errors).length !== 0 ? "" : "active"}`}
                                disabled={Object.keys(formik.errors).length !== 0}
                                onClick={register}
                            >{t('register')}</Button>
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
                        <h2>{t('thanks')}</h2>
                        <h5 style={{textAlign: "left"}}>{t('registerSuccess')}</h5>
                        <p>{t('registerSuccessText1')}</p><p
                        style={{fontWeight: "500",paddingBottom:"30px"}}>{t('registerSuccessText2')}</p>
                        <FaCheckCircle color="#FFE500" size={100}/>
                    </div>
                </Box>
            </Modal>
        </>

    );
};

export default ModalRegister;