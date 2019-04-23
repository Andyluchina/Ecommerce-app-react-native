import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  AsyncStorage,
  FlatList,
  Button,
  TouchableNativeFeedback
} from "react-native";
import fkg from "../common/Util";
import ThirdCateButton from "../components/ThirdCateButton";
import FloorSpecificDisplay from "../components/FloorSpecificDisplay";

class SecondarySpecificPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //fetch data
    if (!this.props.main) {
      const succ = result => {
        console.log(result.body);
        this.setState({
          thirdCate: result.body
        });
        //need to load cate2
        console.log(this.props);
        const succ = result => {
          console.log(result.body);
          this.setState({
            commodity: result.body
          });
        };

        const err = result => {
          alert(result);
        };
        let param;
        param = JSON.stringify({
          category2Id: this.props.cateid.id,
          pageNo: 1
        });

        fkg.asyncHttpPost(
          "/commodity/b2c/global/commodity/search",
          param,
          succ,
          err
        );
      };

      const err = result => {
        alert(result);
      };
      const param = JSON.stringify({ parentId: this.props.cateid.id });

      fkg.asyncHttpPost("/commodity/category/search", param, succ, err);
    } else {
      const succ = result => {
        console.log(result.body);
        this.setState({
          commodity: result.body
        });
      };

      const err = result => {
        alert(result);
      };

      let param;
      param = JSON.stringify({
        category1Id: this.props.cateid,
        pageNo: 1
      });

      fkg.asyncHttpPost(
        "/commodity/b2c/global/commodity/search",
        param,
        succ,
        err
      );
    }
  }

  state = {
    thirdCate: [],
    commodity: []
  };

  renderButtons = () => {
    if (this.props.main) {
      return <View />;
    }
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        <ThirdCateButton
          title="精选"
          onPress={() => this.onPressThirdButton(this.props.cateid, true)}
        />
        {this.state.thirdCate.map(item => (
          <ThirdCateButton
            title={item.categorySimpleName}
            onPress={() => this.onPressThirdButton(item.id, false)}
          />
        ))}
      </View>
    );
  };
  onPressThirdButton = (item, isCate2) => {
    if (isCate2) {
      const succ = result => {
        console.log(result.body);
        this.setState({
          commodity: result.body
        });
      };

      const err = result => {
        alert(result);
      };
      let param;
      param = JSON.stringify({
        category2Id: item.id
      });

      fkg.asyncHttpPost(
        "/commodity/b2c/global/commodity/search",
        param,
        succ,
        err
      );
    } else {
      const succ = result => {
        console.log(result.body);
        this.setState({
          commodity: result.body
        });
      };

      const err = result => {
        console.log(result);
      };

      let param;
      param = JSON.stringify({
        category3Id: item
      });

      fkg.asyncHttpPost(
        "/commodity/b2c/global/commodity/search",
        param,
        succ,
        err
      );
    }
  };
  renderCommodity = () => {
    return <FloorSpecificDisplay data={this.state.commodity} />;
  };
  render() {
    return (
      <View>
        {this.renderButtons()}
        {this.renderCommodity()}
      </View>
    );
  }
}

export default SecondarySpecificPage;
