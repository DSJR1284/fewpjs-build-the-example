// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
modal.className = "hidden"

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector('#modal')

   // have a collection of hearts 
  // add event listener to each heart 
  const hearts = document.querySelectorAll("span.like-glyph")

  for( const heart of hearts){
    heart.addEventListener("click", (e) => { //Make a server call 
      mimicServerCall() //return a promise 
      .then(() => {
        // When successful, change the heart 
      // if it's empty make it full, add new class 
      // else if it's full, make it empty
      if (heart.innerHTML == EMPTY_HEART){
        heart.innerHTML = FULL_HEART
        heart.className = "activated-heart"
      } else {
        heart.innerHTML = EMPTY_HEART
        heart.className = "like-glyph"
      }
      })

      .catch(error => {
        modal.hidden = false
        const modalMessage = document.querySelector("#modal-message")
        modalMessage.innerHTML = error
        setTimeout(() => {
          // do this during timeout
          modal.hidden = true 
        }, 5000)
      })
      // promises have the .then()
      // We normally use 2 .then
      // 1. Is to take the response and jsonify it. 
      // 2. Take the jsonify response, do something with it. 
    })
  }
})

// fetch()
// .then(resp => resp.json()) return another promise
// .then(data => {
//   do something with the data
// })
// .catch(){}
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//-----------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) { //debugger;
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
