import React from "react";
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
    return (
      <div id="infoPanel" className="infoWrapper">
        <div
          className="dismiss"
          onClick={this.closeInfoPanel}
        >
          <svg width="32px" height="32px" viewBox="0 0 352 512" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </div>
        <figure>

          <img id="imgForPanel" src="./img/jpg/Doi.jpg" alt="store" />
          <figcaption>
          <address id="addressForPanel">address 12 3232 5545</address>
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
