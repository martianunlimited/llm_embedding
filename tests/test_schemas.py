"""Tests verifying schema integrity and Pydantic validation."""

from src.schemas import WordItem, SimilarityResult, AnalogyPreset


def test_word_item_validation():
    item = WordItem(
        word="king",
        category="royalty",
        cmu_features={
            "gender": 0.9,
            "age": 0.7,
            "royalty": 0.9,
            "ferocity": 0.1,
            "size": 0.0,
            "animacy": 1.0,
        },
        dense_vector=[0.1] * 16,
        pca_2d=[1.2, -0.4],
        pca_3d=[1.2, -0.4, 0.8],
        description="Male monarch ruler",
    )
    assert item.word == "king"
    assert item.cmu_features["royalty"] == 0.9
    assert len(item.dense_vector) == 16


def test_similarity_result_validation():
    res = SimilarityResult(
        word_a="man",
        word_b="woman",
        cosine_similarity=0.85,
        euclidean_distance=0.42,
        manhattan_distance=1.12,
        dot_product=0.85,
        angle_degrees=31.79,
    )
    assert res.word_a == "man"
    assert res.cosine_similarity == 0.85


def test_analogy_preset_validation():
    preset = AnalogyPreset(
        id="king-queen",
        category="royalty",
        title="Royalty Analogy: King - Man + Woman = Queen",
        word_a="king",
        word_b="man",
        word_c="woman",
        expected_d="queen",
        explanation="The classic Mikolov et al. word2vec vector offset equation.",
    )
    assert preset.expected_d == "queen"
