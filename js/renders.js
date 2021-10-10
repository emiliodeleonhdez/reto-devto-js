const renderCards = (postsObjs) => {
    let cardsHTML = ''
    for (key in postsObjs) {
        let card = new Cards(postsObjs[key])
        cardsHTML += card.cardGenerator()
    }
    $('.articles_container article').append(cardsHTML)
}

$(window).on("load", 
    setTimeout(function(){
        renderCards( getPosts() )
    }, 2000)
)