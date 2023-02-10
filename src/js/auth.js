//Import the auth module from firebase
import { auth } from '../js/firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

let user = window.localStorage.getItem('user_calificaciones');

// Function to authenticate the user with Google
export const loginWithGoogle = async () => {
    if (!user) {
        const provider = new GoogleAuthProvider();
        //Set a domain for email verification
        provider.setCustomParameters({
            hd: 'uml.edu.ni'
        });

        const result = await signInWithPopup(auth, provider);
        user = {
            user: result,
            id: result.user.uid,
            name: result.user.displayName,
            photo: result.user.photoURL
        };
        //Create a window storage item to save user data
        localStorage.setItem('user_calificaciones', JSON.stringify(user));
    }
    window.location.href = 'index.html';
}

//Set an id to validate an admin use
export const getAdmin = () => {
    //Id de la cuenta de administrador (Creador de la aplicación)
    return 'jGc5KBPAlVcJT0lZ6oW1Gpa6pFx1';
}

//Get the user data from the window storage
export const getUser = () => {
    const user = window.localStorage.getItem('user_calificaciones');
    return JSON.parse(user);
}

//Detect the current page name
const page = window.location.pathname.split('/').pop();

if (!user && page !== 'login.html') {
    loginWithGoogle();
} else {
    if (page !== 'login.html') {
        //Parse the user data from the window storage
        user = JSON.parse(user);
        //Mostrar el nombre del usuario en el navbar
        document.getElementById('nombre').innerHTML = user.name;

        //Si existe el elemento index_nombre, se le asigna el nombre del usuario
        if(document.getElementById('index_nombre')){
            document.getElementById('index_nombre').innerHTML = user.name;
        }
        
        //Set the src image of the user
        document.getElementById('imagen_usuario').src = user.photo;

        //Si existe el elemento index_perfil, se le asigna la imagen del usuario
        if(document.getElementById('index_perfil')){
            document.getElementById('index_perfil').src = user.photo;
        }

        
        //Ocultar accesos
        if(user.id !== getAdmin()) {
            document.getElementById('mostrar_trimestres').style.display = 'none';
        }
        

        //Cerrar sesión
        document.getElementById('cerrar').innerHTML = 'Salir'
        document.getElementById('cerrar').addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut();
            localStorage.removeItem('user_calificaciones');

            window.location.href = 'login.html';
        }
        )
    }
}

