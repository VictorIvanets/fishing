import { useSelector } from "react-redux"
import "./mappage.sass"
import type { RootState } from "src/store/store"
import { memo } from "react"

const MapPage = memo(() => {
  const coords = useSelector((s: RootState) => s.map.coords)
  const userId = useSelector((s: RootState) => s.auth.authinfo?._id)

  return (
    <>
      <div className="mappage">
        <h1>MapPage</h1>
        <p>{userId}</p>
        <p>{coords?.latitude}</p>
        <p>{coords?.longitude}</p>
      </div>
    </>
  )
})

export default MapPage
