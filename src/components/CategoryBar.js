import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  AsyncStorage,
  FlatList,
  ScrollView
} from "react-native";
import fkg from "../common/Util";
import { Col, Row, Grid } from "react-native-easy-grid";
import CategoryIcons from "./CategoryIcons";
var _ = require("lodash");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    height: 200,
    backgroundColor: "#fffcf2",
    marginTop: 10,
    marginLeft: 7,
    marginRight: 7,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1
  }
});

class CategoryBar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const succ = result => {
      this.setState({ data: this.splitData(result.body) });
      console.log(result.body);
      //  alert("in success");
    };

    const err = result => {
      console.log(result);
      alert(result);
    };
    const param = JSON.stringify({ parentId: 8 });

    fkg.asyncHttpPost("/commodity/category/search", param, succ, err);
  }

  refinedData = fourth => {
    return _.map(fourth, row => {
      return {
        SecondaryTitle: {
          name: row.second,
          id: row.first
        },
        thirdTitles: this.refineThirdLevelTitle(row.fourth)
      };
    });
  };

  refineThirdLevelTitle = Tfourth => {
    return _.map(Tfourth, row => {
      return {
        name: row.third,
        id: row.first
      };
    });
  };

  state = {
    data: []
  };

  splitData = data => {
    const len = Math.ceil(data.length / 2);
    const refined = [data.slice(0, len), data.slice(len)];
    return refined;
  };

  getIcon = items => {
    return items.map(item => {
      return (
        <CategoryIcons
          data={item}
          key={JSON.stringify(item)}
          navigation={this.props.navigation}
        />
      );
    });
  };
  //redirection is still to do.
  render() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={styles.container}>
          <Grid>
            {this.state.data.map(items => {
              return (
                <Row key={JSON.stringify(items)}>{this.getIcon(items)}</Row>
              );
            })}
          </Grid>
        </View>
      </ScrollView>
    );
  }
}

export default CategoryBar;
