// Importar los modulos de firebase necesarios
import {
    getFirestore,
    collection,
    onSnapshot,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    query,
    where
} from 'firebase/firestore'
import { getUser } from '../js/user';



//Conectarnos a la base de datos
export const db = getFirestore();

//Guardar una nota
export const guardarNota = (datos) => {
    addDoc(collection(db, 'notas'), datos)
}

//Obtener la colección de notas y mantener el estado actualizado
export const obtenerNotas = async (callback) => {
    //Buscar en la colección de notas las notas del usuario actual
    //Usar la función query para buscar en la colección de notas
    //Usar la función where para buscar por el campo user
    //Usar la función getUser para obtener el id del usuario actual
    onSnapshot(query(collection(db, "notas"), where("user", "==", getUser().id)), (querySnapshot) => {
        const notas = [];
        querySnapshot.forEach((doc) => {
            notas.push({ ...doc.data(), id: doc.id })
        })
        callback(notas)        
    })
}

//Obtener una nota por su id
export const obtenerNota = async (id) => {
    const notaDoc = await getDoc(doc(db, 'notas', id))
    return { ...notaDoc.data(), id: notaDoc.id }
}

//Actualizar una nota por su id
export const actualizarNota = async (id, datos) => {
    await updateDoc(doc(db, 'notas', id), datos)
}

//Eliminar una nota por su id
export const eliminarNota = async (id) => {
    await deleteDoc(doc(db, 'notas', id))
}

//Flag para saber si estamos editando o creando una nota
export let editStatus = false;

//Exportar la variable mutable editStatus
export let canEdit = (value) => {
    editStatus = value;
}

// Variable para almacenar el id de la nota a editar
export let id = '';

//Exportar la variable mutable id
export let setId = (value) => {
    id = value;
}

//Crear la tabla de notas de forma dinámica
export const crearTabla = (dataSet) => {
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
        
        //Definir los eventos de los botones de editar y eliminar
        "drawCallback": function () {
            //Obtener los botones de eliminar
            const btnsEliminar = document.querySelectorAll('.eliminar');

            //Agregar un evento a cada boton
            btnsEliminar.forEach((btn) => {
                btn.addEventListener('click', async () => {
                    //Obtener el id del trimestre
                    const id = btn.dataset.id;

                    //Eliminar la nota
                    swal({
                        title: "¿Está seguro de eliminar?",
                        text: "Si elimina una calificacion no podrá recuperarla!",
                        icon: "warning",
                        buttons:["No, cancelar","Si, eliminar"],

                        dangerMode: true,
                    })
                        .then(async (willDelete) => {
                            if (willDelete) {
                                await eliminarTrimestre(id);
                                swal("Eliminado!", "La nota se ha borrado!", "success");
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
                    
                    //Obtener el id de la nota
                    id = btn.dataset.id;

                    try {
                        // Obtener los datos de la nota
                        const nota = await obtenerNota(id);

                        // Asignar los datos al formulario
                        formulario.trimestre.value = nota.trimestre;
                        formulario.profesor.value = nota.profesor;
                        formulario.asignatura.value = nota.asignatura;
                        formulario.nota.value = nota.nota;
                    } catch (error) {
                        console.log(error);
                    }
                });
            });
        }
    });
}

