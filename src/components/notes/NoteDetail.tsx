import { deleteNote } from '@/api/NoteAPI'
import { useAuth } from '@/hooks/useAuth'
import { Note } from '@/types/index'
import { formatDate } from '@/utils/index'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Avatar } from '@/components/shared'
import { useTranslation } from 'react-i18next'

type NoteDetailProps = {
  note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

  const { t } = useTranslation()
  const { data, isLoading } = useAuth()
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])
  const params = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  
  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })

  if (isLoading) return 'Loading...'

  return (
    <div className="grid grid-cols-[auto,1fr] gap-4 mt-4">
      <Avatar firstName={note.createdBy?.name} lastName={note.createdBy?.lastname} image={note.createdBy?.profileImage} size="sm" />
      <div>
        <p className="font-semibold text-sm">
          {note.createdBy.name} {note.createdBy.lastname} · {formatDate(note.createdAt)}
        </p>
        <p className='text-sm my-3'>{note.content}</p>

        {canDelete && (
          <Button
            label={t('delete')}
            variant='neutral'
            size='sm'
            onClick={() => mutate({projectId, taskId, noteId: note._id})}
          />
        )}
      </div>
    </div>
  )
}
