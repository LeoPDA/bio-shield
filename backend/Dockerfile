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

# update pip
RUN pip install --upgrade pip

# install Poetry
RUN pip install poetry

# copy entrypoint.sh
COPY backend/entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# copy project
COPY backend/ .

# install dependencies
RUN poetry install

# run entrypoint.sh
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD ["poetry", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]