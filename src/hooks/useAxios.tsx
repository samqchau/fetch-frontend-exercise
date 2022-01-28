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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [response, setResponse] = useState<any>()

  useEffect(() => {
    async function sendRequest(params: IAxiosParams): Promise<void> {
      setLoading(true)
      try {
        const { url, method, data } = params
        if (data) {
          const res = await axios.request({ url, method, data })
          setResponse(res)
        } else {
          const res = await axios.request({ url, method })
          setResponse(res)
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message)
        else if (typeof err === 'string') setError(err)
      } finally {
        setLoading(false)
      }
    }
    if (params?.url) sendRequest(params)
  }, [params])

  return { response, loading, error }
}

export default useAxios
