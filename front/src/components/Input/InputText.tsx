import { type ForwardedRef, forwardRef, type InputHTMLAttributes } from "react"
import "./inputtext.sass"

type InputPropsT = {
  id: string
  label: string | undefined
  error?: string | undefined
  appearance?: "small" | "standart" | undefined
} & InputHTMLAttributes<HTMLInputElement>

const InputText = forwardRef<HTMLInputElement, InputPropsT>(function InputText(
  {
    id,
    label,
    error,
    disabled,
    className,
    appearance = "small",
    ...rest
  }: InputPropsT,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div
      className={`inputtext__${appearance} ${className || ""} ${
        error && "input-error"
      }`}
    >
      <input
        className={`${error && "input-error"}`}
        disabled={disabled}
        ref={ref}
        id={id}
        {...rest}
        placeholder=" "
      />
      {label && (
        <label htmlFor={id} className={`${error && "input-label-error"}`}>
          {label}
        </label>
      )}
      {error && <p className="input-message-error">{error}</p>}
    </div>
  )
})

export default InputText
