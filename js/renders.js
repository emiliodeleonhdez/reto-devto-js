const renderCards = (postsObjs) => {
    let cardsHTML = ''
    let properties = Object.keys(postsObjs).reverse();
    properties.forEach(key =>  {
        let card = new Cards(key, postsObjs[key])
        cardsHTML += card.cardGenerator()
    })
    $('.articles_container article').append(cardsHTML)
}

$(window).on("load", 
    setTimeout(function(){
        renderCards( getPosts() )
    }, 300)
)