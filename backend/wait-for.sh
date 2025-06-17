#!/usr/bin/env bash
#Used to block backend from starting too early since we need to check if the database is online.

set -e #exits immediatley if script fails

host="$1" 
port="$2"
shift 2 #drops first two arguments (db and 5432)
cmd="$@" #gets rest of the arguments to become node server.js

until nc -z "$host" "$port"; do #checks if port is open and will repeat until it's found
  >&2 echo "Waiting for $host:$port to be available..."
  sleep 1 #will run each time for a second
done

>&2 echo "$host:$port is up and running!"
exec $cmd