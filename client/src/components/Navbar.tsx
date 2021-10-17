import React from "react"
import "bulma"
import "../App.css"
import { Link } from "react-router-dom"
import Login from "../functions/Login"
import Logout from "../functions/Logout"

const Navbar = () => {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark darkbg" role="navigation" aria-label="main navigation">
        <div className="navbar-end">
          <div className="navbar-item">
            {window.supabase.auth.user() ? (
              <p style={{ paddingRight: "10px" }}>
                <div className="navbar-item has-dropdown is-hoverable">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="navbar-link">
                    <figure className="image">
                      <img src={window.supabase.auth.user()?.user_metadata.avatar_url} alt="Avatar" className="is-rounded" style={{ width: "28px", height: "32px" }} />
                    </figure>
                    <div style={{ paddingRight: "10px" }} />
                    {window.supabase.auth.user()?.user_metadata.full_name}
                  </a>

                  <div className="navbar-dropdown">
                    <Link className="navbar-item" to="/manage">
                      Manage Backgrounds
                    </Link>

                    <Link className="navbar-item" to="/upload">
                      Upload Background
                    </Link>

                    <hr className="navbar-divider" />

                    <Link className="navbar-item has-text-danger" to="#" onClick={Logout}>
                      Logout
                    </Link>
                  </div>
                </div>
              </p>
            ) : (
              <></>
            )}

            <div className="buttons">
              {window.supabase.auth.user() ? (
                <></>
              ) : (
                <button className="button is-amariYellow" onClick={Login}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
