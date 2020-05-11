import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image, ImageSourcePropType } from 'react-native';
import ArtworkImages from '../../Images/ArtworkImages';
import { connect } from 'react-redux';
import { updateArtworkDonated } from '../../Redux/CollectionActions';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './ArtworkDetailScreenStyles';
import { ApplicationState } from '../../../models/ApplicationState/ApplicationState';
import { ArtworkModel } from '../../../models/CollectionModels/ArtworkModel';

interface ArtworkDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState
    updateArtworkDonated: typeof updateArtworkDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            artwork: ArtworkModel,
            model: ArtworkModel
        }
    }
}

interface ArtworkDetailsState {
    showingReal: boolean,
    currentImage: ImageSourcePropType
}

class ArtworkDetailScreen extends Component<ArtworkDetailsProps, ArtworkDetailsState> {
    index = this.props.route.params.index;
    artwork: ArtworkModel;

    SetItemDonated = (donated: boolean, index: number) => {
        this.props.updateArtworkDonated({ donated, index });
    }

    constructor(props: ArtworkDetailsProps) {
        super(props);
        this.index = props.route.params.index;
        this.artwork = props.route.params.model;
        this.state = {
            showingReal: true,
            currentImage: ArtworkImages[this.artwork.name]
        }
    }

    SwapFakeReal() {
        if (this.artwork.hasFake) {
            if (this.state.showingReal) {
                this.setState({ currentImage: ArtworkImages["Fake " + this.artwork.name], showingReal: false })
            }
            else {
                this.setState({ currentImage: ArtworkImages[this.artwork.name], showingReal: true })
            }
        }
    }

    render() {
        let item = this.props.appState.art.artworkCollection.find(x => x.id === this.props.route.params.model.id);
        this.artwork = item ? item : this.props.route.params.model
        return (
            <ScrollView style={styles.detailViewScrollView} contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={styles.detailViewContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <Image source={this.state.currentImage} style={styles.artImage}></Image>
                        <View style={styles.artworkNameViewStyling}>
                            <Text style={styles.artworkNameTextStyling}>{this.artwork.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox onPress={() => { this.SetItemDonated(!this.artwork.donated, this.artwork.id) }} style={styles.checkBoxTemp} checked={this.artwork.donated}></CheckBox>
                        <TouchableOpacity onPress={() => this.SwapFakeReal()} style={{ borderColor: "black", borderRadius: 20, borderWidth: 5, padding: 30 }}>
                            <Text style={styles.valueText}>{this.artwork.hasFake ? this.state.showingReal ? "Show Fake" : "Show Real" : "Always Real"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{this.artwork.description}</Text>
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
export default connect(mapStateToProps, { updateArtworkDonated })(ArtworkDetailScreen);