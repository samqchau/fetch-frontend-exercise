interface PropTypes {
  errorMessage: string
}

const InputErrorMessage = ({ errorMessage }: PropTypes): JSX.Element => {
  return (
    <p className="h-2.5 font-extralight text-xs mb-2 text-red-700">
      {errorMessage}
    </p>
  )
}

export default InputErrorMessage
