import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ProjectFormData } from 'types'
import { Input, Textarea } from '@/components/shared'
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
        <Input
          label={t('project_name')}
          type="text"
          {...register("projectName", {
              required: t('field.required'),
          })}
          errors={errors.projectName}
        />

        <Input
          label={t('client_name')}
          type="text"
          {...register("clientName", {
              required: t('field.required'),
          })}
          errors={errors.clientName}
        />

        <Input
          label={`${t('client_url')} (${t('optional')})`}
          type="text"
          {...register("clientUrl")}
          errors={errors.clientUrl}
        />

        <Textarea
          label={`${t('project_description')} (${t('optional')})`}
          placeholder={t('description')}
          {...register("description")}
          errors={errors.description}
        />
      </div>
    </>
  )
}
