import React, { Component } from 'react';
import { Container, Button, Text, Header, Content, Footer, View, H1, CardItem, Card, CheckBox } from 'native-base';
import { Image, ImageSourcePropType } from 'react-native';
import ArtworkImages from '../../Images/ArtworkImages';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './ArtworkDetailScreenStyles';
import { ApplicationState } from '../../../models/ApplicationState/ApplicationState';
import { ArtworkModel } from '../../../models/CollectionModels/ArtworkModel';
import { ItemModel, ItemVariantModel } from '../../../models/CollectionModelsV2/items';
import { updateItemDonated } from "../../../app/ReduxV2/CollectionActions";

interface ArtworkDetailsProps {
    navigation: NavigationScreenProp<any>,
    appState: ApplicationState
    updateItemDonated: typeof updateItemDonated
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            model: ItemModel
        }
    }
}

interface ArtworkDetailsState {
    showingReal: boolean,
    currentImage: ImageSourcePropType,
    model: ItemModel,
    genuineModelVariant: ItemVariantModel | undefined,
    fakeModelVariant: ItemVariantModel | undefined
}

class ArtworkDetailScreen extends Component<ArtworkDetailsProps, ArtworkDetailsState> {

    SetItemDonated = (donated: boolean, name: string) => {
        this.props.updateItemDonated({ donated, name, type: "Artwork" });
        this.setState({model: {...this.state.model, donated: donated}});
    }

    constructor(props: ArtworkDetailsProps) {
        super(props);
        let variant = this.props.route.params.model.variants.find(x => x.genuine);
        this.state = {
            showingReal: true,
            model: this.props.route.params.model,
            currentImage: ArtworkImages[this.props.route.params.model.name],
            genuineModelVariant: this.props.route.params.model.variants.find(x => x.genuine),
            fakeModelVariant: this.props.route.params.model.variants.find(x => !x.genuine)
        }
    }

    SwapFakeReal() {
        if (this.state.fakeModelVariant) {
            if (this.state.showingReal) {
                this.setState({ currentImage: ArtworkImages["Fake " + this.state.model.name], showingReal: false })
            }
            else {
                this.setState({ currentImage: ArtworkImages[this.state.model.name], showingReal: true })
            }
        }
    }

    render() {
        return (
            <ScrollView style={styles.detailViewScrollView} contentContainerStyle={{ justifyContent: 'center' }}>
                <View style={styles.detailViewContainer}>
                    <View style={styles.imageAndNameContainer}>
                        <Image source={this.state.currentImage} style={styles.artImage}></Image>
                        <View style={styles.artworkNameViewStyling}>
                            <Text style={styles.artworkNameTextStyling}>{this.state.model.name}</Text>
                        </View>
                    </View>
                    <View style={styles.caughtDonatedValueContainer}>
                        <CheckBox onPress={() => { this.SetItemDonated(!this.state.model.donated, this.state.model.name) }} style={styles.checkBoxTemp} checked={this.state.model.donated}></CheckBox>
                        <TouchableOpacity onPress={() => this.SwapFakeReal()} style={{ borderColor: "black", borderRadius: 20, borderWidth: 5, padding: 30 }}>
                            <Text style={styles.valueText}>{this.state.fakeModelVariant ? this.state.showingReal ? "Show Fake" : "Show Real" : "Always Real"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blathersSaysContinaer}>
                        <Text style={styles.blathersSaysText}>{this.state.model.museumDescription}</Text>
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
export default connect(mapStateToProps, { updateItemDonated })(ArtworkDetailScreen);