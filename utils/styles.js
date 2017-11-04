import { StyleSheet, Dimensions } from 'react-native'
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonRow:{
    width: width - 60,
    flexDirection:'row',
    margin: 20,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  btn:{
    paddingVertical:15,
    paddingHorizontal:25,
    backgroundColor: 'lightseagreen',
    borderRadius: 4,
    margin: 10,
  },
  txtBtn:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardCounter:{
    color: '#666',
    fontSize: 18,
    fontWeight: '100',
    marginBottom: 20,
  }
})

export default styles
