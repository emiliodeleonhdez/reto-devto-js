class Cards {
    constructor ({
        postTitle,
        postContent,
        postImgUrl,
        postTags,
        createdAt
    }) {
        this.title = postTitle
        this.img = postImgUrl
        this.tags = postTags.substring(0, postTags.length - 2).split(', ')
        this.content = postContent
        this.createdAt = createdAt
    }

    cardGenerator () {
        console.log(this.tags)
        return `
        <div class="first-card card mb-2">
          ${
            this.img ? `<img src="${this.img}" class="card-img-top img-fluid" alt="..."></img>`
                     : ''
          }
          <div class="card-body p-2 ml-1 mt-1">
              <div class="articles-author_container container-fluid d-flex mb-3">
                <div class="row">
                  <img class="article_logo rounded-circle align-self-center" src="./images/84e49851-d0da-4b98-9483-bb157f9e531f.jpeg" alt="">
                  <div class="col p-0 ml-2">
                    <h6 class="m-0">Tapajyoti Bose</h6>
                    <p class="m-0">(${getTimeAgo(this.createdAt)})</p>
                  </div>
                </div>
              </div>
            <h5 class="card-title">${this.title}</h5>
            <div class="container tags card-text d-flex p-0 mb-3">
                <div class="row">
                    ${
                        this.tags.map(tag => {
                            return `<a class="col" href="#"><small class="text-muted">#${tag}</small></a>`
                        })
                    }
                </div>
            </div>
            <div class="articles-reactions container-fluid">
              <div class="row">
                  <div class="col p-0">
                      <a href=""><img src="./svg-images/Reactions.svg" alt=""><span class="text-muted">11</span><span class="text-muted d-none d-md-inline"> reactions</span></a>
                      <a href=""><img src="./svg-images/Comments.svg" alt=""><span class="text-muted">10</span><span class="text-muted d-none d-md-inline"> comments</span></a>
                  </div>
                  <div class="col p-0 d-flex justify-content-end">
                      <small class="text-muted align-self-center">1 min read</small>
                      <button type="button" class="btn btn-secondary btn-sm ml-1">Save</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        `
    }
}
