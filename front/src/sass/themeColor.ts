export const ThemeColor = {
  $COLORMAIN: "#1b1b1b",
  $COLORSECOND: "#313131",
  $COLORSECONDTR: "#adadad",
  $COLORACCENT: "#3a0000",
  $COLORWHITE: "#eeeeee",
  $COLORGREEN: "#07383f",
  $COLORRED: "#470404",
  $COLORORANGE: "#832900",
  $COLORBLUE: "#00435e",
} as const

export type ThemeColorT = (typeof ThemeColor)[keyof typeof ThemeColor]
