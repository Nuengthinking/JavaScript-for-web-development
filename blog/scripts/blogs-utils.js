const blogElement = document.getElementById('blog-container')
let blogsRawData = []
let loadingTimeout = {}

function createBlogHTML(blogs) {
    //วนแต่ละตัวของ blogs ด้วย .map เพื่อทำการแปลงเป็น html ออกมา
    const blogContentElement = blogs.map(function(blog) {
        return `<div class="flex flex-col md:flex-row gap-6 w-full">
        <img
        src="${blog.imageUrl}"
        alt="feature image 1"
        class="w-full md:w-auto"
        />
        <div class="flex flex-col gap-4 bg-wd-darkgrey p-6 grow">
        
            <h3 class="text-2xl font-semibold">
                ${blog.title}
            </h3>

            <p class="text-xl font-light">
                ${blog.description}
            </p>

            <p>At ${blog.publishDate} </p>
            
            <a href= ${blog.url} >Read more</a>
            
        </div>
    </div>`

    }).join('')

    // ต่อ html ทั้งหมดเพื่อใส่ใน blogElement.innerHTML
    blogElement.innerHTML = blogContentElement
    
}

const blog = {
    "title": "Skooldio Test",
    "description": "Nobis quo est corporis totam dolores. Rerum quam autem debitis dolores sunt et quis occaecati. Nam dolorem dolores.",
    "publishDate": "4/1/2024",
    "imageUrl": "https://fastly.picsum.photos/id/619/300/200.jpg?hmac=7Hkx2pta5SF9qOidNU4DEU4GUkbTupg3BnmpNnij9L0",
}

function searchBlogs(element) {
    // แสดง Loding ขึ้นมา 2 วินาที
    clearTimeout(loadingTimeout)
    blogElement.innerHTML = 'Loading...'
    loadingTimeout = setTimeout(() => {
        const filteredBlogs = blogsRawData.filter(function(blog){
            return blog.title.includes(element.value) || blog.description.includes(element.value)
        })
    
        createBlogHTML(filteredBlogs)

    }, 2000)
    
}

function sortBlogs(element) {

    const sortedBlogs = blogsRawData.sort(function(blogA, blogB) {
        let compareDate = new Date(blogA.publishDate) - new Date(blogB.publishDate)
        if (element.value === 'desc') {
            compareDate = new Date(blogB.publishDate) - new Date(blogA.publishDate)
        }
        return compareDate
    })

    createBlogHTML(sortedBlogs)
}



async function main() {
    const response = await axios.get('/scripts/blog.json')
    blogsRawData = response.data

    // ทำการนำ response.data ส่งเข้าไปใน createBlogHTML เป็น array ของ blogs
    createBlogHTML(blogsRawData)
    
}

main()
