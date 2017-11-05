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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  textField:{
    height: 50,
    borderRadius: 4,
    backgroundColor: 'whitesmoke',
    borderColor:'#ccc',
    borderWidth: 1,
    padding: 10,
    margin: 20,
    fontSize: 18,
    alignSelf: 'stretch'

  }
})

export default styles
