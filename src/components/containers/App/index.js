import React from 'react';
import {connect} from 'react-redux';

import "./index.css";
import WrappedMap from '../../WrappedMap';
import ListButton from '../../ListButton';
import {render} from '@testing-library/react';
import AddressPanel from '../../AddressPanel';


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ListButton />
        <AddressPanel />
        <WrappedMap />
      </div>
    );
  }
}

export default App;
