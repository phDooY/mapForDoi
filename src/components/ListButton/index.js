import React from "react";
import {Button} from 'react-bootstrap';
import {showList} from "../functions";
import "./index.css";

function ListButton(props) {
    return (
      <Button
        variant="primary"
        onClick={showList}>
        Список адресов
      </Button>
    )
}

export default ListButton;
