# Use the official NGINX base image
FROM nginx:latest

# Copy contents of the 'dist' directory to NGINX web root directory
COPY dist/ /var/www/expense-tracker-pro/dist

# Expose ports
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]