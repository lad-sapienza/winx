import * as React from "react";
import { Link, withPrefix } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const HeaderSection = ({ siteTitle }) => (
  <Header>
    <Container>
      <div className="d-sm-flex align-items-center text-center">
        <Link to={withPrefix("/")}>
          <StaticImage
            src="../images/winx-logo.png"
            width={200}
            quality={80}
            formats={["AUTO", "WEBP"]}
            alt={siteTitle}
            className="img-fluid my-3"
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
  margin-bottom: 3rem;

  
  h1,
  p {
    color: #000; /* Assicura che il testo sia leggibile sullo sfondo sabbia */
  }
`;

export default HeaderSection;
