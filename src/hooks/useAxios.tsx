import { useState, useEffect } from 'react'
import axios, { Method, AxiosResponse } from 'axios'

interface IAxiosParams {
  url: string
  method: Method
  data?: unknown
}

interface IAxiosReturn {
  response: AxiosResponse
  loading: boolean
  error: string
}

const useAxios = (params: IAxiosParams | null): IAxiosReturn => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [response, setResponse] = useState<any>()

  useEffect(() => {
    async function sendRequest(params: IAxiosParams): Promise<void> {
      setLoading(true)
      setError('')
      try {
        const { url, method, data } = params
        if (data) {
          const res = await axios.request({ url, method, data })
          if (res) setResponse(res)
          else throw new Error('There was an error, please try again.')
        } else {
          const res = await axios.request({ url, method })
          if (res) setResponse(res)
          else throw new Error('There was an error, please try again.')
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setTimeout(
            (err) => {
              setError(err.message)
            },
            1000,
            err
          )
        } else if (typeof err === 'string')
          setTimeout(
            (err) => {
              setError(err)
            },
            1000,
            err
          )
      } finally {
        setLoading(false)
      }
    }
    if (params?.url) sendRequest(params)
  }, [params])

  return { response, loading, error }
}

export default useAxios
