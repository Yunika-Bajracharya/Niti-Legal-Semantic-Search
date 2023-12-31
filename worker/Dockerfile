# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /niti_chatbot/worker

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Bundle your app's source code inside the Docker image
COPY . .

# Copy the Python script into the container
COPY main.py .


# Command to run your Python script
CMD ["python", "main.py"]