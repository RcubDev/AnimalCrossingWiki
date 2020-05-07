import { StyleSheet, Platform, Dimensions } from "react-native";

const styles = StyleSheet.create({
    sortButtonUnSelectedStyle: {
        backgroundColor: "grey",
        justifyContent: "center",
        margin: 5,
        borderRadius: 10,
        width: "45%",
    },
    sortButtonSelectedStyle: {
        backgroundColor: "green",
        justifyContent: "center",
        margin: 5,
        borderRadius: 10,
        width: "45%",
    },
    sortButtonBigSelectedStyle: {
        backgroundColor: "green",
        justifyContent: "center",
        margin: 5,
        borderRadius: 10,
        width: "70%",
    },
    sortButtonBigUnSelectedStyle: {
        backgroundColor: "grey",
        justifyContent: "center",
        margin: 5,
        borderRadius: 10,
        width: "70%",
    }
});

export default styles;