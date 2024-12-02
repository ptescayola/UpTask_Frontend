import { isAxiosError } from 'axios'
import { UpdateCurrentUserPasswordForm, UserProfileForm } from '@/types/index'
import api from '@/lib/axios'

export async function updateProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put<string>('/auth/profile', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function updateProfileImage(file: File) {
  try {
    const formData = new FormData()
    formData.append('profileImage', file)
    
    const { data } = await api.post<{message: string, profileImage: string}>('/auth/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function deleteProfileImage() {
  try {
    const { data } = await api.delete<string>('/auth/profile-image')
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
  try {
    const { data } = await api.post<string>('/auth/update-password', formData)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
