const express = require("express");

//Agregamos el ProductManager

const ProductManager = require("./ProductManager");

//************************ //
//Utilizamos el path para poder trabajar con rutas absolutas
const path = require("path");
//************************ //

//************************ //
//Limpiamos la consola
console.clear();
//************************ //

const PORT = 3000;

const app = express();

let archivo = path.join(__dirname, "../../archivos", "archivo.json");
console.log(__dirname)


// Colocamos la siguiente linea para que el servidor pueda interpretar datos complejos
app.use(express.urlencoded({ extended: true }));

const productosDeArchivo = new ProductManager(archivo);
let productos = [];

//Uso del try catch para trabajar con datos asyncronos
const entorno2 = async () => {
  try {
    productos = await productosDeArchivo.getProductsAsyncFS();
    // console.log(productos);

    if(productos.length === 0){
        console.log('Productos no encontrados')
        return
    }

    app.get("/", (req, res) => {
        res.send('Hola soy un servidor Express')
      });


  //enviando el producto QUERY
    app.get('/products', (req, res) => {
        let resultado = productos

    
        if (req.query.limit) {
            resultado = resultado.slice(0, req.query.limit)
        }
        res.setHeader('Content-type', 'application/json')
      res.status(200).json({filtros: req.query, resultado})
    })


    //Enviado el producto por ID PARAMS
    app.get('/products/:id', (req, res) => {

        let id = req.params.id;
    
      // Convirtiendo el id a numero para hacer la comparacion estrictamente igual
        id = parseInt(id)
    
        if (isNaN(id)) {
            return res.send('Error, ingrese un argumento id numerico')
            
        }
        resultado2 = productos.find((producto)=>{
            return producto.id === id
        })

        if (!resultado2) {
            return res.send('Error, No existe el id')
            
        }
    
        res.setHeader('Content-type', 'application/json')
      res.status(200).json(resultado2)
    })

    const server = app.listen(PORT, ()=>{
        console.log(`Server on line en puerto ${PORT}`)
    })
  } catch (error) {
    console.log("Se ha encontrado el siguiente error", error.message);
  }
};

entorno2();
