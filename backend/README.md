# Backend for Volunteer Connect SPA

**Dependencies** :

- Flask
- Flask-SQLAlchemy
- Flask-Cors
- Flask-JWT-Extended
- mysqlclient (Local)
- PyMySQL (For Railway SQL extension - Production)
- gunicorn

## Usage

If you haven't created a virtual env yet. let's start with that

```python
For mac/unix users: python3 -m venv env
For windows users: py -m venv env
```

After creating the environment, activate it by running :

```python
For mac/unix users: source env/bin/activate
For windows users: .\env\Scripts\activate
```

I personally use ```python3 -m venv env``` & ```source env/Scripts/activate```

Once you've activated the virtual env, install the necessary libraries if you haven't installed them before.

```python
pip install flask
pip install python-dotenv
pip install flask-sqlalchemy
pip install flask-migrate
```

run Flask using cmd:

```python
flask run
```

To leave the env type ```deactivate```
