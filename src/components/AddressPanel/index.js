import React from "react";
import {connect} from 'react-redux';

import "./index.css";

class AddressPanal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listPlace: [],
    }
    this.createListPlace = this.createListPlace.bind(this);
    this.closeList = this.closeList.bind(this);
  }

  createListPlace() {
    let arr = [];
    let key = 0;

    for (let place in this.props.dataPlace) {
      arr.push(
      <li key={++key}>{place}</li>
      )
    }
    this.setState(this.state.listPlace = arr);
  }

  closeList() {
    const sidebar = document.getElementById("sidebar");

    sidebar.classList.remove("active");
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

          <ul className="list-unstyled components">
            {this.state.listPlace.map((item) => item)}
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    dataPlace: store.dataPlace,
  }
}

export default connect(mapStateToProps)(AddressPanal);