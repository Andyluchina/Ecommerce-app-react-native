import React, { Component } from "react";
import { Image, TouchableNativeFeedback, Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import fkg from "../common/Util";

const styles = {
  priceText: {
    fontSize: 20,
    color: "#ffa13d"
  }
};
class MediaCard extends Component {
  render() {
    return (
      <Container
        style={{
          width: Dimensions.get("window").width / 2,
          height: 300,
          justifyContent: "center"
        }}
      >
        <Content>
          <TouchableNativeFeedback
            onPress={event => {
              this.props.navigate(this.props.data);
            }}
          >
            <Card>
              <CardItem cardBody>
                <Image
                  source={{
                    uri: fkg.PIC_URL + this.props.data.commodityPicUri
                  }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem style={{ paddingBottom: 0, marginBottom: 0 }}>
                <Body>
                  <Text>{this.props.data.commodityName}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={styles.priceText}>
                    &yen;{this.props.data.price}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          </TouchableNativeFeedback>
        </Content>
      </Container>
    );
  }
}

export default MediaCard;

// <CardItem>
//   <Left>
//     <Thumbnail source={{ uri: "Image URL" }} />
//     <Body>
//       <Text>NativeBase</Text>
//       <Text note>GeekyAnts</Text>
//     </Body>
//   </Left>
// </CardItem>

// <Left>
//   <Button transparent>
//     <Icon active name="thumbs-up" />
//     <Text>12 Likes</Text>
//   </Button>
// </Left>
//
// <Body>
//   <Button transparent>
//     <Icon active name="chatbubbles" />
//     <Text>4 Comments</Text>
//   </Button>
// </Body>

// <Left>
//   <Text>商品名称</Text>
// </Left>
// <Right>
//   <Text>价格</Text>
// </Right>
