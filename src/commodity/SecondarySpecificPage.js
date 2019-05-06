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

  async componentWillMount() {
    //fetch data
    if (!this.props.main) {
      const succ = async result => {
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
        const orgId = await fkg.getAppItem("currOperatorId");
        let param;
        param = JSON.stringify({
          category2Id: this.props.cateid.id,
          pageNo: 1,
          orgId
        });
        const mallType = await fkg.getAppItem("currMall");
        const tradeType = await fkg.getAppItem("currType");
        let uri = "";
        if (fkg.G_MALL == mallType) {
          if (fkg.B2B == tradeType) {
            uri = `/commodity/b2b/global/commodity/search`;
          } else if (fkg.B2C == tradeType) {
            uri = `/commodity/b2c/global/commodity/search`;
          }
        } else if (fkg.R_MALL == mallType) {
          if (fkg.B2B == tradeType) {
            uri = `/commodity/b2b/region/commodity/search`;
          } else if (fkg.B2C == tradeType) {
            uri = `/commodity/b2c/region/commodity/search`;
          }
        }
        fkg.asyncHttpPost(uri, param, succ, err);
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
      const orgId = await fkg.getAppItem("currOperatorId");
      let param;
      param = JSON.stringify({
        category1Id: this.props.cateid,
        pageNo: 1,
        orgId
      });

      const mallType = await fkg.getAppItem("currMall");
      const tradeType = await fkg.getAppItem("currType");
      let uri = "";
      if (fkg.G_MALL == mallType) {
        if (fkg.B2B == tradeType) {
          uri = `/commodity/b2b/global/commodity/search`;
        } else if (fkg.B2C == tradeType) {
          uri = `/commodity/b2c/global/commodity/search`;
        }
      } else if (fkg.R_MALL == mallType) {
        if (fkg.B2B == tradeType) {
          uri = `/commodity/b2b/region/commodity/search`;
        } else if (fkg.B2C == tradeType) {
          uri = `/commodity/b2c/region/commodity/search`;
        }
      }
      fkg.asyncHttpPost(uri, param, succ, err);
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
  onPressThirdButton = async (item, isCate2) => {
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
      const orgId = await fkg.getAppItem("currOperatorId");
      let param;
      param = JSON.stringify({
        category2Id: item.id,
        orgId,
        pageNo: 1
      });
      const mallType = await fkg.getAppItem("currMall");
      const tradeType = await fkg.getAppItem("currType");
      let uri = "";
      if (fkg.G_MALL == mallType) {
        if (fkg.B2B == tradeType) {
          uri = `/commodity/b2b/global/commodity/search`;
        } else if (fkg.B2C == tradeType) {
          uri = `/commodity/b2c/global/commodity/search`;
        }
      } else if (fkg.R_MALL == mallType) {
        if (fkg.B2B == tradeType) {
          uri = `/commodity/b2b/region/commodity/search`;
        } else if (fkg.B2C == tradeType) {
          uri = `/commodity/b2c/region/commodity/search`;
        }
      }
      fkg.asyncHttpPost(uri, param, succ, err);
    } else {
      const succ = result => {
        console.log(result);
        this.setState({
          commodity: result.body
        });
      };

      const err = result => {
        console.log(result);
      };
      const orgId = await fkg.getAppItem("currOperatorId");
      let param;
      param = JSON.stringify({
        category3Id: item,
        orgId
      });
      const mallType = await fkg.getAppItem("currMall");
      const tradeType = await fkg.getAppItem("currType");
      let uri = "";
      if (fkg.G_MALL == mallType) {
        if (fkg.B2B == tradeType) {
          uri = `/commodity/b2b/global/commodity/search`;
        } else if (fkg.B2C == tradeType) {
          uri = `/commodity/b2c/global/commodity/search`;
        }
      } else if (fkg.R_MALL == mallType) {
        if (fkg.B2B == tradeType) {
          uri = `/commodity/b2b/region/commodity/search`;
        } else if (fkg.B2C == tradeType) {
          uri = `/commodity/b2c/region/commodity/search`;
        }
      }
      fkg.asyncHttpPost(uri, param, succ, err);
    }
  };
  renderCommodity = () => {
    return (
      <FloorSpecificDisplay data={this.state.commodity} mode={"display"} />
    );
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
