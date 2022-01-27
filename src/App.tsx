import React, { useState, useEffect } from 'react'
import Select, { SingleValue } from 'react-select'
import axios from 'axios'

const url = 'https://frontend-take-home.fetchrewards.com/form'

interface IState {
  name: string
  abbreviation: string
}

function App(): JSX.Element {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [occupation, setOccupation] = useState<SingleValue<string>>('')
  const [state, setState] = useState<SingleValue<IState> | null>(null)

  const [formOccupations, setFormOccupations] = useState<string[]>([])
  const [formStates, setFormStates] = useState<IState[]>([])
  const [formGetError, setFormGetError] = useState('')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value)
  }

  const handleOccupationChange = (newValue: SingleValue<string>): void => {
    setOccupation(newValue)
  }

  const handleStateChange = (newValue: SingleValue<IState>): void => {
    setState(newValue)
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  useEffect(() => {
    console.log(occupation)
  }, [occupation])

  useEffect(() => {
    async function fetchFormData(url: string): Promise<void> {
      try {
        const { data } = await axios.get(url)
        setFormOccupations(
          data.occupations.map((occupation: string) => {
            return { value: occupation, label: occupation }
          })
        )
        setFormStates(
          data.states.map((state: IState) => {
            return { value: state?.name, label: state?.name }
          })
        )
      } catch (error) {
        setFormGetError('There was an error fetching the form data.')
      }
    }

    fetchFormData(url)
  }, [])

  return (
    <div className="h-full w-full pt-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col align-middle p-10 h-auto w-10/12 max-w-md bg-blue-300 rounded-md"
      >
        <h2 className="font-medium text-xl text-center">Registration Info</h2>
        {formGetError && <div>{formGetError}</div>}
        <label htmlFor="name">Name </label>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={name}
          onChange={handleNameChange}
          className="pl-2 leading-7 rounded-sm"
        />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="pl-2 leading-7 rounded-sm"
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="pl-2 leading-7 rounded-sm"
        />
        <label htmlFor="occupation">Occupation</label>
        <Select
          options={formOccupations}
          value={occupation}
          onChange={handleOccupationChange}
          placeholder={'Select Occupation...'}
        />
        <label htmlFor="state">State</label>
        <Select
          options={formStates}
          value={state}
          onChange={handleStateChange}
          placeholder={'Select State...'}
        />
      </form>
    </div>
  )
}

export default App
