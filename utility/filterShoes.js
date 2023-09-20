import { endAt, equalTo, get, limitToFirst, orderByChild, orderByKey, query, ref, startAt } from 'firebase/database';
import { database } from '../firebase/firebase'

export function capitalizeString(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

export async function filterShoes(filters) {
// const dbRef = ref(database, '/');

// // Construct the query based on populated filter properties
// let queryRef = dbRef;

// if (filters.brand) {
//   queryRef = query(equalTo(queryRef, filters.brand));
// }
  const initialData = [];
  const dataRef = ref(database, '/');
  let finalRef;
  
  if(filters.brand) {
    finalRef = query(dataRef, orderByChild("brand"), equalTo(capitalizeString(filters.brand)), limitToFirst(10))
  }

  if(filters.priceRange) {
    finalRef = query(dataRef, orderByChild("price"), startAt(filters.priceRange[0]), endAt(filters.priceRange[1]), limitToFirst(10))
  }

  const snapshot = await get(
    finalRef
  );

  snapshot.forEach((childSnapshot) => {
    initialData.push(childSnapshot.val());
  });

  console.log({initialData})
}