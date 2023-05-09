
// valores de opcion para los prompts
let escalafon = "1. Profesional \n 2. Tecnico/a \n 3. Administrativo/a \n 4. Auxiliar";
let opcion ="1. Si \n 2. No";
// Establecemos valores iniciales de las variables a usar
let sueldo = 0;
let categoria = "";
// Variable de verificacion para continuar con la segunda parte del proceso
let verificacion = 0;

let nombreEmpleado = prompt("Ingresa tu nombre");
let simuladorActivo = parseInt(prompt(`Hola ${nombreEmpleado}, ¿desea iniciar el simulador de sueldos? \n ${opcion}`));

 
function Empleado(eleccionCategoria, basico, valorAnt){
    alert(`La categoria elegida es ${eleccionCategoria}, su salario basico es $ ${basico}`);
    sueldo += basico;
    categoria = eleccionCategoria;
    valorAntiguedad = valorAnt;    
}

while(simuladorActivo == 1){

    // Reinicia la variable sueldo
    sueldo = 0;

    let eleccionEmpleado = parseInt(prompt(`${nombreEmpleado}, elegi una categoria \n ${escalafon}`));
    
    // Switch para analizar la respuesta del usuario y fijar valor de categoria, basico de la categoria y valor de un año de antiguedad
    switch(eleccionEmpleado){
        case 1:
            Empleado("Profesional", 100000, 1000);
            break;
        case 2:
            Empleado("Tecnico/a", 90000, 900);
            break;
        case 3:
            Empleado("Administrativo/a", 80000, 800);
            break;
        case 4:
            Empleado("Auxiliar", 70000, 700);
            break;
        default:
            alert("La eleccion no corresponde a una categoria del escalafon");
            // Fija valor 99 para que el proceso no continue pidiendo la antiguedad y avise que no pudo realizar la simulacion
            verificacion = 99;        
    }

// verificacion chequea que haya elegido una categoria y pide la antiguedad
if (verificacion !=99){

    let antiguedad = parseInt(prompt("Ingresa una antiguedad en el puesto"));
   
    // isNan verifica que el valor ingresado en antiguedad sea un numero
    if (isNaN(antiguedad) != true) {
   
    
    // Si eligio una categoria de las 4 disponibles y una antiguedad con valor number, entonces actualiza valor de sueldo y muestra aviso
    sueldo += antiguedad*valorAntiguedad;
    
    alert(`Un/a ${categoria} con ${antiguedad} año/s de antiguedad tiene un sueldo total de $ ${sueldo}`);
    simuladorActivo = parseInt(prompt(`Su simulacion ha finalizado, ¿desea hacer una nueva simulación? \n ${opcion}`))
    } else {
        simuladorActivo = parseInt(prompt(`No se ha podido realizar la simulacion, ¿desea hacer una nueva? \n ${opcion}`))
    }
} else {
    simuladorActivo = parseInt(prompt(`No se ha podido realizar la simulacion, ¿desea hacer una nueva? \n ${opcion}`))
}

}

alert("Gracias por usar el simulador de sueldos");