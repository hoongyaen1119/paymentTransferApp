import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

interface TransactionItemProps {
  transaction: {
    id: string;
    amount: number;
    currency: string;
    description: string;
    status: string;
    customer: string;
    created: string;
  };
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <View style={styles.transactionContainer}>
        <View style={{flexDirection:"row",justifyContent:"space-between", alignItems:"center"}}>
          <Text style={styles.recipient}>{transaction.description? transaction.description:"Payment"}</Text>
            <Text style={styles.amount}>{(transaction.amount/100)+ " "+ transaction.currency.toUpperCase()}</Text>
        </View>
      {/* <Text style={styles.date}>{moment(transaction.created).format("DD-MM-YYYY h:mm:ss")}</Text> */}

    </View>
  );
};

const styles = StyleSheet.create({
  transactionContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#5c5b5b',
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