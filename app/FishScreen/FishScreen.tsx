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
import _ from 'lodash';
let startScope:Array<string> = ["("];
let endScope: Array<string> = [")"];
let startValues: Array<string> = ["=", ">", "<", ">=", "<=", "!", "%"];
let endValues:Array<string> = [")", "]", "&", "|"];
class FishScreen extends Component<FishScreenProps, FishScreenState> {
    focusListener: any;
    constructor(props: FishScreenProps){
        super(props);        
        this.state = {
            isReady: false,
            fishList: this.filterFishByText("filter:name%bar|((name=koi)))|name=pale chub&(value=200)))")
            //name%bar|(name=koi|name=pale chub&(value=200))
            //name%bar|(name=koi|name=pale chub)
            //(name%bar|value=1000)&value=900 - GOOD
            //(name%bar|value=1000)&(value=900|name=koi)  - GOOD   
            //(name%bar&value=5000)|(value=900|name=koi)|(name=pale chub&name=black bass) - GOOD
            //(value>=1000&value<=10000)&(name%a) - GOOD
            //((value>=1000&value<=10000)&(name%a))&(name=Barred Knifejaw) - GOOD
            //(value>=1000&value<=10000)&name%a - GOOD
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

    filterFishByText(text:string): Array<FishCardModel>  {
        
        var allFish = this.props.collections.fish
        //read text until key word -- if no key words involved assume name
        let fishArray: Array<FishCardModel> = [];
        let filterSpecial = text.includes("filter:");
        debugger;        
        
        if(filterSpecial){
            try{
                //Check matching parens before doing this. If they're not matching return no fish.
                fishArray = this.filterFishByTextSpecial(text.substr(7), this.props.collections.fish);
            }
            catch(err){
                console.error(err);
                console.error('an error occured parsing your filter text. Check your parenthesis.');
                fishArray = [];
            }
            
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
        let valuesEnteredWith: Array<FishCardModel> = fishCollection;
        let valuesWaitingForConjunction: Array<FishCardModel> = [];
        let valuesToReturnWith: Array<FishCardModel> = [];
        let index = 0;
        let type = "";
        let shouldApplyConjunction = false;
        let nextConjunctionType = "";
        let valuesAreWaitingForConjuction = false;
        while(index < text.length){
            let scopedResults:Array<FishCardModel> = [];
            if(startScope.includes(text[index])){
                let endIndexNumber = this.FindMatchingParen(text.substr(index + 1));
                if(endIndexNumber === -1){
                    throw "No matching end paren. Exiting.";                    
                }
                
                //valuesToReturnWith = valuesWaitingForConjunction;
                //let valuesWaiting = valuesWaitingForConjunction;                
                if(valuesAreWaitingForConjuction){
                    valuesToReturnWith = _.union(valuesToReturnWith, valuesWaitingForConjunction);
                }
                valuesWaitingForConjunction = this.filterFishByTextSpecial(text.substr(index + 1), valuesEnteredWith);      
                //valuesToReturnWith = valuesToReturnWith.concat(valuesWaitingForConjunction);
                //be aware of index out of bounds
                let newIndex = index + endIndexNumber;
                index = newIndex;
                if(nextConjunctionType === ""){
                    //index += this.FindMatchingParen(text.substr(index + 1));
                    if(text[index + 1] === "&" || text[index + 1] === "|") {
                        valuesAreWaitingForConjuction = true;
                        index++;
                        nextConjunctionType = text[index];
                        valuesToReturnWith = valuesWaitingForConjunction;
                    }
                }
                else {
                    valuesToReturnWith = this.ApplyConjunction(nextConjunctionType, valuesToReturnWith, valuesWaitingForConjunction);
                    valuesAreWaitingForConjuction =  false;
                    if(text[index + 1] === "&" || text[index + 1] === "|") {
                        valuesAreWaitingForConjuction = true;
                        index++;
                        nextConjunctionType = text[index];                        
                    }
                }
            }
            else if(text[index] === ")"){
                if(valuesAreWaitingForConjuction){
                    let newRes = this.FilterCollection(type, currentString, valuesEnteredWith);
                    valuesToReturnWith = valuesToReturnWith.concat(this.ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
                }
                else if(type !== "" && currentString !== ""){
                    valuesToReturnWith = this.FilterCollection(type, currentString, valuesEnteredWith);
                }                
                return valuesToReturnWith;
            }
            else if(text[index] === "&"){
                if(valuesAreWaitingForConjuction){
                    let newRes = this.FilterCollection(type, currentString, valuesEnteredWith);
                    valuesToReturnWith = valuesToReturnWith.concat(this.ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
                }
                else{
                    valuesWaitingForConjunction = this.FilterCollection(type, currentString, valuesEnteredWith);
                    valuesAreWaitingForConjuction = true;
                }
                currentString  ="";
                nextConjunctionType = "&";                                                                    
            }
            else if(text[index] === "|"){
                if(valuesAreWaitingForConjuction){
                    let newRes = this.FilterCollection(type, currentString, valuesEnteredWith);
                    valuesToReturnWith = valuesToReturnWith.concat(this.ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, newRes));
                    valuesAreWaitingForConjuction = false;
                }
                else{
                    valuesWaitingForConjunction = this.FilterCollection(type, currentString, valuesEnteredWith);
                    valuesAreWaitingForConjuction = true;
                }
                currentString = "";
                nextConjunctionType = "|";
            }
            else if(startValues.includes(text[index])){
                console.log(currentString);
                type = currentString;
                currentString = text[index];
                if(index + 1 < text.length && startValues.includes(text[index + 1])){
                    currentString = currentString.concat(text[index + 1]);
                    index++;
                }
            }
            else{
                currentString  = currentString.concat(text[index]);
            }


            index++;
        }
        if(valuesAreWaitingForConjuction){
            let lastCall = this.FilterCollection(type, currentString, valuesEnteredWith);
            valuesToReturnWith = this.ApplyConjunction(nextConjunctionType, valuesWaitingForConjunction, lastCall);
        }
        console.log('returning scopped results');
        return valuesToReturnWith;
    }

    ApplyConjunction(conjunction: string, leftSide: Array<FishCardModel>, rightSide: Array<FishCardModel>) {
        if(conjunction === "|"){
            return leftSide.concat(rightSide);
        }
        else if(conjunction === "&"){
            return leftSide.filter(x => rightSide.indexOf(x) > -1);
        }
        else{
            console.error('How did you enter here?');
        }
        return rightSide;
    }

    FindMatchingParen(textAfterOpenParen: string): number{
        let index = -1;
        let numberOfOpenParens = 1;
        let numberOfClosedParens = 0;
        for(let i = 0; i < textAfterOpenParen.length; i++){
            if(textAfterOpenParen[i] === "("){
                numberOfOpenParens++;
            }
            else if(textAfterOpenParen[i] === ")"){
                numberOfClosedParens++
            }
            if(numberOfOpenParens === numberOfClosedParens){
                return i + 1;
            }
        }

        return index;
    }


    FilterCollection(type:string, restOfString: string, valuesEnteredWith: Array<FishCardModel>): Array<FishCardModel>{
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
                return this.FilterByValue(restOfString, operation, valuesEnteredWith);
            case "name":
                return this.FilterByName(restOfString, operation, valuesEnteredWith);
            case "location":
                return this.FilterByLocation(restOfString, operation, valuesEnteredWith);
            case "shadowsize":
            case "size":
                return this.FilterByShadowSize(restOfString, operation, valuesEnteredWith);
            case "rarity":
                return this.FilterByRarity(restOfString, operation, valuesEnteredWith);
            case "weather":
                return this.FilterByWeather(restOfString, operation, valuesEnteredWith);
            case "time":
                return this.FilterByTime(restOfString, operation, valuesEnteredWith);
            case "now":
                return this.FilterByNow(restOfString, operation, valuesEnteredWith);
            case "month":
                return this.FilterByMonth(restOfString, operation, valuesEnteredWith);
            case "caught":
                return this.FilterByCaught(restOfString, operation, valuesEnteredWith);
            case "donated":
                return this.FilterByDonated(restOfString, operation, valuesEnteredWith);
            default:
                return valuesEnteredWith;
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
