import { useNavigate, useLocation } from 'react-router-dom'
import { RoutesEnum } from '@/constants/routes'
import { useTranslation } from 'react-i18next'

export default function AuthFooter() {

  const { t } = useTranslation()

  const navigate = useNavigate()
  const location = useLocation()

  const isLoginRoute = location.pathname === RoutesEnum.LOGIN
  const isRegisterRoute = location.pathname === RoutesEnum.REGISTER
  const isConfirmEmail = location.pathname === RoutesEnum.CONFIRM_EMAIL
  const isConfirmAccount = location.pathname === RoutesEnum.CONFIRM_ACCOUNT
  const isRequestCode = location.pathname === RoutesEnum.REQUEST_CODE
  const isForgotPassword = location.pathname === RoutesEnum.FORGOT_PASSWORD
  const isNewPassowrd= location.pathname === RoutesEnum.NEW_PASSWORD

  return (
    <>
      <div className="mt-4 text-center w-full">
       {isLoginRoute && (
          <p className="text-sm text-gray-500">
            No account? {' '}
            <a onClick={() => navigate(RoutesEnum.REGISTER)}>Sign up</a>
          </p>
        )}

        {(isRegisterRoute || isConfirmAccount || isForgotPassword || isNewPassowrd || isRequestCode || isConfirmEmail) && (
          <p className="text-sm text-gray-500">
            <a onClick={() => navigate(RoutesEnum.LOGIN)}>Back to Login</a>
          </p>
        )}

        {isConfirmAccount && (
          <p className="text-sm text-gray-500">
            <a onClick={() => navigate(RoutesEnum.REQUEST_CODE)}>{t('request_new_code')}</a>
          </p>
        )}


      </div>
    </>
  )
}
