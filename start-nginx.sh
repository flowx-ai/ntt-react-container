#!/usr/bin/env sh
set -e
# export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);

EXISTING_VARS="
\$BASE_URL
\$ADMIN_API_URL
\$PROCESS_API_PATH
\$STATIC_ASSETS_PATH
\$KEYCLOAK_ISSUER
\$KEYCLOAK_REDIRECT_URI
\$KEYCLOAK_CLIENT_ID
\$KEYCLOAK_SCOPES
\$MIXPANEL_TOKEN
\$SENTRY_DSN
\$VERSION
\$APP_ID
\$PROCESS_NAME
\$THEME_ID
\$LANGUAGE
\$LOCALE
"

# change envs in html at runtime
for file in $HTML_FOLDER;
do
  envsubst "$EXISTING_VARS" < $file > /tmp/$(basename $file)
  mv /tmp/$(basename $file) $file
done

# change envs in js at runtime
for file in $JS_FOLDER;
do
  envsubst "$EXISTING_VARS" < $file > /tmp/$(basename $file)
  mv /tmp/$(basename $file) $file
done
echo "Starting nginx"
nginx -g 'daemon off;'