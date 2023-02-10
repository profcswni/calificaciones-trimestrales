
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
    updateDoc,
    deleteDoc
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


//Eliminar un trimestre por su id
export const eliminarTrimestre = async (id) => {
    await deleteDoc(doc(db, 'trimestres', id))
}


//Flag para saber si estamos editando o creando un trimestre
export let editStatus = false;

//Export the mutable variable editStatus
export let canEdit = (value) => {
    editStatus = value;
}


// Variable para almacenar el id del trimestre a editar
export let id = '';

//Export the mutable variable id
export let setId = (value) => {
    id = value;
}

export const drawATable = (dataSet) => {
    var tabla = $('#lista').DataTable({
        responsive: {
            details: {
                renderer: $.fn.dataTable.Responsive.renderer.listHiddenNodes()
            }
        },
        language: {
            url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
        },
        data: dataSet,
        
        //Set events on responsive resize
            
        

        //Set events after drawCallback
        "drawCallback": function () {
            //Obtener los botones de eliminar
            const btnsEliminar = document.querySelectorAll('.eliminar');

            //Agregar un evento a cada boton
            btnsEliminar.forEach((btn) => {
                btn.addEventListener('click', async () => {
                    //Obtener el id del trimestre
                    const id = btn.dataset.id;

                    //Eliminar el trimestre
                    swal({
                        title: "¿Está seguro de eliminar?",
                        text: "Un trimestre eliminado tambien borrará las calificaciones de los estudiantes",
                        icon: "warning",
                        buttons:["No, cancelar","Si, eliminar"],

                        dangerMode: true,
                    })
                        .then(async (willDelete) => {
                            if (willDelete) {
                                await eliminarTrimestre(id);
                                swal("Eliminado!", "El trimestre se ha borrado!", "success");
                            }
                        });


                });
            });

            //Evento para editar los trimestres al dar clic en el boton .editar
            const btnsEditar = document.querySelectorAll('.editar');

            btnsEditar.forEach((btn) => {
                btn.addEventListener('click', async () => {

                    //Cambiar el estado de la bandera
                    editStatus = true;
                    
                    //Obtener el id del trimestre
                    id = btn.dataset.id;

                    try {
                        // Obtener los datos del trimestre
                        const trimestre = await obtenerTrimestre(id);

                        // Asignar los datos al formulario
                        formulario.nombre.value = trimestre.nombre;
                        formulario.fecha_inicio.value = trimestre.fecha_inicio;
                        formulario.fecha_fin.value = trimestre.fecha_fin;


                    } catch (error) {
                        console.log(error);
                    }
                });
            });
        }
    });
}