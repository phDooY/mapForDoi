import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.elem = document.createElement("div");
  }


  componentDidMount() {
    document.body.appendChild(this.elem);
  }

  componentWillUnmount() {
    document.body.removeChild(this.elem);
  }

  render() {
    return (
      ReactDOM.createPortal(this.props.children, this.elem,)
    )
  }
}

export default Portal;
