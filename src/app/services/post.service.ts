

export default async function getPosts() {
    return await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err.message));
}
