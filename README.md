# Django API App

This is a Django API application.

## Requirements

- Python 3.x
- Django
- Django REST framework

## Installation

1. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

2. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:
    ```bash
    python manage.py makemigration
    python manage.py migrate
    ```
4. Run the development server:
    ```bash
    python manage.py runserver
    ```

## Usage

To use the API, send requests to the endpoints defined in the `urls.py` file. You can use tools like Postman or curl to interact with the API.
