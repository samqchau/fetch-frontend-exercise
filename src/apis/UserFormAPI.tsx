import { useState, useEffect } from 'react'
import { Method } from 'axios'
import useAxios from '../hooks/useAxios'
import { IUserData, IState } from '../interfaces/userTypes'

interface IStatesAndOccupations {
  states: IState[]
  occupations: string[]
}

interface IUserFormApiGetRes {
  statesAndOccupations: IStatesAndOccupations | null
  gettingData: boolean
  getDataError: string
}

export interface IUserFormAPIPostParams {
  url: string
  data?: IUserData
  method: Method
}

interface IUserFormApiPostRes {
  postStatusCode: number | null
  postingData: boolean
  postDataError: string
}

const UserFormAPI = {
  Get: (url: string): IUserFormApiGetRes => {
    const [method] = useState<Method>('GET')
    const [config] = useState({ method, url })
    const [statesAndOccupations, setStatesAndOccupations] =
      useState<IStatesAndOccupations | null>(null)
    const {
      response,
      loading: gettingData,
      error: getDataError,
    } = useAxios(config)

    useEffect(() => {
      if (response) {
        setStatesAndOccupations(response.data)
      }
    }, [response])

    return { statesAndOccupations, gettingData, getDataError }
  },
  Post: (params: IUserFormAPIPostParams | null): IUserFormApiPostRes => {
    const [method] = useState<Method>('POST')
    const [config, setConfig] = useState<IUserFormAPIPostParams | null>(null)
    const [postStatusCode, setPostStatusCode] = useState<number | null>(null)
    const [postingData, setPostingData] = useState(false)
    const { response, loading, error: postDataError } = useAxios(config)

    useEffect(() => {
      if (response) {
        setPostStatusCode(response.status)
      }
    }, [response])

    useEffect(() => {
      if (params?.data && params?.url) {
        const pConfig = {
          url: params.url,
          method,
          data: params.data,
        }
        setConfig(pConfig)
      }
    }, [params])

    useEffect(() => {
      if (loading) {
        setPostingData(true)
      } else {
        setTimeout(() => {
          setPostingData(false)
        }, 1000)
      }
    }, [loading])

    return { postStatusCode, postingData, postDataError }
  },
}

export default UserFormAPI
