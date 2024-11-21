import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TaskFormData } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { Input, Textarea } from '@factorialco/factorial-one/dist/experimental'
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
        <label className="text-sm font-semibold">
            {t('task_name')}
        </label>
        <Input
          placeholder={t('name')}
          type="text"
          {...register("name", {
            required: t('field.required'),
          })}
        />

        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
          {t('description')}
        </label>
        <Textarea
          placeholder={t('description')}
          {...register("description", {
              required: t('field.required'),
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}
