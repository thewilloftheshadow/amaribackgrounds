import "bulma"
import { Helmet } from "react-helmet"
import TopNav from "../components/Navbar"
import Footer from "../components/Footer"
import axios from "axios"
import React from "react"
import usePagination from "../hooks/usePagination"
import { saveAs } from "file-saver"
import { Modal, Button, Container, Row } from "react-bootstrap"

const Backgrounds = ({ match, location }) => {
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

      <TopNav />

      <Container>
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
            <Container className="items">
              <Row>
                {backgrounds.slice(firstContentIndex, lastContentIndex)?.map((el) => (
                  <ImageItem item={el} />
                ))}
              </Row>
            </Container>
          </>
        )}
      </Container>

      <Footer />
    </div>
  )
}

const ImageItem = (el) => {
  const downloadImage = () => {
    saveAs(el.item.url, "download.png") // Put your image url here.
  }

  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className="col-12 col-md-6 col-lg-4 centerit itemthing pt-3">
      {/* <p className="h5">{el.item.title || el.item.name}</p> */}
      <img onClick={handleShow} alt={el.item.title || el.item.name} src={el.item.url}></img>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{el.item.title || el.item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body><img alt={el.item.title || el.item.name} src={el.item.url}></img></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={downloadImage}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Backgrounds
