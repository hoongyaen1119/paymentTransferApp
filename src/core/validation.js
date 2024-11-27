// export const validateCardDetails = (creditCardDetails) => {
//     const { cardNumber, expirationDate, cvv } = creditCardDetails;

//     if (!cardNumber || !expirationDate || !cvv) {
//       return 'Please fill all the fields';
//     }

//     if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
//       return 'Invalid card number. It should be 16 digits';
//     }

//     if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expirationDate)) {
//       return 'Invalid expiration date. Format should be MM/YY';
//     }

//     if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
//       return 'Invalid CVV. It should be 3 digits';
//     }

//     return null;
// };