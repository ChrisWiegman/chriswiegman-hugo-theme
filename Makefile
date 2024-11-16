ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

.PHONY: change
change:
	docker run \
		--rm \
		--platform linux/amd64 \
		--mount type=bind,source=$(PWD),target=/src \
		-w /src \
		-it \
		ghcr.io/miniscruff/changie \
		new

.PHONY: clean
clean:
	rm -rf \
		*.zip

.PHONY: changelog
changelog:
	docker run \
		--rm \
		--platform linux/amd64 \
		--mount type=bind,source=$(PWD),target=/src \
		-w /src \
		-it \
		ghcr.io/miniscruff/changie \
		batch $(call ARGS,defaultstring)
	docker run \
		--rm \
		--platform linux/amd64 \
		--mount type=bind,source=$(PWD),target=/src \
		-w /src \
		-it \
		ghcr.io/miniscruff/changie \
		merge

.PHONY: release
release: clean
	@echo "Building release file: chriswiegman-hugo-theme.$(call ARGS,defaultstring).zip"
	THEME_VERSION=$(call ARGS,defaultstring) && \
		cd ../ && \
		zip \
		--verbose \
		--recurse-paths \
		--exclude="*.changes/*" \
		--exclude="*.git/*" \
		--exclude="*.github/*" \
		--exclude="*.vscode/*" \
		--exclude="*.changie.yml" \
		--exclude="*.gitignore" \
		--exclude="*Makefile" \
		--exclude="*README.md" \
		--exclude="*CHANGELOG.md" \
		--exclude="*.zip" \
		chriswiegman-hugo-theme/chriswiegman-hugo-theme.$(call ARGS,defaultstring).zip \
		chriswiegman-hugo-theme/*
	if [ ! -f ./chriswiegman-hugo-theme.$(call ARGS,defaultstring).zip  ]; then \
		echo "file not available"; \
		exit 1; \
	fi
