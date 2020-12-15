import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { products: null };
    this.fetchProducts = this.fetchProducts.bind(this);
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    this.setState({
      loading: true,
    });
    const url = "https://api.covid19india.org/data.json";

    let response = await fetch(url, {
      method: "GET",
    });
    let responseJson = await response.json();
    this.setState({
      loading: false,
      products: responseJson.statewise,
    });
  }
  render() {
    console.log(this.state.products);
    return (
      <View>
        <View
          style={{
            backgroundColor: "#6666FF",
            height: 200,
            flexDirection: "row",
          }}
        >
          <Image
            style={{ height: 450, width: 120 }}
            source={require("./Head.png")}
          />
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              marginTop: 50,
              marginRight: 50,
              fontSize: 40,
            }}
          >
            All you have to do is stay at home.
          </Text>
        </View>
        <FlatList
          style={{ backgroundColor: "#fff" }}
          data={this.state.products}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View
                style={{
                  borderWidth: 2,
                  margin: 5,
                  height: 100,
                  marginLeft: 10,
                  marginRight: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>State:</Text>
                  <Text style={{ marginLeft: 20 }}>{item.state}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Total Cases:</Text>
                  <Text style={{ marginLeft: 20 }}>{item.confirmed}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Active Cases:</Text>
                  <Text style={{ marginLeft: 20 }}>{item.active}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Recovered Cases:</Text>
                  <Text style={{ marginLeft: 20 }}>{item.recovered}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Death Cases:</Text>
                  <Text style={{ marginLeft: 20 }}>{item.deaths}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
