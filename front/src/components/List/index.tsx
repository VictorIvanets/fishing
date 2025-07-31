import { useEffect, useRef, memo } from "react"
import "./list.sass"
import type { OneFishingT } from "src/types/fishing"
import Card from "../Card"
import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query"
import { Preloader } from "../preloaders/PreloaderBall"

interface ListProps {
  data: OneFishingT[]
  label?: string
  hasNextPage?: boolean
  fetchNextPage?: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<{ data: OneFishingT[]; nextCursor: string | null }, unknown>,
      Error
    >
  >
  isLoading?: boolean
  isFetchingNextPage?: boolean
}

const List = memo(
  ({
    data,
    label,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  }: ListProps) => {
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (!hasNextPage || !fetchNextPage) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage()
          }
        },
        { threshold: 1 }
      )

      if (observerRef.current) {
        observer.observe(observerRef.current)
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current)
        }
      }
    }, [hasNextPage, fetchNextPage])

    return (
      <div className="listwrapper">
        {label && <h4 className="list__label">{label}</h4>}
        <div className="list">
          {data.map((i) => (
            <Card key={i._id} item={i} />
          ))}
          {(isLoading || isFetchingNextPage) && (
            <div className="listwrapper__loader">
              <Preloader />
            </div>
          )}

          {hasNextPage && (
            <div
              ref={observerRef}
              style={{ height: "1px", marginTop: "-1px" }}
            />
          )}
        </div>
      </div>
    )
  }
)

export default List
