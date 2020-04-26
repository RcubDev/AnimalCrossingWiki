import React, { Component } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import fish from '../../data/fish.json'
// import { Grid } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Card, CardItem, Body, H1, Header, Item, Icon, Input, Button } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { FishModel } from '../../models/models';
import { FishGridItem } from './FishGridItem'
import { AppLoading } from 'expo';
import styles from './FishScreen.styles';
import { FishScreenProps } from '../../models/FishScreen/FishScreenProps';
import { FishScreenState } from '../../models/FishScreen/FishScreenState';
import { FishCardModel } from '../../models/FishScreen/FishCardModel';
import { connect } from 'react-redux';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { Fish } from '../../models/fish';
let startScope:Array<string> = ["(", "["];
let endScope: Array<string> = [")", "]"];
let startValues: Array<string> = ["=", ">", "<", ">=", "<=", "!", "%"];
let endValues:Array<string> = [")", "]", "&", "|"];
class FishScreen extends Component<FishScreenProps, FishScreenState> {
    focusListener: any;
    constructor(props: FishScreenProps){
        super(props);        
        this.state = {
            isReady: false,
            fishList: this.filterFishByText("filter:name%bar|value=1000")
        }
        console.log(this.state.fishList);
    }

    async componentDidMount() {
        this.setState({ isReady: true });
    }

    SetItemCaught = (caught: boolean, index: number) => {
        console.log('caught');
        this.props.updateFishCaught({caught, index});
    }


    SetItemDonated = (donated: boolean, index: number) => {
        console.log('donated');
        this.props.updateFishDonated({donated, index});
    }

    // componentDidUpdate(){
    //     console.log('here2');
    //     if(this.props.collections.fish !== this.state.fishList){
    //         this.setState({fishList: this.props.collections.fish});
            
    //     }
    // }
    
    //Start Region

    filterFishByText(text:string): Array<FishCardModel>  {
        var allFish = this.props.collections.fish
        //read text until key word -- if no key words involved assume name
        let fishArray: Array<FishCardModel> = [];
        let filterSpecial = text.includes("filter:");
        debugger;        
        
        if(filterSpecial){
            fishArray = this.filterFishByTextSpecial(text.substr(7), this.props.collections.fish);
        }
        else{
            fishArray = allFish.filter(x => x.fish.fishName.toLowerCase().includes(text));              
            
        }
        return fishArray;
    }

    filterFishByTextSpecial(text: string, fishCollection: Array<FishCardModel>): Array<FishCardModel> {
        //Read text until key word is found
        let currentString = "";
        let scopedKeyWord = "";
        let scopedResults: Array<FishCardModel> = fishCollection;

        for(let i = 0; i < text.length; i++){
            if(startScope.includes(text[i])){
                // currentResults = 
                //Get the entire string between parens and such
                let endIndex = this.GetInnerFilterString(text.substr(i));
                let newText = text.substring(i, endIndex);
                //let scopedResults = this.filterFishByTextSpecial(newText);
                if(endIndex + 1 ==  text.length) {
                    return scopedResults;
                }
                else{
                    let restOfString = text.substr(endIndex);
                    if(text[i] == "&"){
                        //return scopedResults.filter(x => this.filterFishByTextSpecial(restOfString).indexOf(x) > -1);
                    }
                    else if(text[i] == "|"){
                        //return scopedResults.concat(this.filterFishByTextSpecial(restOfString));
                    }
                    else{
                        throw "Invalid Text";
                    }
                }                
            }
            else if(startValues.includes(text[i])){
                //Small chunk that needs to return result.
                console.log(currentString);
                let restOfString = "";
                let endValueIndex = 0;
                let hasFoundEndOfText = false;
                for(let k = i; k <= text.length; k++){
                    if(!hasFoundEndOfText){
                        if( k >= text.length || endValues.includes(text[k])) {
                            endValueIndex = k;
                            hasFoundEndOfText = true;
                            scopedResults = this.FilterCollection(currentString, restOfString, scopedResults);    
                            if(k <= text.length && text[k] == "&"){
                                return scopedResults.filter(x => this.filterFishByTextSpecial(text.substr(k + 1), scopedResults).indexOf(x) > -1);
                            }
                            else if(k <= text.length && text[k] == "|"){
                                return scopedResults.concat(this.filterFishByTextSpecial(text.substr(k + 1), this.props.collections.fish));
                            }
                            else{
                                //invalid character
                            }
                        }
                        else{
                            restOfString = restOfString.concat(text[k]);
                        }
                    }
                }
                //Set currentIndex = to the already evaluated characters
                i = endValueIndex;
                console.log('found a startValue!');
            }
            else{
                //Keep going
                currentString  = currentString.concat(text[i]);
            }
        }
        console.log('returning scopped results');
        return scopedResults;
    }

    FilterCollection(type:string, restOfString: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        let operation = restOfString[0];
        if(operation === ">" || operation === "<" || operation === "!"){
            if(restOfString[1] === "="){
                operation = operation.concat("=");
            }            
        }
        else if(operation === "["){
            operation = "range";
        }
        //TODO: Add Operation + Type validator

        restOfString = restOfString.substr(operation.length);
        switch (type.toLowerCase()) {
            case "value":
                return this.FilterByValue(restOfString, operation, currentList);
            case "name":
                return this.FilterByName(restOfString, operation, currentList);
            case "location":
                return this.FilterByLocation(restOfString, operation, currentList);
            case "shadowsize":
            case "size":
                return this.FilterByShadowSize(restOfString, operation, currentList);
            case "rarity":
                return this.FilterByRarity(restOfString, operation, currentList);
            case "weather":
                return this.FilterByWeather(restOfString, operation, currentList);
            case "time":
                return this.FilterByTime(restOfString, operation, currentList);
            case "now":
                return this.FilterByNow(restOfString, operation, currentList);
            case "month":
                return this.FilterByMonth(restOfString, operation, currentList);
            case "caught":
                return this.FilterByCaught(restOfString, operation, currentList);
            case "donated":
                return this.FilterByDonated(restOfString, operation, currentList);
            default:
                return currentList;
        }

    }
    
    FilterByLocation(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByShadowSize(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByRarity(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByWeather(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByTime(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByNow(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByMonth(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByCaught(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByDonated(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        return [];
    }

    FilterByName(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        switch(operation){
            //TODO Add !%
            case "%":
                return currentList.filter(x => x.fish.fishName.toLowerCase().includes(value.toLowerCase()));
            case "=":
                return currentList.filter(x => x.fish.fishName.toLowerCase() === value.toLowerCase());
            case "!=":
                return currentList.filter(x => x.fish.fishName.toLowerCase() !== value.toLowerCase());
            default:
                return [];
        }
    }

    FilterByValue(value: string, operation: string, currentList: Array<FishCardModel>): Array<FishCardModel>{
        //check that value is indeed a number if not a number return []
        if(isNaN(+value)){
            return []
        }
        switch(operation){
            case ">=":
                return currentList.filter(x => x.fish.value >= +value);
            case ">":
                return currentList.filter(x => x.fish.value > +value);
            case "<":
                return currentList.filter(x => x.fish.value < +value);
            case "<=":
                return currentList.filter(x => x.fish.value <= +value);
            case "=":
                return currentList.filter(x => x.fish.value === +value);                                                                                        
            case "!=":
                return currentList.filter(x => x.fish.value !== +value);
            default:
                return currentList;
        }
    }


    readUntilSpecialCharacter(character: string){
        if(character == "]"){

        }
    }

    GetInnerFilterString(text: string): number{
        for(let i = 0; i < text.length; i ++){
            if(endScope.includes(text[i])){
                return i;
            }
        }
        return -1;
    }

    // getKeyWord()

    // getKeyWordEnumValue(currentString: string): number{
    //     let returnVal = -1;
    //     if(currentString.includes("(")){
    //         return 1;            
    //     }
    //     else if(currentString.includes("&")){
    //         return 2;
    //     }
    //     else if(currentString.includes("|")){
    //         return 3;
    //     }
    //     else if(currentString.includes("[")){
    //         return 4;
    //     }
    //     else if(currentString.includes("]")){
    //         return 5;            
    //     }
    //     else if(currentString.includes("range:")){
    //         return 6;
    //     }
    //     else if(currentString.includes("")){
    //         return 7;
    //     }
    //     else if(currentString.includes("")){
    //         return 8;
    //     }
    //     else if(currentString.includes("")){
    //         return 9;
    //     }
    //     else if(currentString.includes("")){
    //         return 10;
    //     }
    //     else if(currentString.includes("")){
    //         return 11;
    //     }
    //     else if(currentString.includes("")){
            
    //     }
    //     return returnVal;
    // }
    //End Region

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        return (
                <Container style={{backgroundColor: "#c2b280"}}>
                    <Header searchBar rounded>
                        <Item>
                           <Icon name="ios-search"></Icon> 
                           <Input placeholder="Search" onChangeText={text => this.filterFishByText(text)}></Input>                           
                        </Item>
                        <Button transparent>
                            <Text>Advanced</Text>
                        </Button>
                    </Header>
                        <FlatList
                            data={this.state.fishList}
                            renderItem={({ item, index }: {item: FishCardModel, index: number}) => <FishGridItem model={item} index={index} nav={this.props.navigation} 
                                            updateFishCaught={this.SetItemCaught} updateFishDonated={this.SetItemDonated} />}                            
                            numColumns={4}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{justifyContent: "center",  alignItems: 'center', alignContent: 'center' }}
                            style={{flex: 1}}
                            >
                        </FlatList>
                </Container>
            )
        };        
}

const mapStateToProps = (state: any) => {
    const { collections } = state;
    return { collections }
  };
  
export default connect(mapStateToProps, {updateFishCaught, updateFishDonated})(FishScreen);
