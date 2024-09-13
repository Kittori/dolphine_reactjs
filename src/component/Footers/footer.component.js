/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function Footer() {
    return (
        <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              <a>
                Welcome
              </a>
            </li>
            <li>
              <a
                
              >
                About Us
              </a>
            </li>
            <li>
              <a
              
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          <a
            href="https://www.invisionapp.com?ref=nukr-transparent-footer"
            target="_blank"
          >
            Vo Van Cuong
          </a>
          . Coded by{" "}
          <a
            href="https://www.creative-tim.com?ref=nukr-transparent-footer"
            target="_blank"
          >
            Le Nguyen Hoai An 
          </a>
          .
        </div>
      </Container>
    </footer>
    );
}

export default Footer;
