import type { TabsT } from "src/components/SwipeTabs/SwipeTabs"
import { Start } from "../Start"
import { AllFishingPage } from "../AllFishingPage"

export const TABS: TabsT[] = [
  {
    title: "моя сторінка",
    components: <Start />,
  },
  {
    title: "рибалки",
    components: <AllFishingPage />,
  },
]
