import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  AsyncStorage,
  FlatList,
  TouchableNativeFeedback
} from "react-native";
// import { goToMain } from "../common/startMainApp";
import fkg from "../common/Util";
var _ = require("lodash");
import {
  ScrollableTabView,
  DefaultTabBar,
  ScrollableTabBar
} from "@valdio/react-native-scrollable-tabview";
// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";
import util from "../common/Const";
import SecondarySpecificPage from "./SecondarySpecificPage";

class SecondaryCategoryPage extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: passProps.data.categorySimpleName,
          alignment: "center"
        }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  // navigationButtonPressed({ buttonId }) {
  //   // will be called when "buttonOne" is clicked
  //   goToMain();
  // }

  componentWillMount() {
    //fetch data
    const succ = result => {
      const list = ["second"].concat(result.body);

      this.setState({ secondaryCate: list });
      // console.log(result.body);
    };

    const err = result => {
      alert(result);
    };
    const param = JSON.stringify({ parentId: this.props.data.id });

    fkg.asyncHttpPost("/commodity/category/search", param, succ, err);
  }

  state = {
    secondaryCate: []
  };
  // renderPages = () => {
  //   var list = [];
  //   this.state.secondaryCate.map(item => {
  //     list.push(
  //       <SecondarySpecificPage
  //         tabLabel={item.categorySimpleName}
  //         cateid={item}
  //       />
  //     );
  //     console.log(list);
  //     return list;
  //   });
  // };
  renderScroll = () => {
    // if (this.state.secondaryCate === []) {
    //   return (
    //     <ScrollableTabView
    //       style={{ marginTop: 0 }}
    //       initialPage={0}
    //       renderTabBar={() => <ScrollableTabBar />}
    //     >
    //       <SecondarySpecificPage
    //         tabLabel={"精选"}
    //         cateid={this.props.data.id}
    //         main={true}
    //       />
    //     </ScrollableTabView>
    //   );
    // } else {
    //  var list = this.renderPages();
    return (
      <ScrollableTabView
        style={{ marginTop: 0 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        <SecondarySpecificPage
          tabLabel={"精选"}
          cateid={this.props.data.id}
          main={true}
        />
        {this.state.secondaryCate.map(item => {
          return (
            <SecondarySpecificPage
              tabLabel={item.categorySimpleName}
              cateid={item}
            />
          );
        })}
      </ScrollableTabView>
    );
    // }
  };
  render() {
    // return this.renderScroll();
    if (!this.state.secondaryCate[0]) {
      console.log("here");
      return <View />;
    }
    return (
      <ScrollableTabView
        style={{ marginTop: 0 }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {this.state.secondaryCate.map(item => {
          if (item === "second") {
            return (
              <SecondarySpecificPage
                tabLabel={"精选"}
                cateid={this.props.data.id}
                main={true}
              />
            );
          } else {
            return (
              <SecondarySpecificPage
                tabLabel={item.categorySimpleName}
                cateid={item}
              />
            );
          }
        })}
      </ScrollableTabView>
    );
  }
}

export default SecondaryCategoryPage;

// <SecondarySpecificPage
//   tabLabel="精选"
//   cateid={this.props.data.id}
//   main={true}
// />
// {this.state.secondaryCate.map(item => {
//   return (
//     <SecondarySpecificPage
//       tabLabel={item.categorySimpleName}
//       cateid={item}
//     />
//   );
// })}
