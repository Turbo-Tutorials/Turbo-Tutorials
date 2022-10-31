const SITE_ID = 'turbo-tutorials.dev'
const TOKEN = 'ZtQwQ8ZMjAkWkwZ-357qOeS0abs_5IZ2Yqx5r9xgn9HhvvfdUZI14Z1nndZjFZyy'

export async function usePlausibleAggregate() {
  const { data, pending, error } = await useAsyncData(
    `plausible-aggregate`,
    () => {
      return $fetch(`https://plausible.io/api/v1/stats/aggregate?metrics=visitors,pageviews,bounce_rate,visit_duration,events,visits&site_id=${SITE_ID}&period=30d&compare=previous_period`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        }
      })
    })

  return { data, pending, error }
}

export async function usePlausibleRealtime() {
  const { data, pending, error, refresh } = await useAsyncData(
    `plausible-realtime`,
    () => {
      return $fetch(`https://plausible.io/api/v1/stats/realtime/visitors?site_id=${SITE_ID}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        }
      })
    })

  return { data, pending, error, refresh }
}

export async function usePlausibleTimePeriod(period = '30d') {
  const { data, pending, error } = await useAsyncData(
    `plausible-timeperiod`,
    () => {
      return $fetch(`https://plausible.io/api/v1/stats/timeseries?site_id=${SITE_ID}&period=${period}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        }
      })
    })

  return { data, pending, error }
}

export async function usePlausibleTopPages(period = '30d', limit = 5) {
  const { data, pending, error } = await useAsyncData(
    `plausible-toppages`,
    () => {
      return $fetch(`https://plausible.io/api/v1/stats/breakdown?site_id=${SITE_ID}&property=event:page&period=${period}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
        }
      })
    })

  return { data, pending, error }
}