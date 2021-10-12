
let btnDecrementar = document.getElementById("btn-restar")
let btnIncrementar = document.getElementById("btn-sumar")
let counter = document.getElementById("counter")

let number = 0


// btnDecrementar.addEventListener("click", () => {
//     console.log("click decrementar")
//     // number -= 1
//     number--
//     console.log(number)
//     counter.textContent = number
// })

// btnIncrementar.addEventListener("click", ()=> {
//     number++
//     console.log(number)
//     counter.textContent = number
// })

// let buttons = document.querySelectorAll(".btn-test")
// console.log(buttons)

// buttons.forEach((btn) => {
//     btn.addEventListener("click", (event)=> {
//         console.log("clicked..")
//         console.log(event)
//         console.log(event.target) // elemento - button
//         console.log(event.target.id)
//         let id = event.target.id
//         id === "btn-restar"
//             ? number--
//             : number++
//         counter.textContent = number
//     })
// })

let postsArray = []


const createPosts = (postObject) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText)
                createPosts()
            }
        }
    })

    // yo construimos la peticion
    xhr.open("POST", "https://devto-js-default-rtdb.firebaseio.com/posts/.json", true)

    // Enviamos la peticion
    xhr.send(JSON.stringify(postObject))
}


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

const deletePost = (idPostToDelete) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText)
                getPosts()
            }
        }
    })
    xhr.open("DELETE", `https://devto-js-default-rtdb.firebaseio.com/posts/${idPostToDelete}.json`, true)

    xhr.send()
}

/*document.getElementById("btn-agregar").addEventListener("click", (event)=> {
  event.preventDefault()
  let newPost = {}
  document.querySelectorAll("form#added-posts input").forEach((input) => {
       console.log(input.name, input.value)
      
      if(!input.value) {
          newPost = null
      }else {
        newPost[input.name] = input.value
      }
      console.log(newPost)
  })
  if(!newPost) return alert("Campos obligatorios")
  createPost(newPost)
})*/


const createNode = (typeElement, text) => {
    let node = document.createElement(typeElement)
    node.textContent = text
    // let textNode = document.createTextNode(text)
    // node.appendChild(textNode)
    return node
}

const clickToRemovePost = (event) => {
    console.log("Eliminando Post")
    // Eliminar del array
    let idPost = event.target.dataset.postId
    deletePost(idPost)
}

    postsArray= Object.keys(getPosts()).map((key)=>{({id:key})} ) 
    console.log(postsArray)

const printTable = () => {
    let tBody = document.getElementById("list-posts")
    let response = getPosts()
    
    postsArray= Object.keys(response).map((key)=>{
        
        let postObject= response[key]
    
        return{
            ...postObject,id:key
        }   
    
    } )
    
    console.log(postsArray)
    // tBody.innerHTML = ""

    // 
    // console.log(tBody.children)

    // mientras tBody tanga elementos va a eliminar el ultimo hijo
    while(tBody.lastElementChild) {
        tBody.removeChild(tBody.lastElementChild)
    }

    postsArray.forEach((posts, index) => {
        let {id, postTitle, createdAt} = posts
        let tr = document.createElement("tr")

        let tdIndex = createNode("td", index + 1)
        let tdTitle = createNode("td", postTitle)
        let tddatepublished = createNode("td", createdAt)
        let tdButton = document.createElement("td")
        let tdButton2 = document.createElement("td")

        let button = createNode("button", "Eliminar")
        let buttonEditar = createNode("a", "Editar")

        button.classList.add("btn", "btn-danger")
        buttonEditar.classList.add("btn", "btn-info")

        button.setAttribute("data-post-id", id)
        buttonEditar.setAttribute("href","./newpost.html?id="+id)


        button.addEventListener("click", clickToRemovePost)

        tdButton.appendChild(button)
        tdButton.appendChild(buttonEditar)


        tr.appendChild(tdIndex)
        tr.appendChild(tdTitle)
        tr.appendChild(tddatepublished)
        tr.appendChild(tdButton)
        tr.appendChild(tdButton2)

        tBody.appendChild(tr)
    })
}

printTable()

getPosts()


