# Heroku
## Delpoying to Heroku
### Install Heroku CLI on system:
https://devcenter.heroku.com/articles/heroku-cli

### Initialize git repository and commit necessary files
```bash
#Login to heroku-cli:
heroku login
#Create heroku app:
heroku create
#Set remote repository:
heroku git:remote -a <heroku-app-address>
#Push repository to remote:
git push heroku master
```