import type { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import type { RootState } from "src/store/store"

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const access_token = useSelector(
    (s: RootState) => s.auth.authinfo?.access_token
  )

  if (!access_token) {
    return <Navigate to="/login" replace />
  }

  return children
}
