This lib let's you verify that all files in a given path have been uploaded to Google Photos.

Step 0:
* Obtain an API key from https://developers.google.com/photos/library/reference/rest/v1/mediaItems/list
    1. Press `execute` on the right side frame ("Try this API").
    1. Open the *Dev Console* and check for network activity.
    1. The api key should be found as a query parameter in the url, such as `https://content-photoslibrary.googleapis.com/v1/mediaItems?key=xxxxxx`
    1. The authorization key can be found as the `Authorization` header sent with the request call.

Step 1:
* Load and cache all media files in Google Photos:
    * `deno run --allow-net --allow-write snapshot.ts YOUR_API_KEY AUTHORIZATION`

Step 2:
* Check a local folder against the media data that has been fetched in step 1:
    * `deno run --allow-read --unstable index.ts FOLDER_WITH_MEDIA_FILES`