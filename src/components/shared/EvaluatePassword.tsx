import React, { useState, useEffect } from 'react'

export type EvaluatePasswordProps = {
  password: string
}

export const EvaluatePassword = React.forwardRef<HTMLInputElement, EvaluatePasswordProps>(
  ({ password}) => {

  const [strength, setStrength] = useState<number>(0) // 0 - weak, 1 - normal, 2 - strong

  const evaluatePasswordStrength = (password: string) => {
    let strengthScore = 0

    // Minimum 8 characters
    if (password.length >= 8) {
      // Contains an uppercase letter
      if (/[A-Z]/.test(password)) strengthScore++

      // Contains a lowercase letter
      if (/[a-z]/.test(password)) strengthScore++

      // Contains a number or symbol
      if (/[0-9!@#$%^&*()_+{}\]:;"'<>,.?/\\|`~]/.test(password)) strengthScore++

      // Contains a large length
      if (password.length >= 15) strengthScore++
    }

    setStrength(strengthScore)
  }

  useEffect(() => {
    evaluatePasswordStrength(password)
  }, [password])

  const getBarColor = (index: number) => {
    if (password === '') {
      return 'bg-gray-300'
    }

    if (strength === 0) {
      if (index === 1) return 'bg-red-500'
      return 'bg-gray-300'
    }

    if (strength === 1 || strength === 2) {
      if (index === 1) return 'bg-yellow-500'
      if (index === 2) return 'bg-yellow-500'
      return 'bg-gray-300'
    }
    return 'bg-green-500'
  }

  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      <div className={`h-1 ${getBarColor(1)} rounded`} />
      <div className={`h-1 ${getBarColor(2)} rounded`} />
      <div className={`h-1 ${getBarColor(3)} rounded`} />
    </div>
  )
})
