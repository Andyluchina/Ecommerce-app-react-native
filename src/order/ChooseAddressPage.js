import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Navigation } from "react-native-navigation";
const styles = StyleSheet.create({
  address: {
    height: 100,
    backgroundColor: "#fffcf2",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    flexDirection: "row"
  },
  addressSpec: {
    justifyContent: "center",
    marginLeft: 20
  }
});

class ChooseAddressPage extends Component {
  constructor(props) {
    super(props);
  }

  onPressAddress = index => {
    console.log(index);
    this.props.choose(index);
    Navigation.pop(this.props.componentId);
  };
  //redirection is still to do.
  render() {
    return (
      <View>
        <ScrollView>
          {this.props.addresses.map((address, index) => {
            return (
              <TouchableOpacity onPress={() => this.onPressAddress(index)}>
                <View style={styles.address}>
                  <View style={styles.addressSpec}>
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      <Text style={{ fontSize: 19, marginRight: 10 }}>
                        {address.reveiptPerson}
                      </Text>
                      <Text>{address.reveiptPhone}</Text>
                    </View>
                    <Text>{address.detailAddress}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default ChooseAddressPage;
