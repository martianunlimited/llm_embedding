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
