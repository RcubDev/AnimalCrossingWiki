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
import { updateFishCaught, updateFishDonated } from '../Redux/CollectionActions';

//let items: Array<FishCardModel> = fish.map(x => { return { fish:x, caught: false, donated: false} } );

class FishScreen extends Component<FishScreenProps, FishScreenState> {
    focusListener: any;
    constructor(props: FishScreenProps){
        super(props);
        this.state = {
            isReady: false,
            fishList: this.props.collections.fish
        }
    }

    UpdateState(){
        this.setState({fishList: this.props.collections.fish});
    };

    async componentDidMount() {
        this.setState({ isReady: true });
        this.props.navigation.addListener('didFocus', () => {
            console.log('here');
        });
    }

    SetItemCaught = (caught: boolean, index: number) => {
        console.log('caught');
        this.props.updateFishCaught({caught, index});
        this.setState({fishList: this.props.collections.fish});
    }


    SetItemDonated = (donated: boolean, index: number) => {
        console.log('donated');
        this.props.updateFishDonated({donated, index});
        this.setState({fishList: this.props.collections.fish});
    }

    render(){
        if (!this.state.isReady) {
            return <AppLoading />;
        }
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
                        <FlatList
                            data={this.props.collections.fish}
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
    console.log('here');
    const { collections } = state;
    return { collections }
  };
  
export default connect(mapStateToProps, {updateFishCaught, updateFishDonated})(FishScreen);
