import React from "react";
import {Placemark} from 'react-yandex-maps';
import {ListGroup} from 'react-bootstrap';
import {placemarkManager} from "../functions";

import "./index.css";
import InputForSearch from "../InputForSearch";

class AddressPanal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listPlace: [],
      isActiveLi: false,
    }

    this.createListPlace = this.createListPlace.bind(this);
    this.closeList = this.closeList.bind(this);
    this.focusOnPlace = this.focusOnPlace.bind(this);
  }

  createListPlace() {
    let arr = [];
    let places = this.props.dataPlace;

    for (let place in places) {
      let storeInfo = places[place];
      arr.push(
      <li
        key={storeInfo.id}
        className="list-group-item list-group-item-primary"
        data-coord={storeInfo.coordinates}
        data-key={storeInfo.id}
        data-caption={place}
        data-address={storeInfo.address}
        data-openinghours={storeInfo.openingHours}
        data-description={storeInfo.description}
        data-img_100x100={storeInfo.img_100x100}
      >
        <p>{place}</p>
        <p>{storeInfo.address}</p>
      </li>
      )
    }

    arr.sort((a, b) => {
      if (a.props["data-caption"].toLowerCase() < b.props["data-caption"].toLowerCase()) {
        return -1;
      }
      if (a.props["data-caption"].toLowerCase() > b.props["data-caption"].toLowerCase()) {
        return 1;
      }

      return 0;
    })

    this.setState({listPlace: arr});
  }

  closeList() {
    const sidebar = document.getElementById("sidebar");

    sidebar.classList.remove("active");
  }

  focusOnPlace(event) {
    const target = event.target.closest("li");

    if (target.classList.contains("active")) {
      this.setState({isActiveLi: false});
      target.classList.remove("active");

      const places = this.props.dataPlace;
      let arr = [];

      placemarkManager(arr, places);

      this.props.createPlacemarkStorage(arr);

      return;
    }

    if (this.state.isActiveLi) {
      const activeLi = document.querySelector("li.active");
      activeLi.classList.remove("active");
    }

    this.setState({isActiveLi: true})

    const key = target.dataset.key;
    const caption = target.dataset.caption;
    const address = target.dataset.address;
    const openingHours = target.dataset.openinghours;
    const description = target.dataset.description;
    const img_100x100 = target.dataset.img_100x100;

    let coord = target.dataset.coord;
    coord = coord.split(",");

    this.props.setMapCenter(coord);

    target.classList.add("active");

    this.props.createPlacemarkStorage([
      <Placemark
        modules={["geoObject.addon.balloon"]}
        key={key}
        geometry={coord}
        properties={{
          iconCaption: caption,
          balloonContentHeader: `<a class="toInfoPanel" href="#" data-id=${key}>${caption}<br /><img src=${img_100x100} /></a>`,
          balloonContentBody: description,
          balloonContentFooter: `${address}<br /><b>${openingHours}</b>`,
        }}
      />
    ])

  }

  componentDidMount() {
    this.createListPlace();
  }

  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div
            className="dismiss"
            onClick={this.closeList}
          >
            <img
              src="./img/svg/navIcons/arrowLeft.svg"
              alt="закрыть панель адресов"
            />
          </div>
          <div className="sidebar-header">
            <h3>Список адресов</h3>
          </div>

          <InputForSearch />

          <ListGroup
            id="addressListGroup"
            onMouseDown={this.focusOnPlace}
          >
            {this.state.listPlace.map((item) => item)}
          </ListGroup>
        </nav>
      </div>
    )
  }
}

export default AddressPanal;
