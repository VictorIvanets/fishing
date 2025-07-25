import { forwardRef } from "react"
import "./flex.sass"
import type { ThemeColorT } from "src/sass/themeColor"
type FlexProps = {
  children?: React.ReactNode
  className?: string
  row?: boolean
  column?: boolean
  spredV?: boolean
  spredH?: boolean
  center?: boolean
  centerH?: boolean
  centerV?: boolean
  padding?: boolean
  relativ?: boolean
  absolute?: boolean
  flex?: boolean
  height?: number | string
  width?: number | string
  gap?: number
  background?: ThemeColorT
} & React.HTMLAttributes<HTMLDivElement>

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      className,
      row,
      column,
      spredV,
      spredH,
      center,
      centerH,
      centerV,
      height,
      width,
      style,
      background,
      padding,
      gap,
      relativ,
      absolute,
      flex,
      ...props
    }: FlexProps,
    ref
  ) => {
    const styleFlex = {
      row: row ? "flex-row " : undefined,
      column: column ? "flex-column " : undefined,
      spredV: spredV ? "flex-spredv " : undefined,
      spredH: spredH ? "flex-spredh " : undefined,
      center: center ? "flex-center " : undefined,
      centerH: centerH ? "flex-centerh " : undefined,
      centerV: centerV ? "flex-centerv " : undefined,
      padding: padding ? "flex-pading " : undefined,
      relativ: relativ ? "flex-relative " : undefined,
      absolute: absolute ? "flex-absolute " : undefined,
      flex: flex ? "flex-flex " : undefined,
    }

    return (
      <div
        {...props}
        ref={ref}
        style={{
          ...style,
          gap: gap ? gap : undefined,
          height: height ? height : undefined,
          width: width ? width : undefined,
          background: background
            ? (background as unknown as string)
            : undefined,
        }}
        className={`flex ${Object.values(styleFlex)
          .join(" ")
          .replace(/\s+/g, " ")}${className ? className : ""}`}
      >
        {children}
      </div>
    )
  }
)

export default Flex
