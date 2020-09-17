import React from 'react';
import {connect} from 'react-redux';

import "./index.css";
import WrappedMap from '../WrappedMap';
import ListButton from '../ListButton';
// import {render} from '@testing-library/react';
import AddressPanel from '../AddressPanel';
import {setMapCenter} from '../../actions/WrappedMapAction';
import {createPlacemarkStorage} from '../../actions/MapAndPanelAction';
// import Portal from '../Portal';


class App extends React.Component {
  render() {
    const {
      dataPlace,
      setMapCenterAction,
      stateForMap,
      placemarkStorage,
      createPlacemarkStorage,
    } = this.props;

    return (
      <div className="App">
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
