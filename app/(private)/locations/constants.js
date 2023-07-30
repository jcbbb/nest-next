import { gql } from "@apollo/client"

export const GET_LOCATION = gql`query GetLocation($id: Int!) {
  location(id: $id) {
    id,
    name,
    address
  }
}`

export const UPDATE_LOCATION = gql`mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(updateLocationInput: $input) {
    id,
    name,
    address
  }
}`

export const DELETE_LOCATION = gql`mutation RemoveLocation($id: Int!) {
  removeLocation(id: $id) {
    id
  }
}`

export const GET_LOCATIONS = gql`query GetLocations {
  locations {
    id,
    name,
    address,
    status
  }
}`

export const STATUSES = {
  "processing": "bg-yellow-50 text-yellow-700",
  "active": "bg-green-50 text-green-700"
}

export const CREATE_LOCATION = gql`mutation CreateLocation($input: CreateLocationInput!) {
  createLocation(createLocationInput: $input) {
    id,
    name,
    address,
    status
  }
}`
