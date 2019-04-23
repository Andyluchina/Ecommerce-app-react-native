import { Navigation } from "react-native-navigation";

export const goToMain = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    id: "Home",
                    name: "Home"
                  }
                }
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "主页",
                  icon: require("../assets/house-outline.png")
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: "Fkgou",
                    name: "Fkgou"
                  }
                }
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "疯狂购",
                  icon: require("../assets/price-tag.png")
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: "Nearby",
                    name: "Nearby"
                  }
                }
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "附近",
                  icon: require("../assets/nearby.png")
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: "ShoppingCart",
                    name: "ShoppingCart"
                  }
                }
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "购物车",
                  icon: require("../assets/shopping-cart.png")
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    id: "MyAccount",
                    name: "MyAccount"
                  }
                }
              ],
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "我的",
                  icon: require("../assets/user.png")
                },
                topBar: {
                  visible: false,
                  drawBehind: true
                }
              }
            }
          }
        ]
      }
    }
  });
};

// Navigation.setRoot({
//   root: {
//     bottomTabs: {
//       id: "BottomTabsId",
//       children: [
//         {
//           component: {
//             name: "Home",
//             options: {
//               bottomTab: {
//                 fontSize: 12,
//                 text: "主页",
//                 icon: require("../assets/house-outline.png")
//               }
//             }
//           }
//         },
//         {
//           component: {
//             name: "Fkgou",
//             options: {
//               bottomTab: {
//                 fontSize: 12,
//                 text: "疯狂购",
//                 icon: require("../assets/price-tag.png")
//               }
//             }
//           }
//         },
//         {
//           component: {
//             name: "Catagory",
//             options: {
//               bottomTab: {
//                 fontSize: 12,
//                 text: "附近",
//                 icon: require("../assets/search-file.png")
//               }
//             }
//           }
//         },
//         {
//           component: {
//             name: "ShoppingCart",
//             options: {
//               bottomTab: {
//                 fontSize: 12,
//                 text: "购物车",
//                 icon: require("../assets/shopping-cart.png")
//               }
//             }
//           }
//         },
//         {
//           component: {
//             name: "MyAccount",
//             options: {
//               bottomTab: {
//                 fontSize: 12,
//                 text: "我的",
//                 icon: require("../assets/user.png")
//               }
//             }
//           }
//         }
//       ]
//     }
//   }
// });
