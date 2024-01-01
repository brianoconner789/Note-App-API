# Note App API

The Note App API allows users to manage notes, including creating, updating, deleting, searching, and sharing notes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
- [Notes](#notes)
  - [Get All Notes](#get-all-notes)
  - [Create a Note](#create-a-note)
  - [Get a Note](#get-a-note)
  - [Update a Note](#update-a-note)
  - [Delete a Note](#delete-a-note)
  - [Search Notes](#search-notes)
  - [Share a Note](#share-a-note)
  - [Get Shared Notes](#get-shared-notes)
- [Tests](#tests)

## Introduction

The Note App API is designed to provide a simple and efficient way to manage notes for users.

## Features

- User registration and authentication
- Create, read, update, and delete notes
- Search notes by title, body, or tags
- Share notes with other users
- Get notes shared with the current user
- Rate limiting has been implemented (Bonus)
- Documentation has been done (Bonus)
- Code formatting tools - ESlint and Prettier has been configured (Bonus)

## Installation

Follow these steps to set up the Note App API locally:

```bash
# Clone the repository
git clone https://github.com/your-username/note-app-api.git

# Change into the project directory
cd note-app-api

# Install dependencies
npm install
```

## Usage

To start the Note App API, run the following command:


```bash
    npm run dev
```

## Tests

Run tests to ensure the proper functioning of the API:

```bash
    npm test    
```



This will start the API on the specified port, and it will be accessible at `http://localhost:your-port`.

## Authentication

## Register

-   **Description:** Register a new user.
-   **Endpoint:** `POST /auth/register`
-   **Request Body:**
    ```
    {
      "username": "your_username",
      "password": "your_password"
    } 
    ```
-   **Response:**
        
    ```
    {
      "user": {
        "username": "your_username"
      }
    }
    ``` 
    

## Login

-   **Description:** Log in and obtain an authentication token.
-   **Endpoint:** `POST /auth/login`
-   **Request Body:**
    ```
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
    
-   **Response:**
    
```
    {
      "token": "your_authentication_token"
    }
``` 

## Notes

## Get All Notes

-   **Description:** Get all notes for the authenticated user.
-   **Endpoint:** `GET /api/notes`
-   **Authorization:** `Bearer your_authentication_token`
-   **Response:**    
    ```
    {
      "notes": [...]
    }
    ```
    

## Create a Note

-   **Description:** Create a new note for the authenticated user.
-   **Endpoint:** `POST /api/notes`
-   **Authorization:** `Bearer your_authentication_token`
-   **Request Body:**
    ```
    {
      "title": "Note Title",
      "body": "Note Body",
      "tags": ["tag1", "tag2"]
    }
    ```

-   **Response:**
    
    ```
    
    {
      "note": {
        "title": "Note Title",
        "body": "Note Body",
        "tags": ["tag1", "tag2"]
      }
    } 
    ```

## Get a Note

-   **Description:** Get details of a specific note.
-   **Endpoint:** `GET /api/notes/:id`
-   **Authorization:** `Bearer your_authentication_token`
-   **Response:**
    
    
    ```
    {
      "note": {
        "title": "Note Title",
        "body": "Note Body",
        "tags": ["tag1", "tag2"]
      }
    }
    ```
    

## Update a Note

-   **Description:** Update an existing note.
-   **Endpoint:** `PUT /api/notes/:id`
-   **Authorization:** `Bearer your_authentication_token`
-   **Request Body:**
    ```
    {
      "title": "Updated Title",
      "body": "Updated Body",
      "tags": ["updated_tag"]
    }
    ```
    
-   **Response:**
    ```
    {
      "note": {
        "title": "Updated Title",
        "body": "Updated Body",
        "tags": ["updated_tag"]
      }
    }
    ```
    

## Delete a Note

-   **Description:** Delete a specific note.
-   **Endpoint:** `DELETE /api/notes/:id`
-   **Authorization:** `Bearer your_authentication_token`
-   **Response:**
    ```
    {
      "message": "Note deleted successfully"
    }
    ```

## Search Notes

-   **Description:** Search notes based on a query string.
-   **Endpoint:** `GET /api/notes/search`
-   **Authorization:** `Bearer your_authentication_token`
-   **Request Body:**
    ```
    {
      "query": "Search Term"
    }
    ```
-   **Response:**
    ```
    {
      "notes": [...]
    }
    ```

## Share a Note

-   **Description:** Share a note with another user.
-   **Endpoint:** `POST /api/notes/:id/share`
-   **Authorization:** `Bearer your_authentication_token`
-   **Request Body:**
    ```
    {
      "sharedUserId": "user_to_share_with_id"
    } 
    ```
-   **Response:**
    
    ```
    {
      "message": "Note shared successfully"
    }
    ```

## Get Shared Notes

-   **Description:** Get notes shared with the current user.
-   **Endpoint:** `GET /api/shared-notes`
-   **Authorization:** `Bearer your_authentication_token`
-   **Response:**
    
    ```
    
    {
      "sharedNotes": [...]
    } 
    
    ```


