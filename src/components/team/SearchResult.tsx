import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TeamMember } from '@/types/index'
import { addUserToProject } from '@/api/TeamAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Notification from '@/components/shared/Notification'
import { Button } from '@factorialco/factorial-one'

type SearchResultProps = {
  user: TeamMember
  reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!
  
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onError: (error) => {
      toast(<Notification variant="destructive" title={error.message} />)
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
      <p className="mt-10 text-center font-bold">Result:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <Button
          label="Add to project"
          variant="default"
          size="lg"
          onClick={handleAddUserToProject}
        />
      </div>
    </>
  )
}
