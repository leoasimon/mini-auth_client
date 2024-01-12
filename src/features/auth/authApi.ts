type User = {
  id: string
  email: string
}

export function signin(email: string, password: string) {
  return new Promise<{ data: User }>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: {
          id: "1",
          email,
        },
      })
      // reject("An Error occured")
    }, 500)
  })
}