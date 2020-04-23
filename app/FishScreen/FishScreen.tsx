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
import {bindActionCreators} from 'redux'
import { updateFishCaught } from '../Redux/CollectionActions';

let items: Array<FishCardModel> = fish.map(x => { return { fish:x, caught: false, donated: false} } );

class FishScreen extends Component<FishScreenProps, FishScreenState> {

    

    constructor(props: FishScreenProps){
        super(props);
        this.state = {
            isReady: false,
            fishList: items
        }
        console.log(props);
        // this.props.collections = {
        //     isReady: false
        // }
        //this.SetItemCaught = this.SetItemCaught.bind(this);
    }

    async componentDidMount() {
        this.setState({ isReady: true });
    }

    SetItemCaught = (caught: boolean, index: number) => {
        console.log('caught');
        var list = this.props.collections.fish;
        list[index].caught = caught;
        //this.setState({fishList: list});
    }


    SetItemDonated = (donated: boolean, index: number) => {
        console.log('donated');
        var list = this.props.collections.fish;
        list[index].donated = donated;
        if(donated){
            list[index].caught = donated;
        }
        //this.setState({fishList: list});
    }

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        debugger;
        console.log(this.props);
        return (
                <Container style={{backgroundColor: "#c2b280"}}>
                    <Header searchBar rounded>
                        <Item>
                           <Icon name="ios-search"></Icon> 
                           <Input placeholder="Search"></Input>                           
                        </Item>
                        <Button transparent>
                            <Text>Advanced</Text>
                        </Button>
                    </Header>
                        <Button  onPress={() => {
                                console.log(this.props);
                                this.props.updateFishCaught({index: 0, caught: !this.state.fishList[0].caught})
                                debugger;
                                console.log('here');
                                this.setState({fishList: this.props.collections.fish});
                            }} style={{width:100, height:100}}><Text>Press ME!</Text></Button>
                        <FlatList
                            data={this.state.fishList}
                            renderItem={({ item, index }: {item: FishCardModel, index: number}) => <FishGridItem model={item} index={index} nav={this.props.navigation} 
                                            updateFishCaught={this.SetItemCaught} updateFishDonated={this.SetItemDonated} />}                            
                            numColumns={Platform.OS !== 'web' ? 3 : 5}
                            keyExtractor={(item, index) => index.toString()}                
                            >
                        </FlatList>
                </Container>
            )
        };        
}

const mapStateToProps = (state: any) => {
    const { collections } = state    
    return { collections }
  };
  
export default connect(mapStateToProps, {updateFishCaught})(FishScreen);


