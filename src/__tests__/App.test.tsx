import { render } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'
import App from '../App'

test('The app renders', async () => {
  await act( async () => {
    const { getByText } = render(<App />)
    const formTitle = getByText(/Sign Up/)
    expect(formTitle).toBeInTheDocument()
  })
})
