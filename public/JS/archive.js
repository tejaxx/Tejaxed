const blogSection = document.querySelector('.blog-list');

db.collection("blogs").orderBy('publishedAt').get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})

const createBlog = (blog)=>{
    let data = blog.data();
    let date = data.publishedAt;
    let day = 0, month = 0, year = 0;
    for(let i = 0; i < date.length; i++){
        if(day == "" && date[i] == ' '){
            day = i;
        }
        else if(month == "" && date[i] == ' '){
            month = i;
        }else{

        }
    }
    date = date.substr(day, month + 1 - day) + date.substr(0, day) + ","+ date.substr(month, date.length);
    blogSection.innerHTML += `
    <div>
    <span>${date} <span class="hyphen">/</span> </span>
    <a href="/" class="link">${data.title}</a>
    </div>
    `;
}