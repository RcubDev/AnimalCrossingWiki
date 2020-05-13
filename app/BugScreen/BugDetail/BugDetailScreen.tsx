import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image } from 'react-native';
import BugImages from '../../Images/BugImages';
import { connect } from 'react-redux';
import { updateBugCaught, updateBugDonated } from '../../Redux/CollectionActions';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './BugDetailScreenStyles';
import { ApplicationState } from '../../../models/ApplicationState/ApplicationState';
import { BugModel } from '../../../models/CollectionModels/BugModel';

interface BugDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState
    updateBugCaught: typeof updateBugCaught
    updateBugDonated: typeof updateBugDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            bug: BugModel,
            model: BugModel,
        }
    }
}

interface BugDetailsState {
    model: BugModel
}



class BugDetails extends Component<BugDetailsProps, BugDetailsState> {
    index = this.props.route.params.index;
    bug = this.props.appState.bug.bugCollection[this.index];
    SetItemCaught = (caught: boolean, index: number) => {
        this.props.updateBugCaught({ caught, index });
        this.setState({ model: this.props.appState.bug.bugCollection[index] });
    }


    SetItemDonated = (donated: boolean, index: number) => {
        this.props.updateBugDonated({ donated, index });
        this.setState({ model: this.props.appState.bug.bugCollection[index] });
    }

    constructor(props: BugDetailsProps) {
        super(props);
        this.index = props.route.params.index;
        this.bug = props.route.params.model;
    }

    render() {
        return (
            <ScrollView style={styles.detailViewScrollView} contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={styles.detailViewContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <Image source={BugImages[this.bug.name]}></Image>
                        <View style={styles.bugNameViewStyling}>
                            <Text style={styles.bugNameTextStyling}>{this.bug.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox style={styles.checkBoxTemp} checked={this.bug.caught}></CheckBox>
                        <CheckBox style={styles.checkBoxTemp} checked={this.bug.donated}></CheckBox>
                        <View style={styles.valueContainer}>
                            <Image source={require('../../Images/Other/BellBag.png')} style={{ width: 30, height: 30, marginLeft: 5 }}></Image>
                            <Text style={styles.valueText}>{this.bug.value}</Text>
                        </View>
                    </View>
                    <View style={styles.monthContainer}>
                        <View style={this.bug.monthsAvailable.jan ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Jan"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.feb ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Feb"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.mar ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Mar"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.apr ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Apr"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.may ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"May"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.jun ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Jun"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.jul ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Jul"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.aug ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Aug"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.sep ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Sep"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.oct ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Oct"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.nov ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Nov"}</Text>
                        </View>
                        <View style={this.bug.monthsAvailable.dec ? styles.monthItemSelected : styles.monthItem}>
                            <Text>{"Dec"}</Text>
                        </View>
                    </View>
                    <View style={styles.locationAndTimeContainer}>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Location Image"}</Text>
                            <Text style={{ fontFamily: 'Confortaa' }}>{this.bug.locationName}</Text>
                        </View>
                        <View style={styles.imageAndTextContainer}>
                            {/* TODO: Image Here (remove height from container) */}
                            <Text>{"Clock Image"}</Text>
                            <Text style={{ fontFamily: 'Confortaa' }}>{this.bug.time}</Text>
                        </View>
                    </View>
                    <View style={styles.rarityContainer}>
                        <View style={styles.stylesRarityTextContainer}>
                            {/* TODO: Replace * with images of stars. */}
                            <Text>{"Rarity"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                            <Text>{"*"}</Text>
                        </View>
                    </View>
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{"Blathers Says: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ligula quis imperdiet pharetra. Nunc tincidunt lorem eget nibh vulputate gravida. Aenean a posuere neque. In finibus nunc non turpis fermentum, malesuada sodales odio porta. Praesent et tellus felis. Aenean eget urna ante. Morbi interdum dui dictum, iaculis ante pretium, laoreet diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin eleifend nibh sed molestie. Sed malesuada porttitor ultrices. Vivamus lobortis, eros non interdum maximus, lorem mauris feugiat ligula, blandit interdum neque erat vitae leo. Nullam erat leo, feugiat quis metus nec, lacinia laoreet lacus. Fusce eros lorem, egestas sit amet tincidunt id, lacinia eget nulla. Praesent commodo pharetra dui sed ornare."}</Text>
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
export default connect(mapStateToProps, { updateBugCaught, updateBugDonated })(BugDetails);