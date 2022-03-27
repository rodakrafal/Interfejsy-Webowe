import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import { InformationGroupsContext } from "../data/informationGroupsContext";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, [open]);

    return (
        <main style={{ padding: "1rem" }}>
           <p>
            {group.name}
            </p>
            <Button onClick={handleOpen}>Send mail!</Button>
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
            <NavLink
                style={({ isActive }) => ({
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                })}
                to={`/groups`}
              >
                Go back!
            </NavLink>
        </main>
      );
}