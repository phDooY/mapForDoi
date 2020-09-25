import React from "react";

import {Placemark} from 'react-yandex-maps';

export function placemarkManager(arr, places) {
  for (let place in places) {
    let storeInfo = places[place];
    arr.push(
      <Placemark
        modules={["geoObject.addon.balloon"]}
        key={storeInfo.id}
        geometry={storeInfo.coordinates}
        properties={{
          iconCaption: place,
          balloonContentHeader: `<a class="toInfoPanel" href="#" data-id=${storeInfo.id}>${place}<br />
          <img src=${storeInfo.img_100x100} /></a>`,
          balloonContentBody: storeInfo.description,
          balloonContentFooter: `${storeInfo.address}<br /><b>${storeInfo.openingHours}</b>`,
        }}
      />
    )
  }
};