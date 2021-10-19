This lib let's you verify that all files in a given path have been uploaded to Google Photos.

Step 0:
Obtain an API key from https://developers.google.com/photos/library/reference/rest/v1/mediaItems/list

Step 1:
`deno run --allow-net --allow-write snapshot.ts YOUR_API_KEY`

Step 2:
`deno run --allow-read index.ts FOLDER_WITH_MEDIA_FILES`