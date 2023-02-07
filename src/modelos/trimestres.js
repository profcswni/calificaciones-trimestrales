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
    updateDoc } from 'firebase/firestore' 

//Conectarnos a la base de datos
export const db = getFirestore();

//Guardar un trimestre
export const guardarTrimestre = (datos) => {
    addDoc(collection(db, 'trimestres'), datos)
}

