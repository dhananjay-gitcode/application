import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/AllUsers.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
// import UserEdit from "./UserEdit ";
// import UserEditModal from "./UserEditModal";
// import VideoTable from "./VideoTable";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
     const [editedUserData, setEditedUserData] = useState({
       firstname: "",
       lastname: "",
       email: "",
       // Add other fields here
     });
   const [deleteUserId, setDeleteUserId] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
  // axios.defaults.withCredentials = true;
  useEffect(() => {
    // Fetch user details from the API when the component mounts
    axios
      .get("http://localhost:9000/api/user/fetch")
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const formatDateString = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const formatTimeString = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date(dateString).toLocaleTimeString("en-GB", options);
  };
  // const handleEditClick = (userId) => {
  //   // Implement your edit functionality here, e.g., route to an edit page
  // };

  const handleDeleteUser = (userId) => {
    // Make a DELETE request to the API to delete the video
    axios
      .delete(`http://localhost:9000/api/user/delete/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          // Video deleted successfully, update the state or perform any necessary actions
          console.log("User deleted successfully.");
          // You can also refresh the video list by making a new GET request here if needed
        }
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteUserId) {
      // Make a DELETE request to the API to delete the user
      axios
        .delete(`http://localhost:9000/api/user/delete/${deleteUserId}`)
        .then((response) => {
          if (response.status === 200) {
            
            console.log("User deleted successfully.");
            setDeleteUserId(null);
            setOpenDialog(false);
            // You can also refresh the user list by making a new GET request here if needed

             setUsers((prevUsers) =>
               prevUsers.filter((user) => user.userId !== deleteUserId)
             );
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteUserId(null);
    setOpenDialog(false);
  };


   const handleEditClick = (user) => {
     setEditingUser(user);
     setEditedUserData({
       firstname: user.firstname,
       lastname: user.lastname,
       email: user.email,
       // Add other fields here
     });
     setOpenEditDialog(true);
   };

   const handleEditSave = () => {
     // Perform the save operation here, e.g., send a PUT request to update the user data
     console.log("User data to be saved:", editedUserData);

     // After saving, reset the editing state
     setEditingUser(null);
     setOpenEditDialog(false);
   };

   const handleEditCancel = () => {
     // Reset the editing state
     setEditingUser(null);
     setOpenEditDialog(false);
   };
  

  return (
    <div className="container">
      <h2 className="mb-3">All Users</h2>
      {users.map((user) => (
        <Card key={user.userId} className="mb-3">
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Created Time</TableCell>
                  <TableCell>Subscription</TableCell>
                  <TableCell>Subscription Type</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{user.userId}</TableCell>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{formatDateString(user.createdAt)}</TableCell>
                  <TableCell>{formatTimeString(user.createdAt)}</TableCell>
                  <TableCell>{user.subscription}</TableCell>
                  <TableCell>{user.subsciption_type}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteClick(user.userId)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditCancel}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Add instructions or information about editing */}
          </DialogContentText>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={editedUserData.firstname}
            onChange={(e) =>
              setEditedUserData({
                ...editedUserData,
                firstname: e.target.value,
              })
            }
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={editedUserData.lastname}
            onChange={(e) =>
              setEditedUserData({ ...editedUserData, lastname: e.target.value })
            }
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editedUserData.email}
            onChange={(e) =>
              setEditedUserData({ ...editedUserData, email: e.target.value })
            }
          />
          {/* Add other fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
