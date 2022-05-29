## Restaurant List

![restaurant-demo.JPG](https://drive.google.com/uc?id=18tpgVmIr9y-Cl9EgXSYIUL_yPtYTf6lA)

### Feature
- Search by keyword with name in either English or Traditional Chinese of the reataurant or cuisine type its served
- Click 'Create a favorit list' to add a new restaurant into your lists
- Click 'More' to get more relevant information of the restaurant
- Click 'Edit' to edit the relevant information of the restaurant
- Click 'Delete' to remove the restaurant in your lists
- In detail description page, click the emoji after the address to link to google map
- Click 'My Restaurant List' to go back to the home page

### Prerequisite
- Node.js v18.0.0

### Dependencies
- expamle : package@version
- express@4.18.1
- express-handlebars@6.0.6
- mongoose@6.3.4
- body-parser@1.20.0
- method-override@3.0.0
- dotenv@16.0.1

### How to start?
```bash
# Clone the project
git clone https://github.com/AdrieneTZ/restaurant-list.git

# Go to the project
cd restaurant-list

# Install all dependencies
npm install
```
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
```bash
# Set environment variable
  # Add MONGODB_URI in .env
  MONGODB_URI=mongodb+srv://**ID**:**PASSWORD**@**CLUSTER**.dqlbc.mongodb.net/**DATABASE**?retryWrites=true&w=majority

  example : MONGODB_URI=mongodb+srv://dolphins:wantclean@pachficocean.dqlbc.mongodb.net/SanFrancisco?retryWrites=true&w=majority

# Add seed data
npm run seed

# Start the server
npm run dev
```