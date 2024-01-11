type User = {
  id: string
  email: string
}

export function signin(email: string, password: string) {
  return new Promise<{ data: User }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          id: "1",
          email,
        },
      })
    }, 500)
  })
}
