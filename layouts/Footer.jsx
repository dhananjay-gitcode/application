import React from 'react'

export default function Footer() {
  return (
    <footer style={{marginLeft:'260px'}} class="footer footer-light footer-static">
      <p class="clearfix mb-0">
        <span class="float-md-start d-block d-md-inline-block mt-25">
          COPYRIGHT © 2023{" "}
          <a
            href="https://1.envato.market/pixinvent_portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            THE GOD FREY
          </a>
          <span class="d-none d-sm-inline-block">, All rights Reserved</span>
        </span>
        <span class="float-md-end d-none d-md-block">
          Hand-crafted &amp; Made with
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </span>
      </p>
    </footer>
  );
}
