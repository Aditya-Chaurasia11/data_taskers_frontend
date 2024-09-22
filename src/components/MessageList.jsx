import React, { useEffect, useState } from "react";
import axios from "axios";
import "./messageList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function MessageList() {
  const [messages, setMessages] = useState([]);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://data-taskerbackend.onrender.com/sent-messages");
        const data = response.data;
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="messageList_container">
      <h2 className="messageList_heading">Messages Sent</h2>
      <div className="messageList_body">
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 510,
            // backgroundColor: "#0b2a3c",
            boxShadow: "none",
            border: "1px solid #69757d",
            backgroundColor: "gray",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
              color: "white",
              "& .MuiTableCell-root": {
                color: "white",
                backgroundColor: "#0a2b3c",
              },
              "& .MuiTableRow-root": {
                color: "#6c757d",
              },
              "& .MuiTableHead-root": {
                color: "#6c757d",
              },
              "& .MuiTableBody-root": {
                color: "#6c757d",
              },
            }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Phone number</TableCell>
                <TableCell align="center">Message</TableCell>
                <TableCell align="center">Date</TableCell>
                {/* <TableCell align="center">MEV</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {messages?.map((row, index) => (
                <TableRow
                  key={index}
                  align="center"
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row?.to}
                  </TableCell>
                  <TableCell align="center" scope="row">
                    {row?.body.replace(
                      "Sent from your Twilio trial account - ",
                      ""
                    )}
                  </TableCell>

                  <TableCell align="center">
                    {" "}
                    {new Date(row?.dateUpdated).toLocaleString()}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default MessageList;
