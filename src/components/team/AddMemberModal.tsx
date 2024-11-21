import { useLocation, useNavigate } from 'react-router-dom'
import AddMemberForm from '@/components/team/AddMemeberForm'
import { Dialog } from '@factorialco/factorial-one/dist/experimental'
import { People } from '@factorialco/factorial-one/icons/app'
import { useTranslation } from 'react-i18next'

export default function AddMemberModal() {

  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const addMember = queryParams.get('addMember')
  const open = addMember ? true : false

  return (
    <>
      <Dialog
        open={open}
        header={{
          icon: People,
          title: t('add_member'),
          description: t('add_member_description')
        }}
        onClose={() => navigate(location.pathname, {replace: true}) }
      >
        <AddMemberForm />
      </Dialog>
    </>
  )
}