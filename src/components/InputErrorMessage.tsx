import React from 'react'

interface PropTypes {
  errorMessage: string
}

const InputErrorMessage = ({ errorMessage }: PropTypes): JSX.Element => {
  return <p className="font-thin h-2.5 text-xs mb-2">{errorMessage}</p>
}

export default InputErrorMessage
