import React from "react";
import {Placemark} from 'react-yandex-maps';

import "./index.css";

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
      //Это продублированный код из метода placeMarking() компонента WrappedMap.
      //Было бы хорошо, как-то расшарить эту функцию для других компонентов.
      const places = this.props.dataPlace;
      let arr = [];

      for (let place in places) {
        let storeInfo = places[place];
        arr.push(
          <Placemark
            modules={["geoObject.addon.balloon"]}
            key={storeInfo.id}
            geometry={storeInfo.coordinates}
            properties={{
              iconCaption: place,
              balloonContentHeader: `${place}<br /><img src=${storeInfo.img_100x100} />`,
              balloonContentBody: storeInfo.description,
              balloonContentFooter: `${storeInfo.address}<br /><b>${storeInfo.openingHours}</b>`,
            }}
          />
        )
      }
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
          balloonContentHeader: `${caption}<br /><img src=${img_100x100} />`,
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
            id="dismiss"
            onClick={this.closeList}
          >
            <svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg"><path d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>
          </div>
          <div className="sidebar-header">
            <h3>Список адресов</h3>
          </div>

          <ul
            className="list-group"
            onMouseDown={this.focusOnPlace}
          >
            {this.state.listPlace.map((item) => item)}
          </ul>
        </nav>
      </div>
    )
  }
}

export default AddressPanal;
