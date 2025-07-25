import {
  forwardRef,
  type ForwardedRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react"
import "./inputtext.sass"

type BaseProps = {
  id: string
  label?: string
  error?: string
  appearance?: "small" | "standart"
  ibackground?: boolean
  as?: "input" | "textarea"
  className?: string
  heightArea?: number
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement>
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>

type InputFieldProps = InputProps | TextareaProps

const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(function InputField(
  {
    id,
    label,
    error,
    disabled,
    className,
    ibackground = false,
    appearance = "small",
    as = "input",
    heightArea = 150,
    ...rest
  }: InputFieldProps,
  ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
) {
  const commonProps = {
    id,
    disabled,
    placeholder: " ",
    ref,
    style: {
      background: ibackground ? "#ffffff1d" : "",
    },
    className: `${error ? "input-error" : ""}`,
    ...rest,
  }
  const commonPropsArea = {
    id,
    disabled,
    placeholder: " ",
    ref,
    style: {
      background: ibackground ? "#ffffff1d" : "",
      height: heightArea,
    },
    className: `${error ? "input-error" : ""}`,
    ...rest,
  }

  return (
    <div
      className={`inputtext__${appearance} ${className || ""} ${
        error ? "input-error" : ""
      }`}
    >
      {as === "textarea" ? (
        <textarea
          {...(commonPropsArea as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input {...(commonProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {label && (
        <label htmlFor={id} className={`${error ? "input-label-error" : ""}`}>
          {label}
        </label>
      )}

      {error && <p className="input-message-error">{error}</p>}
    </div>
  )
})

export default InputField
