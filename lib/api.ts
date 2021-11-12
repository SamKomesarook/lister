export const fetchAPI = async () => {
  const res = await fetch("https://dev21.becollective.com/api/v2/coding-challenges/dirs", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}