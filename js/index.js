let category = ""
let limit = 4
const limitPlus = 4
let limitReached = false
let darkTheme = false

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
    const {_id, title, cover, categories, views} = movie
    auxMovies += Movie(_id, title, cover, categories, views)
  }

  limit += limitPlus
  document.getElementById("movies").innerHTML = auxMovies
  
  if(!limitReached) {
    document.getElementById("btn-more").style.background = "#10076a"
    document.getElementById("btn-more").style.disabled = false
    document.getElementById("btn-more").style.display = "block"
  } else {
    document.getElementById("btn-more").style.display = "none"
  }
}

document.querySelector("body").onscroll = (e) => {

}

document.getElementById("btn-more").addEventListener("click", (e) => {
  e.target.style.background = "#aaa"
  e.target.style.disabled = true
  getMovies()
})

let cs = '<option value="">Todos</option>'
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
        const {_id, title, cover, categories, views} = movie
        auxMovies += Movie(_id, title, cover, categories, views)
      }
    
      document.getElementById("movies").innerHTML = auxMovies
      document.getElementById("btn-more").style.display = "none"
    }
  }
})

document.getElementById("checkbox-change-theme").addEventListener("change", e => {
  changeTheme(e.target.checked)
})

function changeTheme(val) {
  const checked = val
  darkTheme = !checked
  
  $("body").css({"background" : `${darkTheme ? "#444" : "#fff"}`})

  if(!checked) {
    $("#slider").css({"background" : "#000"})
    $("#slider-container").css({"background" : "#000000cc"})
    $("#loader").css({"background" : "#444"})
  } else {
    $("#slider").css({"background" : "#fff"})
    $("#slider-container").css({"background" : "#00000086"})
    $("#loader").css({"background" : "#fff"})
  }

  limit -= limitPlus
  getMovies()
}

// Controll slider behavior
$("#btn-menu").click(() => {
  $("#slider-container").fadeIn(() => {
    $("#slider").animate({left: "0"})
  })

  $("body").css("overflow-y", "hidden")
})
  
document.getElementById("slider-container").addEventListener("click", e => {
  if(e.target.id == "slider-container") {
    $("#slider").animate({left: "-80%"}, () => {
      $("#slider-container").fadeOut()
    })
    $("body").css("overflow-y", "scroll")
  }
})