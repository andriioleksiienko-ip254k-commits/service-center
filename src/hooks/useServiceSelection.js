import { useContext } from 'react'
import { ServiceSelectionContext } from '../context/ServiceSelectionContext.js'


export default function useServiceSelection() {
  const selection = useContext(ServiceSelectionContext)

  if (selection === null) {
    throw new Error(
      'useServiceSelection must be used within ServiceSelectionProvider',
    )
  }

  return selection
}
