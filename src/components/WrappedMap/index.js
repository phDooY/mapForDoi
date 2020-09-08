import React from "react";
import {YMaps, Map, Placemark, GeoObject} from 'react-yandex-maps';
import {connect} from 'react-redux';

import "./index.css";

class WrappedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPlacemark: [],
      userCoor: [],
      errorCoor: "",
      forMapState: false,
      coorForMapState: [],
    }

    this.placeMarking = this.placeMarking.bind(this);
    this.locate = this.locate.bind(this);
    this.gotPos = this.gotPos.bind(this);
    this.posFail = this.posFail.bind(this);
  }

  placeMarking() {
    const places = this.props.dataPlace;
    let key = 0;
    let arr = [];

    for (let place in places) {
      arr.push(
        <Placemark
          key={++key}
          geometry={places[place]}
          properties={{iconCaption: place}}
        />
      )
    }
    this.setState({listOfPlacemark: arr});
  }

  locate() {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0

      }
      // console.log(this)
      navigator.geolocation.watchPosition(this.gotPos, this.posFail, options);

    } else {
      alert("Your browser too old and doesn't support geolocation");
    }
  }

  gotPos(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // console.log(`${lat}, ${lng}`);
    if (!this.state.forMapState) {
      this.setState({coorForMapState: [lat, lng]});
    }

    this.setState({userCoor: [lat, lng],
    forMapState: true});
  }

  posFail(err) {
    // console.log(`${err.name}, ${err.message}`);
    this.setState({errorCoor: err.name});
  }

  componentDidMount() {
    this.placeMarking();
    this.locate();
  }

  render() {
    const {
      listOfPlacemark,
      userCoor,
      errorCoor,
      forMapState,
      coorForMapState,
    } = this.state;

    return (
      <YMaps>
        <div>
          <Map
            className="Map"
            defaultState={{center: [55.75, 37.57], zoom: 10 }}
            state={forMapState ? {center: coorForMapState, zoom: 13} : {center: [55.75, 37.57], zoom: 10}}
          >
            {listOfPlacemark.map((item) => item)}
            {errorCoor
              ? alert("К сожалению, Ваша геолокация не определилась")
              : <GeoObject
                geometry={{
                  type: "Point",
                  coordinates: userCoor
                }}
                options={{
                  preset: 'islands#darkGreenCircleDotIcon',
                }}
                />
            }
          </Map>
        </div>
      </YMaps>
    )
  }
}

function mapStateToProps(store) {
  return {
    dataPlace: store.dataPlace,
  }
}

export default connect(mapStateToProps)(WrappedMap);
