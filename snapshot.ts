import { sleep } from 'https://deno.land/x/sleep@v1.2.0/mod.ts'

const load = async (
  key: string,
  authorization?: string,
  nextPageToken?: string
): Promise<unknown[]> => {
  console.log(`Fetching page ${nextPageToken || 0}`)

  const headers = {
    accept: '*/*',
    'accept-language': 'en,pt-BR;q=0.9,pt;q=0.8,en-US;q=0.7',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'sec-ch-ua': '"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'x-goog-encode-response-if-executable': 'base64',
    'x-javascript-user-agent': 'apix/3.0.0 google-api-javascript-client/1.1.0',
    'x-origin': 'https://explorer.apis.google.com',
    'x-referer': 'https://explorer.apis.google.com',
    'x-requested-with': 'XMLHttpRequest',
  }

  if (authorization) {
    // @ts-ignore
    headers.authorization = authorization
  }

  const response = await fetch(
    `https://content-photoslibrary.googleapis.com/v1/mediaItems?${
      nextPageToken ? `pageToken=${nextPageToken}&` : ''
    }pageSize=100&key=${key}`,
    {
      headers,
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    }
  )

  const data = await response.json()
  console.log(`${data.mediaItems?.length} items loaded`)

  if (data.nextPageToken) {
    sleep(2)
    return [...data.mediaItems, ...(await load(key, authorization, data.nextPageToken))]
  }

  return data.mediaItems
}

const main = async () => {
  const [key, authorization] = Deno.args
  const items = await load(key, authorization)
  Deno.writeTextFileSync('./data.json', JSON.stringify(items, null, 2))
}

main()
