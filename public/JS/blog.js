let blogId= decodeURI(location.pathname.split('/').pop());
const recentPosts = document.querySelector('.recent-posts')
let docRef = db.collection("blogs").doc(blogId);

const myblogs = [];

docRef.get().then((doc) =>{
    if(doc.exists){
        setupBlog(doc.data());
    }
})

db.collection("blogs").orderBy('publishedAt').get().then((blogs) => {
    blogs.forEach(blog =>{
        myblogs.push(blog);
    })
    for(let i = 1; i <= 5; i++){
        if(i == myblogs.length){
            break;
        }
        createRecentPosts(myblogs[i]);
    }
})

const setupBlog = (data)=>{
    const banner = document.querySelector(".banner");
    const blogTitle = document.querySelector(".title");
    const publish = document.querySelector(".published");
    const title = document.querySelector("title");
    const article = document.querySelector(".article");
    banner.style.backgroundImage = `url(${data.bannerImage})`;
    title.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;
    article.innerHTML += data.article;
}

const addArticle = (ele, data)=>{
    data = data.split("\n").filer(item => item.length);
    data.forEach(item => {
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`;
        }else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }
        else{
            ele.innerHTML += `<p>${item}</p>`
        }
    });
}

const createRecentPosts = (blog) => {
    let data = blog.data();
    recentPosts.innerHTML += `
    <a href="/${blog.id}" class="rp">${data.title.substring(0, 100)}</a>
    `;
}