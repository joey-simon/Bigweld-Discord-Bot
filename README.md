# Getting Started
## 1. Installing Node.js
Download and install Node.js onto your machine from https://nodejs.org/en/download/
## 2. Creating a Discord Bot
Head over to the Discord Developer Portal (https://discord.com/developers/applications). Click **New Application**, give it a name, then click **Create**.

In the left hand settings panel, click **Bot**, then **Add Bot**. 

Click **General Information** in the left hand settings panel, and then copy the **Application ID**.

Next, go to the Discord Permissions Calculator (https://discordapi.com/permissions.html#1099511627775). Here, you can disable some permissions, or leave them as they are. Scroll to the bottom of this page and paste the **Application ID** you previously copied into **Client ID**. 

Then click the link at the bottom of the page, and add the bot to a server. It is required that you have the **Manage Server** permission in the server you want to add the bot to. 

You should now see your bot appear in the discord server!

## 3. Oxford Dictionaries API
Since this bot uses the Oxford Dictionaries API, you will have to sign up for it. Do not worry, it is free and super simple to setup. 

Go to this link https://developer.oxforddictionaries.com/?tag=#plans and sign up for the **Prototype** plan.

Once you have signed up, click the **Credentials** button on the home screen, then click on your application. Keep this tab open as the **Application ID** and **Application Key** is required for confuguring the bot in step 5. 

## 4. Installing Dependencies
Run `npm install` from a terminal inside the root directory of this project. This will install all of the required dependencies located in "package.json" into a folder called "node_modules".
## 5. Configuring the Bot
Create a file in the root directory of this project called ".env".

Open ".env" and paste the following two lines:
```
BOT_TOKEN="YOUR_BOT_TOKEN"
OXFORD_API_CONFIG={ "app_id": "YOUR_APP_ID", "app_key": "YOUR_APP_KEY", "source_lang": "en-gb" }
```
Be sure to replace these values with your own. Your **BOT_TOKEN** can be found on your Discord Developer Portal. Whereas your **app_id** and **app_key** can be found on the Oxford Dictionaries Developer page you still have open from the end of step 3.

The **source_lang** can remain "en-gb", which is UK English. See the list of supported languages here https://developer.oxforddictionaries.com/documentation/languages
## 6. Running the Bot
Run `node .` or `npm start` from a terminal inside the root directory of this project.

The bot should now be up and running :) 

Type `-help` in the discord server to see a list of commands.