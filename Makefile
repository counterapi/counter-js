.PHONY: cut-tag
cut-tag:
	@echo "Commit $(version)"
	npm version $(version) --no-git-tag-version
	git commit -m "Bump to $(version)" package.json
	git push
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)
