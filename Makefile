ARGS = `arg="$(filter-out $@,$(MAKECMDGOALS))" && echo $${arg:-${1}}`

.PHONY: change
change: install
	npx changie new

.PHONY: clean
clean:
	rm -rf \
		*.zip \
		node_modules \
		dev/public \
		dev/resources \
		dev/.hugo_build.lock

.PHONY: dev
dev:
	cd dev && hugo serve -DFO

.PHONY: changelog
changelog: install
	npx changie batch $(call ARGS,defaultstring)
	npx changie merge

.PHONY: install
install:
	if [ ! -d ./node_modules/ ]; then \
		npm ci; \
	fi

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
