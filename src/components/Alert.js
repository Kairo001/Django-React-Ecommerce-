import { Fragment } from "react"

//Redux
import { useSelector } from 'react-redux'

import { CheckCircleIcon } from '@heroicons/react/solid'

export default function Alert () {

  const alert = useSelector((state) => state.alert.alert)

  const displayAlert = () => {
    if (alert !== null) {
      return (
        <div className={`rounded-md bg-${alert.alertType}-50 p-4`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className={`h-5 w-5 text-${alert.alertType}-400`} aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${alert.alertType}-800`}>{alert.msg}</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Fragment>
        </Fragment>
      )
    }
    
  }

  return (
    <Fragment>
      {displayAlert()}
    </Fragment>
  )
}