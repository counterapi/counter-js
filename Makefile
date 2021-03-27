.PHONY: cut-tag
cut-tag:
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)
