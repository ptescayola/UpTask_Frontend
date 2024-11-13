import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TaskFormData } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { Input, Textarea } from '@factorialco/factorial-one/dist/experimental'

type TaskFormProps = {
  errors: FieldErrors<TaskFormData>
  register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-semibold">
            Task name
        </label>
        <Input
          placeholder="Name of task"
          type="text"
          {...register("name", {
              required: "Required",
          })}
        />

        {errors.name && (
          <ErrorMessage>{errors.name.message}</ErrorMessage>
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
