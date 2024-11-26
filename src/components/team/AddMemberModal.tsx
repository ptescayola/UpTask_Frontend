import { useLocation, useNavigate } from 'react-router-dom'
import AddMemberForm from '@/components/team/AddMemeberForm'
import { useTranslation } from 'react-i18next'
import { Dialog, Button } from '@/components/shared'
import { UsersIcon } from '@heroicons/react/24/outline'

export default function AddMemberModal() {

  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const addMember = queryParams.get('addMember')
  const isOpen = addMember ? true : false

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => navigate(location.pathname, { replace: true })}
      icon={<UsersIcon className="w-[24px] h-[24px] text-gray-600" />}
      title={t('add_member')}
      subtitle={t('add_member_description')}
      content={
        <AddMemberForm />
      }
      actions={
        <Button
          label={t('cancel')}
          variant="neutral"
          onClick={(e) => {
            e.preventDefault()
            navigate(location.pathname, { replace: true })
          }}
        />
      }
    />
  )
}