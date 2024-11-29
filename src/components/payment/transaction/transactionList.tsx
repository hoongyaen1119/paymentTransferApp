import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import TransactionItem from './transactionItem';
import moment from 'moment';

const { height } = Dimensions.get('window');

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  customer: string;
  created: string;
  recipientName: string
}

interface TransactionListProps {
  transactions: Transaction[];
  paymentType?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, paymentType }) => {
  let list = paymentType=="ewallet" ? transactions.filter(res=> {return res.recipientName}):transactions.filter(res=> {return !res.recipientName})
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Latest Transactions</Text>
      <View style={{height:height*0.5}}>
        <FlatList
          data={list}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  headerTitle: {
    marginBottom:15,
    fontSize: 18,
    fontWeight: 'bold',
    color:"white"
  },
});

export default TransactionList;