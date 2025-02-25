# Web3 Authentication System

A secure authentication system that uses Ethereum wallet signatures for user authentication. This system implements a nonce-based challenge-response authentication flow using Web3 technologies.

## Features

- Ethereum wallet-based authentication
- Nonce-based challenge-response system
- JWT token authentication
- MongoDB integration for user management
- Express.js REST API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Ethereum wallet (MetaMask or similar)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web3-authentication
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=24h
```

## Project Structure
```
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── services/
│       └── authService.js
├── routes.js
├── server.js
└── package.json
```

## API Endpoints

### Authentication Routes
All routes are prefixed with `/api/auth`

- **POST** `/nonce`
  - Generate nonce for wallet authentication
  - Body: `{ walletAddress: string }`

- **POST** `/authorize`
  - Verify signature and generate JWT token
  - Body: `{ walletAddress: string, signature: string }`

## Authentication Flow

1. Client requests a nonce by sending their wallet address
2. Server generates/retrieves nonce for the wallet address
3. Client signs the nonce message with their Ethereum wallet
4. Client sends the signature and wallet address to the server
5. Server verifies the signature and issues a JWT token
6. Subsequent requests use the JWT token for authentication

## Security Features

- Nonce-based challenge-response authentication
- JWT token authentication for API requests
- Signature verification using ethers.js
- Secure MongoDB user storage

## Dependencies

The project uses the following main dependencies:
- express: Web framework
- mongoose: MongoDB ODM
- ethers: Ethereum wallet utilities
- jsonwebtoken: JWT implementation
- bcryptjs: Password hashing
- cors: Cross-origin resource sharing

## Error Handling

The application implements comprehensive error handling:
- Authentication failures
- Database connection errors
- Invalid signatures
- Missing or invalid tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.