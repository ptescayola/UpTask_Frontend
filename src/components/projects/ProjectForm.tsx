import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import { ProjectFormData } from 'types'
import { Input, Textarea } from '@factorialco/factorial-one/dist/experimental'
import { useTranslation } from 'react-i18next'

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({errors, register} : ProjectFormProps) {

  const { t } = useTranslation()

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-semibold">
          {t('project_name')}
        </label>
        <Input
          placeholder={t('name')}
          type="text"
          {...register("projectName", {
              required: t('field.required'),
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
            {t('client_name')}
        </label>
        <Input
          placeholder={t('name')}
          type="text"
          {...register("clientName", {
              required: t('field.required'),
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
          {t('client_url')} ({t('optional')})
        </label>
        <Input
          placeholder={t('url')}
          type="text"
          {...register("clientUrl")}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
          {t('project_description')} ({t('optional')})
        </label>
        <Textarea
          placeholder={t('description')}
          {...register("description")}
        />

        {errors.description && (
          <>
            {{errors}}
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          </>
        )}
      </div>
    </>
  )
}
