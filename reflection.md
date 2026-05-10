## GitHub Repository
https://github.com/mercs-arch/IMY210_ASS3

## Commands to run the project

### Run Strapi (backend)
cd backend
docker build -t strapi-blog .
docker run -p 1337:1337 strapi-blog

### Run NuxtJS (frontend)
cd IMY210_ASS3
docker build -t nuxt-blog .
docker run -p 3000:3000 nuxt-blog

## Reflection

For this assignment I built a blog website using NuxtJS for the frontend 
and Strapi as the backend CMS.

Setting up Strapi was straightforward using the quickstart command, but 
understanding how to structure the content types took some time. I created 
a Post type with fields for title, author, and content, and linked it to a 
Category type using a relation field. Once I understood how to add the data
it was faily simple. One thing that caught me off guard was that the API 
is locked by default and I had to manually enable public permissions for the endpoints.

On the frontend, I used NuxtJS i created 3 pages. The composable 
pattern was useful for keeping all the API calls in a group. A challenge 
I faced was that Strapi v5 uses documentId instead of numeric IDs for 
fetching single entries, which caused errors until I figured out the 
correct API query.

Docker was the most challenging part of the assignment. 
Writing the Dockerfiles was manageable once I understood that each line 
is a step in building the environment.

One thing that was annoying was the amount of time it took everything to
load.