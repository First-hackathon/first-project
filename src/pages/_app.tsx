import "../styles/index.css"
import PropTypes from "prop-types"
import { Auth } from "../auth/auth"

const MyApp: React.VFC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </>
  )
}
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
