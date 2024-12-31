# Solana Wallet Dashboard

Solana Wallet Dashboard is a decentralized application (dApp) built with Next.js that integrates Solana Web3 functionalities and provides seamless connectivity with Phantom Wallet. The application offers real-time price charts, wallet balance display, and a responsive, user-friendly design.

## Features

- **Phantom Wallet Integration**: Securely connect and disconnect your wallet.
- **Real-Time Price Charts**: View historical SOL/USD and USDT/USD price data using TradingView Widgets.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Animations**: Smooth UI interactions powered by Framer Motion.
- **User-Friendly Interface**: Modern and intuitive design.

## Technologies Used

- **Next.js**: Framework for building server-rendered React applications.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Shadcn/ui**: Modern UI components for rapid development.
- **Framer Motion**: Library for animations and transitions.
- **TradingView Widgets**: Real-time financial charting.
- **Solana Wallet Integration**: Solana Web3 using Phantom Wallet.

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd solanawallet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 to view the application.

## File Structure

```
├───public
│   ├───css
│   └───js
├───src
│   ├───app
│   │   ├───about
│   │   │   └───page.tsx
│   │   ├───account
│   │   │   └───page.tsx
│   │   ├───dashboard
│   │   │   └───page.tsx
│   │   ├───price
│   │   │   └───page.tsx
│   │   ├───signin
│   │   │   └───page.tsx
│   │   ├───signup
│   │   │   └───page.tsx
│   ├───components
│   │   ├───price
│   │   │   ├───Solusd.tsx
│   │   │   └───Usdtusd.tsx
│   │   └───ui
│   │       ├───AppWalletProvider.tsx
│   │       ├───form.tsx
│   │       ├───Intro.tsx
│   │       ├───Navbar.tsx
│   │       └───submit-button.tsx
│   ├───hooks
│   └───lib
```

## Scripts

* **Development**: `npm run dev` - Starts the development server.
* **Build**: `npm run build` - Creates an optimized production build.
* **Start**: `npm start` - Runs the production build.
* **Lint**: `npm run lint` - Runs ESLint checks.

## Deployment

### Deploy on Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   vercel deploy
   ```

## Demo Video and Documentation

A demo video showcasing the functionalities and detailed project documentation can be found here.

## Contribution

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:
   ```bash
   git commit -m "Add your commit message"
   ```

4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Submit a pull request.

## Contact

* **GitHub**: masbroamat
* **LinkedIn**: Syazwan Yacob

## License

This project is licensed under the MIT License. See the LICENSE file for details.