"""Core service for computing vector similarities, analogies, and geometric metrics."""

import logging
import math

import numpy as np

from src.core.dataset_builder import build_embeddings_dataset
from src.schemas import AnalogyResult, NeighborMatch, SimilarityResult, WordItem

logger = logging.getLogger(__name__)


class EmbeddingService:
    """Service for querying embeddings, computing metrics, and solving vector analogies."""

    def __init__(self, words_data: list[WordItem] | None = None) -> None:
        self._items = words_data or build_embeddings_dataset()
        self._by_word: dict[str, WordItem] = {item.word.lower(): item for item in self._items}

    def get_all_words(self) -> list[str]:
        """Return list of all words in the embedding vocabulary."""
        return list(self._by_word.keys())

    def get_word(self, word: str) -> WordItem:
        """Retrieve word item by string key."""
        key = word.strip().lower()
        if key not in self._by_word:
            raise KeyError(f"Word '{word}' not found in vocabulary.")
        return self._by_word[key]

    def compute_similarity(self, word_a: str, word_b: str) -> SimilarityResult:
        """Compute cosine similarity, euclidean distance, and geometric metrics."""
        item_a = self.get_word(word_a)
        item_b = self.get_word(word_b)

        vec_a = np.array(item_a.dense_vector, dtype=float)
        vec_b = np.array(item_b.dense_vector, dtype=float)

        norm_a = np.linalg.norm(vec_a)
        norm_b = np.linalg.norm(vec_b)

        if norm_a == 0 or norm_b == 0:
            cos_sim = 0.0
        else:
            cos_sim = float(np.dot(vec_a, vec_b) / (norm_a * norm_b))

        cos_sim_clipped = max(-1.0, min(1.0, cos_sim))
        angle_rad = math.acos(cos_sim_clipped)
        angle_deg = math.degrees(angle_rad)

        euc_dist = float(np.linalg.norm(vec_a - vec_b))
        man_dist = float(np.sum(np.abs(vec_a - vec_b)))
        dot_prod = float(np.dot(vec_a, vec_b))

        return SimilarityResult(
            word_a=item_a.word,
            word_b=item_b.word,
            cosine_similarity=round(cos_sim, 4),
            euclidean_distance=round(euc_dist, 4),
            manhattan_distance=round(man_dist, 4),
            dot_product=round(dot_prod, 4),
            angle_degrees=round(angle_deg, 2),
        )

    def find_nearest_neighbors(
        self,
        target_vector: list[float],
        top_k: int = 5,
        exclude_words: set[str] | None = None,
    ) -> list[NeighborMatch]:
        """Find the top-k words whose vectors are closest in cosine similarity to target_vector."""
        t_arr = np.array(target_vector, dtype=float)
        t_norm = np.linalg.norm(t_arr)
        if t_norm > 0:
            t_arr = t_arr / t_norm

        excludes = {w.lower() for w in (exclude_words or set())}
        scored: list[NeighborMatch] = []

        for item in self._items:
            if item.word.lower() in excludes:
                continue

            v_arr = np.array(item.dense_vector, dtype=float)
            v_norm = np.linalg.norm(v_arr)
            sim = float(np.dot(t_arr, v_arr) / (v_norm if v_norm > 0 else 1.0))
            dist = float(np.linalg.norm(t_arr - v_arr))

            scored.append(
                NeighborMatch(
                    word=item.word,
                    category=item.category,
                    similarity=round(sim, 4),
                    distance=round(dist, 4),
                )
            )

        scored.sort(key=lambda m: m.similarity, reverse=True)
        return scored[:top_k]

    def solve_analogy(
        self,
        word_a: str,
        word_b: str,
        word_c: str,
        top_k: int = 5,
    ) -> AnalogyResult:
        """Solve vector equation: A - B + C = ? (e.g. king - man + woman = queen)."""
        item_a = self.get_word(word_a)
        item_b = self.get_word(word_b)
        item_c = self.get_word(word_c)

        va = np.array(item_a.dense_vector, dtype=float)
        vb = np.array(item_b.dense_vector, dtype=float)
        vc = np.array(item_c.dense_vector, dtype=float)

        target = va - vb + vc
        t_norm = np.linalg.norm(target)
        if t_norm > 0:
            target = target / t_norm

        matches = self.find_nearest_neighbors(
            target.tolist(),
            top_k=top_k,
            exclude_words={item_a.word, item_b.word, item_c.word},
        )

        formula = f"{item_a.word} - {item_b.word} + {item_c.word}"

        return AnalogyResult(
            word_a=item_a.word,
            word_b=item_b.word,
            word_c=item_c.word,
            formula=formula,
            target_vector=[round(x, 4) for x in target.tolist()],
            top_matches=matches,
        )

    def cmu_distance(
        self,
        word_a: str,
        word_b: str,
        features: list[str] | None = None,
    ) -> float:
        """Compute Euclidean distance in the interpretable CMU feature space."""
        item_a = self.get_word(word_a)
        item_b = self.get_word(word_b)

        feat_keys = features or list(item_a.cmu_features.keys())
        va = [item_a.cmu_features.get(k, 0.0) for k in feat_keys]
        vb = [item_b.cmu_features.get(k, 0.0) for k in feat_keys]

        dist = float(np.linalg.norm(np.array(va) - np.array(vb)))
        return round(dist, 4)
