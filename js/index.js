const currentUser = {
    id: 1,
    username: 'Aleksq7'
};
document.addEventListener("DOMContentLoaded", function() {
    let list = document.querySelector('#list');
    let display = document.querySelector('#show-panel')
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(arr => {
        arr.forEach(book => {
            let li = document.createElement('li')
            li.innerText = book.title;
            li.addEventListener('click', e => {
                display.innerHTML = '';
                // console.log(book);
                display.appendChild(createBookCard(book));
            })
            list.appendChild(li)
        })
    })
});

function createBookCard(book){
    let card = document.createElement('div');

    let img = document.createElement('img');
    img.src = book.img_url;
    card.appendChild(img);

    let title = document.createElement('h3');
    title.innerText = book.title;
    card.appendChild(title);

    let subtitle = document.createElement('h4');
    if (typeof book.subtitle === 'string'){
        subtitle.innerText = book.subtitle;
        card.append(subtitle);
    }

    let author = document.createElement('h4');
    author.innerText =  book.author;
    card.appendChild(author);

    let description = document.createElement('p');
    description.innerText = book.description;
    card.appendChild(description);

    let ul = document.createElement('ul');
    ul.className = 'user-list';
    book.users.forEach(user => {
        let li = document.createElement('li');
        li.innerText = user.username;
        ul.appendChild(li);
    })
    description.append(ul);

    let button = document.createElement('button');
    button.innerText = 'Like';
    button.addEventListener('click', e => {
        let userList = {}
        if (e.target.innerText === 'Like'){
            e.target.innerText = 'Dislike'
            userList = [...book.users, currentUser];
        }else{
            e.target.innerText = 'Like'
            userList = [...book.users]
        }
        console.log(userList)
        let configObj = {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({users:userList})
        }

        fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(resp => resp.json())
        .then(obj => {
            let likesList = document.querySelector('ul.user-list');
            likesList.innerHTML = '';
            obj.users.forEach(user => {
                let li = document.createElement('li');
                li.innerText= user.username
                likesList.appendChild(li)
            })
        })
    })
    card.appendChild(button);

    return card;

}