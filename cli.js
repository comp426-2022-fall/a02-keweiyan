#!/usr/bin/env node

// Dependencies
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));
console.log(args)

if (args.h) {
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE

    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
`)
}

// Declare latitude
let latitude = 35.92
if (args.n) {
    latitude = args.n
} else if (args.s) {
    latitude = -1 * args.s
}
// Declare longitude
let longitude = -79.05
if (args.e) {
    latitude = args.e
} else if (args.w) {
    latitude = -1 * args.w
}
// Declare timezone
let timezone = args.z
if (timezone == null) {
  timezone = moment.tz.guess();
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_sum&timezone=' + timezone)
// Get the data from the request
const data = await response.json();
// Log the data onto STDOUT
console.log(data);

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}