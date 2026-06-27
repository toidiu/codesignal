.PHONY: install run build clean help skill

TSNODE = npx ts-node --project practice/tsconfig.json
SKILL_DIR = practice/skill

help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Project:"
	@echo "  install    Install dependencies"
	@echo "  run        Run src/ with ts-node"
	@echo "  build      Compile to dist/"
	@echo "  clean      Remove dist/ and node_modules/"
	@echo ""
	@echo "Practice:"
	@echo "  skill      Run ALL skill drills; report passing/failing per skill"
	@echo "  skill1..7  Run a single skill drill"
	@echo "  sim1..4    Run a single simulation's tests"

install:
	npm install

run:
	npm run dev

build:
	npm run build

clean:
	rm -rf dist/ node_modules/

# ---- Practice: skills ----
# `make skill` runs every skill file in its own process and summarizes results.
skill:
	@pass=0; fail=0; failed=""; \
	for f in $(SKILL_DIR)/*.ts; do \
		echo "── $${f##*/} ──"; \
		if $(TSNODE) "$$f"; then pass=$$((pass+1)); else fail=$$((fail+1)); failed="$$failed $${f##*/}"; fi; \
		echo ""; \
	done; \
	echo "════════════════════════════════════"; \
	echo "SKILLS — passing: $$pass   failing: $$fail"; \
	if [ -n "$$failed" ]; then echo "still failing:$$failed"; else echo "all skills green ✓"; fi

# `make skill3` runs just skill 3 (matches skill/3-*.ts).
skill%:
	@$(TSNODE) $$(ls $(SKILL_DIR)/$*-*.ts)

# ---- Practice: sims ----
# `make sim1` runs sim1's tests; sims without a test file yet print a hint.
sim%:
	@if [ -f practice/sims/sim$*/sim$*.test.ts ]; then \
		$(TSNODE) practice/sims/sim$*/sim$*.test.ts; \
	else \
		echo "sim$* not wired yet — ask Claude to wire up sim$* tests"; \
	fi
