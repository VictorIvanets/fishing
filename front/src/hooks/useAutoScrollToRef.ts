import { useEffect } from "react"

export function useAutoScrollToRef(
  ref: React.RefObject<HTMLDivElement | null>,
  deps: unknown[] = []
) {
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: "smooth" })
  }, deps)
}
