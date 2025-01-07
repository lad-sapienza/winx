import * as React from "react";
import { Link, withPrefix } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const HeaderSection = ({ siteTitle }) => (
  <Header>
    <Container>
      <div className="d-sm-flex align-items-center text-center p-1">
        <Link to={withPrefix("/")}>
          <StaticImage
            src="../images/winx-logo.png"
            width={250}
            quality={80}
            formats={["AUTO", "WEBP"]}
            alt={siteTitle}
            className="img-fluid"
          />
        </Link>
        <div className="text-start ms-3">
          <h1>WinX</h1>
          <p className="lead">Women in ConteXt</p>
        </div>
      </div>
    </Container>
  </Header>
);

const Header = styled.header`
  background-color: #C2B280; /* Colore sabbia */
  color: #000; /* Colore del testo per garantire contrasto e leggibilità */
  margin-bottom: 5rem;

  .gatsby-image-wrapper {
    background-color: #C2B280; /* Mantiene il colore sabbia coerente */
    img {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  h1,
  p {
    color: #000; /* Assicura che il testo sia leggibile sullo sfondo sabbia */
  }
`;

export default HeaderSection;
