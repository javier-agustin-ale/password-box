# Password Box

A small **Vue 3 + TypeScript** application that implements a password change form with validation, user feedback, and a simulated API interaction.

The project focuses on **clean architecture, composables, and reusable components**, following patterns commonly used in modern frontend applications.

---

## Challenge Context

This project was developed as part of a frontend coding challenge.

The goal was to implement a password change interface with:

- proper validation rules
- clear user feedback
- a clean and maintainable architecture
- reusable components
- unit tests for core logic

---

## Tech Stack

- Vue 3
- TypeScript
- Vite
- TailwindCSS v4
- Vitest (unit testing)

---

## Features

### Password Change Form

The application provides a form to update a user password with the following validation rules:

- Current password is required
- New password must contain:
  - Minimum **12 characters**
  - At least **one number**
  - At least **one special character**
  - At least **one uppercase letter**
  - At least **one lowercase letter**
- Confirmation password must match the new password

Validation errors appear **only after the user interacts with the input field**, improving the user experience.

---

### Password Visibility Toggle

Each password input includes a toggle icon that allows the user to switch between:

```
password → visible text
```

This functionality is implemented using the reusable `DynInput` component and its `append` slot.

---

### Loading State

When submitting the form:

- The **Save button displays a loading spinner**
- The button becomes **disabled**
- Prevents duplicate submissions

---

### Toast Notifications

A small toast notification system provides feedback after submitting the form.

Examples:

- Success notification when the password is updated
- Error notification when the request fails

---

### Simulated API Call

The password change action calls a **fake API service** that simulates a network request.

This allows the UI to behave as if it were communicating with a real backend.

---

### Event Tracking

A small tracking utility logs important user events such as:

- password change submit
- successful password change
- failed request

This demonstrates how analytics events could be integrated in a real application.

---

### Unit Tests

Unit tests were written using **Vitest** for the main composables:

- `usePasswordValidation`
- `usePasswordChange`

These tests validate the business logic of the application.

---

## Project Structure

```
src/
├── features/
│   ├── password/
│
├── shared/                  # Reusable code across features
│   ├── components/
│   ├── composables/
│   └── services/
│   └── types/
│
│
└── main.(ts/js)             
 
```

---

## Installation

Install dependencies:

```
npm install
```

---

## Run the Development Server

```
npm run dev
```

---

## Run Unit Tests

```
npm run test
```

---

## Architecture Notes

The project separates responsibilities into clear layers:

| Layer | Responsibility |
|------|------|
| Components | UI rendering |
| Composables | Business logic |
| Services | API interaction |
| Types | Type safety |
| Utilities | Shared functionality |

This structure keeps components **lightweight and focused on UI**, while logic remains reusable and testable.

---

## Author

**Javier Agustin Ale**

GitHub  
https://github.com/javier-agustin-ale/password-box
