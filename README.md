# Contact Management Application

A web application for managing contacts, built with Angular, NgRx, and .NET Core.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Angular CLI](https://angular.io/cli)
- [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet-core)

### Frontend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/contact-management-app.git
   cd contact-management-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the frontend:**

   ```bash
   ng serve
   ```

   The application will be available at `http://localhost:4200`.

### Backend Setup

1. **Navigate to the API project directory:**

   ```bash
   cd Contact_Management_Application_API
   ```

2. **Restore dependencies:**

   ```bash
   dotnet restore
   ```

3. **Run the backend:**

   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5000`.

### Running the Application

1. **Start the backend server:**

   ```bash
   cd Contact_Management_Application_API
   dotnet run
   ```

2. **Start the frontend application:**

   ```bash
   cd contact-management-app
   ng serve
   ```

   Open your browser and navigate to `http://localhost:4200`.

## Design Decisions

### Frontend

- **Angular:** Chosen for its robust ecosystem and strong support for large-scale applications.
- **NgRx:** Used for state management to provide a predictable state container and facilitate easier state management in a complex application.
- **Material Design:** Angular Material is used for a consistent, modern UI/UX.

### Backend

- **.NET Core:** Chosen for its performance, cross-platform capabilities, and strong integration with enterprise environments.
- **JSON File Storage:** Used a simple JSON file for storing contacts, suitable for a demo application.

### Error Handling

- **Frontend:** MatSnackBar is used to show user-friendly error and success messages.
- **Backend:** Returns structured error messages for consistent handling on the frontend.

## Application Structure

### Frontend

- **Components:**
  - `ContactComponent`: Main component for displaying and managing contacts.
  - `ContactFormComponent`: Form component for adding and editing contacts.
- **State Management:**

  - Actions, reducers, and selectors are organized under the `store` directory.
  - Effects handle asynchronous operations and side effects.

- **Services:**
  - `ContactService`: Handles HTTP requests to the backend API.

### Backend

- **Controllers:**
  - `ContactsController`: Handles CRUD operations for contacts.
- **Repositories:**

  - `JsonContactRepository`: Manages contact data storage and retrieval from a JSON file.

- **Models:**
  - `Contact`: Defines the contact entity.

## Conclusion

This contact management application demonstrates the use of Angular with NgRx for state management, combined with a .NET Core backend. It aims to provide a structured, maintainable, and scalable codebase while ensuring a good user experience.
