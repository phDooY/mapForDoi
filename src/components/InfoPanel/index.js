import React from "react";
import {Carousel} from "react-bootstrap";
import {fillingInfoPanel, closePanel, placemarkManager} from "../functions";

import "./index.css";

class InfoPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }

    this.checkingURL = this.checkingURL.bind(this);
  }

  checkingURL() {
    let pathname = window.location.pathname.split("-");

    if (pathname[1] !== "Panel") {
      return
    }

    pathname = pathname[2];

    if (pathname) {
      const dataArr = Object.entries(this.props.dataPlace);
      const data = dataArr[+pathname - 1];
      const elem = document.getElementById("infoPanel")

      fillingInfoPanel(data[1], data[0], elem, this.props)

      let arr = [];
      const places = this.props.dataPlace;
      placemarkManager(arr, places, data[0])

      this.props.createPlacemarkStorage(arr);
    }
  }

  componentDidMount() {
    this.checkingURL();
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
          onClick={() => closePanel("infoPanel")}
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
