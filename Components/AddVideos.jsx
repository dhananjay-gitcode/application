import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import "../assets/TagInput.css";
import "../assets/Style.css";


const AddVideos = () => {
  const [query, setQuery] = useState("");
  const [videoTypes, setVideoTypes] = useState([]);
  const [backendTags, setBackendTags] = useState([]);
  const [videoId, setVideoId] = useState([]);
  const [videodata, setVideodata] = useState({});
  const [loading, setLoading] = useState(false);
  const [showTagsUI, setShowTagsUI] = useState(true);
  // const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoId: "",
    tags: [],
    CategoryId: "",
    videoLink: "",
    thumnailLink: "",
    duration: "",
    releaseDateTime: "",
  });


  useEffect(() => {
    axios.get("http://localhost:9000/api/category").then((response) => {
      setVideoTypes(response.data);
    });
  }, []);

  useEffect(() => {
    const performSearch = async (querySpecial) => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/search/tags?query=${querySpecial}`
        );
        setBackendTags(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (query.trim()) {
      const querySpecial = query.trim();
      console.log(`tag-> ${querySpecial}`);
      performSearch(querySpecial);
    } else {
      setBackendTags([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const descriptionModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        [{ background: [] }],
        ["link"],
      ],
    },
  };

  const descriptionFormats = [
    "bold",
    "italic",
    "underline",
    "background",
    "link",
  ];

  const handleTagRemove = (tag) => {
    const updatedTags = formData.tags.filter((t) => t !== tag);
    setFormData({ ...formData, tags: updatedTags });
  };

  // const handleTagAdd = (newTag) => {
  //   if (newTag.trim().length > 0 && !formData.tags.includes(newTag)) {
  //     setFormData({ ...formData, tags: [newTag, ...formData.tags] });
  //     setQuery("");
  //   }
  // };

const handleTagAdd = (newTag) => {
  if (newTag.trim().length > 0 && !formData.tags.includes(newTag)) {
    setFormData((prevData) => ({
      ...prevData,
      tags: [newTag, ...prevData.tags],
    }));
    setQuery("");
  }
};

  useEffect(() => {
    // Other code
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(videodata);

    console.log(videodata.description);
    console.log(videodata.name);

    const newFormData = {
      ...formData, // Spread the existing formData
      title: videodata.name, // Update the title field
      description: videodata.description,
      videoLink: videodata.player_embed_url,
      thumnailLink: videodata.pictures?.base_link,
      duration: videodata.duration,
    };

    setFormData(newFormData); // Update the hook with the new formData
    console.log("final form data", formData);
  }, [videodata]);

  const fetchVideoData = async (e) => {
    try {
      console.log("video ID", videoId);
      const response = await axios.post(
        "http://localhost:9000/api/viemo/video/details",
        { videoId }
      );
      console.log(response.data.videoData);
      if (response.status === 200) {
        setVideodata(response.data.videoData);
      } else {
        console.log(response.data.message);
      }
      //console.log(formData);
    } catch (error) {
      console.error("error", error);
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:9000/api/videos",
          formData
        );

        if (response.status === 201) {
          setFormData({
            title: "",
            description: "",
            CategoryId: "",
            videoId: "",
            tags: [],
            videoLink: "",
            thumnailLink: "",
            duration: "",
            releaseDateTime: "",
          });
          setQuery("");
          setShowTagsUI(false); // Reset the visibility of tags UI
          console.log("Data saved successfully.");
        } else {
          console.error("Unexpected response status:", response.status);
          // Handle other response statuses here
        }
      } catch (error) {
        console.error("Error saving data:", error);
      } finally {
        setLoading(false);
      }
  };
  

  return (
    <Card className="p-3">
      <CardContent>
        <Form>
          <Form.Group controlId="videoId">
            <Form.Label>Video ID</Form.Label>
            <Form.Control
              type="text"
              name="videoId"
              placeholder="Enter video ID"
              value={videoId}
              onChange={(e) => {
                setVideoId(e.target.value);
                handleChange(e);
              }}
            />
          </Form.Group>

          <Button
            className="mt-2 mb-2"
            variant="primary"
            type="button"
            onClick={fetchVideoData}
          >
            Fetch
          </Button>

          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="videoLink">
            <Form.Label>Video Link</Form.Label>
            <Form.Control
              type="text"
              name="videoLink"
              placeholder="Enter video link"
              value={formData.videoLink}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="thumnailLink">
            <Form.Label>Thumnail Link</Form.Label>
            <Form.Control
              type="text"
              name="thumnailLink"
              placeholder="Enter Thumnail Link"
              value={formData.thumnailLink}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <ReactQuill
              value={formData.description}
              onChange={handleDescriptionChange}
              modules={descriptionModules}
              formats={descriptionFormats}
            />
          </Form.Group>

          <Form.Group controlId="CategoryId">
            <Form.Label>Video Category</Form.Label>
            <Form.Control
              as="select"
              name="CategoryId"
              value={formData.CategoryId}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  CategoryId: e.target.value,
                }))
              }
            >
              <option value="">Select a category</option>
              {videoTypes.map((type, index) => (
                <option key={index} value={type._id}>
                  {type.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="Duration"
              placeholder="Enter duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="releaseDateTime">
            <Form.Label>Release Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="releaseDateTime"
              value={formData.releaseDateTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Label>Tags</Form.Label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Autocomplete
              freeSolo
              options={backendTags.map((tag) => tag.name)}
              inputValue={query}
              onInputChange={(event, newInputValue) => setQuery(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Add Tag"
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "tab") {
                      handleTagAdd(e.target.value);
                    }
                  }}
                />
              )}
            />
            <div
              style={{ display: "flex", flexWrap: "wrap", marginRight: "5px" }}
            >
              {formData.tags.map((tag, index) => (
                <div key={index} className="tag">
                  {tag} <span onClick={() => handleTagRemove(tag)}>x</span>
                </div>
              ))}
            </div>
          </div>

          <Button
            className="mt-4"
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </Button>
          {loading ? <CircularProgress size={24} /> : null}
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddVideos;
