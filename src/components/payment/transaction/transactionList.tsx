// TransactionList.tsx
import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import TransactionItem from './transactionItem';

const { height, width } = Dimensions.get('window');

interface Transaction {
  id: string;
  date: string;
  amount: string;
  recipient: string;
  status: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Latest Transactions</Text>
      <View style={{height:height*0.5}}>
        <FlatList
          data={transactions}
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