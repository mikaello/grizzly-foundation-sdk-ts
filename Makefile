jsonnetExampleDir := jsonnet-example
foundationSDKExampleDir := foundation-sdk-example

install-tools:
	go install github.com/google/go-jsonnet/cmd/jsonnet@latest
	go install -a github.com/jsonnet-bundler/jsonnet-bundler/cmd/jb@latest
	go install -a github.com/grafana/grizzly/cmd/grr@v0.6.1

nvm:
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
	echo "Run the following command to get latest node:"
	echo "nvm install node"

format-jsonnet:
	go install github.com/google/go-jsonnet/cmd/jsonnetfmt@latest
	jsonnetfmt -i ${jsonnetExampleDir}/*.jsonnet

install-dependencies:
	jb install

generate-test-dashboards-grizzly:
	cd ${jsonnetExampleDir} && jb install; \
	jsonnet -J vendor main.jsonnet | jq --sort-keys > compiled.json

generate-test-dashboards-foundation-sdk:
	cd ${foundationSDKExampleDir} && npm install; \
	npm run -s build | jq --sort-keys > compiled.json

deploy-snapshot: # Requires config: https://grafana.github.io/grizzly/configuration#configuring-grizzly-with-environment-variables
	grr snapshot -e 1000 jsonnet-example/compiled.json

# Start a grafana docker instance to test deploying snapshot to that:
grafana-start:
	docker run --rm -d --name "grafana" -e GF_SECURITY_ADMIN_PASSWORD="a" -p 3000:3000 grafana/grafana:latest
grafana-stop:
	docker stop grafana 2> /dev/null || echo "No Grafana currently running"
grafana-restart: grafana-stop grafana-start
