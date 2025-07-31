import "./fadein.sass"
type FadeInProps = {
  children?: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const FadeIn = ({ children, className, ...props }: FadeInProps) => {
  return (
    <>
      <div {...props} className={"fadein" + " " + className}>
        {children}
      </div>
    </>
  )
}

export default FadeIn
