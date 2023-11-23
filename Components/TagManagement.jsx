import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Grid,
} from "@mui/material";
import { SketchPicker } from "react-color";
import ClearIcon from "@mui/icons-material/Clear";
import "../assets/Style.css";
import Button1 from "react-bootstrap/Button";

export default function TagManagement() {
  const [tags, setTags] = useState([]);
  const [findtags, setFindags] = useState([]);
  const [currentColor] = useState(" ");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [response, setResponse] = useState("");
  const [addTag, setAddTag] = useState("");
  const [deleteTag, setDeleteTag] = useState(null); // Tag to be deleted
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangeComplete = async (color) => {
    const coular = color.hex;
    try {
      const response = await axios.post(
        "http://localhost:9000/api/color/tags",
        { coular, findtags }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Color update failed:", error);
    }
  };

  const showColorOpen = () => {
    setShowColorPicker(!showColorPicker);
  };

  useEffect(() => {
    axios.get("http://localhost:9000/api/get/tags").then((response) => {
      setTags(response.data);
    });
  }, [tags]);

  const handleAddTag = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/api/add/tags", {
        addTag,
      });

      if (response.status === 200) {
        setTags((prevTags) => [...prevTags, response.data]);
        setAddTag("");
        setResponse("Tag added successfully");
        console.log("Tag added successfully:", response.data);
      } else {
        if (response.status === 201) {
          alert("Tag already exists");
        }
      }
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

const handleDeleteTag = async () => {
  try {
    const response = await axios.post("http://localhost:9000/api/delete/tags", {
      deleteTag,
    });

    if (response.status === 200) {
      setTags(tags.filter((tag) => tag.name !== deleteTag));
      setDeleteTag(null);
      setOpenDialog(false);
      console.log("Tag deleted successfully:", response.data);
    } else if (response.status === 404) {
      alert("Tag not found"); // Handle the case where the tag is not found
    }
  } catch (error) {
    console.error("Error deleting tag:", error);
  }
};

  return (
    <>
      <h2>Tag Management</h2>

      <form>
        <div>
          <label>Enter Tags:</label>
          <TextField
            className="form-control"
            type="text"
            name="tag"
            value={addTag}
            onChange={(e) => setAddTag(e.target.value)}
          />
        </div>
        <Button1
          className="mt-2"
          type="button"
          variant="primary"
          onClick={handleAddTag}
        >
          ADD
        </Button1>
      </form>
      <span className="text-danger">{response}</span>

      <Card className="mt-3">
        <CardContent>
          <Grid container spacing={2}>
            {tags.map((tag, index) => (
              <Grid item key={index}>
                <div className="tag-container">
                  <div
                    className="tag"
                    style={{
                      backgroundColor: tag.color,
                      cursor: "pointer",
                      border: "none",
                    }}
                    onClick={() => {
                      showColorOpen();
                      setFindags(tag.name);
                    }}
                  >
                    {tag.name}
                  </div>
                  <IconButton
                    onClick={() => {
                      setDeleteTag(tag.name);
                      setOpenDialog(true);
                    }}
                    className="delete-icon"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              </Grid>
            ))}
          </Grid>

          {showColorPicker && (
            <SketchPicker
              color={currentColor}
              onChangeComplete={handleChangeComplete}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={openDialog}>
        <DialogContent>
          <p>Are you sure you want to delete the tag?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No</Button>
          <Button onClick={handleDeleteTag}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
