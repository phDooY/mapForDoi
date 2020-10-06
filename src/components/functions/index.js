import React from "react";

import {Placemark} from 'react-yandex-maps';

export function placemarkManager(arr, places, openBalloon) {
  for (let place in places) {
    if (openBalloon === place) {
      let storeInfo = places[place];
      arr.push(
        <Placemark
          modules={["geoObject.addon.balloon"]}
          key={storeInfo.id}
          geometry={storeInfo.coordinates}
          instanceRef={ref => {
            ref && ref.balloon.open();
          }}
          properties={{
            iconCaption: place,
            balloonContentHeader: `<a class="toInfoPanel" href=${place} data-id=${storeInfo.id}>${place}<br />
            <img src=${storeInfo.img_100x100} /></a>`,
            balloonContentBody: storeInfo.description,
            balloonContentFooter: `${storeInfo.address}<br /><b>${storeInfo.openingHours}</b>`,
          }}
        />
      )

      continue;
    }

    let storeInfo = places[place];
    arr.push(
      <Placemark
        modules={["geoObject.addon.balloon"]}
        key={storeInfo.id}
        geometry={storeInfo.coordinates}
        properties={{
          iconCaption: place,
          balloonContentHeader: `<a class="toInfoPanel" href=${place} data-id=${storeInfo.id}>${place}<br />
          <img src=${storeInfo.img_100x100} /></a>`,
          balloonContentBody: storeInfo.description,
          balloonContentFooter: `${storeInfo.address}<br /><b>${storeInfo.openingHours}</b>`,
        }}
      />
    )
  }
};

export function fillingInfoPanel(storeInfo, place, elem, props) {
  const addressForPanel = document.getElementById("addressForPanel");
  const nameForPanel = document.getElementById("nameForPanel");
  const openingHoursForPanel = document.getElementById("openingHoursForPanel");
  const descriptionForPanel = document.getElementById("descriptionForPanel");

  props.createImgsArr(storeInfo.img);
  props.createLinksObj(storeInfo.links);

  addressForPanel.textContent = `${storeInfo.address}`;
  nameForPanel.textContent = `${place}`;
  openingHoursForPanel.textContent = `${storeInfo.openingHours}`;
  descriptionForPanel.textContent = `${storeInfo.description}`;

  elem.classList.add("active");

  props.setMapCenterAction(storeInfo.coordinates);
}

export function closePanel(className) {
  const sidebar = document.getElementById(className);

  sidebar.classList.remove("active");
};

export function binarySearch(list, item) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    let mid = (low + high) / 2;
    mid = Math.floor(mid);
    let guess = list[mid];

    guess = guess.dataset.caption;

    if (guess === item) {
      return mid;
    } else if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
};

export function showList() {
  const sidebar = document.getElementById("sidebar");

  sidebar.classList.add("active");
};

