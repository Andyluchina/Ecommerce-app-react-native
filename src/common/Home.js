import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text
} from "native-base";
import fkg from "./Util";
import Carousel from "react-native-snap-carousel";
import MediaCard from "../components/MediaCard";
import Floor from "../commodity/Floor";
import { Col, Row, Grid } from "react-native-easy-grid";
import FloorDisplay from "../components/FloorDisplay";
import CategoryBar from "../components/CategoryBar";
import { Navigation } from "react-native-navigation";
import { showSecondaryPage } from "./showSecondaryPage";
import util from "../common/Const";
//import ReactNativeComponentTree from "react/lib/ReactNativeComponentTree";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F5FCFF"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const succ = result => {
      console.log(result);
      this.setState({ entries: result.body });
    };

    const err = result => {
      alert(result);
    };

    fkg.asyncHttpGet("/mall/carousel/search", succ, err);
  }
  async componentDidMount() {
    const regionName = await fkg.getAppItem("regionName");
    const currentType = await fkg.getAppItem("currType");
    let b;
    if (currentType === fkg.B2B) {
      b = "B2B";
    } else {
      b = "B2C";
    }
    util.toastLong("当前商城: " + b + regionName);
  }

  state = {
    search: "",
    entries: []
  };

  search = () => {
    console.log(this.state.search);
    Navigation.push("Home", {
      //Use your stack Id instead of this.pros.componentId
      component: {
        name: "SearchSpecific",
        passProps: {
          data: this.state.search
        },
        options: {
          topBar: {
            visible: true,
            drawBehind: false,
            animate: false,
            text: this.state.search
          },
          bottomTabs: { visible: false, drawBehind: true, animate: true }
        }
      }
    });
  };
  updateSearch = search => {
    this.setState({ search });
    //  console.log(this.state.search);
  };

  _renderItem({ item, index }) {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          Navigation.push("Home", {
            //Use your stack Id instead of this.pros.componentId
            component: {
              name: "CarouselSpecific",
              passProps: {
                data: item
              },
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  animate: false
                },
                bottomTabs: { visible: false, drawBehind: true, animate: true }
              }
            }
          });
        }}
      >
        <View style={styles.slide}>
          <Image
            style={{ width: Dimensions.get("window").width, height: 300 }}
            source={{
              uri: fkg.PIC_URL + item.imageUrl
            }}
          />
        </View>
      </TouchableNativeFeedback>
    );
  }

  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="搜索你喜欢的商品"
              value={this.state.search}
              onChangeText={this.updateSearch}
            />
            <Button transparent onPress={this.search}>
              <Text>搜索</Text>
            </Button>
          </Item>
        </Header>
        <ScrollView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width}
            autoplay
            autoplayInterval={4000}
            autoplayDelay={1000}
            lockScrollWhileSnapping
            enableSnap
            loop
          />
          <CategoryBar
            navigation={item => {
              //showSecondaryPage(item);
              Navigation.push("Home", {
                //Use your stack Id instead of this.pros.componentId
                component: {
                  name: "SecondaryCategoryPage",
                  passProps: {
                    data: item
                  },
                  options: {
                    topBar: {
                      visible: true,
                      drawBehind: false,
                      animate: false,
                      text: item.categorySimpleName
                    },
                    bottomTabs: {
                      visible: false,
                      drawBehind: true,
                      animate: true
                    }
                  }
                }
              });
            }}
          />
          <Floor />
        </ScrollView>
      </Container>
    );
  }
}

export default Home;
