.PHONY: cut-tag
cut-tag:
	@echo "Commit $(version)"
	npm version $(version) --no-git-tag-version --allow-same-version
	yarn run build
	git commit -m "Bump to $(version)" package.json dist
	git push
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)
