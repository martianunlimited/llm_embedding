"""Tests for core EmbeddingService (TDD red-green tests)."""

import pytest

from src.core.embedding_service import EmbeddingService


@pytest.fixture
def service():
    return EmbeddingService()


def test_service_initialization(service):
    words = service.get_all_words()
    assert len(words) >= 40
    assert "king" in words
    assert "queen" in words
    assert "man" in words
    assert "woman" in words


def test_get_word_vector(service):
    king = service.get_word("king")
    assert king.word == "king"
    assert len(king.dense_vector) == 16
    assert "royalty" in king.cmu_features


def test_cosine_similarity(service):
    # King and Queen should have high cosine similarity (> 0.70)
    sim_royal = service.compute_similarity("king", "queen")
    assert sim_royal.cosine_similarity > 0.70
    assert 0.0 <= sim_royal.angle_degrees <= 180.0

    # Apple and King should have much lower similarity than King and Queen
    sim_unrelated = service.compute_similarity("king", "apple")
    assert sim_royal.cosine_similarity > sim_unrelated.cosine_similarity


def test_solve_classic_analogy_king_queen(service):
    # king - man + woman should have queen in top matches!
    res = service.solve_analogy("king", "man", "woman", top_k=5)
    matched_words = [m.word for m in res.top_matches]
    assert "queen" in matched_words


def test_solve_analogy_capitals(service):
    # paris - france + japan should yield tokyo
    res = service.solve_analogy("paris", "france", "japan", top_k=5)
    matched_words = [m.word for m in res.top_matches]
    assert "tokyo" in matched_words


def test_cmu_feature_vector_distance(service):
    # Boy and Girl differ primarily on gender
    dist_boy_girl = service.cmu_distance("boy", "girl")
    # Boy and Queen differ on gender, age, and royalty
    dist_boy_queen = service.cmu_distance("boy", "queen")
    assert dist_boy_girl < dist_boy_queen
