import type { TabsT } from "src/components/SwipeTabs/SwipeTabs"
import { Start } from "../Start"
import { AllFishingPage } from "../AllFishingPage"

export const TABS: TabsT[] = [
  {
    title: "мої рибалки",
    components: <Start />,
  },
  {
    title: "всі рибалки",
    components: <AllFishingPage />,
  },
]
