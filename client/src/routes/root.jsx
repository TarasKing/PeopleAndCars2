import React, {useEffect, useState} from "react";
import { Outlet, Link } from "react-router-dom";
import { people, cars } from "../GraphQL/Queries"
import {useQuery, gql, useMutation } from '@apollo/client'
import  CarComponent  from "../components/Car";
import { CREATE_PERSON_MUTATION, CREATE_CAR_MUTATION, UPDATE_PERSON_MUTATION, UPDATE_CAR_MUTATION, DELETE_PERSON_MUTATION, DELETE_CAR_MUTATION } from "../GraphQL/Mutation";






export default function Root() {

    const { error, loading, data } = useQuery(people);
   
    const [peopleData, setPeopleData] = useState([])
    const [carsData, setCarsData] = useState([])
    const [formPersonState, setFormPersonState] = useState({
        id: "",
        firstName: '',
        lastName: ''
    });
    const [formCarState, setFormCarState] = useState({
        id: "",
        year: '',
        make: '',
        model: '',
        price: '',
        personId: ''
    })
    
    const [addPerson] = useMutation(CREATE_PERSON_MUTATION, {
        variables: {
            id: new Date(),
            firstName: formPersonState.firstName,
            lastName: formPersonState.lastName
        }
    });
    const [addCar] = useMutation(CREATE_CAR_MUTATION, {
        variables: {
            id: new Date().getTime(),
            year: formCarState.year,
            make: formCarState.make,
            model: formCarState.model,
            price: formCarState.price,
            personId: formCarState.personId
        }
    });
    const [updatePerson] = useMutation(UPDATE_PERSON_MUTATION, {
        variables: {
            id: formPersonState.id,
            firstName: formPersonState.firstName,
            lastName: formPersonState.lastName
        }
    });
    const [updateCar] = useMutation(UPDATE_CAR_MUTATION, {
        variables: {
            id: formCarState.id,
            year: formCarState.year,
            make: formCarState.make,
            model: formCarState.model,
            price: formCarState.price,
            personId: formCarState.personId
        }
    });
    const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
        variables: {
            id: formPersonState.id
        }
    });
    const [deleteCar] = useMutation(DELETE_CAR_MUTATION, {
        variables: {
            id: formCarState.id
        }
    });


        useEffect(() => {
        if (data) {
            setPeopleData(data?.people)
        }
    }, [data, peopleData, carsData])

    console.log(peopleData)

    useEffect( () => {
        if (data) {
            setCarsData( data.cars)
        }
        
    }, [data, carsData, peopleData])
    console.log(carsData)

 


    return ( <>
            <div id="header-container" className="container">
                <h1>People and their cars</h1>
                <div>
                    {/* add person form */}
                <form id="add-person-form"
                onSubmit={(e) => {
                    addPerson();
                }}>
                        <div>Add person</div>

                        <input
                            id="first-name-input"
                            aria-label="First Name"
                            placeholder="First Name"
                            name="first-name-input"
                            onChange={(e) =>
                            setFormPersonState({
                            ...formPersonState,
                            firstName: e.target.value
                            })
                         }
                         />
                        <input
                            id="last-name-input"
                            aria-label="Last Name"
                            placeholder="Last Name"
                            name="last-name-input"
                            onChange={(e) =>
                            setFormPersonState({
                            ...formPersonState,
                            lastName: e.target.value
                            })
                         }
                        />

                        <button type="submit">Add person</button>
                </form>
                
                    {/* add car form  */}
                <form id="add-car-form"
                    onSubmit={(e) => {
                    addCar();
                }}
                >
                        <div>Add Car</div>
                        <input
                            id="year"
                            aria-label="Year"
                            placeholder="Year"
                        name="year"
                        onChange={(e) =>
                            setFormCarState({
                            ...formCarState,
                            year: e.target.value
                            })
                         }
                        />
                        <input
                            id="make"
                            aria-label="Make"
                            placeholder="Make"
                        name="make"
                        onChange={(e) =>
                            setFormCarState({
                                ...formCarState,
                                make: e.target.value
                            })
                            }
                        />
                        <input
                            id="model"
                            aria-label="Model"
                            placeholder="Model"
                        name="model"
                        onChange={(e) =>
                            setFormCarState({
                                ...formCarState,
                                model: e.target.value
                            })
                            }
                        />
                        <input
                            id="price"
                            aria-label="Price"
                            placeholder="Price"
                        name="price"
                        onChange={(e) =>
                            setFormCarState({
                                ...formCarState,
                                price: e.target.value
                            })
                            }
                        />
                    <select placeholder="select a person"
                        defaultValue={0}
                        onChange={(e) => setFormCarState({...formCarState, personId: e.target.value})}>
                            <option value={0}>Select a person</option>
                            {peopleData && peopleData.map((person) => (
                                <option key={person.id} value={person.id}>{person.firstName} {person.lastName}</option>
                            ))}
                    </select>
                    
                        <button type="submit">Add car</button>
                    </form>
                </div>
                <div className="list-container">
                    {
                         peopleData.map((person) =>
                        (
                            <div className="person" key={person.id}>
                                <div className="person-name">{person.firstName} {person.lastName}
                                     <button onClick={()=>updatePerson()}>Edit</button>
                                        <button onClick={() => deletePerson()}>Delete</button>   
                                 </div>
                                 {
                                     carsData.forEach( async (car) => {
                                         if (car.personId === person.id) {
                                             return (
                                                 <CarComponent car={car} person={person} updateCar={updateCar} deleteCar={ deleteCar} />
                                             )
                                         }
                                     }
                                     )}  
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </> 
    )
}