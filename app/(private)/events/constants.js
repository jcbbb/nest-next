import { gql } from "@apollo/client"

export const GET_EVENTS = gql`query GetEvents($input: FilterEventInput!) {
  events(filterEventInput:$input) {
    id,
    title,
    description
  }
}`

export const GET_LOCATIONS = gql`query GetLocations {
  locations {
    name,
    id,
    address
  }
}`

export const CREATE_EVENT = gql`mutation CreateEvent($input: CreateEventInput!) {
  createEvent(createEventInput: $input) {
    id,
    title,
    description
  }
}`

export const GET_EVENT = gql`query GetEvent($id: Int!) {
  event (id: $id) {
    start_at,
    end_at,
    participants {
      id,
      username
    }
  }
}`

export const PARTICIPANTS_SUBSCRIPTION = gql`subscription OnParticipantAdded($id: Int!) {
  participantAdded(event: $id) {
    id,
    username
  }
}`

export const DELETE_EVENT = gql`mutation RemoveEvent($id: Int!) {
  removeEvent(id: $id) {
    id
  }
}`

export const UPDATE_EVENT = gql`mutation UpdateEvent($input: UpdateEventInput!) {
  updateEvent(updateEventInput: $input) {
    id,
    title,
    description,
    start_at,
    end_at,
    location {
      id
    }
  }
}`
