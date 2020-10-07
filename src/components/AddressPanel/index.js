import React from "react";
import {Placemark} from 'react-yandex-maps';
import {ListGroup} from 'react-bootstrap';
import {
  placemarkManager,
  closePanel,
  binarySearch,
  showList,
} from "../functions";
import {Link} from "react-router-dom";

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
    this.focusOnPlace = this.focusOnPlace.bind(this);
    this.chackingURL = this.chackingURL.bind(this);
  }

  createListPlace() {
    let arr = [];
    let places = this.props.dataPlace;

    for (let place in places) {
      let storeInfo = places[place];
      arr.push(
      <Link
        to={`${place}-Address-${storeInfo.id}`}
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
      </Link>
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

  focusOnPlace(event) {
    const target = event.target.closest("a");

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
      const activeLi = document.querySelector("a.active");
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

    this.props.setMapCenterAction(coord);

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

  chackingURL() {
    let pathname = window.location.pathname.split("-");

    if (pathname[1] !== "Address") {
      return
    }

    pathname = pathname[2];

    if (pathname) {
      this.setState({isActiveLi: true});

      let data = Object.entries(this.props.dataPlace);
      data = data[+pathname - 1];
      const dataObj = data[1];

      this.props.createPlacemarkStorage([
        <Placemark
          modules={["geoObject.addon.balloon"]}
          key={dataObj.id}
          geometry={dataObj.coordinates}
          properties={{
            iconCaption: data[0],
            balloonContentHeader: `<a class="toInfoPanel" href="#" data-id=${dataObj.id}>${data[0]}<br /><img src=${dataObj.img_100x100} /></a>`,
            balloonContentBody: dataObj.description,
            balloonContentFooter: `${dataObj.address}<br /><b>${dataObj.openingHours}</b>`,
          }}
        />
      ]);

      this.props.setMapCenterAction(dataObj.coordinates);

      const linkArr = document.querySelectorAll("#addressListGroup a");

      const activeLinkPosition = binarySearch(linkArr, data[0]);

      linkArr[activeLinkPosition].classList.add("active");
      linkArr[activeLinkPosition].scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
      showList();
    }
  }

  componentDidMount() {
    (async () => {
      await this.createListPlace();
      await this.chackingURL();
    })();
  }

  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div
            className="dismiss"
            onClick={() => closePanel("sidebar")}
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
