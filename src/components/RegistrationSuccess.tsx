interface PropTypes {
  returnHome: { (): void }
}

const RegistrationSuccess = ({ returnHome }: PropTypes): JSX.Element => {
  return (
    <div className="h-full">
      <div className="pl-1 flex justify-between">
        <div>
          <h2 className="font-medium text-xl">Registration Success</h2>
          <p className="text-gray-700">See you around</p>
        </div>
        <div className="font-bold text-3xl text-white bg-green-500 check flex justify-center items-center">
          ✓
        </div>
      </div>
      <hr className="my-3 border-gray-400" />
      <div className="w-fill h-4/5 flex flex-col justify-between items-center pt-5 relative">
        <h2 className="font-medium text-lg">We sent an email to you</h2>
        <div className="text-7xl my-1">📨</div>
        <div className="text-center">
          <h2 className="font-medium text-lg">Confirm your email address</h2>
          <p className="text-sm font-light">
            To finish signing up, please confirm your email address. This
            ensures we have the right email in case we need to contact you.
          </p>
        </div>
        <button
          onClick={returnHome}
          className="bg-gradient-to-br from-black to-black hover:to-indigo-900 text-white py-2 rounded-md h-10 w-full"
        >
          Return Home
        </button>
        <img
          src="https://www.fetchrewards.com/assets/images/logos/header-logo@2x.png"
          alt="fetch rewards"
        />
      </div>
    </div>
  )
}

export default RegistrationSuccess
