import "./fadein.sass"
type FadeInProps = {
  children?: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const FadeIn = ({ children, ...props }: FadeInProps) => {
  return (
    <>
      <div {...props} className="fadein">
        {children}
      </div>
    </>
  )
}

export default FadeIn
