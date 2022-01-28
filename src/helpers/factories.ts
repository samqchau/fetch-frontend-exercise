import { IState } from "../interfaces/userTypes"

export function stateFactory (name: string, abbreviation: string): IState {
  return {name, abbreviation}
}

export function userFactory (name: string, email: string, password: string, occupation: string, state: string) {
  return { name, email, password, occupation, state }
}