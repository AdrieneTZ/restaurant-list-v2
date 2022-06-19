## Restaurant List

![restaurant-demo.JPG](https://drive.google.com/uc?id=1v_OC8Q-fMp8RD5zj-yG-_m2PMTQmwaxO)

### Feature
- Register with either email or Facebook account
- Every user's password is hashed before saving in database
- After login, here is what you can do :
  -  Click 'Create a favorit list' to add a new restaurant into your lists
  - Click 'More' to get more relevant information of the restaurant
  - Click 'Edit' to edit the relevant information of the restaurant
  - Click 'Delete' to remove the restaurant in your lists
  - In detail description page, click the emoji after the address to link to google map (only if the link has been added)
  - Click 'Delete' to remove the restaurant in your lists
  - Click 'Delete' to remove the restaurant in your lists
  - Click '{ YOUR NAME }'s Restaurant List' to go back to the home page
  - Search by keyword with restaurant name in either English or Traditional Chinese or with cuisine type its served
  - Sort restaurant list by character from A to Z or Z to A, or by rating from the highest to the lowest



### Prerequisite
- Node.js v18.3.0

### Dependencies
#### All dependencies are listed in package.json
- expamle : package@version
- bcryptjs@1.20.0
- body-parser@6.0.6
- connect-flash@0.1.1
- dotenv@16.0.1
- express@4.18.1
- express-handlebars@6.0.6
- express-session@1.17.3
- method-override@3.0.0
- mongoose@6.3.4
- nodemon@2.0.16
- passport@0.6.0
- passport-facebook@3.0.0
- passport-local@1.0.0

### How to start?
#### Step 1. Clone this project and install all dependencies
```bash
# Clone the project
git clone https://github.com/AdrieneTZ/restaurant-list-v2.git

# Go to the project file
cd restaurant-list

# Install all dependencies
npm install
```
#### Step 2. Add .gitignore and put files that have to be hidden
```bash
# Add file .gitignore
touch .gitignore

# Put all below in .gitignore
# OS X
.DS_Store*
Icon?
._*

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini

# npm
node_modules
*.log
*.gz

.env
```
#### Step 3. Set environment variable in .env ( see .env.example )
```bash
# Add .env
touch .env

# Set environment variable in .env
  # Add MONGODB_URI in .env
  MONGODB_URI=mongodb+srv://**ID**:**PASSWORD**@**CLUSTER**.dqlbc.mongodb.net/**DATABASE**?retryWrites=true&w=majority

  example : MONGODB_URI=mongodb+srv://dolphins:wantclean@pachficocean.dqlbc.mongodb.net/SanFrancisco?retryWrites=true&w=majority
```
#### Step 4. MUST generate seed user first than seed restaurant lists to the users
```bash
# generate seed users
npm run seeduser

# generate seed restaurant lists
npm run seedlist

# Start the server
npm run dev
```