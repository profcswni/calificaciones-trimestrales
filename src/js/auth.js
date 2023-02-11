//Import the auth module from firebase
import { auth } from '../js/firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getUser, getAdmin } from './user.js';

//Declarar una variable para almacenar los datos del usuario
let user = window.localStorage.getItem('user_calificaciones');

// Function to authenticate the user with Google
export const loginWithGoogle = async () => {
    if (!user) {
        const provider = new GoogleAuthProvider();
        //Definir el dominio de la cuenta de google
        //Solo se permitirá el acceso a cuentas de la universidad
        
        provider.setCustomParameters({
            login_hint: 'estudiante@uml.edu.ni',
            hd: 'uml.edu.ni'
        });

        const result = await signInWithPopup(auth, provider);
        user = {            
            id: result.user.uid,
            name: result.user.displayName,
            photo: result.user.photoURL
        };
        //Guardar los datos del usuario en el localStorage
        localStorage.setItem('user_calificaciones', JSON.stringify(user));
    }

    //Redireccionar a la página principal
    window.location.href = 'index.html';
}
//Detectar la página actual
const page = window.location.pathname.split('/').pop();

if (!user && page !== 'login.html') {
    window.location.href = 'login.html';
} else {
    if (page !== 'login.html') {
        
        //Mostrar el menu de navegación
        document.getElementById('menu').style.display = 'flex';
        document.getElementById('main').style.display = 'flex';

        //Extraer los datos del usuario
        user = getUser();

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
        //Find id of the user into the array of admin
        
        if(!getAdmin().find(admin => admin == user.id)) {
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

