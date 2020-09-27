import React from "react";
import {YMaps, Map, GeoObject, Clusterer} from 'react-yandex-maps';

import {placemarkManager} from "../functions";

import "./index.css";

class WrappedMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCoor: [],
      errorCoor: "",
      isUserLocationOn: false,
      coorForMapState: [],
    }

    this.placeMarking = this.placeMarking.bind(this);
    this.locate = this.locate.bind(this);
    this.gotPos = this.gotPos.bind(this);
    this.posFail = this.posFail.bind(this);
  }

  placeMarking() {
    const places = this.props.dataPlace;
    let arr = [];

    placemarkManager(arr, places);

    this.props.createPlacemarkStorage(arr);
  }

  locate() {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
      navigator.geolocation.watchPosition(this.gotPos, this.posFail, options);

    } else {
      alert("Your browser too old and doesn't support geolocation");
    }
  }

  gotPos(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    // console.log(`${lat}, ${lng}`);
    if (!this.state.isUserLocationOn) {
      this.setState({coorForMapState: [lat, lng]});
      this.props.setMapCenter(this.state.coorForMapState);
    }

    this.setState({
      userCoor: [lat, lng],
      isUserLocationOn: true,
    });
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
      userCoor,
      errorCoor,
      // isUserLocationOn,
      // coorForMapState,
    } = this.state;
    return (
      <YMaps>
        <div>
          <Map
            modules={["control.ZoomControl", "control.FullscreenControl"]}
            className="Map"
            defaultState={{center: [55.75, 37.57], zoom: 10 }}
            state={this.props.stateForMap}
          >
            <Clusterer
            options={{
              groupByCoordinates: false,
              clusterHideIconOnBalloonOpen: false,
              geoObjectHideIconOnBalloonOpen: false,
              minClusterSize: 3,
              zoomMargin: 100,
            }}
            >
              {this.props.placemarkStorage.map((item) => item)}
            </Clusterer>
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

// function mapStateToProps(store) {
//   return {
//     dataPlace: store.dataPlace,
//   }
// }

// export default connect(mapStateToProps)(WrappedMap);

export default WrappedMap;
