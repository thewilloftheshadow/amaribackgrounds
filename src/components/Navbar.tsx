import React from 'react';
import 'bulma';
import '../App.css';
import { Link } from 'react-router-dom';
import Login from '../functions/Login';
import Logout from '../functions/Logout';

const Navbar = () => {
  const [isActive, setisActive] = React.useState(false);

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            {/* Uncomment below code if you wish to do so. Please note you need to format it using CSS */}
            {/* <img src="/logo.png" alt="Wolvesville Utopium Logo" /> */}
            <h4 className="title is-4">
              <figure className="image" style={{ display: 'inline-block', verticalAlign: 'middle', width: '28px', height: '32px' }}>
                <img src="/logo.png" alt="Wolvesville Utopium Logo" className="is-rounded" />
              </figure>

              <span style={{ marginRight: '7.5px' }} />

              <strong>Wolvesville Utopium</strong>
            </h4>
          </Link>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            onClick={() => setisActive(!isActive)}
            role="button"
            className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/gamemodes">
              Gamemodes
            </Link>

            <Link className="navbar-item" to="/roles">
              Roles
            </Link>

            <Link className="navbar-item" to="/status">
              Status
            </Link>

            {/* If Wolvesville Utopium is open source in the future, put the repo link here */}
            <a className="navbar-item" href="https://github.com/Team-Utopium" target="_blank" rel="noreferrer">
              GitHub
            </a>

            <a className="navbar-item" href="https://discord.gg/vcQG4Eh" target="_blank" rel="noreferrer">
              <strong>Join Server</strong>
            </a>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Navbar;

