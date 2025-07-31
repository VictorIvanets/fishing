import type { ThemeColorT } from "src/sass/themeColor"
import "./button.sass"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  appearence?: "big" | "small"
  background?: ThemeColorT
  className?: string
  isValid?: boolean
  value?: string
}
export function Button({
  title,
  className,
  appearence = "small",
  isValid = true,
  value,
  ...props
}: ButtonProps) {
  return (
    <div
      className={`${className} btnbox ${
        appearence === "big" ? "big" : "small"
      } ${isValid ? "" : "btnbox__invalid"}`}
    >
      <button value={value || title} {...props}>
        <p>{title}</p>
      </button>
    </div>
  )
}

export default Button
