import { db } from "../../firebase/firebase";

//collectionName nombre de la coleccion a usar

// export const getAll = async(collectionName) =>{
//     await db.collection(String(collectionName)).onSnapshot(querySnapshot=>{
//         const docs=[];
//         querySnapshot.map((doc)=>{
//             docs.push({...doc.data(),id:doc.id})
//         });
//         //falta el setState
//     })
// }

export const post = async(collectionName ,obj) =>{
    await db.collection(String(collectionName)).doc().set(obj)

};

export const update = async(collectionName ,obj) =>{
    await db.collection(String(collectionName)).doc().update(obj)
};

export const remove = async(collectionName ,id) =>{
    if(window.confirm('are you sure you want to delete?'))
    await db.collection(String(collectionName)).doc(id).delete()
};

