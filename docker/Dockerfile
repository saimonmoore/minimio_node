FROM node:lts-fermium

ENV YARN_CACHE_FOLDER /yarn
RUN mkdir -p $YARN_CACHE_FOLDER
RUN yarn install --frozen-lockfile && yarn cache clean && rm -rf /tmp/*
RUN yarn buildApiSpec
RUN yarn build

COPY ./entrypoint.sh /mnimio-entrypoint.sh

ENTRYPOINT ["/mnimio-entrypoint.sh"]
