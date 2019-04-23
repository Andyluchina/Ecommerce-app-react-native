import { Navigation } from "react-native-navigation";

export function registerScreensForAuth() {
  // Navigation.registerComponent('Home', () => require('./Home').default);
  // Navigation.registerComponent('Initializing', (sc) => require('./Initializing').default);
  Navigation.registerComponent("Login", () => require("./Login").default);
  Navigation.registerComponent("Signup", () => require("./Signup").default);
  Navigation.registerComponent("Testpage", () => require("./Testpage").default);
  Navigation.registerComponent(
    "RecoverPassword",
    () => require("./RecoverPassword").default
  );
  Navigation.registerComponent(
    "Nearby",
    () => require("../commodity/Nearby").default
  );
  Navigation.registerComponent("Home", () => require("../common/Home").default);
  Navigation.registerComponent(
    "Fkgou",
    () => require("../commodity/Fkgou").default
  );
  Navigation.registerComponent(
    "ShoppingCart",
    () => require("../commodity/ShoppingCart").default
  );
  Navigation.registerComponent(
    "MyAccount",
    () => require("./MyAccount").default
  );
  Navigation.registerComponent(
    "Welcome",
    () => require("../common/WelcomeScreen").default
  );
  Navigation.registerComponent(
    "SecondaryCategoryPage",
    () => require("../commodity/SecondaryCategoryPage").default
  );
  Navigation.registerComponent(
    "CommoditySpecificPage",
    () => require("../commodity/CommoditySpecificPage").default
  );
  Navigation.registerComponent(
    "Order",
    () => require("../order/Order").default
  );
  Navigation.registerComponent(
    "CreateOrder",
    () => require("../order/CreateOrder").default
  );
  Navigation.registerComponent(
    "AddressList",
    () => require("../member/AddressList").default
  );
  Navigation.registerComponent(
    "AddressEdit",
    () => require("../member/AddressEdit").default
  );
  Navigation.registerComponent(
    "RegionSelection",
    () => require("../member/RegionSelection").default
  );
  Navigation.registerComponent(
    "RegionSelectionLevelOne",
    () => require("./RegionSelectionLevelOne").default
  );
  Navigation.registerComponent(
    "RegionSelectionLevelTwo",
    () => require("./RegionSelectionLevelTwo").default
  );
  Navigation.registerComponent(
    "RegionSelectionLevelThree",
    () => require("./RegionSelectionLevelThree").default
  );
  Navigation.registerComponent(
    "RegionSelectionLevelFour",
    () => require("./RegionSelectionLevelFour").default
  );
  Navigation.registerComponent(
    "FloorSpecific",
    () => require("../commodity/FloorSpecific").default
  );
  Navigation.registerComponent(
    "CarouselSpecific",
    () => require("../commodity/CarouselSpecific").default
  );
}
