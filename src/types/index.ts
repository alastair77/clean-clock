export type UserRole = "admin" | "employee"

export type User = {
  id: string,
  name: string,
  role: UserRole,
  pin: string,
  hireDate: string
}

export type DraftUser = Omit<User, 'id'>

export type Client = {
  id: string,
  name: string,
  address: string
}

export type Assignment = {
  id: string,
  employeeId: string,
  employeePin: string,
  clientId: string,
  date: string,
  startTime: number,
  estimatedEndTime: number,
  realEndTime?: number | null,
  comments: string
}

export type Supplie = {
  id: string,
  name: string,
  icon: string,
  shortage: number
}
