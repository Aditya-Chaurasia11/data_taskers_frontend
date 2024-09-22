import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import "./contactList.css";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const data = {
      name: name,
      phoneNumber: phone, 
    };

    axios
      .post("https://data-taskerbackend.onrender.com/contacts", data)
      .then((res) => {
        console.log("Contact added:", res.data);
        fetchContacts();
      })
      .catch((err) => console.error("Error adding contact:", err));

    setOpen(false);
  };

  const fetchContacts = () => {
    axios
      .get("https://data-taskerbackend.onrender.com/contacts")
      .then((res) => setContacts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchContacts(); 
  }, []);

  return (
    <div className="contactList_container">
      <div className="contactList_header">
        <h2 className="contactList_heading">Contact List</h2>
        <button className="contactList_header_button" onClick={handleClickOpen}>
          Add contact
        </button>

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Add Contact"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                required
                margin="dense"
                label="Enter name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                margin="dense"
                label="Enter phone number"
                type="text"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleClose} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ul>
        <div className="contactList_list_container">
          {contacts.map((contact, index) => (
            <li key={index}>
              <div className="contactList_list">
                <Link to={`/contact/${contact._id}`}>{contact.name}</Link>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}

export default ContactList;
