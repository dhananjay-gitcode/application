import React, { useEffect, useState } from "react";
// import "../@core/scss/core.scss";
import axios from "axios";
// import "../assets/white.css";
import {
  Button,
  Modal,
  Fade,
  TextField,
  Card,
  List,
  ListItem,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import "../assets/listVideo.css";

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [editedVideoData, setEditedVideoData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const handleConfirmDelete = () => {
    if (editingUser) {
      handleDeleteVideo(editingUser.v_id);
    }
  };

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
    setEditedVideoData({
      title: "",
      description: "",
      tags: [],
    });
  };

  const handleEditClick = (video) => {
    setEditingUser(video);
    setEditedVideoData({
      title: video.title,
      description: video.description,
      tags: video.tags.join(", "),
    });
    handleOpen();
  };

  const handleSaveUser = () => {
    // Perform the save operation here, e.g., send a PUT request to update the video data
    console.log("Video data to be saved:", editedVideoData);

    // After saving, reset the editing state
    setEditingUser(null);
    handleClose();
  };

  useEffect(() => {
    // Fetch video data from the server
    axios
      .get("http://localhost:9002/api/video/fetch")
      .then((response) => {
        setVideos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCancelEdit = () => {
    // Reset the editing state
    setEditingUser(null);
    setEditedVideoData({
      title: "",
      description: "",
      tags: [],
    });
    handleClose();
  };

  const handleDeleteVideo = (videoId) => {
    // Make a DELETE request to the API to delete the video
    setDeleteConfirmationOpen(false); // Close the confirmation dialog
    axios
      .delete(`http://localhost:9000/api/video/delete/${videoId}`)
      .then((response) => {
        if (response.status === 200) {
          // Video deleted successfully, update the state or perform any necessary actions
          console.log("Video deleted successfully.");
          // You can also refresh the video list by making a new GET request here if needed
        }
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  return (
    <div className="white">
      <h2>Video List</h2>
      <List>
        {videos.map((video) => (
          <ListItem key={video.v_id}>
            <Card style={{ width: "100%" }}>
              <div className="video-item">
                <div className="video-thumbnail">
                  {/* <Subs /> */}
                  <img
                    className="w-10 h-10"
                    style={{ width: "100px", height: "100px" }}
                    src={video.thumnailLink}
                    alt=""
                  />
                </div>
                <div className="video-details">
                  <h3>
                    <strong>{video.title}</strong>
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: video.description }}
                  />
                  <strong>Tags:</strong>
                  <ul style={{ display: "flex" }}>
                    {video.tags.map((tag, index) => (
                      <li key={index} style={{ marginRight: "10px" }}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="video-actions">
                    <button
                      className="btn btn-success"
                      onClick={() => handleEditClick(video)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setEditingUser(video);
                        setDeleteConfirmationOpen(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </ListItem>
        ))}
      </List>

      {/* Material-UI Modal for Edit */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in={open}>
          <div>
            <Card
              style={{
                background: "#fff",
                maxWidth: 400,
                width: "100%",
                padding: 16,
              }}
            >
              <CardContent>
                <h2>Edit Video</h2>
                <TextField
                  label="Title"
                  fullWidth
                  margin="normal"
                  value={editedVideoData.title}
                  onChange={(e) =>
                    setEditedVideoData({
                      ...editedVideoData,
                      title: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  value={editedVideoData.description}
                  onChange={(e) =>
                    setEditedVideoData({
                      ...editedVideoData,
                      description: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Tags"
                  fullWidth
                  margin="normal"
                  value={editedVideoData.tags}
                  onChange={(e) =>
                    setEditedVideoData({
                      ...editedVideoData,
                      tags: e.target.value,
                    })
                  }
                />
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveUser}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>

      {/* Material-UI Dialog for Delete Confirmation */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this video?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            color="primary"
          >
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllVideos;
