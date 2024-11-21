import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {

  const { t } = useTranslation()

  return (
    <>
      <h1 className="font-black text-center text-4xl text-white">
        {t('page_not_found')}
      </h1>
      <p className="mt-10 text-center text-white">
        {t('back_to')} {' '}<Link className=" text-fuchsia-500" to={'/'}>{t('projects')}</Link>
      </p>
    </>
  )
}
