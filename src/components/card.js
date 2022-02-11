import axios from "axios"
const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')

  const headlineDiv = document.createElement('div')
  headlineDiv.classList.add('headline')
  headlineDiv.textContent =  article.headline

  const authorDiv = document.createElement('div')
  authorDiv.classList.add('author')

  const imageDiv = document.createElement('div')
  imageDiv.classList.add('img-container')

  const image = document.createElement('img')
  image.src = article.authorPhoto

  const authorNameSpan = document.createElement('span')
  authorNameSpan.textContent = `By ${article.authorName}`

  cardDiv.appendChild(headlineDiv)
  cardDiv.appendChild(authorDiv)
  authorDiv.appendChild(imageDiv)
  imageDiv.appendChild(image)
  authorDiv.appendChild(authorNameSpan)

  cardDiv.addEventListener('click', (e) => {
    console.log(e.target.textContent)
  })

  return cardDiv
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  
  axios.get(`http://localhost:5000/api/articles`)
  .then(resp => {
    const randomEntryPoint = document.querySelector(selector)
     let arr = Object.keys(resp.data.articles)
    for(let i = 0; i < arr.length; i++){
      resp.data.articles[arr[i]].forEach(item => randomEntryPoint.appendChild(Card(item)))
    }
  })
  .catch(error => {
    console.error(error)
  })
}

export { Card, cardAppender }
