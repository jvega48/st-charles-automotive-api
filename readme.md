## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Please verify that node.js is install in your machine, the link below will provide a download page to let you chose the   installation package for your machine preference
  ```
    [Installation guide for node.js](https://nodejs.org/en/download/)
  ```
* macos mongodb installation
  ```
    [Installation guide for mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
    
    1. Install the Xcode command-line tools by running the following command in your macOS Terminal
       
      sudo xcode-select --install

    2. [Install brew using the official Homebrew installation instructions.](https://brew.sh/#install)

    3. brew tap mongodb/brew

    4. brew install mongodb-community@5.0

    5. Verify installation work by running MongoDB, to run MongoDB -> brew services start mongodb-community@5.0

    6. To stop MongoDB -> brew services stop mongodb-community@5.0

  ```
* windows mongodb installation 
  ```
    [Installation guide for windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)


    1. Download the installer.
       Download the MongoDB Community .msi installer from the following link:
        
       ➤ [MongoDB Download Center](https://www.mongodb.com/try/download/community?tck=docs_server&_ga=2.73500306.1221339683.1641859093-600176294.1641256631)

        In the Version dropdown, select the version of MongoDB to download.

        In the Platform dropdown, select Windows.

        In the Package dropdown, select msi.

        Click Download.
    
    2. Run the MongoDB installer.

       For example, from the Windows Explorer/File Explorer:

        Go to the directory where you downloaded the MongoDB installer (.msi file). By default, this is your Downloads directory.
        Double-click the .msi file. 

    3. Follow the MongoDB Community Edition installation wizard.

       The wizard steps you through the installation of MongoDB and MongoDB Compass.

       Choose Setup Type
       You can choose either the Complete (recommended for most users) or Custom setup type. The Complete setup option installs MongoDB and the MongoDB tools to the default location. The Custom setup option allows you to specify which executables are installed and where.
       Service Configuration
       Starting in MongoDB 4.0, you can set up MongoDB as a Windows service during the install or just install the binaries.

    4. 

    5. 

    6. 


    ```

### Installation

1. * Install NPM packages
  ```
    npm install
  ```

## How to run the app, unit test, test coverage

1. * Run app
  ```
    npm run dev
  ```
2. * Run unit test 
  ```
    npm run test
  ```
3. * Run unit test coverage
  ```
    npm run test-coverage
  ```

## API authentication to access the endpoints

1. * Navigate to http://127.0.0.1:5050/register
  ```
    POST
    json body payload:
    {
      "email": "testemail@gmail.com",
      "password": "password"
    }

    Response
    json body payload response:
    {
      "data": {
        "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGRkOGU2NzA3MTg3NWM4ZTdkYTM2ZSIsImlhdCI6MTY0MTkyODkzNCwiZXhwIjoxNjQyMDE1MzM0fQ.rppRrxmmHsLo8UmEdQxwBj5Y-qzgiYpArVYNU-J1mZ4"
      }
    }
2. * Navigate to http://127.0.0.1:5050/login
  ```
    POST
    Authorization:
      - type:
        - API Key
          - key "x-access-token"
          - value "authToken"

    json body payload:
    {
      "email": "testemail@gmail.com",
      "password": "password"
    }

    Response
    json body payload response:
    {
      "data": {
            "_id": "61ddd8e67071875c8e7da36e",
            "message": "Auth Successful",
            "isActive": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGRkOGU2NzA3MTg3NWM4ZTdkYTM2ZSIsImlhdCI6MTY0MTkzMTc3OCwiZXhwIjoxNjQxOTM0MTc4fQ.ZNMH3opzLj5Qh84itjQjiyF_By3Oh9L6gXIkzxrMgmE"
        },
      "statusCode": 200
    }
  ```

  2. * Navigate to http://127.0.0.1:5050/api/v1/user
  ```
    GET
    Authorization:
      - type:
        - API Key
          - key "x-access-token"
          - value "authToken"

    json body payload:
    {}

    Response
    json body payload response:
    {
      "data": {
            "_id": "61ddd8e67071875c8e7da36e",
            "message": "Auth Successful",
            "isActive": true,
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGRkOGU2NzA3MTg3NWM4ZTdkYTM2ZSIsImlhdCI6MTY0MTkzMTc3OCwiZXhwIjoxNjQxOTM0MTc4fQ.ZNMH3opzLj5Qh84itjQjiyF_By3Oh9L6gXIkzxrMgmE"
        },
      "statusCode": 200
    }
  ```