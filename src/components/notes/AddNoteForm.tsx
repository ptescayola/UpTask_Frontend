import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/api/NoteAPI'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'
import { Textarea, Button, Avatar } from '@/components/shared'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export default function AddNoteForm() {

  const { t } = useTranslation()
  const params = useParams()
  const location = useLocation()
  const { data: user } = useAuth()

  const queryParams = new URLSearchParams(location.search)

  const projectId = params.projectId!
  const taskId = queryParams.get('viewTask')!

  const initialValues : NoteFormData = {
    content: ''
  }

  const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})
    }
  })
  const handleAddNote = (formData: NoteFormData) => {
    mutate({projectId, taskId, formData})
    reset()
  }

  const [showButton, setShowButton] = useState(false)

  return (
    <div className="grid grid-cols-[auto,1fr] gap-4">
      <Avatar firstName={user?.name} lastName={user?.lastname} image={user?.profileImage} size="sm" />
      <form
        className="space-y-2"
        noValidate
      >
        <Textarea
          placeholder={t('add_a_comment')}
          {...register('content', {
            required: t('field.required')
          })}
          onFocus={() => setShowButton(true)}
          onBlur={(e) => {
            if (!e.target.value) setShowButton(false)
          }}
          errors={errors.content}
        />

        {showButton && (
          <Button
            label={t('save')}
            size="sm"
            onClick={handleSubmit(handleAddNote)}
          />
        )}
      </form>
    </div>
  )
}
