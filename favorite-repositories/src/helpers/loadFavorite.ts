import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';


// Load the favorite repositories from firebase
export const loadFavorite = async (uid = '') => {
    if (!uid) throw new Error('The user UID doesnt exist');

    const collectionRef = collection(FirebaseDB, `${uid}/repositories/favorite`);
    const doc = await getDocs(collectionRef);

    let favoriteRepositories: any = {};

    doc.forEach(doc => {
        favoriteRepositories = { id: doc.id, ...doc.data() };
    });

    return favoriteRepositories;
}
