import React from 'react';
import {connect} from 'react-redux';

import "./index.css";
import WrappedMap from '../WrappedMap';
import ListButton from '../ListButton';
// import {render} from '@testing-library/react';
import AddressPanel from '../AddressPanel';
import {setMapCenter} from '../../actions/WrappedMapAction';
import {createPlacemarkStorage} from '../../actions/MapAndPanelAction';
import {createImgsArr} from '../../actions/InfoPanelAction';
import {createLinksObj} from '../../actions/createLinksObj';
import InfoPanel from '../InfoPanel';
import {fillingInfoPanel} from "../functions";
// import Portal from '../Portal';

import {
BrowserRouter as Router,
Route,
} from "react-router-dom";


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
      e.preventDefault();

      let elem = document.getElementById("infoPanel");
      let dataId = (target.closest(".toInfoPanel") !== null) ? target.closest(".toInfoPanel").dataset.id : target.dataset.id;
      const data = this.props.dataPlace;

      for (let place in data) {
        let storeInfo = data[place];

        if (storeInfo.id === +dataId) {
          window.history.pushState(null, null, `${place}-Panel-${dataId}`);

          fillingInfoPanel(storeInfo, place, elem, this.props);

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
      imgsForInfoPanel,
      linksForInfoPanel,
      createImgsArr,
      createLinksObj
    } = this.props;

    return (
      <Router>
        <Route path="/">
          <div className="App" onClick={this.createInfoPanel}>
            <ListButton />
            <AddressPanel
              dataPlace={dataPlace}
              setMapCenterAction={setMapCenterAction}
              stateForMap={stateForMap}
              placemarkStorage={placemarkStorage}
              createPlacemarkStorage={createPlacemarkStorage}
            />
            <WrappedMap
              dataPlace={dataPlace}
              setMapCenterAction={setMapCenterAction}
              stateForMap={stateForMap}
              placemarkStorage={placemarkStorage}
              createPlacemarkStorage={createPlacemarkStorage}
            />
            <InfoPanel
              dataPlace={dataPlace}
              setMapCenterAction={setMapCenterAction}
              createImgsArr={createImgsArr}
              createLinksObj={createLinksObj}
              imgsForInfoPanel={imgsForInfoPanel}
              linksForInfoPanel={linksForInfoPanel}
              createPlacemarkStorage={createPlacemarkStorage}
            />
            {/* <Portal
              dataPlace={dataPlace}
            /> */}
          </div>
        </Route>
      </Router>
    );
  }
}

function mapStateToProps(store) {
  return {
    dataPlace: store.dataPlace,
    stateForMap: store.stateForMap,
    placemarkStorage: store.placemarkStorage,
    imgsForInfoPanel: store.imgsForInfoPanel,
    linksForInfoPanel: store.linksForInfoPanel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMapCenterAction: (coord) => dispatch(setMapCenter(coord)),
    createPlacemarkStorage: (arr) => dispatch(createPlacemarkStorage(arr)),
    createImgsArr: (arr) => dispatch(createImgsArr(arr)),
    createLinksObj: (obj) => dispatch(createLinksObj(obj)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
