import { useSelector } from "react-redux"
import "./start.sass"
import type { RootState } from "src/store/store"
import { memo } from "react"

const Start = memo(() => {
  const coords = useSelector((s: RootState) => s.map.coords)
  const userId = useSelector((s: RootState) => s.auth.authinfo?._id)

  return (
    <>
      <div className="startpage">
        <h1>Start</h1>
        <p>{userId}</p>
        <p>{coords?.latitude}</p>
        <p>{coords?.longitude}</p>
      </div>
    </>
  )
})

export default Start
