.PHONY: install lint test format run help

install:
	pnpm install

lint:
	pnpm run lint

run:
	pnpm run dev

build:
	pnpm run build

clean:
	rm -rf dist node_modules

help:
	@echo "Available commands:"
	@echo "  install       - Install dependencies"
	@echo "  lint          - Lint code"
	@echo "  run           - Run in dev mode"
	@echo "  build         - Build for production"
	@echo "  clean         - Clean generated files"