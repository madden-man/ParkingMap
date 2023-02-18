/*
 * Copyright 2021 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import './App.css'

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const App: React.VFC = () => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const center = { lat: 39.7412549, lng: -104.9801503 };
  const zoom = 19.1;

  const onClick = (e: google.maps.MapMouseEvent) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    console.log("onIdle");

  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={'AIzaSyBoBAc_kzpoN2V0ycAqwVfUTRlU8jHIr1A'} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          mapTypeId="satellite"
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
};
interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();

  React.useEffect(() => {
    if (ref.current && !map) {
      const myMap = new google.maps.Map(ref.current, {});

      				// Define the LatLng coordinates for the polygon's path.
				const triangleCoords = [
					{ lat: 39.741443, lng: -104.981059 },
					{ lat: 39.741085, lng: -104.98105 },
					{ lat: 39.741099, lng: -104.980527 },
					{ lat: 39.741414, lng: -104.980535 },
				];

				const triangle2Coords = [
					{ lat: 39.741216, lng: -104.980473 },
					{ lat: 39.740822, lng: -104.980458 },
					{ lat: 39.74082, lng: -104.979962 },
					{ lat: 39.7412, lng: -104.979955 },
				];

				const triangle3Coords = [
					{ lat: 39.741608, lng: -104.979869 },
					{ lat: 39.741608, lng: -104.979381 },
					{ lat: 39.741299, lng: -104.979381 },
					{ lat: 39.741299, lng: -104.979869 },
				];

				// Construct the polygon.
				const bermudaTriangle = new google.maps.Polygon({
					paths: triangleCoords,
					strokeColor: "#598be2",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#598be2",
					fillOpacity: 0.35,
				});

				const triangle2 = new google.maps.Polygon({
					paths: triangle2Coords,
					strokeColor: "#598be2",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#598be2",
					fillOpacity: 0.35,
				});

				const triangle3 = new google.maps.Polygon({
					paths: triangle3Coords,
					strokeColor: "#598be2",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: "#598be2",
					fillOpacity: 0.35,
				});

				bermudaTriangle.setMap(myMap);
				triangle2.setMap(myMap);
				triangle3.setMap(myMap);

      setMap(myMap);
    }
  }, [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          // @ts-ignore
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

const deepCompareEqualsForMaps = createCustomEqual(
  (deepEqual) => (a: any, b: any) => {
    if (
      isLatLngLiteral(a) ||
      a instanceof google.maps.LatLng ||
      isLatLngLiteral(b) ||
      b instanceof google.maps.LatLng
    ) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
    }

    // TODO extend to other types

    // use fast-equals for other objects
    return deepEqual(a, b);
  }
);

function useDeepCompareMemoize(value: any) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

function useDeepCompareEffectForMaps(
  callback: React.EffectCallback,
  dependencies: any[]
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}


export {};

export default App;