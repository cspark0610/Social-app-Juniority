import { db } from "../../firebase/firebase";

//collectionName nombre de la coleccion a usar

export const post = async(collectionName ,obj) =>{
    try {
        await db.collection(String(collectionName)).doc().set(obj)
    } catch (error) {
        console.error(error);
    }

};

export const update = async(collectionName ,obj) =>{
    try {
        await db.collection(String(collectionName)).doc().update(obj)
    } catch (error) {
        console.error(error);
    }
};

export const remove = async(collectionName ,id) =>{
    try {
        if(window.confirm('are you sure you want to delete?'))
        await db.collection(String(collectionName)).doc(id).delete()
    } catch (error) {
        console.error(error);
    }
   
};

