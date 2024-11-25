import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CreditCardData {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
}

interface CardSliderProps {
  data: CreditCardData[];
  onCardPress: (item: CreditCardData) => void; 
}

const { width: screenWidth } = Dimensions.get('window');

const CreditCardCarousel: React.FC<CardSliderProps> = ({ data, onCardPress }) => {
  const [cardSelected, setCardSelected] = useState(null);

  const selectItem = (index) =>{
    console.log("sabdkajsbdkjabks",index)
    onCardPress(index) 
    setCardSelected(index)
  }

  const renderItem = ({ item,index }: { item: CreditCardData }) => (
    <TouchableOpacity onPress={() => selectItem(index)} style={[styles.cardContainer,{backgroundColor: cardSelected!=index ? "#adacac":"#014766"}]}>
      <View style={styles.cardContent}>
        <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
            <Text style={styles.cardHolder}>{item.cardHolder}</Text>
            {
              cardSelected===index ? 
              <View style={{width:30,height:30, backgroundColor:"green", borderRadius:30, alignItems:"center", justifyContent:"center"}}>
                <Icon name={"done"} size={24} color="white" />
              </View>
              :null
            }
        </View>
        <View>
          <Text style={styles.cardNumber}>
          **** **** **** {item.cardNumber.slice(-4)}
          </Text>
          <Text style={styles.expirationDate}>Exp: {item.expirationDate}</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sliderContainer}>
      {
        data && data.length>0 ?
        <FlatList
          data={data}
          horizontal
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          snapToInterval={screenWidth * 0.9 + 20}
          decelerationRate="fast" 
          snapToAlignment="start" 
        />
        :
        <View style={{justifyContent: 'center',width:screenWidth, alignItems:"center"}}>
          <TouchableOpacity onPress={() => {}} style={styles.emptyCardContainer}>
            <Icon name={"add"} size={30} color="white" />
            <Text style={styles.cardHolder}>{"Setup a payment card"}</Text>
          </TouchableOpacity>
        </View>
      }
      
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
  flatListContent: {
    paddingLeft: 20,
  },
  emptyCardContainer: {
    backgroundColor:"#014766",
    width: screenWidth * 0.9,
    height: 200,
    borderRadius: 15,
    alignItems:"center",
    justifyContent:"center"
  },
  cardContainer: {
    width: screenWidth * 0.9, 
    height: 200,
    marginRight: 20, 
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardContent: {
    height: 150,
    width: screenWidth * 0.8,
    flexDirection:"column",
    justifyContent:"space-between"
  },
  cardHolder: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 20,
    color: '#FFF',
    marginTop: 10,
    letterSpacing: 4,
  },
  expirationDate: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
});

export default CreditCardCarousel;