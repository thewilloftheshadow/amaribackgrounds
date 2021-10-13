import "bulma"
import { Helmet } from "react-helmet"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import axios from "axios"
import React from "react"

const Backgrounds = () => {
  const [projectData, setProjectData] = React.useState(undefined)
  if (!projectData) {
    axios({
      method: "GET",
      url: `${window.location.origin}/api/backgrounds`,
    })
      .then((data) => {
        console.log(data)
        setProjectData(JSON.parse(data.request.response).resources)
      })
      .catch((error) => {
        console.error(error)
        setProjectData(null)
      })
  }
  return (
    <div>
      <Helmet>
        <title>All Backgrounds | AmariBackgrounds</title>
      </Helmet>

      <Navbar />

      <div className="container text-centered">
          {
            projectData?.length ?
            projectData.map((p) => (
              <div><p>{p.public_id}</p><img src={p.url}></img></div>
            )) : projectData === null ? (
              <div>
                <p className="has-text-danger">
                  Failed to fetch background data
                </p>
              </div>
            ) : (
              <p>
                Loading backgrounds data...
              </p>
            )
          }
        </div>

      <Footer />
    </div>
  )
}

const AllBackgrounds = () => {
  return <div></div>
}

const Paginated = () => {
  let commentNodes = this.props.data.map(function (comment, index) {
    return <div key={index}>{comment.comment}</div>
  })

  return (
    <div id="project-comments" className="commentList">
      <ul>{commentNodes}</ul>
    </div>
  )
}

export default Backgrounds
