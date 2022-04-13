import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles.js";

import logoFooter from "../assets/img/Seafreshing.png";

const Footers = () => {
  return (
    <Box>
      <Container>
        <Row>
          <Column>
            <img alt="" src={logoFooter} />
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms and Condition</FooterLink>
          </Column>
          <Column>
            <Heading>Costumer Services</Heading>
            <FooterLink href="#">Help</FooterLink>
            <FooterLink href="#">Payment Methods</FooterLink>
            <FooterLink href="#">Free Shipping</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
          </Column>
          <Column>
            <Heading>Follow Us</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-linkedin">
                <span style={{ marginLeft: "10px" }}>
                  LinkedIn
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column>
            <Heading>App Download</Heading>
            <FooterLink href="#">Barcode</FooterLink>
            <FooterLink href="#">Playstore</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};

export default Footers;