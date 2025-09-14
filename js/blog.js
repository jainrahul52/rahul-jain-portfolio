// js/blog.js - Load post list from blog/posts/posts.json and render excerpts
async function loadPosts() {
  try {
    const res = await fetch('blog/posts/posts.json', {cache:'no-store'});
    const list = await res.json();
    const container = document.getElementById('postsList');
    if(!container) return;

    // sort by date (newest first)
    list.posts.sort((a,b)=> (b.date.localeCompare(a.date)));
    container.innerHTML = '';

    for(const p of list.posts){
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h3 style="margin:0">${p.title}</h3>
        <p class="post-excerpt">${p.date} • ${p.excerpt || ''}</p>
        <p><a class="btn ghost" href="blog/post-viewer.html?file=${p.file}">Read post →</a></p>
      `;
      container.appendChild(div);
    }
  } catch(err){
    console.error('Failed to load posts', err);
    document.getElementById('postsList').innerHTML =
      "<p class='meta'>⚠️ Could not load blog posts. Make sure you're running on a local server or GitHub Pages.</p>";
  }
}
document.addEventListener('DOMContentLoaded', loadPosts);

