#!/bin/sh

set -e

zip -q -r ../website.zip .

. ~/auth_file

curl -s -H "Content-Type: application/zip" \
     -H "Authorization: Bearer ${auth}" \
     --data-binary "@website.zip" \
     https://api.netlify.com/api/v1/sites/sumry.netlify.app/deploys
