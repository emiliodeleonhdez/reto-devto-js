
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
    postsArray = []
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                
                let response = xhr.responseText
                let postObject = JSON.parse(response)
                console.log(postObject)
      
                if(postObject) {
                    postsArray = Object.keys(postObject).map((key) => {
                        let postObject = postObject[key]
                        return {...postObject, id:key}
                    })
                    printTable()
                }else {
                    printTable()
                    console.log("No hay Posts")
                }
                
            }
        }
    })
    xhr.open("GET", "https://devto-js-default-rtdb.firebaseio.com/posts/.json", true)

    xhr.send()
}

const deletePost = (idPostsToDelete) => {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4) {
            if(xhr.status === 200) {
                console.log(xhr.responseText)
                getPosts()
            }
        }
    })
    xhr.open("DELETE", `https://devto-js-default-rtdb.firebaseio.com/posts${idPostToDelete}/.json`, true)

    xhr.send()
}

document.getElementById("btn-agregar").addEventListener("click", (event)=> {
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
})


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

const printTable = () => {
    let tBody = document.getElementById("list-posts")

    // tBody.innerHTML = ""

    // 
    // console.log(tBody.children)

    // mientras tBody tanga elementos va a eliminar el ultimo hijo
    while(tBody.lastElementChild) {
        tBody.removeChild(tBody.lastElementChild)
    }

    postsArray.forEach((posts, index) => {
        let {id, title, datepublished} = posts
        let tr = document.createElement("tr")

        let tdIndex = createNode("td", index + 1)
        let tdtitle = createNode("td", title)
        let tddatepublished = createNode("td", datepublished)
        let tdButton = document.createElement("td")
        let tdButton2 = document.createElement("td")

        let button = createNode("button", "Eliminar")
        button.classList.add("btn", "btn-danger")

        button.setAttribute("data-post-id", id)

        button.addEventListener("click", clickToRemovePost)

        tdButton.appendChild(button)
        tdButton.appendChild(button2)

        tr.appendChild(tdIndex)
        tr.appendChild(tdtitlePost)
        tr.appendChild(tddatepublished)
        tr.appendChild(tdButton)
        tr.appendChild(tdButton2)

        tBody.appendChild(tr)
    })
}

// printTable()

getPosts()


