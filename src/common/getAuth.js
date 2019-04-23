import { Navigation } from "react-native-navigation";

export const getAuth = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: "Authentication",
        children: [
          {
            component: {
              name: "Login"
            }
          }
        ]
      }
    }
  });
};
