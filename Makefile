.PHONY: install run build clean help

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "  install  Install dependencies"
	@echo "  run      Run with ts-node (no compile step)"
	@echo "  build    Compile to dist/"
	@echo "  clean    Remove dist/ and node_modules/"

install:
	npm install

run:
	npm run dev

build:
	npm run build

clean:
	rm -rf dist/ node_modules/
