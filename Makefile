#!make
.SILENT :

## Welcome to the Developer console!
##
##      usage: make <command> [service=<service_name>]
##
##      possible service_name values:
##          app, kafka, mysql
##
## Available commands:
##
service?='app'
file?=''

# Include common Make tasks
root_dir:=$(shell pwd)

help: ## This help dialog.
	    @IFS=$$'\n' ; \
    help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
    for help_line in $${help_lines[@]}; do \
        IFS=$$'#' ; \
        help_split=($$help_line) ; \
        help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        help_info=`echo $${help_split[2]}` ; \
        printf "%-30s %s\n" $$help_command $$help_info ; \
    done
.PHONY: help


install: ## Installs all dependencies (docker for mac should be preinstalled)
	make network
	docker-compose build
	make start
	make init
	make stop
.PHONY: install

uninstall: ## Uninstalls dev environment
	docker-compose down -v
	docker-compose rm -s -v -f
.PHONY: uninstall

start: ## Starts the application
	docker-compose up -d app
.PHONY: start

restart: ## Restarts the application
restart: stop start
.PHONY: restart

stop: ## Stops the application
	docker-compose stop
.PHONY: stop

status: ## Status for the services (alias to docker-compose ps)
	docker-compose ps
.PHONY: status

shell: ## Initializes a shell
	docker-compose run --rm app bash
.PHONY: shell

debug: ## Attaches to debug console for app. To exit use escape sequence (Ctrl P + Ctrl Q)
	docker attach mnimio_node
.PHONY: debug

test: ## Run tests for the file passed as parameter or the entire suite if none passed. Syntax: make test file=<path/to/test/file.rb>
	docker-compose run --rm app yarn test:watch $$file
.PHONY: test

init: # Init app
	# make db-reset
.PHONY: init

## -------
## Utils
## -------

network: ## Creates the development external network	
	@if [ "$(shell docker network ls | grep development)" = "" ]; then \
		echo "Creating development network"; \
		docker network create development; \
	else \
		echo "Development network already exists, skipping creation"; \
	fi
.PHONY: network

logs: ## View logs
	docker-compose logs -f ${service}
.PHONY: logs
