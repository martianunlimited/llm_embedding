"""Domain schemas for word and token embeddings, vector arithmetic, and similarity."""

from typing import Literal
from pydantic import BaseModel, Field


class WordItem(BaseModel):
    """A word entry with both interpretable semantic features and dense latent vector."""

    word: str
    category: str
    cmu_features: dict[str, float] = Field(
        description="Interpretable semantic features: gender, age, royalty, ferocity, size, animacy"
    )
    dense_vector: list[float] = Field(description="Normalized 16D dense latent embedding")
    pca_2d: list[float] = Field(description="2D projected coordinate [x, y]")
    pca_3d: list[float] = Field(description="3D projected coordinate [x, y, z]")
    description: str = ""


class SimilarityResult(BaseModel):
    """Calculated geometric metrics between two word vectors."""

    word_a: str
    word_b: str
    cosine_similarity: float
    euclidean_distance: float
    manhattan_distance: float
    dot_product: float
    angle_degrees: float


class NeighborMatch(BaseModel):
    """Nearest neighbor search match."""

    word: str
    category: str
    similarity: float
    distance: float


class AnalogyResult(BaseModel):
    """Result of vector arithmetic equation: A - B + C = D."""

    word_a: str
    word_b: str
    word_c: str
    formula: str
    target_vector: list[float]
    top_matches: list[NeighborMatch]


class ContextualShiftItem(BaseModel):
    """Demonstrates how modern Transformer attention shifts token embeddings based on context."""

    id: str
    word: str
    sense_a_label: str
    sense_a_sentence: str
    sense_a_cluster: str
    sense_a_coords: list[float]

    sense_b_label: str
    sense_b_sentence: str
    sense_b_cluster: str
    sense_b_coords: list[float]

    static_coords: list[float]
    explanation: str


class AnalogyPreset(BaseModel):
    """Pre-curated famous analogy scenario."""

    id: str
    category: Literal["royalty", "geography", "family", "animals", "grammar", "societal_bias"]
    title: str
    word_a: str
    word_b: str
    word_c: str
    expected_d: str
    explanation: str
