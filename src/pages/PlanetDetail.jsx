import { useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useState } from "react"

export const PlanetDetail = () => {
    const params = useParams()
    const { store, dispatch } = useGlobalReducer()
    const [planet, setPlanet] = useState()
    useEffect(() => {
        //        const _planet = store.planets.find ((_p) => _p.id === params.planetId);
        //        setPlanet (_planet);
        
        const fetchPlanetDetails = async () => {
            const planetId = params.planetId;
            const response = await fetch(
                `https://www.swapi.tech/api/planets/${planetId}`
            );
            const data = await response.json();
            const planetData = data.result

            setPlanet({
                ...planetData,
                Id: planetId,
            });
        };

        fetchPlanetDetails();
    }, [])

return (
    <div className="container mt-5">
        <div className="row align-items-center">
            {/* Left side: Planet image */}
            <div className="col-md-6">
                <img
                    src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${params.planetId}.jpg`}
                    alt={planet?.properties.name}
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
            </div>

            {/* Right side: Name & Description */}
            <div className="col-md-6">
                <h1>{planet?.properties.name}</h1>
                <p className="lead">{planet?.description}</p>
            </div>
        </div>

        {/* Red divider */}
        <hr className="border-top border-danger my-4" />

        {/* Stats row */}
        <div className="row text-center">
            <div className="col">
                <h5 className="text-danger">Climate</h5>
                <p>{planet?.properties.climate}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Terrain</h5>
                <p>{planet?.properties.terrain}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Population</h5>
                <p>{planet?.properties.population}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Diameter</h5>
                <p>{planet?.properties.diameter}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Gravity</h5>
                <p>{planet?.properties.gravity}</p>
            </div>
            <div className="col">
                <h5 className="text-danger">Orbital Period</h5>
                <p>{planet?.properties.orbital_period}</p>
            </div>
        </div>
    </div>
);
};