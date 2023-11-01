console.clear();

//Agregando File System para trabajar con archivos

const fs = require("fs");

class ProductManager {
  constructor(rutaArchivo) {
    
    this.path = rutaArchivo;

  }

  //Consigue los productos del FS en modo asyncrono
  async getProductsAsyncFS() {
    if (fs.existsSync(this.path)) {
      return JSON.parse( await fs.promises.readFile(this.path, "utf-8"));
    } else {
      return [];
    }
  }

  //Agregar un producto al FS en modo asyncrono
  async addProductAsyncFS(title, description, price, thumbnail, code, stock) {
    let productos = await this.getProductsAsyncFS();

    // validar si el code existe
    let existeCode = productos.find((producto) => {
      return producto.code === code;
    });
    if (existeCode) {
      console.log(`El usuario con code = ${code} ya existe`);
      return;
    }

    let id = 1;

    if (productos.length > 0) {
      id = productos[productos.length - 1].id + 1;
    }

    let producto = {
      id: id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };

    //valida si los campos estan llenos
    if (Object.values(producto).includes(undefined)) {
      console.log("Debe ingresar todos los campos ");
      return;
    }

    productos.push(producto);
    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));
  }



  //retorno el producto por ID del FS en modo asyncrono
  async getProductByIdAsyncFS(id) {
    let productos = await this.getProductsAsyncFS();

    let indice = productos.findIndex((producto) => {
      return producto.id === id;
    });
    if (indice === -1) {
      console.log(`No existe el producto con id ${id}  Not Found`);
      return;
    }

    return productos[indice];
  }

  //Borrar un producto del FS en modo asyncrono

  async delProductAsyncFS(id) {
    let productos = await this.getProductsAsyncFS();

    //Buscando si existe el indice

    let indice = productos.findIndex((producto) => {
      return producto.id === id;
    });
    if (indice === -1) {
      console.log(`No existe el producto con id ${id}  Not Found`);
      return;
    }

    productos.splice(indice, 1);

    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));
  }


    //Actualizar un producto del  FS en modo asyncrono
  async updateProductAsyncFS(id, objeto) {
    let productos = await this.getProductsAsyncFS();

    //Buscando si existe el indice

    let indice = productos.findIndex((producto) => {
      return producto.id === id;
    });
    if (indice === -1) {
      console.log(`No existe el producto con id ${id}  Not Found`);
      return;
    }

    //Validar que sea un objeto

    //*********************** //

    //Comprobando si es un objeto

    const comprobarObjeto = (obj) => {
      return obj === Object(obj);
    };

    const objetoComprobado = comprobarObjeto(objeto);

    if (!objetoComprobado) {
      console.log("no es un objeto");
      return;
    }

    //*********************** //





    //*********************** //
    //valida que un objeto no sea vacio

    const camposObjetosLlenos = (obj) => {
      if (Object.values(obj).length === 0) {
        console.log("Debe ingresar al menos un campo, con su valor ");
        return;
      }
    };

    camposObjetosLlenos(objeto);

    //*********************** //


    //*********************** //
    //valida que los campos a ingresar sean los correctos 

    const claves = Object.keys(objeto);
   
    const clavesMaestras = Object.keys(productos[0]);
    

    try {
      claves.forEach((datoObjeto)=>{
  
          let dato = clavesMaestras.includes(datoObjeto)
          
       
          if (!dato) {
           console.log(`NO EXISTE EL CAMPO ${datoObjeto}`);
           throw `Error de campo`
          //  return false
          }
           })
  } catch (error) {
      console.log(error.message)
      
  }
//*********************** //





    productos[indice] = {
      ...productos[indice],
      ...objeto,
      id,
    };

    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 5));
  }
}

//************************ //
//Exportamos el modulo ProductManager que sera utilizado en el app en modo asincrono.
module.exports = ProductManager
//************************ //


// console.log("========================");
// console.log("Trabajando con File System FS");

// let producto2 = new ProductManager("./archivos/archivo.json");

// console.log("========================");
// console.log("Leyendo productos del FS");
// console.log(producto2.getProductsFS());

// console.log("========================");
// console.log("Agregando productos al FS");
// producto2.addProductFS(
//   "producto1",
//   "zapato",
//   100,
//   "www.imagen.com/image1",
//   123,
//   10
// );
// producto2.addProductFS(
//   "producto2",
//   "cartera",
//   100,
//   "www.imagen.com/image2",
//   423,
//   260
// );
// producto2.addProductFS(
//   "producto3",
//   "mochila",
//   100,
//   "www.imagen.com/image3",
//   623,
//   520
// );
// producto2.addProductFS(
//   "producto4",
//   "laptop",
//   100,
//   "www.imagen.com/image4",
//   523,
//   110
// );
// producto2.addProductFS(
//   "producto5",
//   "parlante",
//   80,
//   "www.imagen.com/image5",
//   783,
//   10
// );
// console.log(producto2.getProductsFS());

// console.log("========================");
// console.log("Buscando un Id (id numero 2) que si esta en el arreglo del FS ");
// console.log(producto2.getProductByIdFS(2));



// console.log("========================");
// console.log("Borrando un producto del FS  con id 3 ");
// console.log(producto2.delProductFS(3));
// console.log(producto2.getProductsFS());

// console.log("========================");
// console.log("Actualizando el producto con id 4   ");

// console.log(
//   producto2.updateProductFS(4, {
//     title: "Nuevo titulo",
//     description: "CPU",
//     price: 500,
//   })
// );
// console.log(producto2.getProductsFS());

// console.log("========================");
// console.log("Comprobando si los datos para actualizar son un Objeto ");

// console.log(producto2.updateProductFS(5, 120));
// console.log(producto2.getProductsFS());



// console.log("========================");
// console.log("Comprobando si es un Objeto vacio");
// console.log(producto2.updateProductFS(5, {}));
// console.log(producto2.getProductsFS());


// console.log("========================");
// console.log("Comprobando el objeto estan bien ingresados los campos");
// console.log(producto2.updateProductFS(5, {title: 'Nuevo titulo ', description2: "Lapicero",
// price: 20, }));
// console.log(producto2.getProductsFS());



// console.log("========================");
// console.log("Agregando productos al FS");
// producto2.addProductFS(
//   "producto6",
//   "Teclado",
//   50,
//   "www.imagen.com/image1",
//   233,
//   10
// );
// producto2.addProductFS(
//   "producto7",
//   "Pantalon",
//   80,
//   "www.imagen.com/image2",
//   923,
//   160
// );
// console.log(producto2.getProductsFS());