import "../styles/index.css"
import React from "react"
import PropTypes from "prop-types"
import { Auth } from "../auth/auth"
import { atom, RecoilRoot, useRecoilState } from "recoil"

const MyApp: React.VFC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
  return (
    <>
      <RecoilRoot>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </RecoilRoot>
    </>
  )
}
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
}

export default MyApp
