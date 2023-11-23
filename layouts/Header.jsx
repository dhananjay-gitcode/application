import React from "react";
import { Navbar } from "reactstrap";
import Im from '../assets/images/portrait/small/avatar-s-11.jpg'


export default function Header() {

  return (
    <Navbar
      expand="lg"
      container={false}
      className="header-navbar navbar align-items-center floating-nav container-xxl navbar-shadow navbar navbar-expand-lg navbar-light"
    >
      <div class="navbar-container d-flex content">
        <div class="bookmark-wrapper d-flex align-items-center">
          <div class="bookmark-wrapper d-flex align-items-center"></div>
        </div>
        <ul class="nav navbar-nav align-items-center ms-auto">
          <li class="dropdown-user nav-item dropdown">
            <a
              href="#"
              aria-haspopup="true"
              class="nav-link dropdown-user-link"
              aria-expanded="false"
            >
              <div class="user-nav d-sm-flex d-none">
                <span class="user-name fw-bold text-capitalize">
                  THE GOD FREY
                </span>
                <span class="user-status">Admin</span>
              </div>
              <div class="avatar">
                <img
                  class=""
                  src={Im}
                  alt="avatarImg"
                  height="40"
                  width="40"
                />
                <span class="avatar-status-online"></span>
              </div>
            </a>
            <div
              tabindex="-1"
              role="menu"
              aria-hidden="true"
              class="dropdown-menu dropdown-menu-end"
            >
              <button
                type="button"
                tabindex="0"
                role="menuitem"
                class="dropdown-item"
              >
                <svg
                  xmlns="
http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="me-75"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
                <span class="align-middle">Logout</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </Navbar>
  );
}
