// Funcion create 

const createPost = (newPost) => {
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

// Función para agregar un nuevo post en la base de datos

$(".btn-publish").click(()=>{
    console.log($("#form-add .form-control"))
    let newPost = {
        createdAt:Date.now(),
    }

    $("#form-add .form-control").each(function(){
        let inputValue = $(this).val()
        console.log(inputValue)
        console.log($(this).attr("name"))
        let storeProperties = $(this).attr("name")
        newPost = {...newPost,[storeProperties]:inputValue} 
    })
    console.log(newPost)
    createPost(newPost)
})

// get value of selector and print in  +

let tagsSelection = ""

$("select").on("change", function(){
    tagsSelection += $(this).val() + ", "
    let inputTags = $(".display-tags").val() + $(this).val() + ", "
    $(".display-tags").val(inputTags)
    
})
