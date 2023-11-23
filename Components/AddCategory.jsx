import { React, useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

function AddCategory() {

  const [category, setCategory] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category);
    const firstLetter = category[0];
    const asciiValue = firstLetter.charCodeAt(0);

    if (
      (asciiValue >= 65 && asciiValue <= 90) ||
      (asciiValue >= 97 && asciiValue <= 122)
    ) {
      console.log("The first letter is an  letter.");
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      console.log(`capitalizedCategory${capitalizedCategory}`);

      try {
        // Send a POST request to your backend to authenticate the user
        const response = await axios.post(
          "http://localhost:9000/api/add/category",
          { capitalizedCategory }
        );

        if (response.status === 200) {
          // If login is successful, redirect to the home page
          // history("/success");
          setCategory(" ");
          setResponse(response.data.message);
        } else if (response.status === 201) {
          setCategory(" ");
          setResponse(response.data.message);
          // Handle login failure, e.g., display an error message
        }
      } catch (error) {
        console.error("Login failed:", error);
        setResponse(response.data.message);
        // Handle login failure, e.g., display an error message
      }
    } else {
      setResponse("The first letter is not a letter.");
      console.log(response);
    }
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter Category:</label>
          <input
            className="form-control"
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Button
          className="mt-2"
          variant="primary"
          type="button"
        >
          ADD
        </Button>
      </form>
      <span>{response}</span>
    </div>
  );
}

export default AddCategory;
