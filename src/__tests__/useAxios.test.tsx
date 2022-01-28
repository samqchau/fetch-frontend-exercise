import { cleanup, render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import { IState, IUserData } from '../interfaces/userTypes'
import useAxios from '../hooks/useAxios'
import { stateFactory, userFactory } from '../helpers/factories'
import axios, { Method } from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.MockedFunction<typeof axios>

describe('useAxios hook', () => {
  test('GET sets response, loading, and error correctly on SUCCESS', async () => {
    const url = 'test-url'
    const method:Method = "GET"
    const config = { url, method }
  
    const statesAndOccupations = {
      states: [
        stateFactory('Alabama', 'AL'),
        stateFactory('Alaska', 'AK'),
        stateFactory('Arizona', 'AZ'),
        stateFactory('Arkansas', 'AR'),
      ],
      occupations: ['Plumber', 'Engineer', 'Food Critic', 'Chef', 'News Anchor']
    }
    await act(async () => {
      (mockedAxios.request as jest.MockedFunction<typeof mockedAxios.request>
      ).mockResolvedValue({ data: statesAndOccupations })
  
      const { result, waitForNextUpdate } = renderHook(() => useAxios(config))
  
      expect(result.current.response).toBeUndefined()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('')
  
      await waitForNextUpdate()
  
      expect(result.current.response.data).toMatchObject(statesAndOccupations)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('')
      
      expect(mockedAxios.request).toHaveBeenCalledTimes(1)
    })
  })

  test('POST sets response, loading, and error correctly on SUCCESS', async () => {
    const url = 'test-url'
    const method:Method = "POST"
    const data = userFactory('Gordon Ramsey', 'TheGreatestChef@yahoo.com', 's3cr3tsauc3', 'Master Chef Host', 'UK')
    const config = { url, method, data }
  
    await act(async () => {
      (mockedAxios.request as jest.MockedFunction<typeof mockedAxios.request>
      ).mockResolvedValue({ status: 200 })
  
      const { result, waitForNextUpdate } = renderHook(() => useAxios(config))
  
      expect(result.current.response).toBeUndefined()
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('')
  
      await waitForNextUpdate()
  
      expect(result.current.response.status).toEqual(200)
      expect(result.current.loading).toBe(false)
      expect(result.current.error).toBe('')
      
      expect(mockedAxios.request).toHaveBeenCalledTimes(1)
    })
  })
})