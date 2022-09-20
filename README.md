# HiddenVilla

A mobile-first hotel room booking system - view it [here](https://hidden-villa-1.web.app/). The client is hosted on [Firebase](https://firebase.google.com/) and the server is hosted on [Render.com](https://render.com/).
\*\* The Render region for deployment is Singapore.

This is a full-stack TypeScript application and was made with:

- Angular
- Node
- Express
- Prisma
- PlanetScale
- MaterialUI
- TailwindCSS
- DaisyUI
- Stripe API

# Features

a) User authentication and authorisation with JWT. Access tokens, refresh tokens, cookies all used to provide comprehensive authentication. Silent refresh was implemented using HTTP Interceptors in Angular and API routes handle token verification and re-issuing of access tokens based on refresh tokens stored in the cookie 'bobject'.

b) Users can enter dates of their stay and the rooms are filtered based on existing bookings and their check-in dates. This is possible due to Prisma's excellent schema relations capability.

c) Users can make payments through the Stripe API provided by ngx-stripe, a thin wrapper for Stripe Elements, a set of UI components based off Stripe.js. Custom webhooks defined on the serverside track orders by listening to \*/api/payment/create-checkout-session.

No installation instructions included - this is a project purely for personal development and learning.
