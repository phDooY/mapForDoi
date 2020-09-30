import React from "react";
import {Carousel} from "react-bootstrap";
import "./index.css";

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }

    this.closeInfoPanel = this.closeInfoPanel.bind(this);
  }
  // такаяже функция в компоненте AddressPanal. Может, как-то расшарить её?
  closeInfoPanel() {
    const sidebar = document.getElementById("infoPanel");

    sidebar.classList.remove("active");
  }

  render() {
    const {
      imgsForInfoPanel,
      linksForInfoPanel,
    } = this.props;

    return (
      <div id="infoPanel" className="infoWrapper">
        <div
          className="dismiss"
          onClick={this.closeInfoPanel}
        >
          <img
            src="./img/svg/navIcons/closeIcon.svg"
            alt="закрыть информационную панель"
          />
        </div>
        <div
            id="links"
          >
            {Object.entries(linksForInfoPanel).map((item, index) => (
              <a
                key={index}
                href={item[1]}
                className="socialIcon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`./img/svg/socialNetworks/${item[0]}.svg`}
                  alt={`ссылка на ${item[0]}`}
                />
              </a>
            ))
            }
          </div>
        <figure>

        <Carousel
          interval={60 * 1000}
          controls={(imgsForInfoPanel.length === 1) ? false : true}
          indicators={(imgsForInfoPanel.length === 1) ? false : true}
        >
          {imgsForInfoPanel.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                id="imgForPanel"
                src={item}
                alt="store"
              />
            </Carousel.Item>
          ))
          }
          </Carousel>
          <figcaption>
          <address
            id="addressForPanel"
            hidden
          >
            address 12 3232 5545
          </address>
            <h1 id="nameForPanel">Name</h1>
            <h3 id="openingHoursForPanel">openingHours</h3>
          </figcaption>
        </figure>

        <p id="descriptionForPanel">
          Description Description Description Description Description Description Description Description Description DescriptionDescription Description Description Description DescriptionDescription Description Description Description DescriptionDescription Description Description Description DescriptionDescription Description Description Description DescriptionDescription Description Description Description DescriptionDescription Description Description Description Description
        </p>
      </div>
    )
  }
}

export default InfoPanel;
