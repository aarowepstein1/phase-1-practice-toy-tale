let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    postToy(e.target.name.value, e.target.image.value);
  })
});

function renderToy(toy){
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
  <h2>${toy.name}</h2>
  <img src ="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes</p>
  <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  document.getElementById('toy-collection').appendChild(card);
  card.querySelector(`#${toy.id}`).addEventListener('click', () => {
    toy.likes++;
    card.querySelector('p').textContent = toy.likes;
    updateLikes();
  })
};


test = document.querySelector('input');


function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach( toy => {
    renderToy(toy);
  }))
}
getAllToys()

function postToy(name, url) {
  fetch('http://localhost:3000/toys', {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
  },
  body: JSON.stringify({
    'name': name,
    'image': url,
    'likes': 0
  })
})
}


function updateLikes() {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/JSON'
    },
    body: JSON.stringify({
      'name': e.target.name.value,
    'image': e.target.image.value,
    'likes': toy.likes
    })
  })
}
  
