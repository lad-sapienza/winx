import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"

const FooterSection = () => {
  return (
    <Footer>
      <Container>
        <div className="d-flex flex-row align-items-center mb-3">
          <div className="p-3">
            <Link to="/">
              <StaticImage
                src="../images/scms-lad.png"
                width={100}
                quality={80}
                formats={["AUTO", "WEBP"]}
                alt="LAD: Laboratorio di Archeologia Digitale alla Sapienza"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="p-3 border-start border-primary">
            <p className="p-s-3">
              <strong>Winx</strong> è un progetto sviluppato dal{" "}
              <a
                href="https://lad.saras.uniroma1.it"
                target="_blank"
                rel="noreferrer"
              >
                LAD: Laboratorio di Archeologia Digitale alla Sapienza
              </a> {" "}
              con il CMS open source <a href="https://github.com/lad-sapienza/scms" target="_blank" rel="noreferrer">s:CMS</a>.
            </p>
          </div>
        </div>
      </Container>
    </Footer>
  )
}

//style
const Footer = styled.footer`
  background-color: #ececec;
  border-top: #000 solid 0.5rem;
  min-height: auto;
  margin-top: 3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
`

export default FooterSection
