import React from 'react';
import {connect} from 'react-redux';

import "./index.css";
import WrappedMap from '../WrappedMap';
import ListButton from '../ListButton';
import {render} from '@testing-library/react';
import AddressPanel from '../AddressPanel';
import {setMapCenter} from '../../actions/WrappedMapAction';


class App extends React.Component {
  render() {
    const {
      dataPlace,
      setMapCenterAction,
      stateForMap
    } = this.props;

    return (
      <div className="App">
        <ListButton />
        <AddressPanel
          dataPlace={dataPlace}
          setMapCenter={setMapCenterAction}
          stateForMap={stateForMap}
        />
        <WrappedMap
          dataPlace={dataPlace}
          setMapCenter={setMapCenterAction}
          stateForMap={stateForMap}
        />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    dataPlace: store.dataPlace,
    stateForMap: store.stateForMap,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMapCenterAction: (coord) => dispatch(setMapCenter(coord)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
