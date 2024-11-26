import { useTranslation } from 'react-i18next'
import AuthHeader from '@/components/auth/AuthHeader'
import AuthFooter from '@/components/auth/AuthFooter'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

export default function ConfirmAccountView() {

  const { t } = useTranslation()


  return (
    <>
      <div className="w-full max-w-[320px]">

        <AuthHeader
          Icon={CheckBadgeIcon}
          title={t('auth.account_created')}
          subtitle={t('auth.check_email_confirmation')}
        />

        <AuthFooter />
      </div>
    </>
  )
}