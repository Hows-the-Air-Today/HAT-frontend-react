import React, { useEffect } from "react";
import { TiLocation } from "react-icons/ti";

import { useRecoilState } from "recoil";

import { transCoord } from "api/coord";
import { fetchAddress } from "api/location";
import { BaeminJuaFont } from "components/UI/atoms/font/BaeminJuaFont";
import { TextLoading } from "components/UI/atoms/TextLoading";
import { addressState, locationState, tmCoordState } from "stores/stores";

const Location: React.FC = () => {
  const [location, setLocation] = useRecoilState(locationState);
  const [tmCoord, setTmCoord] = useRecoilState(tmCoordState);
  const [address, setAddress] = useRecoilState(addressState);

  const handleLocationSuccess = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    const fetchedTransCoord = await transCoord(latitude, longitude);
    const fetchedAddress = await fetchAddress(latitude, longitude);

    setLocation({ latitude, longitude });
    setTmCoord(fetchedTransCoord);
    setAddress(fetchedAddress);
  };

  console.log(address);
  console.log(location);
  console.log(tmCoord);

  const handleLocationError = (error: GeolocationPositionError) => {
    setAddress("Unable to get location");
    console.error("Error getting location:", error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError
      );
    } else {
      setAddress("Geolocation not supported");
    }
  }, []);

  return (
    <BaeminJuaFont>
      <div>
        {address ? (
          <div className="flex items-center justify-center text-lg whitespace-normal break-words">
            <TiLocation className="flex mr-2" />
            {address.region2depthName} {address.region3depthName}
          </div>
        ) : (
          <TextLoading />
        )}
      </div>
    </BaeminJuaFont>
  );
};

export default Location;
