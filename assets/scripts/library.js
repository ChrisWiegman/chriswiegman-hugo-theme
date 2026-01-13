(() => {
    const root = document.querySelector("[data-library-table]");
    if (!root) return;

    const header = root.querySelector(".book-header");
    if (!header) return;

    const hint = document.querySelector("[data-sort-hint]");
    const buttons = Array.from(header.querySelectorAll(".book-sort"));
    const getRows = () => Array.from(root.querySelectorAll(".book"));

    const STORAGE_KEY = "librarySort:v1";

    const labelFor = (key) => {
        switch (key) {
            case "title": return "Title";
            case "author": return "Author";
            case "rating": return "Rating";
            case "finished": return "Finished";
            default: return key;
        }
    };

    const compare = (key, dir) => (a, b) => {
        const av = a.dataset[key] ?? "";
        const bv = b.dataset[key] ?? "";

        // Numeric sorts with stable tie-breaker by title
        if (key === "rating" || key === "finished") {
            const an = Number(av) || 0;
            const bn = Number(bv) || 0;
            const diff = dir * (an - bn);
            if (diff !== 0) return diff;

            const at = a.dataset.title ?? "";
            const bt = b.dataset.title ?? "";
            return at.localeCompare(bt, undefined, { numeric: true, sensitivity: "base" });
        }

        // String sorts with stable tie-breaker by title
        const diff = dir * av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
        if (diff !== 0) return diff;

        const at = a.dataset.title ?? "";
        const bt = b.dataset.title ?? "";
        return at.localeCompare(bt, undefined, { numeric: true, sensitivity: "base" });
    };

    const setAria = (activeBtn, dir) => {
        buttons.forEach(btn => btn.setAttribute("aria-sort", "none"));
        if (activeBtn) activeBtn.setAttribute("aria-sort", dir === 1 ? "ascending" : "descending");
    };

    const updateHint = (key, dir) => {
        if (!hint) return;
        const dirText = dir === 1 ? "ascending" : "descending";
        const prettyDir = dir === 1 ? "oldest first" : "newest first";
        const name = labelFor(key);

        // Special-case wording for numeric sorts
        const extra = (key === "finished")
            ? (dir === -1 ? "newest first" : "oldest first")
            : (key === "rating")
                ? (dir === -1 ? "highest first" : "lowest first")
                : dirText;

        hint.innerHTML = `Sorted by <strong>${name}</strong> (${extra}). Click a column to change.`;
    };

    const saveState = (key, dir) => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ key, dir })); } catch { }
    };

    const loadState = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.key || !parsed.dir) return null;
            return parsed;
        } catch {
            return null;
        }
    };

    const applySort = (key, dir) => {
        const btn = buttons.find(b => b.dataset.sort === key) || null;
        const rows = getRows().sort(compare(key, dir));

        // Faster re-append (single DOM append)
        const frag = document.createDocumentFragment();
        rows.forEach(row => frag.appendChild(row));
        root.appendChild(frag);

        setAria(btn, dir);
        updateHint(key, dir);
        saveState(key, dir);
    };

    // Click handlers
    let activeKey = null;
    let dir = 1;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.sort;

            if (key === activeKey) dir *= -1;
            else { activeKey = key; dir = 1; }

            applySort(activeKey, dir);
        });
    });

    // Default sort: Finished (descending), but restore saved sort if present
    const saved = loadState();
    if (saved) {
        activeKey = saved.key;
        dir = saved.dir;
        applySort(activeKey, dir);
    } else {
        activeKey = "finished";
        dir = -1;
        applySort(activeKey, dir);
    }
})();