//Import the auth module from firebase
let user = window.localStorage.getItem('user_calificaciones');

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

