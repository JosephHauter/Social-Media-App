const form = document.querySelector('form');
const API_URL = 'http://localhost:5000/feed'
const feedElement = document.querySelector('.feed');


listfeed();





form.addEventListener('submit', (event)=>{
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const username = formData.get('username');
  const post = formData.get('post');
  const image = formData.get('image');

  const info = {
    name,
    username,
    post,
    image
  };
  console.log(info);
  fetch(API_URL, {
    method:'POST',
    body: JSON.stringify(info),
    headers:{
      'content-type':'application/json'
    }
  }).then(response =>response.json())
    .then(createdData=>{
      console.log(createdData);
      form.reset();
      listfeed();
    });
});

function listfeed(){
  feedElement.innerHTML = '';
  fetch(API_URL)
  .then(response=> response.json())
  .then(feed=>{
    console.log(feed);
    feed.reverse();
    feed.forEach(info=>{
      const div = document.createElement('div');

      const header = document.createElement('h3');
      header.textContent = info.name;

      const header1 = document.createElement('h6');
      header1.textContent = info.username;

      const posts = document.createElement('p');
      posts.textContent = info.post;

      const date = document.createElement('small');
        date.textContent = new Date(info.created);

      div.appendChild(header);
      div.appendChild(header1);
      div.appendChild(posts);
      div.appendChild(date);

      feedElement.appendChild(div);
    });
  });

}




console.log("Hello Gang");
