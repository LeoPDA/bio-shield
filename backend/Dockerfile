# pull official base image
FROM python:3.11.4-slim-buster

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install build tools
RUN apt-get update \
    && apt-get install -y gcc g++ netcat libgdal-dev cmake \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY pyproject.toml poetry.lock /usr/src/app/

# update pip
RUN pip install --upgrade pip

# install Poetry
RUN pip install poetry

# install dependencies
RUN poetry install

# copy project
COPY . .

CMD ["poetry", "run", "gunicorn", "project.wsgi:application", "--bind", "0.0.0.0:8000"]
