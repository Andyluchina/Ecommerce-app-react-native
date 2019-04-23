/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
import { Navigation } from "react-native-navigation";
import { name as appName } from "./app.json";
import { registerScreensForAuth } from "./src/member/screens";
import { goToMain } from "./src/common/startMainApp";
// Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);
registerScreensForAuth();

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "Welcome"
      }
    }
  });
});

//goToMain();
