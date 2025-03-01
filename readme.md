# 🎧 RadioStation Server - AWS Deployment 🚀

This is a **RadioStation server** project designed to be deployed on AWS. It serves both backend and frontend components, with the backend handled via Node.js and the frontend using React.

## 🚀 Project Setup

Follow the steps below to get the project up and running:

### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/abhijay-7/RacdMac
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed. If not, download and install Node.js.

Then, install dependencies in both the root directory and the /AFrontEnd directory:
```bash
cd RacdMac
npm install         # Install root dependencies

cd AFrontEnd
npm install   
```
Create assets/music directory and put your songs in it:
```bash
cd RadMac
mkdir assets
mkdir assets/music
```


### 3. Start the Backend
```bash
node run temp.js
```

### 4. Start the Frontend
```bash
cd AFrontEnd
npm run dev
```

### 5. Update the .env File

If you're accessing the frontend from another device, you might need to modify the IP address and port in the .env file located in the AFrontEnd directory to ensure the frontend can connect to the backend correctly.

```bash
# Example of possible .env settings for frontend
VITE_BACKEND_IP=192.168.x.x   # Replace with your backend IP address
VITE_BACKEND_PORT=3001        # Replace with the backend port

```
### 6. Access the Application

    Frontend: Open your browser and go to http://localhost:5000 (or use the updated IP if you're testing from another device).
