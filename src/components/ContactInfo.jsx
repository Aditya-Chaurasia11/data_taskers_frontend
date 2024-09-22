import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import "./contactInfo.css";

function ContactInfo() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();
  const [otp] = useState(
    Math.floor(100000 + Math.random() * 900000).toString()
  );
  const [message, setMessage] = useState(`Hi. Your OTP is: ${otp}`);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    sendMessage();
    setOpen(false);
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(
          `https://data-taskerbackend.onrender.com/contacts`
        );
        setContact(response.data.find((c) => c._id === id));
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <div>Loading...</div>;
  }

  const sendMessage = async () => {
    if (!contact) return;

    try {
      await axios.post("https://data-taskerbackend.onrender.com/send-sms", {
        message,
        phoneNumber: contact.phoneNumber,
        contactName: contact.name,
      });
      alert("Message sent successfully");
      navigate("/messages");
    } catch (err) {
      alert("Error sending message");
      console.error(err);
    }
  };

  return (
    <div className="contactInfo_container">
      <h2 className="contactInfo_heading">Contact Info</h2>
      <div className="contactInfo_body">
        <p>Name: {contact.name}</p>
        <p>Phone: {contact.phoneNumber}</p>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Send Message
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Send Message"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                required
                margin="dense"
                label="Send message"
                type="text"
                fullWidth
                value={message}
                multiline
                minRows={3}
                onChange={(e) => setMessage(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ContactInfo;
