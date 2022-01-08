import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="header-container">
        <img
          src="https://d18gf9zcxp8qg0.cloudfront.net/newWebsite/Financepeer_new_logo.png"
          alt="finance"
          className="finance-peer-image"
        />
        <button type="button" className=" btn-logout " onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </>
  )
}
export default withRouter(Header)
