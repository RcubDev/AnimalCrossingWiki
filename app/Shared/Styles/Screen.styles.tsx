import { StyleSheet } from 'react-native';
import { detailsStylesData } from './DetailsScreenStyles';
import { gridItemStylesData } from './GridItemStyles';

export const screenStylesData = {
    flatListColumnWrapper: { justifyContent: 'space-evenly' as 'space-evenly', flexDirection: 'row' as 'row' },
    flatListContainerContent: { justifyContent: 'center' as 'center', alignItems: 'center' as 'center', alignContent: 'center' as 'center', backgroundColor: '#9cf0c6' },
};

export default StyleSheet.create({ ...screenStylesData, ...gridItemStylesData, ...detailsStylesData });


