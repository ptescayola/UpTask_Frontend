import { useLocation, useNavigate } from 'react-router-dom'
import AddMemberForm from '@/components/team/AddMemeberForm'
import { Dialog } from '@factorialco/factorial-one/dist/experimental'
import { People } from '@factorialco/factorial-one/icons/app'

export default function AddMemberModal() {

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
          title: 'Add new team member',
          description: 'Fill out the form and add a team member'
        }}
        onClose={() => navigate(location.pathname, {replace: true}) }
      >
        <AddMemberForm />
      </Dialog>
    </>
  )
}