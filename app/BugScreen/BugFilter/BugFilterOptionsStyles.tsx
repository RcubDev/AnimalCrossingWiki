import { StyleSheet, Platform, Dimensions } from "react-native";

const styles = StyleSheet.create({
  monthButtonUnSelectedStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "23%",
  },
  monthButtonSelectedStyle: {
    backgroundColor: "green",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "23%",
  },
  catchableNowSelectedStyle: {
    backgroundColor: "green",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "50%",
  },
  catchableNowUnSelectedStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "50%",
  },
  rarityButtonUnSelectedStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "45%",
  },
  rarityButtonSelectedStyle: {
    backgroundColor: "green",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "45%",
  },
  locationButtonUnSelectedStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "31%",
  },
  locationButtonSelectedStyle: {
    backgroundColor: "green",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "31%",
  },
  caughtUnSelectedStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "45%",
  },
  caughtSelectedStyle: {
    backgroundColor: "green",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    width: "45%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default styles;
