import Cookies from "js-cookie"
import { CookiesUtils } from "./CookiesUtils"
import {AuthApi} from '@/apis'
import { LoginData } from "@/types"
import { ACCESS_TOKEN_EXPIRE_DAYS, AUTH_TOKEN, BASE_DOMAIN } from "@/constants"

export const AuthService = {
  login: async (formData: LoginData) => {
    try {
      const result = await AuthApi.login(formData)
      if (result.status === 200 && result.data.access_token) {
        console.log('update cookies')
        CookiesUtils.set(AUTH_TOKEN, result.data.access_token, {
          domain: BASE_DOMAIN?.includes("localhost") ? undefined : BASE_DOMAIN,
          expires: ACCESS_TOKEN_EXPIRE_DAYS
        })
      }
      return true
    } catch (error) {
      console.error(JSON.stringify(error))
      return Promise.reject(error)
    }
  },
  logout() {
    AuthService.clearTokens()
    window.location.href = '/login'
  },
  clearTokens() {
    CookiesUtils.remove(AUTH_TOKEN, {
      domain: BASE_DOMAIN
    })
  },
  isAuthenticated() {
    return Cookies.get(AUTH_TOKEN)
  }
}
