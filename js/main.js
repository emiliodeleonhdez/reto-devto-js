// Funcion create 

let newPost = {
    imageUrl:"wwww",
    postTitle:"wwww",
    postTags:"wwwww",
    postImageUrl:"wwww",
    postContent:"www"
} 

const createPost = (post) => {
    $.ajax({
        method: "POST", 
        url: `https://devto-js-default-rtdb.firebaseio.com/posts/.json`, // endpoint de la base de datos
        data: JSON.stringify(newPost),
        success: (response)=> {
            console.log(response)
        },
        error: error => {
            console.log(error)
        },
        async: false
    })
}
/* 
createPost(newPost) */

// Funcion Read

const getPosts = () => {
    let posts
    $.ajax({
        method: "GET",
        url: "https://devto-js-default-rtdb.firebaseio.com/posts/.json",
        success: response => { 
            // console.log('response al terminar la peticion',response)
            products = response
        },
        error: error => {
            console.log(error)
        },
        async: false
    })
    // console.log(products)
    return products
}

// Función Update

let newDataPost = {
    imageUrl:"www.google.com.mx",
    postTitle:"wwww",
    postTags:"wwwww",
    postImageUrl:"wwww",
    postContent:"www"
} 

const updatePost = (keyPost, newDataPost) => {
    $.ajax({
        method: "PATCH",
        url: `https://devto-js-default-rtdb.firebaseio.com/posts/${keyPost}.json`, 
        data: JSON.stringify(newDataPost),
        success: (response)=> {
            console.log("Is working")
        },
        error: error => {

        }
    })
}


// Función Delete

const deletePost = keyPost => {
    $.ajax({
        method: "DELETE", 
        url: `https://devto-js-default-rtdb.firebaseio.com/posts/${keyPost}.json`,
        success: (response) => {
            console.log("Deleted")
        },
        error: error => {

        }
    })
}


// 

$(".btn-guardar").click(()=> { //Evento del boton guardar
    let mentorNuevo={}

    $("#form-add input").each(function(){ // Funcion que trae los valores de cada input y los guarda en un objeto
        console.log($(this).val())
        let inputValue = $(this).val()
        console.log($(this).attr("name"))
        let storeProperties = $(this).attr("name")
        mentorNuevo = {...mentorNuevo,[storeProperties]:inputValue} //spread operator Se puede hacer la propagación y se puede agregar más propiedades {...Objeto, [propiedad que quiero agregar]:valor}
    })

    console.log(mentorNuevo)
    createMentor(mentorNuevo) //Funcion que agrega a un nuevo mentor 
})