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

const ESCALAFON = [escalafon1, escalafon2, escalafon3, escalafon4]

function renderizarEscalafon() {
    const cardEscalafon = document.getElementById("cardEscalafon")
    ESCALAFON.forEach ((escalafon => {
        let divCard = document.createElement("div")
        divCard.id = escalafon.id
    
        divCard.innerHTML = `
        <div class="m-3">
        <a href="#" class="btn btn-primary" onclick="escalafonElegido('${escalafon.basico}','${escalafon.valorAntiguedad}','${escalafon.categoria}')">${escalafon.categoria}</a>
        </div>
        `

    cardEscalafon.append(divCard)    

    }))
}

localStorage.clear()
localStorage.setItem("Escalafon", ESCALAFON)
localStorage.setItem("Escalafon", JSON.stringify(ESCALAFON))

let salarioUser = 0
let valorAntiguedad = 0
let categoriaUser = ""
let antiguedadUser = 0
let tituloUser = 0
let nivelTituloUser = ""

const seleccionarEscalafon = document.getElementById("seleccionarEscalafon")
seleccionarEscalafon.innerHTML = `
        <h6> Ingrese la categoria elegida para la simulación:</h6>
    `

// Muestra las opciones de categoria a elegir
renderizarEscalafon();

function escalafonElegido(escalafonBasico, valorAntiguedad, escalafonCategoria) {
    salarioUser = parseInt(escalafonBasico)
    valorAntiguedadUser = parseInt(valorAntiguedad)
    categoriaUser = escalafonCategoria

    return elegirAntiguedad()
}


// Solicita el valor de la antiguedad por un input, que se anula luego
function elegirAntiguedad(){
const seleccionarAntiguedad = document.getElementById("seleccionarAntiguedad")
seleccionarAntiguedad.innerHTML = `
    <form id="antiguedadUser"> 
        <h6> Ingrese la antiguedad elegida para la simulación:</h6>
        <input type="number" min="0" step="1" id="antiguedad">
        <input type="submit" id="subir" value="Seleccionar">
    </form>
`

document.getElementById("antiguedadUser").addEventListener("submit", (e) => {
    let infoEvent = e.target
    antiguedadUser = infoEvent.querySelector('#antiguedad')
    antiguedadUser = parseInt(antiguedad.value)
    document.getElementById("subir").disabled = true;
    
    return renderizarTitulos();
})
}

//Definimos la matriz con los diferentes niveles de titulo y sus porcentajes a cobrar del salario basico
class Titulo {
    constructor(id, nivel, porcentaje) {
         this.id = id,
         this.nivel = nivel,
         this.porcentaje = porcentaje
         }
     }

const titulo1 = new Titulo(1, "Universitario", 0.3) // 30% del salario basico de la categoria elegida
const titulo2 = new Titulo(2, "Tecnicatura", 0.2) // 20% del salario basico de la categoria elegida
const titulo3 = new Titulo(3, "Secundario Tecnico", 0.18) // 18% del salario basico de la categoria elegida
const titulo4 = new Titulo(4, "Secundario", 0.15) // 15% del salario basico de la categoria elegida
const titulo5 = new Titulo(5, "Sin titulo", 0) // No incrementa el sueldo

const TITULO = [titulo1, titulo2, titulo3, titulo4, titulo5]


// Muestra las opciones de titulos para elegir
function renderizarTitulos() {
    const seleccionarTitulo = document.getElementById("seleccionarTitulo")
    seleccionarTitulo.innerHTML = `
        <h6> Ingrese el nivel de estudio alcanzado elegido para la simulación:</h6>
    `
    
    const cardTitulos = document.getElementById("cardTitulos")
    TITULO.forEach ((titulo => {
        let divCardTit = document.createElement("div")
        divCardTit.id = titulo.id
   
        divCardTit.innerHTML = `
        <div class="m-3">
        <a href="#" class="btn btn-primary" onclick="tituloElegido('${titulo.porcentaje}','${titulo.nivel}')">${titulo.nivel}</a>
        </div>
        `

        cardTitulos.append(divCardTit)

    }))
}


// Toma los valores del titulo elegido y sigue a calcular sueldo
function tituloElegido(tituloPorcentaje, tituloNivel) {
    tituloUser = parseFloat(tituloPorcentaje)
    nivelTituloUser = tituloNivel

    return calcularSueldo()
}


function calcularSueldo() {

    let antiguedadTabla = valorAntiguedadUser * antiguedadUser  // Arroja el valor para el item antiguedad
    let tituloTabla = salarioUser * tituloUser // arroja el valor para el item titulo

    sueldoBruto = salarioUser + antiguedadTabla + tituloTabla  // Arroja el salario Bruto
    

    // Tabla donde va a ser visualizada la informacion con boton al final para realizar una nueva simulacion
    const tablaSueldo = document.getElementById("tablaSueldo")
    tablaSueldo.innerHTML = `
    <table class="mx-auto w-50 table table-striped table-hover">
    <tr class="bg-success text-white fw-bold">
    <td>Concepto</td>
    <td>Monto</td>
    </tr>
    <tr>
    <td>Salario Basico -- ${categoriaUser}</td>
    <td>$ ${salarioUser}</td>
    </tr>
    <tr>
    <td>Antiguedad -- ${antiguedadUser} años</td>
    <td>$ ${antiguedadTabla}</td>
    </tr>
    <tr>
    <td>Titulo -- ${nivelTituloUser}</td>
    <td>$ ${tituloTabla}</td>
    </tr>
    <tr class="bg-success text-white fw-bold">
    <td>Sueldo Bruto</td>
    <td>$ ${sueldoBruto}</td>
    </tr>
    </table>
    <button type="button" class="btn btn-danger mx-auto" onclick="refresh()">Realizar nueva simulacion</button>
    `
}

// Establece funcion de recargar pagina para el boton "Realizar nueva simulacion"
function refresh() {
    location.reload();
}