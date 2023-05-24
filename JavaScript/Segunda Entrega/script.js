// Definimos la funcion para validar las opciones que puede elegir el usuario, con tope porque varia la cantidad de opciones
// Retorna un numero que nos premitira seguir con el flujo
function validarNumero(numero, mensaje, tope){
    while(isNaN(numero) || (numero > tope || numero < 1)){
        alert("Ingresaste una opcion incorrecta, intenta de nuevo")
        numero = parseInt(prompt(mensaje))
    }
    return numero;
}

// Funcion de seleccion del empleado sobre el cual se quiere realizar la simulacion de cambio de sueldo por cambio de catgeoria
function mensajeBienvenida(){
    let mensajeInicio = "Elige el/la empleado/a sobre el cual deseas hacer la simulacion de cambio de categoria:\n"
    EMPLEADOS.forEach(e => {
        mensajeInicio += `${e.legajo} - ${e.nombre}\n`
    })
    let respuestaUsuario = parseInt(prompt(mensajeInicio))
    respuestaUsuario = validarNumero(respuestaUsuario, mensajeInicio, 5)
    return EMPLEADOS.find(elem => elem.legajo === respuestaUsuario);
}

// Funcion de seleccion de la nueva categoria a asignar al empleado
function nuevaCategoria(){
    let mensajeNuevo = `Elegiste a ${empleadoElegido.nombre}, que actualmente tiene una categoria de ${empleadoElegido.categoriaEmpleado} y ${empleadoElegido.antiguedad} años de antiguedad.\nElige una nueva categoria para la simulación:\n`
    VALORES.forEach(e => {
        mensajeNuevo += `${e.id} - ${e.categoria}\n`
    })
    let respuestaUsuario = parseInt(prompt(mensajeNuevo))
    respuestaUsuario = validarNumero(respuestaUsuario, mensajeNuevo, 4)
    return VALORES.find(elem => elem.id === respuestaUsuario);
}

// Definimos la matriz con los empleados y sus caracteristicas, definimos ademas las variables de sueldoActual y sueldoNuevo que seran usadas mas adelante
class Empleado {
    constructor(legajo, nombre, categoriaEmpleado, antiguedad) {
        this.legajo = legajo,
        this.nombre = nombre,
        this.categoriaEmpleado = categoriaEmpleado,
        this.antiguedad = antiguedad,
        this.sueldoActual ="",
        this.sueldoNuevo =""
    }
}

const empleado1 = new Empleado(1, "Martina Martinez", "Administrativo/a", 15)
const empleado2 = new Empleado(2, "Fernanda Fernandez", "Tecnico/a", 13)
const empleado3 = new Empleado(3, "Rodrigo Rodriguez", "Profesional", 10)
const empleado4 = new Empleado(4, "Gonzalo Gonzalez", "Auxiliar", 7)
const empleado5 = new Empleado(5, "Juan Perez", "Administrativo/a", 4)

const EMPLEADOS = [empleado1, empleado2, empleado3, empleado4, empleado5]

// Definimos la matriz con las categorias disponbiles y sus valores de salario basico y valor por año de antiguedad
class Escalafon {
    constructor(id, categoria, basico, valorAntiguedad) {
        this.id = id,
        this.categoria = categoria,
        this.basico = basico,
        this.valorAntiguedad = valorAntiguedad
    }
}

const escalafon1 = new Escalafon(1, "Profesional", 100000, 1000)
const escalafon2 = new Escalafon(2, "Tecnico/a", 90000, 900)
const escalafon3 = new Escalafon(3, "Administrativo/a", 80000, 800)
const escalafon4 = new Escalafon(4, "Auxiliar", 70000, 700)

const VALORES = [escalafon1, escalafon2, escalafon3, escalafon4]

// Definimos variables para aplicar while y poder iniciar nuevamente el simulador una vez concluida cada simulacion
let opcion ="1. Si \n 2. No";
let simuladorActivo = 1;


while(simuladorActivo == 1){

//Tomamos el valor elegido por el usuario e individualizamos los parametros del mismo
empleadoElegido = mensajeBienvenida()
const categoriaActual = VALORES.find(elem => elem.categoria === empleadoElegido.categoriaEmpleado)

// Calculamos el sueldo actual del empleado seleccionado
empleadoElegido.sueldoActual = categoriaActual.basico + categoriaActual.valorAntiguedad * empleadoElegido.antiguedad 

// Tomamos el valor de la categoria nueva a asignar al empleado elegido
categoriaNueva = nuevaCategoria()

// Calculamos el sueldo del empleado con la categoria nueva seleccionada para el y lo mostramos en pantalla
empleadoElegido.sueldoNuevo = categoriaNueva.basico + categoriaNueva.valorAntiguedad * empleadoElegido.antiguedad
alert(`El sueldo de ${empleadoElegido.nombre} con su nueva categoria de ${categoriaNueva.categoria} seria de $ ${empleadoElegido.sueldoNuevo}`);

// Definimos la variable diferencia para mostrar el aumento o disminucion en el sueldo del empleado y lo mostramos en pantalla
let diferencia = empleadoElegido.sueldoNuevo - empleadoElegido.sueldoActual
alert(`La variacion del sueldo con el cambio de categoria es $ ${diferencia}`)

// Finalmente solicitamos al usuario que indique si desea hacer otra simulacion y agregamos la funcion verificadora de numero
// Si el usuario indica que quiere hacer otra simulacion, simuladorActivo seguira teniendo un valor de 1, sino saldra del while
simuladorActivo = parseInt(prompt(`Su simulacion ha finalizado, ¿desea hacer una nueva simulación? \n ${opcion}`))
respuestaUsuario = validarNumero(simuladorActivo, `Su simulacion ha finalizado, ¿desea hacer una nueva simulación? \n ${opcion}`, 2)

}

// Al elegir la opcion 2, saldra del while y enviara un mensaje de despedida
alert("Gracias por usar el simulador de sueldos para cambios de categorias");





















