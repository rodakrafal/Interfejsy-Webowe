import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import { InformationGroupsContext } from "../data/informationGroupsContext";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function GroupContact() {
    let params = useParams();
    const [groups, setGroups] = useContext(InformationGroupsContext);

    let group = groups.find((group) => group.number === parseInt(params.groupId, 10));

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, [open]);

    return (
        <main>
            <div className="information-container">
                <h1 style={{ "font-size": "24px" }}>{group.name}</h1>
             </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Successfully sent mail to {group.name}!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis sunt, ea beatae provident ex nulla illum maiores ipsam facere dolorem pariatur unde distinctio consequatur. Impedit neque similique animi totam deserunt.
                </Typography>
            </Box>
            </Modal>
            <div className="contact-buttons">
                <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                    navigate(`/groups`);
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