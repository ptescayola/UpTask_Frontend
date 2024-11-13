import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import ErrorMessage from '@/components/ErrorMessage'
import { TeamMemberForm } from '@/types/index'
import { findUserByEmail } from '@/api/TeamAPI'
import SearchResult from '@/components/team/SearchResult'
import { Input } from '@factorialco/factorial-one/dist/experimental'
import { Button } from '@factorialco/factorial-one'

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
      email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
      mutationFn: findUserByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
      const data = {projectId, formData}
      mutation.mutate(data)
    }

    const resetData = () => {
      reset()
      mutation.reset()
    }

    return (
      <>
        <form
          className="space-y-2"
          noValidate
        >
          <div className="space-y-2">
            <Input
              placeholder="Email"
              type="email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email not valid"
                }
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <Button
            label="Find user"
            variant="default"
            size="lg"
            onClick={(e) => {e.preventDefault(); handleSubmit(handleSearchUser)()}}
          />
        </form>

        <div className="mt-10">
          {mutation.isPending && <p className="text-center">Loading...</p>}
          {mutation.error && <p className="text-center">{mutation.error.message}</p>}
          {mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
        </div>
      </>
    )
}