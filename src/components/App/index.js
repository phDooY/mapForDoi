import React from 'react';
import {connect} from 'react-redux';

import "./index.css";
import WrappedMap from '../WrappedMap';
import ListButton from '../ListButton';
// import {render} from '@testing-library/react';
import AddressPanel from '../AddressPanel';
import {setMapCenter} from '../../actions/WrappedMapAction';
import {createPlacemarkStorage} from '../../actions/MapAndPanelAction';
import InfoPanel from '../InfoPanel';
// import Portal from '../Portal';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }

    this.createInfoPanel = this.createInfoPanel.bind(this);
  }

  createInfoPanel(e) {
    let target = e.target;

    if (target.closest(".toInfoPanel") !== null || target.className === "toInfoPanel") {
      let elem = document.getElementById("infoPanel");
      let dataId = (target.closest(".toInfoPanel") !== null) ? target.closest(".toInfoPanel").dataset.id : target.dataset.id;
      const data = this.props.dataPlace;

      for (let place in data) {
        let storeInfo = data[place];

        if (storeInfo.id === +dataId) {
          const imgForPanel = document.getElementById("imgForPanel");
          const addressForPanel = document.getElementById("addressForPanel");
          const nameForPanel = document.getElementById("nameForPanel");
          const openingHoursForPanel = document.getElementById("openingHoursForPanel");
          const descriptionForPanel = document.getElementById("descriptionForPanel");

          imgForPanel.setAttribute("src", `${storeInfo.img}`);
          addressForPanel.textContent = `${storeInfo.address}`;
          nameForPanel.textContent = `${place}`;
          openingHoursForPanel.textContent = `${storeInfo.openingHours}`;
          descriptionForPanel.textContent = `${storeInfo.description}`;

          elem.classList.add("active");

          this.props.setMapCenterAction(storeInfo.coordinates);

          break;
        }
      }

    }

    return;
  }

  render() {
    const {
      dataPlace,
      setMapCenterAction,
      stateForMap,
      placemarkStorage,
      createPlacemarkStorage,
    } = this.props;

    return (
      <div className="App" onClick={this.createInfoPanel}>
        <ListButton />
        <AddressPanel
          dataPlace={dataPlace}
          setMapCenter={setMapCenterAction}
          stateForMap={stateForMap}
          placemarkStorage={placemarkStorage}
          createPlacemarkStorage={createPlacemarkStorage}
        />
        <WrappedMap
          dataPlace={dataPlace}
          setMapCenter={setMapCenterAction}
          stateForMap={stateForMap}
          placemarkStorage={placemarkStorage}
          createPlacemarkStorage={createPlacemarkStorage}
        />
        <InfoPanel />
        {/* <Portal
          dataPlace={dataPlace}
        /> */}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    dataPlace: store.dataPlace,
    stateForMap: store.stateForMap,
    placemarkStorage: store.placemarkStorage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMapCenterAction: (coord) => dispatch(setMapCenter(coord)),
    createPlacemarkStorage: (arr) => dispatch(createPlacemarkStorage(arr)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
