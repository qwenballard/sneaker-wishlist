# Sneaker Wishlist

Hello Sneakerheads! This is a hobby app built for anyone interested in wanting to create list to track sneakers they are interested in purchasing!

# Tasks To Be Completed

Below is a list of ongoing tasks which I would want to implement to get this to a fully functioning MVP:

- [ ] Adding unit/integration testing to client (React Testing Library)
- [ ] Adding unit/integration testing on the server side (Mocha)
- [ ] Flush out Overview Page with charts and graphs of user data
  - Need to research charts
- [ ] Implement ability to search for various sneakers (Card format or table format)
  - [ ] implement functionality for searching with parameters
  - [ ] Implement Sneaker Card that allows users to open up modal and see more
- [ ] Allow user to create, edit, delete list which will hold whatever sneakers they want
- [ ] Improve error handling throughout app
- [ ] Update infrastructure to allow for various environments (staging/prod)

# React/Vite/TanstackQuery

Below is my tech stack for this monolith app. I chose to create a monolithic app rather than microservices or other architectures for simplicity. This includes faster developing speed, lower complexity in servicing interacting with one another, and a simpler infrastructure overall.

## React

I chose React because of the huge ecosystem and various tooling options, my depth in knowledge using this framework, and because I can work faster in this rather than using Next.js, Angular or other more opinionated frameworks.

## Chakra-UI

I love using Chakra as my go to component system primarily because I can build fast with ready to go components, have the option to create a design system (tokens, typography, etc.), it integrates will with various frameworks, and the components were created with accessibility in mind.
_(A lot of out of the box benefits)_

I've mainly used v2, however, wanted to give v3 a try. This slowed down development for me a lot because of the breaking changes from v2 to v3.

## Vite

I typically use Vite compared to Webpack, Parcel, Create React App (outdated), and other toolings mainly because of the fast startup and hot reload capabilities that Vite uses. Additionally, setup for Vite is fairly simple and easy to do.

## Tanstack Query

I've never really used Tanstack Query, so I figured this is a good project to give it a try. I'm estimating/assuming that this app will become a small to mid size app so I don't think Redux (rtkQuery) is necessarily needed for this application. I've heard that Tanstack Query has great fetching/caching capabilities and works well with REST APIs. After using it for this project, I've enjoyed how clean and easy it is to use.

## Express/Node

I enjoy using Node because I can use javascript/typescript on both frontend and backend. This provides an opportunity to share code between both parts if needed in the future to ensure consistency with data. Additionally, Node has a huge ecosystem with a ton of npm packages.

Express is very lightweight and not opinionated which can be challenging if not intentional about the structure. However, it is fast to build with and a stable technology which is why I use it.

### Structure of Express App

For this server, I am following a typical pattern where routes, controllers, and models are separated to keep a clean MVC (Model-View-Controller pattern). This should make testing easier when I implement it along with keep things clean and scalable.

The Models focus on how data is structured and provides a way for you to interact with the database via Prisma (which is an ORM).

The Controller handles all of the business logic.

The Routes define http endpoints and attach controllers to them. In other words, just making sure the request go to the right controller.

## Supabase (Prisma ORM)

We are using supabase to handle login/signup and managing users. Prisma is being used as an ORM to interact with our database.

For the user flow we are allowing the user to submit an email to the express server which uses supabase's `supabase.auth.signInWithOtp` method to send an email to the user via the `/magic-link` route.

Once an user receives the email and clicks the link, they are redirected to my react frontend /auth/callback which checks for an access_token. This sends the token to the express `/auth/callback` route and handles creating/logging in an user before redirecting them to the dashboard. Once they are redirected, there is another call to our express server for the `/me` route to get current user information.

Important Note: when creating/logging in an user, there are given an httpOnly secure cookie that stores the JWT which will be used on all additional requests from the frontend. Without they'll be denied access to the api and redirected to login.

_This app is just a hobby app for learning purposes... and because lil buddy (me) really just likes sneakers at the end of the day._
