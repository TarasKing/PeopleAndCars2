import { gql } from '@apollo/client'

export const people = gql`
    query {
        people {
            id
            firstName
            lastName
        },
        cars {
            id
            year
            make
            model
            price
            personId
        }
        
    }
`
export const cars = gql`
    query {
        cars {
            id
            year
            make
            model
            price
            personId
        }
    }
`