# yet another pronouns page

a page where you can share your pronouns and that's it - peak social media. supports login with discord (github to be added *perhaps*)

note: i made this project mainly for myself, i don't plan on hosting it anywhere.

basically a clone of [pronouns.page](https://en.pronouns.page)

## Setup

### Requirements
- Node.js (v16+ recommended)
- Go
- PostgreSQL

### Web interface

Change directory to `web/`, install dependencies using `npm install` and then build with `npm run build`. This will automatically copy files where the server can see them (at least on Linux on macOS).

### Server

Create a `.env` file and fill it accordingly. An example file is provided in `.env.example`.

Then, if you think you're ready, run `go build` and then `./yet-another-pronouns-page` should work.

## Development

### Web interface

It's just your usual CRA app. Use `npm start` for hot reload.

### Server

A configuration file for [air](https://github.com/cosmtrek/air) is provided, if you want to use it.