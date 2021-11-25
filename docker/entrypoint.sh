#!/bin/bash

set -e

yarn config set cache-folder $YARN_CACHE_FOLDER

yarn install

exec $@
