# InfoHive - Content Management for Organizations 📑

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A powerful content management platform designed to improve productivity and project efficiency by managing documents and assigning roles in organizations.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing) • [License](#-license)

</div>

## 🚀 Features

- 📄 Content management system for uploading and organizing documents.
- 🔒 Role-based access control: Assign specific roles (e.g., Viewer, Editor) to users for each content item.
- 🌍 Supports internal and external users for viewing and editing content.
- 💳 Monthly subscription management for each user within an organization.
- 📈 Improve productivity by efficiently managing important organizational documents.
- 🔄 Easy-to-use web interface built with HTML and CSS.
- ⚙️ Backend powered by TypeScript and Node.js, with data storage in a MySQL database.

## 📑 Pages

InfoHive includes several pages to help users interact with and manage content effectively:

1. **Dashboard Page**: Allows administrators to view, manage, and assign roles to the uploaded content.
2. **Content Management Page**: Users can view the content assigned to them based on their roles and permissions.
3. **Subscription Page**: Manages monthly subscriptions for each user in the organization.
4. **Create Content Page**: A page to create new content that will be assigned according to the organization's policies.
5. **Login Page**: The login page for users to access the platform.
6. **Register Page**: The registration page for new users to sign up on the platform.
7. **Organizational Content Page**: A page for managing content at the organizational level.
8. **Private Content Page**: A page to access private content based on the user's permissions.
9. **Profile Page**: A page where users can manage their settings and personal details.
10. **Public Content Page**: A page where users can access publicly available content on the platform.


## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wilsone24/infohive.git
   ```

2. Navigate to the project directory:
   ```bash
   cd infohive
   ```

3. Install the necessary dependencies for both frontend and backend:
   ```bash
   npm install
   ```

## 🖥 Usage

1. Start the backend server:
```bash
npm run dev
```

### Prerequisites

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **MySQL**: [Download MySQL](https://www.mysql.com/)
- **npm**: Install using Node.js (usually comes with it)

## 📁 Project Structure
```
infohive/
├── frontend/                    # Frontend files (HTML, CSS)
│   ├── static/                  # Static files for frontend
│   │   ├── auth/                # Auth-related static files
│   │   │   ├── login/           # Login page files
│   │   │   ├── register/        # Register page files
│   │   │   └── styles/          # Styles for auth views
│   │   ├── view/                # Views for content display
│   │   │   └── home/            # Home page files
│   │   │   └── index.html       # Main HTML file for frontend
│   │   │   └── style.css        # Main styles for the frontend
├── backend/                     # Backend files (TypeScript, Node.js)
│   ├── api/                     # API related files
│   │   ├── v1/                  # API version 1
│   │   │   ├── auth/            # Authentication routes and logic
│   │   │   ├── contentStores/   # Content store related logic
│   │   │   ├── organizations/   # Organizations routes and logic
│   │   │   └── routes.ts        # API routes for version 1
│   ├── lib/                     # Shared libraries and utilities
│   │   └── ssr/                 # SSR related logic
│   │       └── organizations/   # SSR logic for organizations
│   │       └── routes.ts        # Routes for SSR
│   ├── server.ts                # Main server file for backend
│   ├── models/                  # MySQL models for backend
├── database/                    # MySQL database setup scripts
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

## 🔧 Dependencies

This project uses the following key dependencies:

- [Node.js](https://nodejs.org/): ^14.0.0
- [TypeScript](https://www.typescriptlang.org/): ^4.5.0
- [MySQL2](https://www.npmjs.com/package/mysql2): ^2.3.3
- [Express](https://expressjs.com/): ^4.17.1

For a full list of dependencies, check the `package.json` file.

## 🎥 Demonstration

For a complete demonstration of InfoHive, watch the following video:
<div align="center">
  <a href="https://www.youtube.com/watch?v=RqlDXnIc27o" target="_blank">
    <img 
      src="https://img.youtube.com/vi/RqlDXnIc27o/0.jpg" 
      alt="Watch the demo video" 
      style="width: 80%; max-width: 640px; aspect-ratio: 16/9; border: 1px solid #ccc; border-radius: 8px;"
    >
  </a>
</div>

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
