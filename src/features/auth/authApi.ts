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

export async function forgotPwd(email: string) {
  try {
    const response = await api.post("/forgot-password", {
      email,
    })
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}

export async function resetPwd(token: string, password: string) {
  try {
    const response = await api.post("/reset-password?token=" + token, {
      password,
    })
    return response.data
  } catch (e: any) {
    console.error(e)
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

export async function checkUpdatePwdToken(token: string) {
  try {
    const response = await api.get("/check-reset-pwd-token?token=" + token)
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}
