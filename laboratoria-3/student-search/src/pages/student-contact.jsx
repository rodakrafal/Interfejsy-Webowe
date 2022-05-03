import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import Student from "../components/Student";

import { Box, Button, Typography, Modal, TextareaAutosize } from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#fff',
    p: 4,
};

 const StudentContact = () => {
     
     const [open, setOpen] = useState(false);
     const navigate = useNavigate();
     const location = useLocation();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const refAreaInput = useRef(null);
    useEffect(() => {
      refAreaInput.current?.focus();
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, [open]);

    return (
        <main>
            <div className="information-container">
                <h1 style={{ "fontSize": "24px" }}>{location.state.name}</h1>
             </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Successfully sent mail to {location.state.name}!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis sunt, ea beatae provident ex nulla illum maiores ipsam facere dolorem pariatur unde distinctio consequatur. Impedit neque similique animi totam deserunt.
                    </Typography>
                </Box>
            </Modal>

            <Student 
                description={location.state.description} 
                email={location.state.email}
                image={location.state.image}
                tags={location.state.tags}
                subjects={location.state.subjects}
            />

            <TextareaAutosize
                ref={refAreaInput}
                aria-label="text-area-input"
                minRows={3}
                maxRows={5}
                placeholder="Enter a message here!"
                style={{ maxWidth: 600, minWidth: 400, minHeight: 200, maxHeight: 400, margin: "auto" }}
            />

            <div className="contact-buttons">
                <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                    navigate(`/students`);
                }}
                sx={{   margin: "10px" }}
                >
                Go back!
                </Button>
                <Button
                variant="contained"
                endIcon={<EmailIcon />}
                onClick={handleOpen}
                >
                Send Email!
                </Button>
            </div>         
        </main>
      );
}

export default StudentContact;