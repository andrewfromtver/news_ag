// Window resize on mobile browsers
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', vh + 'px')
window.addEventListener('resize', () => {
  () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', vh + 'px')
  }
  setTimeout(init, 50)
})
// Generate news_cards 
loadNews = (lang) => {
  document.getElementById('news').style.overflow = 'auto'
  document.getElementById('news').innerHTML = ``
  document.getElementById('popup').style.display = 'none'
  if (lang === 'ru') {
    news_ru.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div>
              <img src=${e.urlToImage || './assets/logo.png'}>
              <code>${e.publishedAt}</code>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              News AG, provided by - ${e.source.name}
            </button>
          </div>
        `
    })
  }
  if (lang === 'us') {
    news_us.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div>
              <img src=${e.urlToImage || './assets/logo.png'}>
              <code>${e.publishedAt}</code>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              News AG, provided by - ${e.source.name}
            </button>
          </div>
        `
    })
  }
  if (lang === 'gb') {
    news_gb.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div>
              <img src=${e.urlToImage || './assets/logo.png'}>
              <code>${e.publishedAt}</code>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              News AG, provided by - ${e.source.name}
            </button>
          </div>
        `
    })
  }
  if (lang === 'it') {
    news_it.articles.forEach(e => {
      document.getElementById('news').innerHTML += `
          <div class="card">
            <div>
              <img src=${e.urlToImage || './assets/logo.png'}>
              <code>${e.publishedAt}</code>
            </div>
            <h3>${e.title}</h3>
            <p>${e.description || ''}</p>
            <button id=${e.url} onclick="goTo(this.id, this.innerText)">
              News AG, provided by - ${e.source.name}
            </button>
          </div>
        `
    })
  }
}
// Open provided news page in iframe
goTo = (url, title) => {
  document.getElementById('news').style.overflow = 'hidden'
  document.getElementById('popup').style.display = ''
  document.getElementById('newsframe').src = url
  document.getElementById('title').innerText = title

}
// Close popup
closePopup = () => {
  document.getElementById('news').style.overflow = 'auto'
  document.getElementById('popup').style.display = 'none'
  document.getElementById('newsframe').src = './templates/loader.html'
}
// Init
window.onload = () => {
  loadNews(document.getElementById('lang').value)
}