import "bulma"
import { Helmet } from "react-helmet"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import axios from "axios"
import React from "react"
import usePagination from "../hooks/usePagination"
import { saveAs } from "file-saver"

const Backgrounds = ({ match, location }) => {
  console.log(match, location)
  const [backgrounds, setBackgrounds] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, setPage, totalPages } = usePagination({
    contentPerPage: 12,
    count: backgrounds.length,
  })
  React.useEffect(() => {
    ;(async () => {
      try {
        console.log(`${window.location.origin}/api/backgrounds${match.params.tag ? `?tag=${match.params.tag}` : ""}`)
        const data = await axios.get(`${window.location.origin}/api/backgrounds${match.params.tag ? `?tag=${match.params.tag}` : ""}`)
        setBackgrounds(data.data)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [match.params.tag])
  return (
    <div>
      <Helmet>
        <title>All Backgrounds | AmariBackgrounds</title>
      </Helmet>

      <Navbar />

      <div className="container">
        {loading ? (
          <p className="text-centered">Loading backgrounds data...</p>
        ) : error ? (
          <p className="has-text-danger text-centered">Failed to fetch background data</p>
        ) : (
          <>
            <div className="centerit">
              <p className="h3 centerit pb-3">{match.params.tag ? `${match.params.tag.charAt(0).toUpperCase() + match.params.tag.slice(1)} Backgrounds` : `All Backgrounds`}</p>

              <nav aria-label="Page Selector" className="pb-3">
                <ul class="pagination" style={{ justifyContent: "center" }}>
                  <li class="page-item">
                    {/* eslint-disable-next-line */}
                    <a aria-label="Previous" href="#" onClick={prevPage} className={"page-link is-amariYellow"}>
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  {[...Array(totalPages).keys()].map((el) => (
                    <li class="page-item">
                      {/* eslint-disable-next-line */}
                      <a onClick={() => setPage(el + 1)} key={el} className={`page ${page === el + 1 ? "active" : ""} page-link is-amariYellow`} href="#">
                        {el + 1}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    {/* eslint-disable-next-line */}
                    <a aria-label="Next" href="#" onClick={nextPage} className={"page-link is-amariYellow"}>
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="items container">
              <div class="row">
                {backgrounds.slice(firstContentIndex, lastContentIndex)?.map((el) => (
                  <ImageItem item={el} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}

const ImageItem = (el) => {
  const downloadImage = () => {
    saveAs(el.item.url, "download.png") // Put your image url here.
  }

  return (
    <div className="col-4 centerit itemthing">
      <p className="h5">{el.item.name}</p>
      <img onClick={downloadImage} alt={el.item.name} src={el.item.url}></img>
    </div>
  )
}

export default Backgrounds
