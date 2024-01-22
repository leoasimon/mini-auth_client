import * as api from "../../api"

type User = {
  id: string
  email: string
}

export async function signin(email: string, password: string) {
  try {
    const response = await api.post("/signin", {
      email,
      password,
    })
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}

export async function signup(email: string, password: string) {
  try {
    const response = await api.post("/signup", {
      email,
      password,
    })
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}

export async function authenticate() {
  const response = await api.loggedCall().get("/authenticate")

  return response.data
}

export async function editInfos(changes: Partial<User>) {
  const response = await api.loggedCall().put("/users/me", {
    body: {
      ...changes,
    },
  })

  return response.data
}

export async function deleteAccount(password: string) {
  try {
    const response = await api
      .loggedCall()
      .delete("http://localhost:3000/users/me", {
        data: {
          password,
        },
      })
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}
