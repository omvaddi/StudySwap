# StudySwap
Note-sharing app for high-achieving students
# How to set up on Windows:
First, download Node.js. at [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/prebuilt-installer) and make sure to enable script running.

Open Windows PowerShell as an administrator, and run
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Now, clone the GitHub repo to your desired location.

Inside the repo,
```
cd client
npm install
npm create vite@latest
```
When vite prompts, you keep the project name as vite-project and press enter

Select React

Select Javascript

Open up a second copy of Windows Powershell, keeping the original Powershell tab open on the client directory

Navigate back to the destination where you cloned the GitHub repo, and cd into StudySwap

Then run:
```
cd server
npm install
```

Now, we will create the .env by copying it from .env.sample:
```
 .env.sample .env
```
This will load our default MongoDB URI server, which already has notes and classes uploaded on it.

If you wish to use a different server later, simply change the MongoDB URI in the .env file. Make sure to keep the same formatting.

You have finished the setup. If you wish to now run the project, keep both of your Powershell Windows Open.
# How to run on Windows:
You should have two Powershell Windows open.

This first should be in the client directory, the second should be in the server directory

In the second Powershell window, which is the one that is in the <u>**server**</u> directory, run:
```
npm start
```
MAKE SURE TO KEEP THIS WINDOW OPEN

In the first Powershell window, which is the one that is in the <u>**client**</u> directory, run:
```
npm run dev
```
You should see a line on the terminal that looks like this:
```
  ➜  Local:   http://localhost:5173/
```
Ctrl+left click the link or copy it into your browser.

Happy StudySwapping!!!

