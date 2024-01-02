import { extendTheme } from "native-base";
import { colors } from "./src/colors";
import { fontFamilies, fontSizes } from "./src/fonts";
import { sizes } from "./src/sizes";

export const THEME = extendTheme({
  colors: colors,
  fonts: fontFamilies,
  fontSizes: fontSizes,
  sizes: sizes,
});
