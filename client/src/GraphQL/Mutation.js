import { gql } from "@apollo/client";

 export const CREATE_PERSON_MUTATION = gql`
    mutation addPerson( 
        $id: String!,
        $firstName: String!, 
        $lastName: String! ) 
        {
        addPerson(
            id: $id, 
            firstName: $firstName, 
            lastName: $lastName 
            ) {
            id 
            firstName
            lastName
        }
    }

`
export const CREATE_CAR_MUTATION = gql`
    mutation addCar(
        $id: String!,
        $year: String!,
        $make: String!,
        $model: String!,
        $price: String!,
        $personId: Int!
        ) {
        addCar(
            id: $id,
            year: $year,
            make: $make,
            model: $model,
            price: $price,
            personId: $personId
            ) {
            id
            year
            make
            model
            price
            personId
            }
        }`

export const UPDATE_PERSON_MUTATION = gql`
    mutation updatePerson(
        $id: String!,
        $firstName: String,
        $lastName: String
        ) {
        updatePerson(
            id: $id,
            firstName: $firstName,
            lastName: $lastName
            ) {
            id
            firstName
            lastName
            }
        }`

export const UPDATE_CAR_MUTATION = gql`
    mutation updateCar(
        $id: String!,
        $year: String,
        $make: String,
        $model: String,
        $price: String,
        $personId: Int
        ) {
        updateCar(
            id: $id,
            year: $year,
            make: $make,
            model: $model,
            price: $price,
            personId: $personId
            ) {
            id
            year
            make
            model
            price
            personId
            }
        }`

export const DELETE_PERSON_MUTATION = gql`
    mutation removePerson(
        $id: String!
        ) {
        removePerson(
            id: $id
            ) {
            id
            firstName
            lastName
            }
        }`

export const DELETE_CAR_MUTATION = gql`
    mutation removeCar(
        $id: String!
        ) {
        removeCar(
            id: $id
            ) {
            id
            year
            make
            model
            price
            personId
            }
        }`





export default { CREATE_PERSON_MUTATION, CREATE_CAR_MUTATION, UPDATE_PERSON_MUTATION, UPDATE_CAR_MUTATION, DELETE_PERSON_MUTATION, DELETE_CAR_MUTATION }