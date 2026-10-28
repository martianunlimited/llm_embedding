# LLM Word & Token Embeddings Explorer

[![Python 3.13](https://img.shields.io/badge/Python-3.13-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages Ready](https://img.shields.io/badge/GitHub_Pages-Ready-brightgreen.svg)](#-how-to-host-on-github-pages)
[![Tests Passing](https://img.shields.io/badge/Tests-12%20Passed-emerald.svg)](#-local-testing--verification)

An interactive, zero-backend, client-side web application designed to be hosted directly on **GitHub Pages**. 
It visually and mathematically unpacks how words and tokens are represented in vector space, directly inspired by:
- 🎓 **[CMU Word Embedding Demo & Tutorial](https://www.cs.cmu.edu/~dst/WordEmbeddingDemo/tutorial.html)** (David S. Touretzky)
- 🎨 **[The Illustrated Word2vec](https://jalammar.github.io/illustrated-word2vec/)** (Jay Alammar)

---

## 🧭 Interactive Modules in the Demo

### 1. 3D Semantic Feature Space (The CMU Experience)
* **Rotatable 3D Coordinate Plot:** Map words across 3 freely selectable feature axes (X, Y, Z): `Gender` (Female vs Male), `Age` (Child vs Elder), `Royalty` (Commoner vs Monarch), `Ferocity` (Gentle vs Fierce), `Size`, and `Animacy`.
* **Perspective Controls:** Click and drag to rotate the 3D cube (pitch & yaw), scroll to zoom, toggle gentle auto-rotation, or switch between 3D Space and 2D Plane.
* **3D Pythagorean Distance Calculation:** Click any two words to calculate and visualize straight-line 3D Euclidean distance:
  $$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$$
* **3D Geometric Analogy Arrow:** Draw the 3D vector $\vec{v}_{\text{man} \to \text{king}}$, slide it across 3D space to start at $\text{woman}$, and watch the arrow point directly to $\text{queen}$ across all 3 dimensions!

### 2. Dense Vector Heatmaps & Cosine Math (The Jay Alammar Experience)
* **Personality Vectors Metaphor:** Just as 5 numbers quantify personality traits in psychology, a vector of numbers captures the semantic fingerprint of a word.
* **16-Dimensional Diverging Heatmaps:** Visualize continuous latent vectors colored from cold negative (blue `[-1.0]`) to neutral dark (`[0.0]`) to hot positive (magenta `[+1.0]`).
* **Geometric Cosine Math Breakdown:**
  $$\cos(\theta) = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|}$$
  Shows dot product $\sum A_i B_i$, magnitudes $\|\vec{A}\|, \|\vec{B}\|$, and an animated circular angle gauge ($\theta^\circ$).

### 3. Vector Arithmetic & Analogy Solver
* **Equation Solver:** $\vec{v}_{\text{target}} = \vec{v}_A - \vec{v}_B + \vec{v}_C$
* **Classic Presets:**
  - 👑 `king - man + woman = queen`
  - 🗼 `paris - france + japan = tokyo`
  - 🐶 `puppy - dog + cat = kitten`
  - 🏊 `walking - walk + swim = swimming`
  - 📏 `faster - fast + tall = taller`
* **Top-5 Nearest Neighbors:** Ranks words by cosine similarity with animated progress bars and distance metrics.

### 4. Contextual Embeddings: River Bank vs. Money Bank
* **The Classical Limitation:** In Word2Vec/GloVe, `"bank"` has only ONE fixed static vector, confusing river banks with financial banks.
* **Transformer Self-Attention Shift:** Interactive slider simulating how modern LLMs use attention weights:
  $$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$
  Watch the vector smoothly glide across 2D space from neutral static position toward the **Water / Nature cluster** or toward the **Finance cluster**!

### 5. 3D PCA Semantic Universe
* **Rotatable 3D Semantic Cloud:** All 47 vocabulary words projected from 16 dimensions down to 3 principal components ($PC_1, PC_2, PC_3$) using Principal Component Analysis (PCA).
* **Interactive Exploration:** Drag to rotate in 3D, scroll to zoom, hover for coordinate tooltips, and click any word to draw glowing 3D constellation lines to its nearest semantic neighbors.
* **Filters & Search:** Filter by category (Royalty, People, Family, Animals, Geography, Food, Verbs, Professions) and instant keyword search in 3D space.

---

## 🌐 Live GitHub Pages Demo
- **Live Interactive Demo:** [https://martianunlimited.github.io/llm_embedding/](https://martianunlimited.github.io/llm_embedding/)
- **Companion Tokenizer Demo:** [https://martianunlimited.github.io/llm_tokenizer/](https://martianunlimited.github.io/llm_tokenizer/)
- **GitHub Repository:** [https://github.com/martianunlimited/llm_embedding](https://github.com/martianunlimited/llm_embedding)

---

## 🚀 How to Host on GitHub Pages

This project is 100% static (HTML, CSS, JS) and requires **no build step, no Node server, and no Python backend**:

```bash
# 1. Initialize git and commit
git init
git add .
git commit -m "Initial commit of Word & Token Embeddings Demo"

# 2. Push to your GitHub repository
git branch -M main
git remote add origin https://github.com/martianunlimited/llm_embedding.git
git push -u origin main

# 3. Enable GitHub Pages in your repo:
# Settings -> Pages -> Source: Deploy from a branch -> Branch: main -> / (root) -> Save!
# Your live site is now ready at: https://martianunlimited.github.io/llm_embedding/
```

---

## 🧪 Local Testing & Verification

### 1. Run Automated Tests
```bash
python -m pytest -q
# 12 passed in 1.67s

python -m ruff check . --fix
python -m ruff format .
```

### 2. Terminal CLI Explorer
```bash
# Inspect word coordinates & features:
python -m src.cli word king

# Compute cosine similarity and angle between two words:
python -m src.cli similarity man woman

# Solve any vector analogy equation:
python -m src.cli analogy king man woman
python -m src.cli analogy paris france japan
```

### 3. Preview Locally
```bash
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## 📄 License
MIT License. Free for educational, academic, and open-source use.
