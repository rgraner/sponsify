# Sponsify
[https://sponsify.onrender.com](https://sponsify.onrender.com)
Sponsify is a platform that facilitates interactions between sponsors and organizations looking for sponsorships. Organizations, referred to as "projects," offer various sponsorship plans for sponsors to choose from.

## Technologies Used
This project is built using the following technologies:
- **PostgreSQL:** 
- **Express:** 
- **React:** 
- **React-Redux:**
- **Node.js:** 
- [Stripe](https://stripe.com) - Used for payment processing and handling subscriptions. Make sure to set up your Stripe account and configure your API keys.

## Getting Started
To run this project locally, follow these steps:

### Prerequisites
- Node.js and npm must be installed on your machine.
- PostgreSQL database server should be running.

### Installation
1. Clone the repository:
    ```bash
   git clone https://github.com/rgraner/sponsify.git
   ```
2. Navigate to the project server directory:
    ```bash
    cd server
    ```
3. Install server dependencies:
    ```bash
    npm install
    ```
4. Navigate to the client directory:
    ```bash
    cd views
    ```
5. Install client dependencies:
    ```bash 
    npm install
    ```
6. Start the development server:
    ```bash
    node server.js
    ```
    
### Stripe Configuration
To enable payment processing and subscription management in this app, you will need to set up a [Stripe](https://stripe.com) account and obtain your API keys. Once you have your keys, you can configure the app by adding them to the appropriate environment variables or configuration files.

1. Sign up for a [Stripe account](https://stripe.com).
2. Obtain your API keys (secret publishable and webook).
3. Configure the following environment variables with your Stripe API keys:

   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
 
4. Start the Stripe webhook:
    ```bash
    stripe listen --forward-to localhost:8000/api/payment/webhook
    ```

Now, your app is ready to handle payments and subscriptions using Stripe.

## Usage
- Sponsors can browse and choose sponsorship plans offered by various projects.
- Organizations (projects) can create and manage sponsorship plans.
- The app facilitates communication and interactions between sponsors and projects.

## Features
- User Authentication: Users can create accounts, log in, and manage their profiles.
- Project Management: Organizations can create, edit, and delete project.
- Sponsorship Plans: Projects can define different sponsorship plans with details and pricing.
- Sponsorship Subscriptions: Sponsors can subscribe to plans, and the app handles billing.
- Interaction: A platform for communication between sponsors and projects.

## License

## Credits
This project is part of the completion work for the Codecademy Full-Stack Engineer Course.