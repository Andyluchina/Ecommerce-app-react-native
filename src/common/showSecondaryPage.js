import { Navigation } from "react-native-navigation";

export const showSecondaryPage = data => {
  Navigation.setRoot({
    root: {
      stack: {
        id: "Category",
        children: [
          {
            component: {
              name: "SecondaryCategoryPage",
              passProps: {
                data: data
              },
              options: {
                topBar: {
                  title: {
                    text: data.categorySimpleName
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
};
