#!/bin/bash
TOKEN="np_...EY="
cd /Users/leo/Desktop/projects/shyam-portfolio

# Create site
echo "Creating site..."
SITE_RESPONSE=$(curl -s -X POST "https://api.netlify.com/api/v1/sites" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"shyam-time-machine"}')
echo "$SITE_RESPONSE" | head -5

SITE_ID=$(echo "$SITE_RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
SITE_URL=$(echo "$SITE_RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('ssl_url','') or json.load(sys.stdin).get('url',''))" 2>/dev/null)

if [ -z "$SITE_ID" ]; then
  echo "Failed to create site. Trying direct deploy..."
  exit 1
fi

echo "Site ID: $SITE_ID"
echo "URL: $SITE_URL"

# Create deploy
echo "Creating deploy..."
DEPLOY_RESPONSE=$(curl -s -X POST "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}')
DEPLOY_ID=$(echo "$DEPLOY_RESPONSE" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))" 2>/dev/null)
echo "Deploy ID: $DEPLOY_ID"

if [ -n "$DEPLOY_ID" ]; then
  # Upload files
  echo "Uploading files..."
  UPLOAD_RESPONSE=$(curl -s -X PUT "https://api.netlify.com/api/v1/deploys/$DEPLOY_ID/files" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/zip" \
    --data-binary @/tmp/shyam-deploy.tar.gz)
  echo "Upload response: $UPLOAD_RESPONSE"
  
  echo ""
  echo "✅ DEPLOYED: $SITE_URL"
fi
