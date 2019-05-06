import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Carousel from "react-native-snap-carousel";
import fkg from "../common/Util";
class CommodityDisplay extends Component {
  constructor(props) {
    super(props);
  }
  //redirection is still to do.
  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          style={{ width: Dimensions.get("window").width, height: 300 }}
          source={{
            uri: fkg.PIC_URL + item
          }}
        />
      </View>
    );
  }
  renderSpecs = () => {
    var arr = Object.keys(this.props.specSelected);
    var i;
    let text = "";
    for (i = 0; i < arr.length; i++) {
      text += this.getAttrName(arr[i], this.props.specSelected[arr[i]]) + " ";
    }
    return text;
  };
  getAttrName = (key, value) => {
    const arr = this.props.specsMap.get(key);
    var i;
    if (!arr) {
      return;
    }
    for (i = 0; i < arr.length; i++) {
      if (arr[i].vi === value) {
        return arr[i].v;
      }
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
        <ScrollView>
          <View>
            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.props.entries}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              lockScrollWhileSnapping
              enableSnap
              loop
            />
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Text style={styles.description}>
                {this.props.data.commodityName}
              </Text>
            </View>
            <View style={styles.priceTagWrap}>
              <Text style={styles.priceTag}>
                &yen;{this.props.selectedSpec.fkgouPrice}
              </Text>
            </View>
          </View>
          <View style={styles.chosen}>
            <Text style={styles.chosenText}>已选</Text>
            <Text style={styles.chosenText}>
              {this.props.quantity}件，{this.renderSpecs()}
            </Text>
          </View>
          <TouchableOpacity onPress={this.props.onChangeDisplay}>
            <View
              style={{
                height: 50,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 30 }}>点击了解更多</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    fontSize: 25,
    fontWeight: "200",
    color: "#222323"
  },
  descriptionSmall: {
    fontSize: 18,
    color: "#222323"
  },
  priceTag: {
    fontSize: 26,
    fontWeight: "300",
    color: "#d35800"
  },
  priceTagWrap: {
    marginTop: 12
  },
  infoWrap: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  },
  chosen: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    marginTop: 15,
    flexDirection: "row"
  },
  chosenText: {
    fontSize: 18,
    fontWeight: "200",
    color: "#222323"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    paddingRight: 20,
    paddingLeft: 20
  },
  icons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  putInCart: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#8ae000",
    borderColor: "#8ae000",
    paddingTop: 10,
    paddingBottom: 10,
    width: 90,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20
  },
  buyNow: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    backgroundColor: "#c3e80b",
    borderColor: "#c3e80b",
    paddingTop: 10,
    paddingBottom: 10,
    width: 90,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20
  }
});
export default CommodityDisplay;
