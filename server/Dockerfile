# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /niti_chatbot/server

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Bundle your app's source code inside the Docker image
COPY . .

# Expose port 8000 to the outside world
EXPOSE 3500

# Command to run your FastAPI application
CMD ["python", "main.py"]