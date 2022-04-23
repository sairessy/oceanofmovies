let category = ""
let limit = 4
const limitPlus = 4
let limitReached = false

getMovies()

async function getMovies() {
  const res = await fetch(config.server + "/api/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({limit, category})
  })

  const json = await res.json()
  const movies = json.data.movies
  limitReached = json.data.limitReached

  let auxMovies = ""

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const {_id, title, cover, categories} = movie
    auxMovies += Movie(_id, title, cover, categories)
  }

  limit += limitPlus
  document.getElementById("movies").innerHTML = auxMovies
  
  if(!limitReached) {
    document.getElementById("btn-more").style.display = "block"
  } else {
    document.getElementById("btn-more").style.display = "none"
  }
}

document.querySelector("body").onscroll = (e) => {

}

document.getElementById("btn-more").addEventListener("click", () => {
  getMovies()
})

let cs = '<option value="">Todas categorias</option>'
config.categories.forEach(c => {
  cs += `<option value="${c.id}">${c.label}</option>`
});
document.getElementById("select-category").innerHTML = cs

document.getElementById("select-category").addEventListener("change", e => {
  const c = e.target.value
  category = c
  limit = 4
  getMovies()
})

document.getElementById("input-search").addEventListener("keyup", async e => {
  const text = e.target.value
  if(text.length > 2) {
    const res = await fetch(config.server + "/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text})
    })
  
    const json = await res.json()
    const movies = json.data.movies
    
    if(movies.length > 0) {
      let auxMovies = ""
  
      for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];
        const {_id, title, cover, categories} = movie
        auxMovies += Movie(_id, title, cover, categories)
      }
    
      document.getElementById("movies").innerHTML = auxMovies
      document.getElementById("btn-more").style.display = "none"
    }
  }
})