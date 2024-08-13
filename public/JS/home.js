const blogSection = document.querySelector('.blogs-section');
const recentPosts = document.querySelector('.recent-posts')
const myblogs = [];

db.collection("blogs").orderBy('publishedAt').get().then((blogs) => {
    blogs.forEach(blog =>{
        myblogs.push(blog);
    })
    createBlog(myblogs[0]);
    for(let i = 1; i <= 5; i++){
        if(i == myblogs.length){
            break;
        }
        createRecentPosts(myblogs[i]);
    }
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <button class="cta">
        <span class="hover-underline-animation"> <a href="/${blog.id}" class="btn">R E A D  N O W</a> </span>
        <svg
        id="arrow-horizontal"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="10"
        viewBox="0 0 46 16"
        >
        <path
        id="Path_10"
        data-name="Path 10"
        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
        transform="translate(30)"
        ></path>
        </svg>
        </button>
    </div>
    `;
}

const createRecentPosts = (blog) => {
    let data = blog.data();
    recentPosts.innerHTML += `
    <a href="/${blog.id}" class="rp">${data.title.substring(0, 100)}</a>
    `;
}
