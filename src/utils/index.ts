import i18next from 'i18next';

export function formatTimeAgo(isoString: string): string {
  const t = i18next.t.bind(i18next)
  const date = new Date(isoString)
  const now = new Date()

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  const timeUnits = [
    { unit: 'year', value: years },
    { unit: 'month', value: months },
    { unit: 'day', value: days },
    { unit: 'hour', value: hours },
    { unit: 'minute', value: minutes },
    { unit: 'second', value: seconds },
  ]

  for (const { unit, value } of timeUnits) {
    if (value > 0) {
      return t('time_ago', {value, unit: t(`unit.${unit}${value > 1 ? '_plural' : ''}`)})
    }
  }

  return t('time_ago', {value: 0, unit: t('unit.second')})
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
  return formatter.format(date)
}
