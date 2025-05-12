# Media Gallery - React Application

A modern React application that displays albums, photos, and user information fetched from JSONPlaceholder API. The application features a responsive design with a vertical sidebar navigation and consistent styling across all components.

![Media Gallery Screenshot](https://ui-avatars.com/api/?name=Media+Gallery&size=220&background=6366F1&color=fff)

## 🚀 Features

- **Browse Albums and Users**: View lists of albums and users with pagination
- **User Profiles**: See detailed user information and their albums
- **Album Details**: View photos in albums with user information
- **Responsive Design**: Clean, modern UI that works on all devices
- **Dynamic Navigation**: Easy navigation with back buttons and sidebar
- **Customizable Pagination**: Set how many items to display per page (10, 20, 50, 100)

## 🛠️ Technologies Used

- **React**: UI building and component management
- **React Router**: Navigation and routing
- **Axios**: API requests
- **Tailwind CSS**: Styling and responsive design
- **JSONPlaceholder API**: Mock data for users, albums, and photos
- **UI Avatars**: Dynamic avatar generation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## 🔧 Installation

Follow these steps to get the project up and running on your local machine:

1. Extract the project files from the ZIP archive:
   ```powershell
   Expand-Archive -Path MediaGallery.zip -DestinationPath .\media-gallery
   cd media-gallery
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

The application will automatically open in your default browser at http://localhost:3000.

## 📁 Project Structure

```
media-gallery/
├── public/                  # Static files
├── src/                     # Source files
│   ├── api/                 # API integration
│   │   └── index.js         # API endpoints and functions
│   ├── components/          # Reusable components
│   │   ├── AlbumDetail.jsx  # Album details component
│   │   ├── AlbumList.jsx    # Album list component
│   │   ├── BackButton.jsx   # Navigation back button
│   │   ├── Loading.jsx      # Loading indicator
│   │   ├── Navigation.jsx   # Navigation component
│   │   ├── Sidebar.jsx      # Sidebar navigation
│   │   ├── UserDetail.jsx   # User details component
│   │   └── UserList.jsx     # User list component
│   ├── pages/               # Page components
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
└── package.json             # Project dependencies and scripts
```

## 📑 Available Scripts

- **`npm start`**: Runs the app in development mode
- **`npm test`**: Launches the test runner
- **`npm run build`**: Builds the app for production
- **`npm run eject`**: Ejects the CRA configuration

## 🔌 API Integration

This project uses two main APIs:

1. **JSONPlaceholder API**: For mock data of users, albums, and photos
   - Base URL: `https://jsonplaceholder.typicode.com`
   - Endpoints used: `/albums`, `/albums/:id`, `/albums/:id/photos`, `/users`, `/users/:id`, `/users/:id/albums`

2. **UI Avatars API**: For generating user avatars
   - Base URL: `https://ui-avatars.com/api/`
   - Parameters: `name` - User's name to generate avatar from

## 📱 Features Walkthrough

### Home Page
The home page displays the main navigation with options to browse albums or users.

### Album List
- Browse all albums with pagination
- Each album displays:
  - Album ID
  - Title
  - User (with avatar) who created the album
  - View button to see album details
- Customize how many albums to display per page (10, 20, 50, 100)

### Album Details
- View album information including:
  - Album title
  - User who created the album (with link to user profile)
  - Grid of photos in the album
- Click on photo thumbnails to view full-size images

### User List
- Browse all users with pagination
- Each user displays:
  - User ID
  - Name with avatar
  - Email address
  - View button to see user details
- Customize how many users to display per page (10, 20, 50, 100)

### User Details
- View user information including:
  - Name and avatar
  - Email address
  - Phone number
  - Website
  - Company information
- List of albums created by the user

## 🚀 Deployment

To deploy this application to production:

1. Build the application:
   ```sh
   npm run build
   ```

2. Deploy the contents of the `build` folder to your web server or hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for providing mock API data
- [UI Avatars](https://ui-avatars.com/) for the avatar generation service
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
