import axios from "axios"

type User = {
  id: string
  email: string
}

export async function signin(email: string, password: string) {
  try {
    const response = await axios.post("http://localhost:3000/signin", {
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
    const response = await axios.post("http://localhost:3000/signup", {
      email,
      password,
    })
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}

export async function authenticate() {
  const headers = {
    auth_token: localStorage.getItem("auth_token"),
  }
  const response = await axios.get("http://localhost:3000/authenticate", {
    headers,
  })

  return response.data
}

export async function editInfos(changes: Partial<User>) {
  const headers = {
    auth_token: localStorage.getItem("auth_token"),
  }

  const response = await axios.put("http://localhost:3000/users/me", {
    headers,
    body: {
      ...changes,
    },
  })

  return response.data
}

export async function deleteAccount(password: string) {
  const headers = {
    auth_token: localStorage.getItem("auth_token"),
  }

  try {
    const response = await axios.delete("http://localhost:3000/users/me", {
      headers,
      data: {
        password,
      },
    })
    return response.data
  } catch (e: any) {
    throw new Error(e?.response?.data?.error || e.message)
  }
}
