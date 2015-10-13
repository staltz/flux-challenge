FROM node:4.1

# Install Elm
RUN npm install --global elm
ENV ELM_HOME /usr/local/lib/node_modules/elm/share

# Fix locales
RUN apt-get update && \
    apt-get install -y locales && \
    echo 'en_GB.UTF-8 UTF-8' >> /etc/locale.gen && \
    locale-gen
ENV LANG en_GB.UTF-8

# Install project dependencies
ADD elm-package.json /host/elm-package.json
WORKDIR /host
RUN elm-package install -y

CMD make