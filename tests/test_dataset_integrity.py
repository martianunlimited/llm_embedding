"""Tests verifying generated embedding datasets and preset scenarios."""

import json

from src.config import settings


def test_embeddings_json_integrity():
    emb_file = settings.data_dir / "embeddings.json"
    assert emb_file.exists()

    with open(emb_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert len(data) >= 40
    words = {d["word"] for d in data}
    assert "king" in words
    assert "queen" in words
    assert "man" in words
    assert "woman" in words
    assert "paris" in words
    assert "tokyo" in words
    assert "bank" in words

    for item in data:
        assert len(item["dense_vector"]) == 16
        assert len(item["pca_2d"]) == 2
        assert len(item["pca_3d"]) == 3
        assert "cmu_features" in item


def test_presets_json_integrity():
    preset_file = settings.data_dir / "presets.json"
    assert preset_file.exists()

    with open(preset_file, "r", encoding="utf-8") as f:
        presets = json.load(f)

    assert len(presets) >= 4
    preset_ids = {p["id"] for p in presets}
    assert "royalty-classic" in preset_ids
    assert "capitals-world" in preset_ids
    assert "animals-juvenile" in preset_ids


def test_contextual_examples_integrity():
    ctx_file = settings.data_dir / "contextual_examples.json"
    assert ctx_file.exists()

    with open(ctx_file, "r", encoding="utf-8") as f:
        shifts = json.load(f)

    assert len(shifts) >= 2
    shift_words = {s["word"] for s in shifts}
    assert "bank" in shift_words
