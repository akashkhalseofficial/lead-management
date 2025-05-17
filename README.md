## Getting Started

# Next.js 15.3.2

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The public form is available on http://localhost:3000/

The Internal Lead Management UI is available on http://localhost:3000/lead-management
Credentails : email: admin@alma.com pass: Admin@123

The application is deployed on Vercel https://lead-management-teal-kappa.vercel.app
The public form is available on https://lead-management-teal-kappa.vercel.app
The Internal Lead Management UI https://lead-management-teal-kappa.vercel.app/lead-management

Github Repository url: https://github.com/akashkhalseofficial/lead-management


There is a basic cookie-based authentication in place.

When the user logs in, a cookie ( httpOnly ) is set with a secure token.
When the user logs out, the cookie ( httpOnly ) is removed via /logout api endpoint
There is a basic middleware to protect the /lead-management route.