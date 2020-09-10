import React from "react";
import {Button} from 'react-bootstrap';
import "./index.css";

class ListButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.showList = this.showList.bind(this);
  }

  showList() {
    const sidebar = document.getElementById("sidebar");

    sidebar.classList.add("active");
  }

  render() {
    return (
      <Button
        variant="primary"
        onClick={this.showList}>
        Список адресов
      </Button>
    )
  }
}

export default ListButton;
