import React, { Component } from "react";
import { Text, View, Image, Platform, Modal, AsyncStorage } from "react-native";
import fish from "../../data/fish.json";
// import { Grid } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  H1,
  Header,
  Item,
  Icon,
  Input,
  Button,
} from "native-base";
import { ScrollView, FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FishGridItem } from "./FishGridItem";
import { AppLoading } from "expo";
import styles from "./FishScreen.styles";
import { FishScreenProps } from "../../models/FishScreen/FishScreenProps";
import { FishScreenState } from "../../models/FishScreen/FishScreenState";
import { connect } from "react-redux";
import {
  updateFishCaught,
  updateFishDonated,
  updateFishFilter,
  updateFishCollectionFromStorage
} from "../Redux/CollectionActions";
import { Fish } from "../../models/fish";
import { NewFishModel } from "../../models/CollectionModels/NewFishModel";
import { FilterCollectionFish } from "../Filter/FishFilter";
import { filterCollectionByTextSpecial } from "../Filter/Filter";
import { isListOfFish } from "../Filter/FilterTypes";
import { AdvancedSortFilterFishModel } from "../../models/FishScreen/AdvancedSortFilterFishModel";
import AdvancedFilterSortOptions from "../AdvancedFilter/AdvancedFilterSortOptions";
import { FilterAdvancedFish } from "../AdvancedFilter/FilterAdvanced";

const defaultFishCollection: Array<NewFishModel> = fish.fish;


class FishScreen extends Component<FishScreenProps, FishScreenState> {
  focusListener: any;
  constructor(props: FishScreenProps) {
    super(props);
    this.state = {
      isReady: false,
      filterText: "",
      showFilterModal: false
    };
  }

  async componentDidMount() {
    console.log('componentDidMount');
    const storedFish = await AsyncStorage.getItem('fishStore');
    if(storedFish){
      this.props.updateFishCollectionFromStorage(JSON.parse(storedFish));
    }
    else{
      this.props.updateFishCollectionFromStorage(defaultFishCollection);
      await AsyncStorage.setItem('fishStore', JSON.stringify(defaultFishCollection));
    }
    this.setState({ isReady: true });
  }

  SetItemCaught = (caught: boolean, index: number) => {
    this.props.updateFishCaught({ caught, index });
  };

  SetItemDonated = (donated: boolean, index: number) => {
    this.props.updateFishDonated({ donated, index });
  };

  filterFishByText(text: string, fishes: Array<NewFishModel>): Array<NewFishModel> {
    var allFish = fishes;
    //read text until key word -- if no key words involved assume name
    let fishArray: Array<NewFishModel> = [];
    let filterSpecial = text.includes("filter:");
    text = text.toLowerCase();
    if (filterSpecial) {
      try {
        //Check matching parens before doing this. If they're not matching return no fish.
        let value = filterCollectionByTextSpecial(
          text.substr(7),
          fishes
        );
        if (isListOfFish(value)) {
          fishArray = value;
        }
      } catch (err) {
        fishArray = [];
      }
    } else {
      fishArray = allFish.filter((x) => x.name.toLowerCase().startsWith(text));
    }
    fishArray = fishArray.sort(function (a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    return fishArray;
  }
  //End Region

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    let fish = this.props.collections.fish.fishCollection;
    fish = FilterAdvancedFish(this.props.collections.fish.fishAdvancedSortFilter, fish);
    fish = this.filterFishByText(this.state.filterText, fish);
    
    return (
      <Container>
        <Header>
          <Item style={{ flex: 1 }}>
            <Input
              autoCorrect={false}
              placeholder="Filter"
              onChangeText={(text: string) => {
                this.setState({ filterText: text.toLowerCase() });
              }}
              returnKeyType={"done"}
            ></Input>
            <Button
              transparent
              onPress={() => {
                // this.props.navigation.navigate("FilterAndSortScreen");
                this.setState({showFilterModal:true});
              }}
            >
              <Text> Advanced </Text>
            </Button>
          </Item>
        </Header>
        <FlatList
          data={fish}
          renderItem={({item,index, }: { item: NewFishModel;index: number;}) => (
              <FishGridItem {...{ model: { ...item },nav: this.props.navigation,updateFishCaught: this.props.updateFishCaught,updateFishDonated: this.props.updateFishDonated,}}/>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.flatListContainerContent}
            columnWrapperStyle={{
              justifyContent: "space-evenly",
              flexDirection: "row",
            }}
        ></FlatList>

        {/* <Modal visible={this.state.showFilterModal} transparent={true} animationType="slide">
          <View style={{ height: "50%" }}>
              <TouchableWithoutFeedback onPress={() => {this.setState({showFilterModal:false})}} style={{width:'100%', height:'100%'}}></TouchableWithoutFeedback>
          </View>
          <AdvancedFilterSortOptions></AdvancedFilterSortOptions>
        </Modal> */}
      </Container>
    );
  }
}
const mapStateToProps = (state: any) => {
  const { collections } = state;
  return { collections };
};

export default connect(mapStateToProps, {
  updateFishCaught,
  updateFishDonated,
  updateFishCollectionFromStorage
})(FishScreen);
