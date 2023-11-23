import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// ** Core styles
import "./@core/assets/fonts/feather/iconfont.css";
import "./@core/scss/core.scss";
import AllVideos from './Components/AllVideos';
import TagManagement from './Components/TagManagement';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import AddVideos from './Components/AddVideos'
import AddCategory from './Components/AddCategory'
import AllUsers from './Components/AllUsers';
import { FeaturedVideo } from '@mui/icons-material';
import Playlist from './Components/Playlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to={"/admin/allVideos"} />} />
        <Route
          path="/admin/allVideos"
          element={
            <App>
              <AllVideos />
            </App>
          }
        />
        <Route
          path="/admin/addVideos"
          element={
            <App>
              <AddVideos />
            </App>
          }
        />
        <Route
          path="/admin/addCategory"
          element={
            <App>
              <AddCategory />
            </App>
          }
        />
        <Route
          path="/admin/tagManagement"
          element={
            <App>
              <TagManagement />
            </App>
          }
        />
        <Route
          path="/admin/allUsers"
          element={
            <App>
              <AllUsers />
            </App>
          }
        />

        <Route
          path="/admin/featuredVideos"
          element={
            <App>
              <FeaturedVideo/>
            </App>
          }
        />

        <Route
          path="/admin/Playlist"
          element={
            <App>
              <Playlist/>
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
