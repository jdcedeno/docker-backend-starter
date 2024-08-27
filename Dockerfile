# Use the official MariaDB image as the base
FROM mariadb:latest

# Install MariaDB client tools and gettext (for envsubst)
RUN apt-get update && \
    apt-get install -y mariadb-client gettext-base && \
    rm -rf /var/lib/apt/lists/*

# Copy the init script and SQL template
COPY init.sh /docker-entrypoint-initdb.d/init.sh
COPY init.sql.template /docker-entrypoint-initdb.d/init.sql.template

# Make the init.sh script executable
RUN chmod +x /docker-entrypoint-initdb.d/init.sh
