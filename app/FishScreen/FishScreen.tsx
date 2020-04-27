import React, { Component } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import fish from '../../data/fish.json'
// import { Grid } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, Card, CardItem, Body, H1, Header, Item, Icon, Input, Button } from 'native-base';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { FishGridItem } from './FishGridItem'
import { AppLoading } from 'expo';
import styles from './FishScreen.styles';
import { FishScreenProps } from '../../models/FishScreen/FishScreenProps';
import { FishScreenState } from '../../models/FishScreen/FishScreenState';
import { connect } from 'react-redux';
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';
import { Fish } from '../../models/fish';
import { filterCollectionByTextSpecial } from '../Filter/Filter';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { FilterCollectionFish } from '../Filter/FishFilter';


class FishScreen extends Component<FishScreenProps, FishScreenState> {
    focusListener: any;
    constructor(props: FishScreenProps){
        super(props);        
        this.state = {
            isReady: false,
            fishList: this.filterFishByText("filter:name%bar|(name=koi|name=pale chub&(value>=200))")
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

    filterFishByText(text:string): Array<NewFishModel>  {
        
        var allFish = this.props.collections.fishCollection
        //read text until key word -- if no key words involved assume name
        let fishArray: Array<NewFishModel> = [];
        let filterSpecial = text.includes("filter:");
        debugger;        
        
        if(filterSpecial){
            try{
                //Check matching parens before doing this. If they're not matching return no fish.
                fishArray = filterCollectionByTextSpecial(text.substr(7), this.props.collections.fishCollection, FilterCollectionFish<NewFishModel>("", "", "", []));
            }
            catch(err){
                console.error(err);
                console.error('an error occured parsing your filter text. Check your parenthesis.');
                fishArray = [];
            }
            
        }
        else{
            fishArray = allFish.filter(x => x.name.toLowerCase().includes(text));              
            
        }
        return fishArray;
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
                            renderItem={({ item, index }: {item: NewFishModel, index: number}) => <FishGridItem model={item} index={index} nav={this.props.navigation} 
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
