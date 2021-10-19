import { basename, resolve } from 'https://deno.land/std@0.112.0/path/mod.ts'
import { walkSync } from 'https://deno.land/std@0.112.0/fs/mod.ts'

const DENYLIST = ['.DS_Store']

const [location] = Deno.args
const db = JSON.parse(Deno.readTextFileSync('./data.json'))
const missing = []

console.log(`Checking files in ${location}`)

const files = Array.from(walkSync(location)).filter(
  (entry) => entry.isFile && !DENYLIST.includes(basename(entry.path))
)
console.log(`${files.length} files have been found`)

for (const entry of files) {
  const name = basename(entry.path)
  const found = db.find((x: { filename: string }) => x.filename === name)
  // console.log(entry.path, name)
  if (!found) {
    console.log(`Missing file`, name)
    missing.push(resolve(entry.path))
  }
}

console.log(`\n\n${missing.length} files are missing:`)
console.log(missing)
