<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/search">Search</NuxtLink>
  </nav>
</template>

<style>
nav {
  background: #594e7d;;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
}

nav a {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: rgb(223, 223, 235);
}
</style>