import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";

export const VehicleDetail = () => {
    const params = useParams();
    const { store, dispatch } = useGlobalReducer();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        // const _vehicle = store.vehicles.find((_v) => _v.id === params.vehicleId);
        // setVehicle(_vehicle);

        const fetchVehicleDetails = async () => {
            const vehicleId = params.vehicleId;
            const response = await fetch(
                `https://www.swapi.tech/api/vehicles/${vehicleId}`
            );
            const data = await response.json();
            const vehicleData = data.result

            setVehicle({
                ...vehicleData,
                Id: vehicleId,
            });
        };

        fetchVehicleDetails();
    }, [])

return (
    <div className="container mt-5">
        <div className="row align-items-center">
            {/* Left side: Vehicle image */}
            <div className="col-md-6">
                <img
                    src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${params.vehicleId}.jpg`}
                    alt={vehicle?.properties.name}
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
            </div>

            {/* Right side: Name & Description */}
            <div className="col-md-6">
                <h1>{vehicle?.properties.name}</h1>
                <p className="lead">{vehicle?.description}</p>
            </div>
        </div>

        {/* Red divider */}
        <hr className="border-top border-danger my-4" />

        {/* Stats row */}
        <div className="row text-center">
            <div className="col">
                <h5 className="text-danger">Model</h5>
                <p>{vehicle?.properties.model}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Manufacturer</h5>
                <p>{vehicle?.properties.manufacturer}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Vehicle Class</h5>
                <p>{vehicle?.properties.vehicle_class}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Crew</h5>
                <p>{vehicle?.properties.crew}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Passengers</h5>
                <p>{vehicle?.properties.passengers}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Max Speed</h5>
                <p>{vehicle?.properties.max_atmosphering_speed}</p>
            </div>
        </div>
    </div>
    );
};