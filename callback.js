const posts=[
    {title:'Post One',body:'This is post one',createdAt:new Date().getTime()},
    {title:'Post Two',body:'This is post two',createdAt:new Date().getTime()}
];
let intervalId=0;
function getPosts(){
    clearInterval(intervalId);
    intervalId=setInterval(() => {
        let output='';
        posts.forEach((post,index)=>{
            output+=`<li>${post.title} - last updated at ${(new Date().getTime() -post.createdAt)/1000} seconds ago</li>`;
            // console.log(post);
            console.log("interval id =",intervalId);
        });
        document.body.innerHTML=output;
        
    }, 1000);

}
function createPosts(post,callback){
    setTimeout(() => {
        posts.push({...post,createdAt:new Date().getTime()});
        callback();
    }, 2000);
}
getPosts();

createPosts({title: 'Post Three', body: 'This is post three'},getPosts);

function create4thPosts(post,callback){
    setTimeout(() => {
        posts.push({...post,createdAt:new Date().getTime()});
        callback();
    }, 4000);
}

create4thPosts({title: 'Post Four', body: 'This is post four'},getPosts);


// function lastEditedInSecondsAgo(){
//     setInterval(() => {
//         let output='';
//         posts.forEach(post => {
//             output+=`<li>${post.title} is last Edited ${(new Date().getTime() -post.createdAt)/1000} seconds ago</li>`
//         });
//         document.body.innerHTML=output;
//     }, 1000);
// }
// lastEditedInSecondsAgo();

// document.body.innerHTML=display;