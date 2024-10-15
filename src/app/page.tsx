'use client';

import { Button, Card as MuiCard, Checkbox, FormControlLabel, Divider, FormLabel, FormControl, Link, TextField, Typography, Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import useBeforeUnload from "@/hooks/useBeforeUnload";

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
}));

const Container = styled(Stack)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function Home() {
  const [selectedDevice, setSelectedDevice] = useState<USBDevice | undefined>(undefined);

  useBeforeUnload(!!selectedDevice);

  const [open, setOpen] = useState(false);

  const onSelectDevice = async () => {
    try {
      const device = await navigator.usb.requestDevice({
        filters: [{
          vendorId: 0x1f3a,
          productId: 0xefe8
        }]
      })
  
      console.log('Selected device:', device);
  
      /* Try to open the device */
      await device.open();
      console.log('Device opened successfully');
  
      setSelectedDevice(device);
    } catch (error) {
      console.error('Error selecting device:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <p>Welcome to <b>awfel</b>! The WebUSB Allwinner FEL mode utility.</p>
          <p>Connect your device to get started.</p>
          <Button
            variant="contained"
            onClick={onSelectDevice}
          >
            Select device
          </Button>
        </Card>
      </Container>
      <SimpleDialog
        open={open}
        selectedValue="addAccount"
        onClose={handleClose}
      />
    </>
  );
}
