import type { TabsT } from "src/components/SwipeTabs/SwipeTabs"
import { Start } from "../Start"
import { MapPage } from "../MapPage"
import { AllFishingPage } from "../AllFishingPage"

export const TABS: TabsT[] = [
  {
    title: "моя сторінка",
    components: <Start />,
  },
  {
    title: "карта",
    components: <MapPage />,
  },
  {
    title: "рибалки",
    components: <AllFishingPage />,
  },
]
