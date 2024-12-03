import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TaskFormData } from '@/types/index'
import { Input, Textarea } from '@/components/shared'
import { useTranslation } from 'react-i18next'

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>
  register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {

  const { t } = useTranslation()

  return (
    <>
      <div className="space-y-2">
        <Input
          label={t('task_name')}
          placeholder={t('name')}
          type="text"
          {...register("name", {
            required: t('field.required')
          })}
          errors={errors.name}
        />

        <Textarea
          label={t('description')}
          placeholder={t('description')}
          {...register("description", {
            required: t('field.required')
          })}
          errors={errors.description}
        />

        <input
          type="hidden"
          {...register("status")}
        />
      </div>
    </>
  )
}
