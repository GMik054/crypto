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

const ModalTransactions = ({user}) => {
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


    return (
        <div className="header-buttons" style={{justifyContent: "end"}}>
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
                        <h5>Transactions</h5>

                        <Row className="g-2 mb-4">

                            {
                                user?.exchange_history?.map((el, i) => {
                                    return (
                                        <Col lg="12" xs="12" key={i}>
                                            <div className="single-transaction">
                                                <p># <span>{el.id}</span></p>
                                                <p>Date: <span>{el.created_at}</span></p>
                                                <p>Name: <span>{el.name}</span></p>
                                                <p>Exchange: <span>{el.content}</span></p>
                                                <p>Phone Number: <span>{el.phone}</span></p>
                                                <p>Email: <span>{el.email}</span></p>
                                            </div>
                                        </Col>

                                    )
                                })
                            }
                        </Row>

                        <Button
                            className={`modal-exchange-button active`}
                            onClick={handleClose}
                        >Close</Button>

                    </Box>
                </Fade>
            </Modal>
        </div>


    );
}
    ;

    export default ModalTransactions;