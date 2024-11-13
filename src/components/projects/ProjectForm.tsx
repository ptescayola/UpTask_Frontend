import { UseFormRegister, FieldErrors } from 'react-hook-form'
import ErrorMessage from '@/components/ErrorMessage'
import { ProjectFormData } from 'types'
import { Input, Textarea } from '@factorialco/factorial-one/dist/experimental'

type ProjectFormProps = {
  register: UseFormRegister<ProjectFormData>
  errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({errors, register} : ProjectFormProps) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-semibold">
            Project name
        </label>
        <Input
          placeholder="Name of project"
          type="text"
          {...register("projectName", {
              required: "Required",
          })}
        />

        {errors.projectName && (
          <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
            Client name
        </label>
        <Input
          placeholder="Name of client"
          type="text"
          {...register("clientName", {
              required: "Required",
          })}
        />

        {errors.clientName && (
          <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold">
            Description
        </label>
        <Textarea
          placeholder="Description..."
          {...register("description", {
              required: "Required",
          })}
        />

        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}
