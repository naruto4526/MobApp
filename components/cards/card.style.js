import {StyleSheet} from 'react-native';
import {COLORS,SIZES,SHADOWS} from '../../constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.tertiary,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    marginLeft:10,
    marginRight:10
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.xxLarge,
    
  },
  jobName: {
    fontSize: SIZES.xLarge - 2,
    fontFamily: "monospace",
    fontWeight:'500',
    color: COLORS.white,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export {styles};
