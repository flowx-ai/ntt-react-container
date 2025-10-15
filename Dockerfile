ARG IMAGE_VERSION=1.26.2-alpine3.20-slim@sha256:28967af9fa8d5e1c58a45feeb35e2f326bb6d99b1208bec25f3374c9fe788f4f
ARG IMAGE_NAME=nginx
FROM ${IMAGE_NAME}:${IMAGE_VERSION}
ARG www_folder="/opt/app"

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p ${www_folder} && chown -R nginx:nginx ${www_folder} && chmod -R 775 ${www_folder}

RUN chown -R nginx:nginx /var/cache/nginx && \
       chown -R nginx:nginx /var/log/nginx && \
       chown -R nginx:nginx /etc/nginx/conf.d

RUN touch /tmp/nginx.pid && \
       chown -R nginx:nginx /tmp/nginx.pid  

RUN chgrp -R nginx /var/cache/nginx /var/log/nginx /tmp/nginx.pid && \
       chmod -R 777 /var/cache/nginx /var/log/nginx /tmp/nginx.pid


ENV JS_FOLDER="${www_folder}/assets/*.js"
ENV HTML_FOLDER="${www_folder}/*.html"
COPY ./start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh

EXPOSE 8080

WORKDIR ${www_folder}
COPY --chown=nginx dist/ .

RUN chmod -R a+rw ${www_folder}
USER nginx
ENTRYPOINT [ "start-nginx.sh" ]