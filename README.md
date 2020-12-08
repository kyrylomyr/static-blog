# Blog

A static blog based on markdown `.md` files. Compiles to a static website that doesn't require server and database.

The example blog doesn't have any UI design, but has already enabled LESS support. Use any library to style it.

The current repository is a base also for my personal blog [https://kmyr.dev](https://kmyr.dev).

Feel free to use the code as an example for your own static blog.

## Technologies

* React
* NextJS

## Features

* Posts and portfolio items are created as `.md` files.
* Posts support tags and categories.
* Viewing all posts by tag or category with pagination.
* Portfolio items show posts related to them.

## How does it work

The content for posts and portfolio is located in the `/content` directory in form of `.md` files. All syntax features of markdown are supported.

All resources (e.g. images) are located in the `/public` directory that does directly to production as is and become available from the root route `/` of website.

Build generates a separate `.html` page for every post and portfolio item added into content directory, and saves everything into `/out`. Just take this folder and publish.
