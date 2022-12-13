import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { QRCodeSVG } from 'qrcode.react';

const style = {
    position: 'absolute' as 'absolute',
    top: '70px',
    left: '50px',
    display: 'flex',
    justifyContent: 'center',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    publicKey: string | undefined,
}

export default function QR(props: Props) {
    const handleClose = () => props.setOpen(false);

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {props.publicKey && <QRCodeSVG value={props.publicKey} />}
                </Box>
            </Modal>
        </div>
    );
}