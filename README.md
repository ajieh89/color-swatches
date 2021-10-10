# COLOR SWATCHES
### Requirments
1. Python 3.8
2. React 17
3. MUI v5

### How to setup
### Backend (with pipenv)
1. open a new terminal
2. git clone the repository into your local machine.
3. cd into the project directory.
4. run these command
    ```
    pipenv --python 3
	pipenv shell
	pipenv install -r requirements.txt
	cd app
	python manage.py migrate
	python manage.py runserver
	```
5. Now you will have your backend running

### Frontend
1. open a new terminal
2. go into the frontend folder
	```
    cd app/front-end/
    ```
3.  run these command
	```
    npm install
	npm run start
	```
4.  now you will have the front end running

### EXTRA
if you want to have more type of color space your can create via
1. API, [POST] /color-swatches/create/ with the raw json body as below:
    ```
	{
		  "name" : "BRGB",
		  "properties": {
			  "key": {
				  "min": ???,
				  "max": ???
				}
			}
	}
	```
3. Create a new migration script to add the new color space
   `python manage.py makemigrations --empty --name color_swatches color_swatches`