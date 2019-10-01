DOCKER_RUN = docker run --init --name harmovis_samples --rm -v `pwd`:/app -p 3000:3000 harmovis_samples

build:
	docker build ./ -t harmovis_samples
install:
	@$(DOCKER_RUN) yarn install
generate:
	@$(DOCKER_RUN) yarn build
start:
	@$(DOCKER_RUN) yarn start
test:
	@$(DOCKER_RUN) yarn test
stop:
	docker stop harmovis_samples
