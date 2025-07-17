import { memo, useEffect } from "react"
import "./mypage.sass"
import FadeIn from "src/components/FadeIn/FadeIn"
import Flex from "src/components/Flex/Flex"
import { Preloader } from "src/components/preloaders/PreloaderBall"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "src/store/store"
import { coordsThunk } from "src/store/map.slice"
import { userThunk } from "src/store/auth.slice"
import { SwipeTabs } from "src/components/SwipeTabs/SwipeTabs"
import { TABS } from "./constatnts"
interface MyPageProps {}

const MyPage = memo(({}: MyPageProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const coords = useSelector((s: RootState) => s.map.coords)
  const user = useSelector((s: RootState) => s.auth.userInfo)

  useEffect(() => {
    coords ?? dispatch(coordsThunk())
    user ?? dispatch(userThunk())
  }, [coords, user])

  return (
    <FadeIn>
      <Flex column centerV spredV className="mypage">
        <Flex center className="mypage__mainbox">
          <SwipeTabs render={TABS} />
        </Flex>
        <Flex className="mypage__footer">
          {!user ? (
            <Preloader />
          ) : (
            <Flex center gap={12} padding>
              <p className="COLORACCENT">
                {user?.name} {user?.subname} ○ {user?.city} ► {user?.country}
              </p>
            </Flex>
          )}
        </Flex>
      </Flex>
    </FadeIn>
  )
})

export default MyPage
