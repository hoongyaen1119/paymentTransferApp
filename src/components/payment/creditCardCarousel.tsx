import React, {useState} from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';

interface CreditCardData {
  id: string;
  brand: string;
  complete: boolean;
  expiryMonth: number;
  expiryYear: number;
  last4: string;
  postalCode: string;
  validCVC: string;
  validExpiryDate: string;
  validNumber: string;
}

interface CardSliderProps {
  onCardPress: (item: CreditCardData) => void; 
}

const { width: screenWidth } = Dimensions.get('window');

const CreditCardCarousel: React.FC<CardSliderProps> = ({ onCardPress }) => {
  const creditCard = useSelector((state: RootState) => state.creditCard.cards); 

  const [cardSelected, setCardSelected] = useState(null);

  const selectItem = (index) =>{
    onCardPress(index) 
    setCardSelected(index)
  }

  const renderItem = ({ item,index }: { item: CreditCardData }) => (
    <TouchableOpacity onPress={() => selectItem(index)} style={[styles.cardContainer,{backgroundColor: cardSelected!=index ? "#adacac":"#014766"}]}>
      <View style={styles.cardContent}>
        <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
          {
            item.brand==="mastercard" ?
            <FontAwesome name={"cc-mastercard"} size={24} color={cardSelected!=index ? null:"white"}/>
            :
            item.brand==="visa" ?
            <FontAwesome name={"cc-visa"} size={24} color={cardSelected!=index ? null:"white"}/>
            :
            <FontAwesome name={"credit-card"} size={24} color={cardSelected!=index ? null:"white"}/>
          }
          {
            cardSelected===index ? 
            <View style={{width:30,height:30, backgroundColor:"green", borderRadius:30, alignItems:"center", justifyContent:"center"}}>
              <MaterialIcons name={"done"} size={24} color="white" />
            </View>
            :null
          }
        </View>
        <View>
          <Text style={styles.cardNumber}>
          **** **** **** {item.last4}
          </Text>
          <Text style={styles.expirationDate}>Exp: {item.expiryMonth + "/" + item.expiryYear}</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sliderContainer}>
      {
        creditCard && creditCard.length>0 ?
        <FlatList
          data={creditCard}
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
            <MaterialIcons name={"add"} size={30} color="white" />
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