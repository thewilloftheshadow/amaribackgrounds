import React from "react"
import "bulma"
import "../App.css"
import { Link } from "react-router-dom"
import Login from "../functions/Login"
import Logout from "../functions/Logout"
import axios from "axios"

const Navbar = () => {
  const [tags, setTags] = React.useState([])
  React.useEffect(() => {
    ;(async () => {
      try {
        const data = await axios.get(`${window.location.origin}/api/tags`)
        setTags(data.data)
      } catch {}
    })()
  }, [])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark darkbg" role="navigation" aria-label="main navigation">
        <a className="navbar-brand" href="/">
          <img src="/AmariSmol.png" style={{ height: "75px", padding: "10px" }} className="d-inline-block align-top" alt=""></img>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              {/* eslint-disable-next-line */}
              <a className="nav-link dropdown-toggle white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tags
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a href="/backgrounds" className={"dropdown-item white"}>
                  View All
                </a>
                {tags.map((x) => (
                  /* eslint-disable-next-line */
                  <a href={`/backgrounds/${x}`} className={"dropdown-item white"}>
                    {x}
                  </a>
                ))}
              </div>
            </li>
          </ul>
          <div className="navbar-end">
            <div className="navbar-item">
              {window.supabase.auth.user() ? (
                <p style={{ paddingRight: "10px" }}>
                  <div className="navbar-item has-dropdown is-hoverable">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="navbar-link white">
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
        </div>
        {/* eslint-disable-next-line */}
      </nav>
    </div>
  )
}

export default Navbar
