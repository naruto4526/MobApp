//this files contains the sizes and colors that can be imported directly from the constants folder into the styles.js files

const COLORS = {
  primary: "#2196F3",
  secondary: "#444262",
  tertiary: "#5E95F7",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
}

const FONTS = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
}

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

//shadows is an object of objects The shadow property appears to take as argument an object with prop-value pairs. Some of these values themselves are objects.

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

const IP = 'http://192.168.43.27:8080';

export {FONTS,COLORS,SHADOWS,SIZES, IP}; //no semicolon when directly exporting a function or class definition.