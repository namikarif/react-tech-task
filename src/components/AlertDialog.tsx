import React, {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

interface IADProps {
    open: boolean;
    title: string;
    description: string;
    handleClose: () => void;
    handleAgree: () => void;
}

const AlertDialog: FC<IADProps> = ({
                                       open,
                                       title,
                                       handleClose,
                                       handleAgree,
                                       description
                                   }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Disagree</Button>
                <Button onClick={handleAgree} color="success" autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default AlertDialog;
