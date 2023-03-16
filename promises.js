//========================================================
//promise
//Ans from 1 to 4 
//========================================================

// const posts = [
//     { title: 'Post One', body: 'This is post one', createdAt: new Date().getTime() },
//     { title: 'Post Two', body: 'This is post two', createdAt: new Date().getTime() }
// ];
// let intervalId = 0;
// function getPosts() {
//     clearInterval(intervalId);
//     intervalId = setInterval(() => {
//         let output = '';
//         posts.forEach((post, index) => {
//             output += `<li>${post.title} - last updated at ${Math.trunc((new Date().getTime() - post.createdAt) / 1000)} seconds ago</li>`;
//             // console.log(post);
//             console.log("interval id =", intervalId);
//         });
//         document.body.innerHTML = output;

//     }, 1000);
// }
// function createPosts(post) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             posts.push({ ...post, createdAt: new Date().getTime() });
//             const error = false;
//             if (!error) {
//                 resolve();
//             } else {
//                 reject('Error: Something went wrong');
//             }
//         }, 1000);
//     })
// }
// createPosts({ title: 'Post Three', body: 'This is post three' });


// createPosts({ title: 'Post Four', body: 'This is post four' }).then(() => {
//     getPosts()
//     deletePost().then(() => {
//         getPosts()
//         deletePost().then(() => {
//             getPosts();
//             deletePost().then(() => {
//                 getPosts();
//                 deletePost().then(() => {
//                     getPosts();
//                     deletePost().then(() => {
//                         getPosts();
//                     }).catch((err) => { return console.log(err, 6) });
//                 }).catch((err) => { return console.log(err, 5) });
//             }).catch((err) => { return console.log(err, 4) });
//         }).catch((err) => { return console.log(err, 3) });
//     }).catch((err) => { return console.log(err, 2) });
// }).catch((err) => { return console.log(err, 1) });


// function deletePost() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (posts.length) {
//                 posts.pop();
//                 resolve();
//                 console.log('resolve');
//                 // deletePost();
//             } else {
//                 reject('Error: Array is empty now.');
//             }
//         }, 1000);
//     })
// }

//========================================================

//promise for all

//===================================================

//================================
let promise1 = Promise.resolve('Hello World');
let promise2 = 10;
let promise3 = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'GoodBye'));

let promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => (res.json()));

Promise.all([promise1, promise2, promise3, promise4]).then((values) => { return console.log(values) });

//================================
//As per tasks
//================================
const posts = [
    {title : 'Post 1',body : 'This is post One.',createdAt : new Date().getTime()},
    {title : 'Post 2',body : 'This is post Two.',createdAt : new Date().getTime()}
];

let intervalId = 0;

function getPosts(){
    clearInterval(intervalId);
    intervalId =  setInterval(() => {
        let output = '';
        posts.forEach((post)=>{
            let createdDate = new Date(post.createdAt);
            output+=`<li>${post.title} ----- Created At: ${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()} ----- Last updated: ${Math.trunc((new Date().getTime() - post.createdAt)/1000)} seconds ago ----- Last Activity: ${post.lastActivityTime}</li>`;
        });
        document.body.innerHTML = output;   
    },1000);
}

function createPost(post){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            posts.push({...post,createdAt : new Date().getTime()});
            updateLstActivityTime();
            console.log(posts);

            const error = false;
            if(!error){
                resolve();
            }else{
                reject(`Error: Something went wrong.`);
            }
        },2000);
    });
}

// const user = {username: `Demo`, lastActivityTime: `1st October`};

function updateLstActivityTime(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            posts.forEach((post) => {post.lastActivityTime = new Date().toLocaleDateString();});
            resolve();
        },1000);
    });
}


function deletePost(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(posts.length>0){
                resolve(posts.pop());
            }else{
                reject(`Array is empty.`);
            }
        },5000);
    });
}

// createPost({title : 'Post 3',body : 'This is post Three.'})
//     .then(() => {
//         getPosts();
//         deletePost().then(() => {
//             getPosts();
//             deletePost().then(() => {
//                 getPosts();
//                 deletePost().then(() => {
//                     deletePost().then(() => {}).catch((err) => {
//                         console.log(`Inside catch block`,err);
//                     })
//                 }).catch(() => {})
//             }).catch(() => {})
//         }).catch(() => {})
//     }).catch((err) => {console.log(err);})



Promise.all([createPost({title : 'Post 3',body : 'This is post Three.'}),updateLstActivityTime()])
    .then(()=>getPosts())
    .then(() => {
        deletePost().then(() => {
            console.log(posts)
        })
    });

//============================================