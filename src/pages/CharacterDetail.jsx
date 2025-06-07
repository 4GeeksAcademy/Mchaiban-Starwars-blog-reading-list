import { useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect, useState } from "react"

export const CharacterDetail = () => {
  const params = useParams()
  const { store, dispatch } = useGlobalReducer()
  const [character, setCharacter] = useState()
  useEffect(() => {
    // const _character = store.people.find ((_c) => {
    //     if (_c.id === params.characterId) {
    //         return true 
    //     }
    //     return false
    // })
    const fetchCharacterDetails = async () => {
      const characterId = params.characterId
      const response = await fetch(`https://www.swapi.tech/api/people/${characterId}`)
      const data = await response.json()
      const characterData = data.result
      
      setCharacter({
        ...characterData,
        Id:characterId
      })

    }
    fetchCharacterDetails ()

    // console.log(store.people); console.log(_character);
    // setCharacter(_character)
  }, [])

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${params.characterId}.jpg`}
            alt={character?.name}
            className="img-fluid rounded"
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
        </div>

        <div className="col-md-6">
          <h1>{character?.properties.name}</h1>
          <p className="lead">
            {character?.description}
          </p>
        </div>
      </div>

      {/* Red divider */}
      <hr className="border-top border-danger my-4" />

      {/* Stats row */}
      <div className="row text-center">
        <div className="col">
          <h5 className="text-danger">Name</h5>
          <p>{character?.properties.name}</p>
        </div>
        <div className="col">
          <h5 className="text-danger">Birth Year</h5>
          <p>{character?.properties.birth_year}</p>
        </div>
        <div className="col">
          <h5 className="text-danger">Gender</h5>
          <p>{character?.properties.gender}</p>
        </div>
        <div className="col">
          <h5 className="text-danger">Height</h5>
          <p>{character?.properties.height}</p>
        </div>
        <div className="col">
          <h5 className="text-danger">Skin Color</h5>
          <p>{character?.properties.skin_color}</p>
        </div>
        <div className="col">
          <h5 className="text-danger">Eye Color</h5>
          <p>{character?.properties.eye_color}</p>
        </div>
      </div>
    </div>
  );
};
