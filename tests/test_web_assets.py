"""Unit tests verifying web application assets, 3D Canvas integration, and HTML structure."""

from pathlib import Path


def test_web_assets_exist():
    base = Path(__file__).resolve().parent.parent
    assert (base / "index.html").exists()
    assert (base / "style.css").exists()
    assert (base / "app.js").exists()
    assert (base / ".nojekyll").exists()
    assert (base / ".gitignore").exists()
    assert (base / "data" / "embeddings.json").exists()


def test_html_contains_3d_module_components():
    base = Path(__file__).resolve().parent.parent
    html = (base / "index.html").read_text(encoding="utf-8")

    # Module 1: 3D Feature Space
    assert "cmu-axis-x" in html
    assert "cmu-axis-y" in html
    assert "cmu-axis-z" in html
    assert "cmu-canvas" in html
    assert "btn-cmu-autorotate" in html
    assert "btn-cmu-resetview" in html
    assert "btn-cmu-view-3d" in html
    assert "btn-cmu-view-2d" in html
    assert "th-z-label" in html

    # Module 5: 3D PCA Universe
    assert "universe-canvas" in html
    assert "universe-search" in html
    assert "btn-universe-autorotate" in html
    assert "btn-universe-resetview" in html
    assert "btn-universe-view-3d" in html
    assert "btn-universe-view-2d" in html
    assert "The 3D PCA Semantic Universe" in html


def test_app_js_contains_3d_logic():
    base = Path(__file__).resolve().parent.parent
    app_js = (base / "app.js").read_text(encoding="utf-8")

    assert "class Camera3D" in app_js
    assert "cmuAxisZ" in app_js
    assert "pca_3d" in app_js
    assert "btn-cmu-autorotate" in app_js
    assert "btn-universe-autorotate" in app_js
    assert "startAnimationLoop" in app_js


def test_modules_element_ids_consistency():
    base = Path(__file__).resolve().parent.parent
    html = (base / "index.html").read_text(encoding="utf-8")
    app_js = (base / "app.js").read_text(encoding="utf-8")

    # Module 2 IDs
    mod2_ids = [
        "heat-word-a-select",
        "heat-word-b-select",
        "heat-title-a",
        "heat-title-b",
        "vector-strip-a",
        "vector-strip-b",
        "cos-sim-score",
        "cos-angle-score",
        "angle-gauge-canvas",
        "math-dot-val",
        "math-euc-val",
        "math-maga-val",
        "math-magb-val",
    ]
    for mid in mod2_ids:
        assert f'id="{mid}"' in html or f"id='{mid}'" in html
        assert f'getElementById("{mid}")' in app_js

    # Module 3 IDs
    mod3_ids = [
        "analogy-select-a",
        "analogy-select-b",
        "analogy-select-c",
        "analogy-matches-list",
    ]
    for mid in mod3_ids:
        assert f'id="{mid}"' in html or f"id='{mid}'" in html
        assert f'getElementById("{mid}")' in app_js
    assert "loadAnalogyPreset" in app_js

    # Module 4 IDs
    mod4_ids = [
        "contextual-canvas",
        "ctx-weight-slider",
        "ctx-weight-label",
    ]
    for mid in mod4_ids:
        assert f'id="{mid}"' in html or f"id='{mid}'" in html
        assert f'getElementById("{mid}")' in app_js

    # Module 5 IDs
    mod5_ids = [
        "universe-canvas",
        "universe-search",
        "universe-selection-badge",
        "universe-hover-card",
        "btn-universe-autorotate",
        "btn-universe-resetview",
    ]
    for mid in mod5_ids:
        assert f'id="{mid}"' in html or f"id='{mid}'" in html
        assert f'getElementById("{mid}")' in app_js

