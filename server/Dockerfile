FROM denoland/deno:latest

# Create working directory
WORKDIR /app

# Copy source
COPY . .

# Server listens on port 8000
EXPOSE 8000

# Compile the main app
RUN deno cache main.ts

# Run the app
CMD ["deno", "task", "start"]
