import type { FC } from "react"
import * as MaterialIcons from "react-icons/md"

export type TypeMaterialIcons = keyof typeof MaterialIcons

const MaterialIcon: FC<{ name: TypeMaterialIcons }> = ({ name }) => {
  const IconComponent = MaterialIcons[name]
  return <IconComponent />
}

export default MaterialIcon
