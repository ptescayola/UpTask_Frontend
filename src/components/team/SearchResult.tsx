import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TeamMember } from '@/types/index'
import { addUserToProject } from '@/api/TeamAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Notification } from '@/components/shared'
import { useTranslation } from 'react-i18next'

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast(<Notification variant="danger" title={error.message} />)
    },
    onSuccess: (data) => {
      toast(<Notification variant="positive" title={data} />)
      reset()
      navigate(location.pathname, {replace: true})
      queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
    }
  })

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id
    }
    mutate(data)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <a
          onClick={handleAddUserToProject}
        >
          {t('add_to_project')}
        </a>
      </div>
    </>
  )
}
