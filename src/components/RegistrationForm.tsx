import React, { useState, useEffect } from 'react'
import Select, { SingleValue } from 'react-select'
import RegistrationFormPlaceholder from '../placeholders/RegistrationFormPlaceholder'
import InputErrorMessage from './InputErrorMessage'
import Loader from './Loader'
import RegistrationSuccess from './RegistrationSuccess'
import { IUserData } from '../interfaces/userTypes'
import { ISelectFields } from '../interfaces/componentTypes'
import UserFormAPI, { IUserFormAPIPostParams } from '../apis/UserFormAPI'
import '../styles/registrationForm.css'

const UserRegistrationForm = (): JSX.Element => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [occupation, setOccupation] = useState<SingleValue<ISelectFields>>(null)
  const [occupationError, setOccupationError] = useState('')
  const [state, setState] = useState<SingleValue<ISelectFields> | null>(null)
  const [stateError, setStateError] = useState('')

  const [dropDownOccupations, setDropDownOccupations] = useState<
    ISelectFields[]
  >([])
  const [dropDownStates, setDropDownStates] = useState<ISelectFields[]>([])

  const [postConfig, setPostConfig] = useState<IUserFormAPIPostParams | null>(
    null
  )

  const { statesAndOccupations, gettingData, getDataError } = UserFormAPI.Get(
    'https://frontend-take-home.fetchrewards.com/form'
  )

  const { postStatusCode, postingData, postDataError, resetStatusCode } =
    UserFormAPI.Post(postConfig)

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

  const handleOccupationChange = (
    newValue: SingleValue<ISelectFields>
  ): void => {
    setOccupation(newValue)
  }

  const handleStateChange = (newValue: SingleValue<ISelectFields>): void => {
    setState(newValue)
  }

  const resetFormData = (): void => {
    setName('')
    setEmail('')
    setPassword('')
    setOccupation(null)
    setState(null)
  }

  const resetErrorMessages = (): void => {
    setNameError('')
    setEmailError('')
    setPasswordError('')
    setOccupationError('')
    setStateError('')
  }

  const returnHome = (): void => {
    resetFormData()
    resetStatusCode()
  }

  const handleSubmit = (e: React.SyntheticEvent): void => {
    resetErrorMessages()
    e.preventDefault()
    let err = false
    if (name.length < 1) {
      setNameError('Name is a required field')
      err = true
    }
    if (email.length < 1) {
      setEmailError('Email is a required field')
      err = true
    }
    if (password.length < 8) {
      setPasswordError('Password must be longer than 8 chars')
      err = true
    }
    if (!occupation) {
      setOccupationError('Occupation is a required field')
      err = true
    }
    if (!state) {
      setStateError('State is a required field')
      err = true
    }
    if (err) return

    const formData: IUserData = {
      name,
      email,
      password,
      occupation: occupation ? occupation.value : '',
      state: state ? state.value : '',
    }

    const config: IUserFormAPIPostParams = {
      url: 'https://frontend-take-home.fetchrewards.com/form',
      data: formData,
      method: 'POST',
    }

    setPostConfig(config)
  }

  useEffect(() => {
    if (statesAndOccupations) {
      setDropDownOccupations(
        statesAndOccupations.occupations.map((occupation: string) => {
          return { value: occupation, label: occupation }
        })
      )

      setDropDownStates(
        statesAndOccupations.states.map((state) => {
          return { value: state.name, label: state.name }
        })
      )
    }
  }, [statesAndOccupations])

  return (
    <div className="h-full w-full min-h-fit py-10 flex flex-col items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col align-middle px-10 pt-10 pb-4 w-96 max-w-md min-h-fit rounded-md bg-purple-100
        registrationForm"
      >
        {postStatusCode !== 200 && !gettingData && (
          <>
            <div className="pl-1">
              <h2 className="font-medium text-xl">Sign Up</h2>
              <p className="text-gray-700">It&apos;s quick and easy.</p>
            </div>
            <hr className="my-3 border-gray-400" />
            <label htmlFor="name" className="font-semibold">
              Full name{' '}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="pl-2 rounded-sm leading-9"
            />
            <InputErrorMessage errorMessage={nameError} />
            <label htmlFor="email" className="font-semibold">
              Email{' '}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="pl-2 rounded-sm leading-9"
            />
            <InputErrorMessage errorMessage={emailError} />
            <label htmlFor="password" className="font-semibold">
              Password{' '}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="pl-2 rounded-sm leading-9"
            />
            <InputErrorMessage errorMessage={passwordError} />
            <label htmlFor="occupation" className="font-semibold">
              Occupation
            </label>
            <Select
              options={dropDownOccupations}
              value={occupation}
              onChange={handleOccupationChange}
              onFocus={resetErrorMessages}
              placeholder={'Select Occupation...'}
              className="rounded-sm leading-7"
              name="occupations"
              id="occupations"
            />
            <InputErrorMessage errorMessage={occupationError} />
            <label htmlFor="state" className="font-semibold">
              State
            </label>
            <Select
              options={dropDownStates}
              value={state}
              onChange={handleStateChange}
              onFocus={resetErrorMessages}
              placeholder={'Select State...'}
              className="rounded-sm leading-7"
              name="states"
              id="states"
            />
            <InputErrorMessage errorMessage={stateError} />
            {!postingData && (
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md h-10"
              >
                Register
              </button>
            )}
            {postingData && <Loader />}
            <InputErrorMessage errorMessage={postDataError} />
          </>
        )}
        {postStatusCode === 200 && (
          <RegistrationSuccess returnHome={returnHome} />
        )}
        {gettingData && <RegistrationFormPlaceholder error={getDataError} />}
      </form>
    </div>
  )
}

export default UserRegistrationForm
