install-tools:
	go install github.com/google/go-jsonnet/cmd/jsonnet@latest
	go install -a github.com/jsonnet-bundler/jsonnet-bundler/cmd/jb@latest
	go install -a github.com/grafana/grizzly/cmd/grr@v0.6.1

install-dependencies:
	jb install

deploy-snapshot: # Requires config: https://grafana.github.io/grizzly/configuration#configuring-grizzly-with-environment-variables
	grr snapshot -e 1000 dashboards.jsonnet

# Start a grafana docker instance to test deploying snapshot to that:
grafana-start:
	docker run --rm -d --name "grafana" -e GF_SECURITY_ADMIN_PASSWORD="a" -p 3000:3000 grafana/grafana:latest
grafana-stop:
	docker stop grafana 2> /dev/null || echo "No Grafana currently running"
grafana-restart: grafana-stop grafana-start
