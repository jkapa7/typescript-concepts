//DATO: VSCODE ESTA DESARROLLADO CON TYPESCRIPT. TAMBIEN POR MICROSOFT

//QUE ES?

//ES UN SUPERSET, LENGUAJE DE PROGRAMACION QUE AÑADE TIPOS ESTATICOS A JAVASCRIPT

//TODO LO QUE SE HACE CON TYPESCRIPT ES JAVASCRIPT

//LO QUE LLEGA SIEMPRE AL NAVEGADOR ES JAVASCRIPT TYPESCRIPT SE COMPILA Y SE LEE EN JAVASCRIPT

//VENTAJAS

//JAVASCRIPT TIENE UN TIPADO DEBIL Y DINAMICO SE POPULARIZO MUCHO, PERO PAR PROYECTOS GRANDES LE FALTABAN TEMAS DE TIPADO Y SOBRE TODO LAS CLASES, LE FALTABA SEGURIDAD Y ROBUSTES. PARA ESTO MICROSOFT CREO TYPESCRIPT.

//TYPESCRIPT NOS OFRECE UN TIPO FUERTE Y ESTATICO  AÑADE SEGURIDAD Y ROBUSTES
//TODOS LOS VALORES TENDRAN UN TIPO.

//TYPESCRIPT NO FUNCIONA EN TIEMPO DE EJCUCION, FUNCIONA EN COMPILACION
//EL NAVEGADOR NO ENTIENDE TYPESCRIPT

//TYPESCRIPT ES CAPAZ DE INFERIR INFORMACION

//AL DEIFNIR EL TIPO ANY, NO SOLO LE INDICO QUE PUEDE TENER CUALQUIER VALOR. TAMBIEN DEJARA DE INFERIR TODO SOBRE EL VALOR.... EN ESTE CASO ES UN OBJETO, AL TIPAR QUE ES ANY, TYPESCRIPT NO INFERIRA TODOS LOS METODOS QUE TIENE EL OBJETO.... PORQUE PODRIA SER CUALQUIER COSA.... LO MEJOR ES SIEMPRE EVITAR LOS ANY
let persona: any = {
  name: "juan",
  age: 19,
};

function saludar(name: string) {
  console.log(`Hola ${name}`);
}

saludar("Juan");

//EN ESTE CASO DE FUNCION RECIBIENDO UN OBJETO, NO PUEDO DEFINIR EL TYPO COMO ARRIBA, YA QUE AL ESTAR DENTRO DE UN OBJETO, LO QUE ESTARIA HACIENDO ES RENOMBRAR EL VALOR
function saludar2({ name, age }: { name: string; age: number }) {
  console.log(`Hola ${name}, tienes ${age} años`);
}

saludar2({ name: "juan", age: 7 });

//TAMBIEN PUED TIPAR QUE ES LO QUE DEVOVLERA LA FUNCION
function saludar3({ name, age }: { name: string; age: number }): number {
  console.log(`Hola ${name}, tienes ${age} años`);
  return age;
}

saludar3({ name: "juan", age: 7 });

///TIPAR EL CON :FUNCTION ES EL ANY DE LAS FUNCIONES, LO CORRECTO ES TIPAR QUE ES ESA FUNCION, QUE RECIBE Y QUE REVUELVE. SI NO RETORNA NADA ENTONCES SE TIPA CON VOID
const sayHiFromFunction = (fn: (name: string) => void) => {
  fn("juan");
};

sayHiFromFunction((name: string) => {
  console.log(`Hola ${name}`);
});

//TIPADO EN ARROW FUNCTION
const sumar = (a: number, b: number): number => {
  return a + b;
};

//OBJETOS, PARA TIPARLOS USO UN TYPE O UNA INTERFACE
let character: Hero = {
  name: "thor",
  age: 1500,
};

//TYPE ACA DEFINO QUE LLEVARA EL TIPE, QUE PROPIEDADES Y SUS TIPOS
type Hero = {
  readonly id?: HeroID;
  name: string;
  age: number;
  isActive?: boolean;
};

function createHero(character: Hero): Hero {
  const { name, age } = character;
  return {
    id: crypto.randomUUID(),
    name,
    age,
    isActive: true,
  };
}

const thor = createHero({ name: "Man", age: 2 });

// DE ESTA MANERA PUEDO MODIFICAR LA PROPIEDAD DE THOR, PERO SI LE AGREGO UN READONLY A LA PROPIEDAD EN EL TYPO, NO LA PODRE MODIFICAR
// thor.id = 2; -----> DARIA ERROR

//ESTOY CREANDO UN TYPE PARA EL ID, COMO ES UUID SE QUE SERA UNA UNION DE STRINGS, Y QUIERO HACER ESTO PARA QUE EL ID QUE SE RECIBA SOLO PUEDA SER DE ESTE TYPE
type HeroID = `${string}-${string}-${string}-${string}-${string}`;

//

//TEMPLATE UNION TYPES

//AMBOS SON HEXADECIMAL, PERO EN UNO LO GUARDO CON ALMOHADILLA Y EL OTRO NO,LO QUE PUEDO HACER ES UN TYPE PARA QUE LOS COLORES SE PUEDAN ASIGNAR DE UNA SOLA MANERA
type HexadecimalColor = `#${string}`;

const color2: HexadecimalColor = "#0033ff"; // HEXADECIMAL
// const color: HexadecimalColor = "0033ff"; //DARA ERROR PORQUE NO CUMPLE EL TYPE

//

//UNION TYPES
type HeroPowerScale = "local" | "planetary" | "galactic";

///ESTA UNION DOS TYPES, PUEDE SER NUMBER O STRING
let ann: number | string;

let an: string | 2;

//

//INTERSECTION TYPES
//EXPANDIR, EXTENDER PARA IR CREANDO NUEVOS TYPOS CON TYPOS EXISTENTES

//TENGO MI TYPE CON BASIC INFO
type HeroBasicInfo = {
  name: string;
  age: number;
};

//TENGO MI TYPE PARA CREAR UN NUEVO HERO
type HeroProperties = {
  isActive?: boolean;
  powerScale?: HeroPowerScale;
};

//LO QUE QUIERO ES CREAR UN TYPE QUE JUNTE ESTOS DOS TYPES ASI LO HAGO
//PARA QUE CUMPLA EL TIPO NEWHERO DEBE TENER LOS OTROS DOS TYPES
type newHero = HeroBasicInfo & HeroProperties;

//

//

//TYPE INDEXING
type Properties = {
  isActive: boolean;
  address: {
    planet: string;
    city: string;
  };
};

//IN THIS CASE I JUST WANT THE ADDRES PART OF THE TYPE PROPERTIES, SO THIS IS THE WAY TO DO IT..... PROPERTIES["WHAT PART I WANT"], ALWAYS BETWEEN ""
const addresHero: Properties["address"] = {
  planet: "Earth",
  city: "bogotá",
};

//

//TYPE FROM FUCTION RETURN
function createAddress() {
  return {
    planet: "Tierra",
    city: "Barcelona",
  };
}

//QUIERO QUE EN ESTE TIPO ADDRESS SE GUARDE LO QUE RETORNA LA FUNCTION CREATEADDRESS, ESO QUE RETORNA SERA EL VALOR DE ESTE TYPE, USANDO EL TYPEOF
type Address = ReturnType<typeof createAddress>;

//TYPE ADDRESS QUEDARIA:
// type Address = {
//   planet: string;
//   city: string;
// };

//

//ARRAYS
//AL NO DEFINIR UN TYPO, LA INFERENCIA DE TYPESCRIPT ENTENDERA QUE QUEREMOS QUE EL ARRAY SEA SIEMPRE VACIO, DEBO TYPAR LOS ARRAYS

const lenguages: string[] = [];

const lenguages2: Array<string> = [];

lenguages.push("JavaScript");

//IF I WANT AN ARRAY WITH MORE DATA TYPES I CAN DO IT:
const lenguagesAndNumbers: (number | string)[] = [];
const lenguagesAndNumbers2: Array<string | number> = [];

//

//MATRICES

/*
  [
    ["X", "O", "X"], // string[]
    ["X", "O", "O"], // string[]
    ["O", " ", "X"]  // string[]
  ]
*/

type CellValue = "X" | "O" | " ";

//UNA TUPLA ES UN ARRAY QUE TIENE UN LIMITE FIJADO DE LONGITUD
type GameBoard = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];

const gameBoard: GameBoard = [
  ["X", "O", "X"],
  ["X", "O", "O"],
  ["O", " ", "X"],
];

//EJEMPLO DE TUPLA:.... UN ARRAY CON UN LIMITE FIJADO DE LONGITUD
type RGB = [number, number, number];

const rgb: RGB = [3, 6, 7];

//

//

//TYPES AND INTERFACES

//INTERFACES CANT BE USED TO ALIAS A PRIMITIVE TYPE ONLY WORKS WITH OBJECTS

//interface Test = boolean ❌
//interface Test2 = boolean | number | null ❌

//TYPES CAN BE USED TO ALIAS A PRIMITIVE TYPE

//type Test = boolean ✅
//type Test2 = boolean | number | null ✅
