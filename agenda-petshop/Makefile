.PHONY: help

.DEFAULT: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-20s\033[0m\n\t%s\n", $$1, $$2}'

up_mysql:  ## up mysql agenda-petshop_db_1
	docker-compose -f stack.yml up

logs:  ## agenda-petshop_db_1 logs
	docker logs agenda-petshop_db_1

bash:  ## mysql bash
	docker exec -it agenda-petshop_db_1 bash