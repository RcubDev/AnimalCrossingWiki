import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image } from 'react-native';
import FossilImages from '../../Images/FossilImages';
import { connect } from 'react-redux';
import { updateFossilDonated } from '../../Redux/CollectionActions';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './FossilDetailScreenStyles';
import { ApplicationState } from '../../../models/ApplicationState/ApplicationState';
import { FossilModel } from '../../../models/CollectionModels/FossilModel';

interface FossilDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState
    updateFossilDonated: typeof updateFossilDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            fossil: FossilModel,
            model: FossilModel
        }
    }
}

interface FossilDetailsState {
    model: FossilModel
}

class FossilDetails extends Component<FossilDetailsProps, FossilDetailsState> {
    index = this.props.route.params.index;
    fossil: FossilModel;

    SetItemDonated = (donated: boolean, index: number) => {
        this.props.updateFossilDonated({ donated, index });
        this.setState({ model: this.props.appState.fossil.fossilCollection[index] });
    }

    constructor(props: FossilDetailsProps) {
        super(props);
        this.index = props.route.params.index;
        this.fossil = props.route.params.model;
    }

    render() {
        let item = this.props.appState.fossil.fossilCollection.find(x => x.id === this.props.route.params.model.id);
        this.fossil = item ? item : this.props.route.params.model
        return (
            <ScrollView style={styles.detailViewScrollView} contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={styles.detailViewContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <View style={styles.fossilNameViewStyling}>
                            <Text style={styles.fossilNameTextStyling}>{this.fossil.setName}</Text>
                        </View>
                        <Image source={FossilImages[this.fossil.name]}></Image>
                        <View style={styles.fossilNameViewStyling}>
                            <Text style={styles.fossilNameTextStyling}>{this.fossil.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox onPress={() => { this.SetItemDonated(!this.fossil.donated, this.fossil.id) }} style={styles.checkBoxTemp} checked={this.fossil.donated}></CheckBox>
                        <View style={styles.valueContainer}>
                            <Image source={require('../../Images/Other/BellBag.png')} style={{ width: 30, height: 30, marginLeft: 5 }}></Image>
                            <Text style={styles.valueText}>{this.fossil.value}</Text>
                        </View>
                    </View>
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{`Blathers Says: ${this.fossil.blathersSays}`}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state: any) => {
    const { appState } = state;
    return { appState }
};
export default connect(mapStateToProps, { updateFossilDonated })(FossilDetails);