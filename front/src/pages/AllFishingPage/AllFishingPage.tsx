import { useSelector } from "react-redux"
import "./allfishingpage.sass"
import type { RootState } from "src/store/store"
import { memo } from "react"
const AllFishingPage = memo(() => {
  const userId = useSelector((s: RootState) => s.auth.authinfo?._id)

  return (
    <>
      <div className="allfishingpage">
        <h1>AllFishingPage</h1>
        <p>{userId}</p>
      </div>
    </>
  )
})

export default AllFishingPage
