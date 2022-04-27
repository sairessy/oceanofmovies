const Movie = (id, title, cover, categories) => {
  let auxCategories = ""

  categories.forEach(c => {
    auxCategories += `
    <span class="category">
      ${config.categories.filter(ct => ct.id == c)[0].label}
    </span>` 
  })

  return(`
    <div class="movie" style="background: ${darkTheme ? "#444" : "#fff"};">
      <div class="movie-cover" style="background-image: url(${cover});background-color: ${darkTheme ? "#000" : "#ddd"};">
        <a href="movie.html?v=${id}"><i class="la la-play-circle"></i></a>
      </div>
      <div class="movie-details">
        <p class="movie-title">${title}</p>
        <div class="movie-categories">
          ${auxCategories}
        </div>
      </div>
    </div>
  `)
}