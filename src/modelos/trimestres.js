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
    updateDoc } from 'firebase/firebase-firestore' 

    //Conectarnos a la base de datos
export const db = getFirestore();

//Guardar un trimestre
export const guardarTrimestre = (nombre, fecha_inicio, fecha_fin) => {
    addDoc(collection(db, 'trimestre'), {nombre, fecha_inicio, fecha_fin})
}