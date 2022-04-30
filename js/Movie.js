const Movie = (id, title, cover, categories, views) => {
  let auxCategories = ""

  categories.forEach(c => {
    auxCategories += `
    <span class="category" style="color: ${!darkTheme ? "#444" : "#aaa"};">
      ${config.categories.filter(ct => ct.id == c)[0].label}
    </span>` 
  })

  return(`
    <div class="movie" style="background: ${darkTheme ? "#444" : "#fff"};">
      <div class="movie-cover" style="background-image: url(${cover});background-color: ${darkTheme ? "#333" : "#ddd"};">
        <a href="movie.html?v=${id}">
          <i style="color: ${darkTheme ? "#666" : "#fff"};" class="la la-play-circle"></i>
        </a>
      </div>
      <div class="movie-details">
        <p class="movie-title" style="color: ${!darkTheme ? "#444" : "#fff"};">${title}</p>
        <div class="movie-categories">
          ${auxCategories}
        </div>
        <div class="views-likes">
          <div>
            <b>${views / 1000}K</b><span> Views</span>
          </div>  
        </div>
      </div>
    </div>
  `)
}