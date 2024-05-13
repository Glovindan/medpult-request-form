import React from 'react'
import { RequestData } from '../shared/types'

interface IRequestContext {
	data: RequestData
	setValue: (key: string, value: any) => void
}

const RequestContext = React.createContext<IRequestContext | null>(null)

export default RequestContext
