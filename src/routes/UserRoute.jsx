import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'

import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const UserRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'user') return children
  return <Navigate to='/dashboard' replace='true' />
}

UserRoute.propTypes = {
  children: PropTypes.element,
}

export default UserRoute
