//Importar la configuracion
import { app } from '../js/firebase'

// Importar los modulos de firebase necesarios
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore'


//Conectarnos a la base de datos
export const db = getFirestore();

//Guardar un trimestre
export const guardarTrimestre = (datos) => {
    addDoc(collection(db, 'trimestres'), datos)
}

//Obtener la colección de trimestres y mantenr el estado actualizado
export const obtenerTrimestres = (callback) => {
    onSnapshot(collection(db, 'trimestres'), (querySnapshot) => {
        const trimestres = [];
        querySnapshot.forEach((doc) => {
            trimestres.push({ ...doc.data(), id: doc.id })
        })
        callback(trimestres)
    })
}

//Obtener un trimestre por su id
export const obtenerTrimestre = async (id) => {
    const trimestreDoc = await getDoc(doc(db, 'trimestres', id))
    return { ...trimestreDoc.data(), id: trimestreDoc.id }
}

//Actualizar un trimestre por su id
export const actualizarTrimestre = async (id, datos) => {
    await updateDoc(doc(db, 'trimestres', id), datos)
}
