import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TransactionItemProps {
  transaction: {
    id: string;
    date: string;
    amount: string;
    recipient: string;
    status: string;
  };
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <View style={styles.transactionContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={styles.recipient}>Recipient: {transaction.recipient}</Text>
            <Text style={styles.amount}>RM{transaction.amount}</Text>
        </View>
      <Text style={styles.date}>{transaction.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#adacac',
  },
  date: {
    fontSize: 12,
    color: 'white',
  },
  recipient: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  amount: {
    fontSize: 16,
    marginVertical: 5,
    color: 'white',
  },
  status: {
    fontSize: 14,
  },
  success: {
    color: 'green',
  },
  failed: {
    color: 'red',
  },
});

export default TransactionItem;