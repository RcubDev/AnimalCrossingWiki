import React from 'react';
import { View, CheckBox } from 'native-base';
import { Image, Text } from 'react-native';
import { NewFishModel } from '../../models/CollectionModels/NewFishModel';
import { ScrollView } from 'react-native-gesture-handler';
import Months from '../../data/months.json';
import { connect } from 'react-redux';
import { CommonCollectionModel } from '../../models/CollectionModels/CommonCollectionModel';

export const DetailsScreen = ({ item, styles, images, setItemCaught, setItemDonated }: DetailsScreenProps) => {
    const { name, caught, donated, monthsAvailable, locationName, time, shadowSizeName } = (item as NewFishModel);

    return (
        <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsScrollViewContentContainer}>
            <View style={styles.detailsContainer}>
                <View style={styles.detailsTitle}>
                    <Image style={styles.detailsTitleImage} source={images[name]}></Image>
                    <View style={styles.detailsTitleName}>
                        <Text style={styles.detailsTitleNameText}>{name}</Text>
                    </View>
                </View>
                <View style={styles.detailsCheckBoxContainer}>
                    {('caught' in item) && (<CheckBox style={styles.detailsCheckBox} checked={caught} onPress={setItemCaught}></CheckBox>)}
                    <CheckBox style={styles.detailsCheckBox} checked={donated} onPress={setItemDonated}></CheckBox>
                    <View style={styles.detailsValueContainer}>
                        <Image source={require('../Images/Other/bellcoin.png')} style={styles.detailsBellImage}></Image>
                        <Text style={styles.detailsValueAmount}>{item.value}</Text>
                    </View>
                </View>
                {('monthsAvailable' in item) && (<View style={styles.detailsMonthContainer}>
                    {Object.values(monthsAvailable).map((hasMonth, i) => (<View key={i} style={[styles.detailsMonth, hasMonth && styles.detailsMonthSelected]}>
                        <Text>{Months[i].shortName}</Text>
                    </View>))}
                </View>)}
                <View style={styles.detailsLocationAndTimeContainer}>
                    {('locationName' in item) && (<View style={styles.detailsImageAndTextContainer}>
                        <Text>{"Location Image"}</Text>
                        <Text style={styles.detailsText}>{locationName}</Text>
                    </View>)}
                    {('time' in item) && (<View style={styles.detailsImageAndTextContainer}>
                        <Text>{"Clock Image"}</Text>
                        <Text style={styles.detailsText}>{time}</Text>
                    </View>)}
                </View>
                {('shadowSizeName' in item) && (<View style={styles.detailsShadowSizeContainer}>
                    <View style={styles.detailsImageAndTextContainer}>
                        <Text>{"Shadow Image"}</Text>
                        <Text style={styles.detailsText}>{shadowSizeName}</Text>
                    </View>
                </View>)}
                <View style={styles.detailsRarityContainer}>
                    <View style={styles.detailsRarityTextContainer}>
                        <Text>{"Rarity"}</Text>
                        <Text>{"*"}</Text>
                        <Text>{"*"}</Text>
                        <Text>{"*"}</Text>
                        <Text>{"*"}</Text>
                        <Text>{"*"}</Text>
                    </View>
                </View>
                <View style={styles.detailsBlathersContainer}>
                    <Text style={styles.detailsBlathersText}>{"Blathers Says: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed interdum ligula quis imperdiet pharetra. Nunc tincidunt lorem eget nibh vulputate gravida. Aenean a posuere neque. In finibus nunc non turpis fermentum, malesuada sodales odio porta. Praesent et tellus felis. Aenean eget urna ante. Morbi interdum dui dictum, iaculis ante pretium, laoreet diam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sollicitudin eleifend nibh sed molestie. Sed malesuada porttitor ultrices. Vivamus lobortis, eros non interdum maximus, lorem mauris feugiat ligula, blandit interdum neque erat vitae leo. Nullam erat leo, feugiat quis metus nec, lacinia laoreet lacus. Fusce eros lorem, egestas sit amet tincidunt id, lacinia eget nulla. Praesent commodo pharetra dui sed ornare."}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

interface DetailsScreenProps {
    route: {
        key: string,
        name: string,
        params: {
            index: number,
            model: NewFishModel,
            styles: any,
            images: any,
            setItemCaught: any,
            setItemDonated: any
            type: string,
        }
    }
    item: CommonCollectionModel,
    styles: any,
    images: any,
    setItemCaught: any,
    setItemDonated: any,
}

const mapStateToProps = (state: any, props: DetailsScreenProps) => {
    console.log(props);
    const { route: { params } } = props;
    const { type, model, styles, images, setItemCaught, setItemDonated } = params;
    const { appState } = state;
    const { [`${type}Collection`]: collection } = appState[type];
    const item = collection.find((collectionItem: CommonCollectionModel) => collectionItem.id === model.id);
    return { item, styles, images, setItemCaught, setItemDonated };
};

export default connect(mapStateToProps)(DetailsScreen);