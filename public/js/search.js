function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchIndex = [];
  
    // Fetch the search index
    fetch('/search.json')
      .then(response => response.json())
      .then(data => {
        searchIndex = data;
      });
  
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
  
      const results = searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query)
      );
  
      displayResults(results);
    });
  
    function displayResults(results) {
      if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found</p>';
        return;
      }
  
      const html = results
        .slice(0, 5)
        .map(post => `
          <div class="search-result-item">
            <a href="${post.url}">${post.title}</a>
            <span class="post-date">${post.date}</span>
          </div>
        `)
        .join('');
  
      searchResults.innerHTML = html;
    }
  }
  
  document.addEventListener('DOMContentLoaded', initializeSearch);
  
