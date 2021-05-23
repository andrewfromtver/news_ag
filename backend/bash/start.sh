#!/bin/bash
node /backend/serverside.js&
nginx
ps fx | grep -E 'nod[e]|ngin[x]'