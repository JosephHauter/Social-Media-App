const form = document.querySelector('form');
const API_URL = 'http://localhost:5000/feed'//where is the data going to .. send to dynamic server
const feedElement = document.querySelector('.feed');
const posts = document.getElementById('posts');
const btn = document.getElementById('toggle');



btn.onclick = function () {
  if (posts.style.display === 'none') {
    posts.style.display = 'block';
  } else {
    posts.style.display = 'none';
  }
};

listfeed();

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  //grab info submitted
  const formData = new FormData(form);
  const name = formData.get('name');
  const username = formData.get('username');
  const post = formData.get('post');
  const image = formData.get('image');

  const info = {//object
    name,
    username,
    post,
    image
  };
  console.log(info);
  fetch(API_URL, {//request data from server
    method:'POST',
    body: JSON.stringify(info),//turn object into something the server can understand
    headers:{ //what are we sending it
      'content-type':'application/json'//Sending an application
    }
  })
  .then(response =>response.json())//give response back
    .then(createdFeed=>{
      console.log(createdFeed);
      form.reset();//clear form
      listfeed();
    });
});



function listfeed(){
  feedElement.innerHTML = '';// blank what element was there
  fetch(API_URL)
    .then(response=> response.json())
    .then(feed=>{
    console.log(feed);
    feed.reverse();
    feed.forEach(info=>{// for every element in array place on page
      const div = document.createElement('div');// create div
      div.className= "card darkmode my-3 p-3 shadow";

      const header = document.createElement('h3');
      header.textContent = info.name;

      const header1 = document.createElement('h6');
      header1.textContent = '@' + info.username;
      header1.className= "text-primary";

      const posts = document.createElement('p');
      posts.textContent = info.post;

      // const date = document.createElement('small');
      //   date.textContent = new Date(info.created);

      div.appendChild(header);
      div.appendChild(header1);
      div.appendChild(posts);
      // div.appendChild(date);

      feedElement.appendChild(div);
    });
  });
}
