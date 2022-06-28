import Layout from "../../hocs/Layout"
import { useParams } from 'react-router'
import { useState } from 'react'
import { connect } from "react-redux"
import { activate } from "../../redux/slices/user"
import { Navigate } from "react-router"

import { useSelector } from 'react-redux';

import { Oval } from 'react-loader-spinner'

const Activate = ({
    activate
}) => {

  const loading = useSelector((state) => state.auth.loading);
  const params = useParams()

  const [activated, setActivated] = useState(false)

  const activateAccount = () => {
    const uid = params.uid
    const token = params.token
    activate(uid, token)
    setActivated(true)
  }

  if(activated && !loading){
    return <Navigate to='/' />
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex justify-center items-center">
          {loading ? 
            <button className="mt-12 inline-flex items-center px-4 py-2 
            border border-transparen text-sm font-medium rounded-md 
            shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Oval
                color="#fff"
                width={20}
                height={20}
              />
            </button>:
            <button onClick={activateAccount} className="mt-12 inline-flex items-center px-4 py-2
            border border-transparentext-sm font-medium rounded-md 
            shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Activate Account
            </button>
          }
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
 
})
export default connect(mapStateToProps,{
    activate
}) (Activate)