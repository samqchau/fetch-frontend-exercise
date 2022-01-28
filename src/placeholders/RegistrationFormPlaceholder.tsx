import InputErrorMessage from '../components/InputErrorMessage'
import Select from 'react-select'

interface PropTypes {
  error: string
}

const RegistrationFormPlaceholder = ({ error }: PropTypes): JSX.Element => {
  return (
    <>
      <div className="pl-1">
        <h2 className="font-medium text-xl">Sign Up</h2>
        <p className="text-gray-700">It&apos;s quick and easy.</p>
      </div>
      <hr className="my-3 border-gray-400" />
      <label htmlFor="name" className="font-semibold">
        Full name{' '}
      </label>
      <input type="text" name="name" className="pl-2 rounded-sm leading-9" />
      <InputErrorMessage errorMessage="" />
      <label htmlFor="email" className="font-semibold">
        Email{' '}
      </label>
      <input type="email" name="email" className="pl-2 rounded-sm leading-9" />
      <InputErrorMessage errorMessage="" />
      <label htmlFor="password" className="font-semibold">
        Password{' '}
      </label>
      <input
        type="password"
        name="password"
        className="pl-2 rounded-sm leading-9"
      />
      <InputErrorMessage errorMessage="" />
      <label htmlFor="occupation" className="font-semibold">
        Occupation
      </label>
      <Select
        id="occupation"
        placeholder={'Select Occupation...'}
        className="rounded-sm leading-7"
      />
      <InputErrorMessage errorMessage="" />
      <label htmlFor="state" className="font-semibold">
        State
      </label>
      <Select
        placeholder={'Select State...'}
        className="rounded-sm leading-7"
        id="state"
      />
      <InputErrorMessage errorMessage="" />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 text-white py-2 rounded-md h-10"
      >
        Register
      </button>
      <InputErrorMessage errorMessage={error} />
    </>
  )
}

export default RegistrationFormPlaceholder
