/**
 * LLM Word & Token Embeddings Explorer
 * Inspired by CMU WordEmbeddingDemo & Jay Alammar's Illustrated Word2Vec
 * Core Application Controller
 */

// Embedded full dataset to ensure 100% offline functionality & zero-config GitHub Pages hosting
const EMBEDDED_DATA = [
  {
    "word": "king",
    "category": "royalty",
    "cmu_features": {"gender": 0.85, "age": 0.65, "royalty": 0.95, "ferocity": 0.20, "size": 0.10, "animacy": 1.0},
    "dense_vector": [0.198, 0.3218, 0.4703, 0.495, 0.0495, 0.099, 0.0, 0.0, 0.0, 0.0495, -0.099, -0.099, 0.0, -0.099, 0.198, 0.396],
    "pca_2d": [0.38, 0.52],
    "pca_3d": [0.38, 0.52, 0.21],
    "description": "Male monarch, sovereign ruler of an independent state."
  },
  {
    "word": "queen",
    "category": "royalty",
    "cmu_features": {"gender": -0.85, "age": 0.65, "royalty": 0.95, "ferocity": 0.15, "size": -0.05, "animacy": 1.0},
    "dense_vector": [-0.1983, 0.3223, 0.4711, 0.4959, -0.0248, 0.0744, 0.0, 0.0, 0.0, 0.0496, -0.0992, -0.0992, 0.0, -0.0992, 0.1983, 0.3967],
    "pca_2d": [0.35, 0.48],
    "pca_3d": [0.35, 0.48, -0.22],
    "description": "Female monarch, sovereign queen regnant or consort."
  },
  {
    "word": "prince",
    "category": "royalty",
    "cmu_features": {"gender": 0.85, "age": -0.40, "royalty": 0.85, "ferocity": 0.10, "size": 0.0, "animacy": 1.0},
    "dense_vector": [0.2241, -0.2241, 0.4762, 0.5602, 0.0, 0.056, 0.0, 0.0, 0.0, 0.056, -0.112, -0.112, 0.0, -0.112, 0.1681, 0.3922],
    "pca_2d": [0.42, 0.28],
    "pca_3d": [0.42, 0.28, 0.24],
    "description": "Son of a monarch; young male royal."
  },
  {
    "word": "princess",
    "category": "royalty",
    "cmu_features": {"gender": -0.85, "age": -0.40, "royalty": 0.85, "ferocity": 0.05, "size": -0.1, "animacy": 1.0},
    "dense_vector": [-0.2242, -0.2242, 0.4765, 0.5606, -0.0561, 0.028, 0.0, 0.0, 0.0, 0.0561, -0.1121, -0.1121, 0.0, -0.1121, 0.1682, 0.3924],
    "pca_2d": [0.39, 0.24],
    "pca_3d": [0.39, 0.24, -0.21],
    "description": "Daughter of a monarch; young female royal."
  },
  {
    "word": "man",
    "category": "people",
    "cmu_features": {"gender": 0.85, "age": 0.55, "royalty": -0.70, "ferocity": 0.10, "size": 0.2, "animacy": 1.0},
    "dense_vector": [0.2585, 0.3554, -0.4524, 0.6462, 0.1292, 0.0646, 0.0, 0.0, 0.0, 0.0, -0.1292, -0.0646, 0.0, 0.0, 0.0, 0.1939],
    "pca_2d": [-0.22, 0.35],
    "pca_3d": [-0.22, 0.35, 0.31],
    "description": "Adult human male."
  },
  {
    "word": "woman",
    "category": "people",
    "cmu_features": {"gender": -0.85, "age": 0.55, "royalty": -0.70, "ferocity": 0.05, "size": 0.0, "animacy": 1.0},
    "dense_vector": [-0.2606, 0.3584, -0.4561, 0.6516, 0.0, 0.0326, 0.0, 0.0, 0.0, 0.0, -0.1303, -0.0652, 0.0, 0.0, 0.0, 0.1955],
    "pca_2d": [-0.25, 0.31],
    "pca_3d": [-0.25, 0.31, -0.28],
    "description": "Adult human female."
  },
  {
    "word": "boy",
    "category": "people",
    "cmu_features": {"gender": 0.85, "age": -0.70, "royalty": -0.70, "ferocity": 0.05, "size": -0.3, "animacy": 1.0},
    "dense_vector": [0.2458, -0.4302, -0.4302, 0.6145, -0.1844, 0.0307, 0.0, 0.0, 0.0, 0.0, -0.1229, -0.0615, 0.0, 0.0615, -0.0615, 0.1229],
    "pca_2d": [-0.18, 0.12],
    "pca_3d": [-0.18, 0.12, 0.28],
    "description": "Young male child."
  },
  {
    "word": "girl",
    "category": "people",
    "cmu_features": {"gender": -0.85, "age": -0.70, "royalty": -0.70, "ferocity": 0.0, "size": -0.4, "animacy": 1.0},
    "dense_vector": [-0.2464, -0.4312, -0.4312, 0.616, -0.2464, 0.0, 0.0, 0.0, 0.0, 0.0, -0.1232, -0.0616, 0.0, 0.0616, -0.0616, 0.1232],
    "pca_2d": [-0.21, 0.08],
    "pca_3d": [-0.21, 0.08, -0.27],
    "description": "Young female child."
  },
  {
    "word": "father",
    "category": "family",
    "cmu_features": {"gender": 0.85, "age": 0.60, "royalty": -0.50, "ferocity": 0.10, "size": 0.2, "animacy": 1.0},
    "dense_vector": [0.2646, 0.3969, -0.3307, 0.6614, 0.1323, 0.0661, 0.0, 0.0, 0.0, 0.0, -0.1323, -0.0661, 0.0, 0.0, 0.0661, 0.2646],
    "pca_2d": [-0.15, 0.41],
    "pca_3d": [-0.15, 0.41, 0.32],
    "description": "Male parent."
  },
  {
    "word": "mother",
    "category": "family",
    "cmu_features": {"gender": -0.85, "age": 0.60, "royalty": -0.50, "ferocity": 0.05, "size": 0.0, "animacy": 1.0},
    "dense_vector": [-0.2669, 0.4003, -0.3336, 0.6672, 0.0, 0.0334, 0.0, 0.0, 0.0, 0.0, -0.1334, -0.0667, 0.0, 0.0, 0.0667, 0.2669],
    "pca_2d": [-0.18, 0.37],
    "pca_3d": [-0.18, 0.37, -0.29],
    "description": "Female parent."
  },
  {
    "word": "dog",
    "category": "animals",
    "cmu_features": {"gender": 0.0, "age": 0.20, "royalty": -0.80, "ferocity": 0.30, "size": 0.10, "animacy": 1.0},
    "dense_vector": [0.0, 0.128, -0.5122, 0.6402, 0.064, 0.1921, 0.0, 0.0, 0.0, 0.0, -0.2561, -0.3841, 0.0, 0.064, -0.2561, 0.128],
    "pca_2d": [-0.48, -0.15],
    "pca_3d": [-0.48, -0.15, 0.05],
    "description": "Domesticated canine companion."
  },
  {
    "word": "puppy",
    "category": "animals",
    "cmu_features": {"gender": 0.0, "age": -0.80, "royalty": -0.80, "ferocity": -0.20, "size": -0.60, "animacy": 1.0},
    "dense_vector": [0.0, -0.4633, -0.4633, 0.5791, -0.3475, -0.1158, 0.0, 0.0, 0.0, 0.0, -0.2317, -0.3475, 0.0, 0.0579, -0.2317, 0.1158],
    "pca_2d": [-0.54, -0.32],
    "pca_3d": [-0.54, -0.32, 0.02],
    "description": "Young juvenile dog."
  },
  {
    "word": "cat",
    "category": "animals",
    "cmu_features": {"gender": 0.0, "age": 0.15, "royalty": -0.60, "ferocity": 0.20, "size": -0.30, "animacy": 1.0},
    "dense_vector": [0.0, 0.0988, -0.3952, 0.6587, -0.1976, 0.1317, 0.0, 0.0, 0.0, 0.0, -0.2635, -0.3952, 0.0, 0.0, -0.2635, 0.1317],
    "pca_2d": [-0.44, -0.18],
    "pca_3d": [-0.44, -0.18, 0.02],
    "description": "Small domesticated carnivorous feline."
  },
  {
    "word": "kitten",
    "category": "animals",
    "cmu_features": {"gender": 0.0, "age": -0.85, "royalty": -0.60, "ferocity": -0.30, "size": -0.80, "animacy": 1.0},
    "dense_vector": [0.0, -0.4616, -0.3258, 0.543, -0.4344, -0.1629, 0.0, 0.0, 0.0, 0.0, -0.2172, -0.3258, 0.0, 0.0, -0.2172, 0.1086],
    "pca_2d": [-0.51, -0.36],
    "pca_3d": [-0.51, -0.36, -0.01],
    "description": "Young juvenile cat."
  },
  {
    "word": "lion",
    "category": "animals",
    "cmu_features": {"gender": 0.2, "age": 0.40, "royalty": 0.60, "ferocity": 0.95, "size": 0.70, "animacy": 1.0},
    "dense_vector": [0.0528, 0.211, 0.3165, 0.5276, 0.3693, 0.5012, 0.0, 0.0, 0.0, 0.0, -0.211, -0.3165, 0.0, 0.0, -0.1583, 0.211],
    "pca_2d": [-0.25, -0.05],
    "pca_3d": [-0.25, -0.05, 0.15],
    "description": "Large predatory feline; king of the jungle."
  },
  {
    "word": "france",
    "category": "geography",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.20, "ferocity": -0.20, "size": 0.80, "animacy": -0.70},
    "dense_vector": [0.0, 0.0, 0.1017, -0.356, 0.4069, -0.1017, 0.4069, 0.4323, -0.1017, 0.0509, 0.0509, -0.1017, 0.0, 0.1017, 0.2035, 0.3052],
    "pca_2d": [0.65, -0.42],
    "pca_3d": [0.65, -0.42, 0.12],
    "description": "Country in Western Europe."
  },
  {
    "word": "paris",
    "category": "geography",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.40, "ferocity": -0.30, "size": 0.50, "animacy": -0.70},
    "dense_vector": [0.0, 0.0, 0.2163, -0.3785, 0.2704, -0.1622, 0.1082, 0.4597, -0.1082, 0.0541, 0.1082, -0.0541, 0.0, 0.1082, 0.2704, 0.3785],
    "pca_2d": [0.72, -0.48],
    "pca_3d": [0.72, -0.48, 0.15],
    "description": "Capital city of France."
  },
  {
    "word": "japan",
    "category": "geography",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.20, "ferocity": -0.20, "size": 0.70, "animacy": -0.70},
    "dense_vector": [0.0, 0.0, 0.1065, -0.3729, 0.3729, -0.1065, 0.4261, -0.1065, 0.4528, -0.1065, 0.0533, 0.2663, 0.0, 0.2131, 0.2663, 0.3196],
    "pca_2d": [0.58, -0.38],
    "pca_3d": [0.58, -0.38, -0.22],
    "description": "Island country in East Asia."
  },
  {
    "word": "tokyo",
    "category": "geography",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.40, "ferocity": -0.30, "size": 0.60, "animacy": -0.70},
    "dense_vector": [0.0, 0.0, 0.2139, -0.3743, 0.3208, -0.1604, 0.107, -0.107, 0.4545, -0.107, 0.107, 0.3208, 0.0, 0.1604, 0.3208, 0.3743],
    "pca_2d": [0.66, -0.45],
    "pca_3d": [0.66, -0.45, -0.25],
    "description": "Capital city of Japan."
  },
  {
    "word": "apple",
    "category": "food",
    "cmu_features": {"gender": 0.0, "age": -0.2, "royalty": -0.60, "ferocity": -0.80, "size": -0.60, "animacy": -0.30},
    "dense_vector": [0.0, -0.1171, -0.3514, -0.1757, -0.3514, -0.4686, 0.0, 0.0, 0.0, 0.0, 0.5564, -0.1171, 0.0, 0.0586, -0.0586, 0.0586],
    "pca_2d": [-0.62, 0.45],
    "pca_3d": [-0.62, 0.45, -0.10],
    "description": "Round edible pomaceous fruit."
  },
  {
    "word": "orange",
    "category": "food",
    "cmu_features": {"gender": 0.0, "age": -0.2, "royalty": -0.60, "ferocity": -0.80, "size": -0.55, "animacy": -0.30},
    "dense_vector": [0.0, -0.1207, -0.3621, -0.181, -0.3319, -0.4828, 0.0, 0.0, 0.0, 0.0, 0.5552, -0.1207, 0.0, 0.0603, -0.0603, 0.0603],
    "pca_2d": [-0.61, 0.42],
    "pca_3d": [-0.61, 0.42, -0.09],
    "description": "Citrus fruit with a sweet and sour taste."
  },
  {
    "word": "banana",
    "category": "food",
    "cmu_features": {"gender": 0.0, "age": -0.2, "royalty": -0.70, "ferocity": -0.85, "size": -0.50, "animacy": -0.30},
    "dense_vector": [0.0, -0.1159, -0.4055, -0.1738, -0.2897, -0.4925, 0.0, 0.0, 0.0, 0.0, 0.5446, -0.1448, 0.0, 0.0579, -0.0579, 0.0579],
    "pca_2d": [-0.64, 0.44],
    "pca_3d": [-0.64, 0.44, -0.08],
    "description": "Elongated curved edible fruit rich in potassium."
  },
  {
    "word": "fast",
    "category": "adjectives",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.0, "ferocity": 0.40, "size": 0.0, "animacy": -0.80},
    "dense_vector": [0.0, 0.0, 0.0, -0.5754, 0.0, 0.2877, 0.0, 0.0, 0.0, 0.0, -0.2158, 0.1438, -0.5754, 0.0, 0.0, 0.2877],
    "pca_2d": [0.05, -0.68],
    "pca_3d": [0.05, -0.68, 0.15],
    "description": "Moving or capable of moving at high speed."
  },
  {
    "word": "faster",
    "category": "adjectives",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.0, "ferocity": 0.50, "size": 0.0, "animacy": -0.80},
    "dense_vector": [0.0, 0.0, 0.0, -0.6695, 0.0, 0.4184, 0.0, 0.0, 0.0, 0.0, -0.2511, 0.1674, 0.0, 0.0, 0.0, 0.3347],
    "pca_2d": [0.12, -0.62],
    "pca_3d": [0.12, -0.62, 0.18],
    "description": "Comparative of fast: speedier."
  },
  {
    "word": "tall",
    "category": "adjectives",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.0, "ferocity": 0.0, "size": 0.60, "animacy": -0.80},
    "dense_vector": [0.0, 0.0, 0.0, -0.5516, 0.4137, 0.0, 0.0, 0.0, 0.0, 0.0, -0.2069, 0.0, -0.5516, 0.0, 0.0, 0.2069],
    "pca_2d": [0.02, -0.55],
    "pca_3d": [0.02, -0.55, -0.05],
    "description": "Of great or more than average height."
  },
  {
    "word": "taller",
    "category": "adjectives",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.0, "ferocity": 0.0, "size": 0.75, "animacy": -0.80},
    "dense_vector": [0.0, 0.0, 0.0, -0.6419, 0.6018, 0.0, 0.0, 0.0, 0.0, 0.0, -0.2407, 0.0, 0.0, 0.0, 0.0, 0.2407],
    "pca_2d": [0.08, -0.48],
    "pca_3d": [0.08, -0.48, -0.03],
    "description": "Comparative of tall: having greater height."
  },
  {
    "word": "walk",
    "category": "verbs",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": -0.5, "ferocity": -0.4, "size": 0.0, "animacy": 0.6},
    "dense_vector": [0.0, 0.0, -0.3629, 0.4355, 0.0, -0.2903, 0.0, 0.0, 0.0, 0.0, -0.2177, -0.1451, -0.5806, 0.0, 0.0, 0.1451],
    "pca_2d": [-0.32, -0.45],
    "pca_3d": [-0.32, -0.45, 0.12],
    "description": "Move on foot at a regular pace."
  },
  {
    "word": "walking",
    "category": "verbs",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": -0.5, "ferocity": -0.4, "size": 0.0, "animacy": 0.6},
    "dense_vector": [0.0, 0.0, -0.4795, 0.5754, 0.0, -0.3836, 0.0, 0.0, 0.0, 0.0, -0.2877, -0.1918, 0.0, 0.0, 0.0, 0.1918],
    "pca_2d": [-0.28, -0.38],
    "pca_3d": [-0.28, -0.38, 0.15],
    "description": "Present participle of walk."
  },
  {
    "word": "swim",
    "category": "verbs",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": -0.5, "ferocity": -0.2, "size": 0.0, "animacy": 0.6},
    "dense_vector": [0.0, 0.0, -0.3168, 0.3801, 0.0, -0.1267, 0.0, 0.0, 0.0, 0.0, -0.1901, -0.1267, -0.5068, 0.5385, 0.0, 0.1267],
    "pca_2d": [-0.18, -0.52],
    "pca_3d": [-0.18, -0.52, 0.22],
    "description": "Propel the body through water."
  },
  {
    "word": "swimming",
    "category": "verbs",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": -0.5, "ferocity": -0.2, "size": 0.0, "animacy": 0.6},
    "dense_vector": [0.0, 0.0, -0.3957, 0.4748, 0.0, -0.1583, 0.0, 0.0, 0.0, 0.0, -0.2374, -0.1583, 0.0, 0.6727, 0.0, 0.1583],
    "pca_2d": [-0.14, -0.45],
    "pca_3d": [-0.14, -0.45, 0.25],
    "description": "Present participle of swim."
  },
  {
    "word": "doctor",
    "category": "professions",
    "cmu_features": {"gender": 0.1, "age": 0.50, "royalty": 0.40, "ferocity": -0.3, "size": 0.1, "animacy": 1.0},
    "dense_vector": [0.0355, 0.3547, 0.2838, 0.7094, 0.0709, -0.2128, 0.0, 0.0, 0.0, 0.0, -0.0709, 0.2128, 0.0, 0.0, 0.2128, 0.3547],
    "pca_2d": [0.05, 0.55],
    "pca_3d": [0.05, 0.55, 0.12],
    "description": "Qualified medical practitioner."
  },
  {
    "word": "nurse",
    "category": "professions",
    "cmu_features": {"gender": -0.1, "age": 0.45, "royalty": 0.20, "ferocity": -0.5, "size": 0.0, "animacy": 1.0},
    "dense_vector": [-0.0381, 0.3429, 0.1524, 0.762, 0.0, -0.381, 0.0, 0.0, 0.0, 0.0, -0.0762, 0.1524, 0.0, 0.0, 0.1524, 0.381],
    "pca_2d": [0.02, 0.52],
    "pca_3d": [0.02, 0.52, -0.14],
    "description": "Person trained to care for the sick or infirm."
  },
  {
    "word": "bank",
    "category": "polysemy",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.1, "ferocity": -0.4, "size": 0.4, "animacy": -0.7},
    "dense_vector": [0.0, 0.0, 0.0827, -0.579, 0.3308, -0.3308, 0.0, 0.0, 0.0, 0.0, -0.0827, -0.0827, 0.0, 0.3722, 0.4549, 0.2481],
    "pca_2d": [0.15, -0.12],
    "pca_3d": [0.15, -0.12, 0.35],
    "description": "Static Word2Vec vector conflating finance and river edge."
  },
  {
    "word": "river",
    "category": "nature",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.0, "ferocity": 0.2, "size": 0.9, "animacy": -0.4},
    "dense_vector": [0.0, 0.0, 0.0, -0.2745, 0.6176, 0.1373, 0.0, 0.0, 0.0, 0.0, -0.2059, -0.3431, 0.0, 0.6519, -0.2059, 0.0686],
    "pca_2d": [0.32, -0.25],
    "pca_3d": [0.32, -0.25, 0.42],
    "description": "Natural flowing watercourse."
  },
  {
    "word": "money",
    "category": "finance",
    "cmu_features": {"gender": 0.0, "age": 0.0, "royalty": 0.4, "ferocity": -0.5, "size": -0.2, "animacy": -0.9},
    "dense_vector": [0.0, 0.0, 0.2678, -0.6025, -0.1339, -0.3347, 0.0, 0.0, 0.0, 0.0, -0.1339, -0.0669, 0.0, -0.2008, 0.636, 0.2678],
    "pca_2d": [-0.12, -0.22],
    "pca_3d": [-0.12, -0.22, 0.28],
    "description": "Medium of exchange in banknotes and coins."
  }
];

// App State
const state = {
  words: EMBEDDED_DATA,
  byWord: {},
  cmuAxisX: "gender",
  cmuAxisY: "age",
  cmuAxisZ: "royalty",
  cmuPreset: "royalty_family",
  cmuSelectedA: "man",
  cmuSelectedB: "king",
  cmuArrowFrom: "man",
  cmuArrowTo: "king",
  cmuTranslatedFrom: "woman",
  cmuShowArrow: false,
  cmuShowTranslation: false,

  heatWordA: "king",
  heatWordB: "queen",

  analogyA: "king",
  analogyB: "man",
  analogyC: "woman",

  ctxWeight: 0.5,
  universeFilter: "all",
  universeSearch: ""
};

// Index words
state.words.forEach(w => {
  state.byWord[w.word.toLowerCase()] = w;
});

// Color mapping for categories
const CATEGORY_COLORS = {
  royalty: "#ec4899",     // Pink
  people: "#6366f1",      // Indigo
  family: "#818cf8",      // Light Indigo
  animals: "#10b981",     // Emerald
  geography: "#06b6d4",   // Cyan
  food: "#f59e0b",        // Amber
  adjectives: "#a855f7",  // Purple
  verbs: "#f43f5e",       // Rose
  professions: "#38bdf8", // Sky Blue
  polysemy: "#fb923c",    // Orange
  nature: "#2dd4bf",      // Teal
  finance: "#84cc16"      // Lime
};

// Math Helpers
function dotProduct(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

function magnitude(v) {
  return Math.sqrt(dotProduct(v, v));
}

function cosineSimilarity(a, b) {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

function euclideanDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
  return Math.sqrt(sum);
}

function normalize(v) {
  const mag = magnitude(v);
  if (mag === 0) return v;
  return v.map(x => x / mag);
}

// Diverging Colormap (-1.0 Blue, 0.0 Dark, +1.0 Magenta/Pink)
function getHeatmapColor(val) {
  const clamped = Math.max(-1, Math.min(1, val));
  if (clamped < 0) {
    // Negative: interpolate from #1e293b (0) to #3b82f6 (-1)
    const t = -clamped;
    const r = Math.round(30 + (59 - 30) * t);
    const g = Math.round(41 + (130 - 41) * t);
    const b = Math.round(59 + (246 - 59) * t);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    // Positive: interpolate from #1e293b (0) to #ec4899 (+1)
    const t = clamped;
    const r = Math.round(30 + (236 - 30) * t);
    const g = Math.round(41 + (72 - 41) * t);
    const b = Math.round(59 + (153 - 59) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// ==========================================================================
// Module 1: CMU Semantic Feature Space Canvas
// ==========================================================================
function initCMUCanvas() {
  const canvas = document.getElementById("cmu-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Resize canvas for sharp retina displays
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  drawCMUSpace(ctx, rect.width, rect.height);

  // Click handler to select words or measure distance
  canvas.addEventListener("click", (e) => {
    const cRect = canvas.getBoundingClientRect();
    const mx = e.clientX - cRect.left;
    const my = e.clientY - cRect.top;

    const featX = state.cmuAxisX;
    const featY = state.cmuAxisY;

    let closest = null;
    let minDist = 30;

    const words = getCMUPresetWords();
    words.forEach(w => {
      const px = ((w.cmu_features[featX] + 1) / 2) * (rect.width - 120) + 60;
      const py = (1 - (w.cmu_features[featY] + 1) / 2) * (rect.height - 100) + 50;
      const d = Math.hypot(mx - px, my - py);
      if (d < minDist) {
        minDist = d;
        closest = w;
      }
    });

    if (closest) {
      if (state.cmuSelectedA && state.cmuSelectedA !== closest.word) {
        state.cmuSelectedB = closest.word;
      } else {
        state.cmuSelectedA = closest.word;
      }
      renderCMUWordTable();
      drawCMUSpace(ctx, rect.width, rect.height);
    }
  });
}

function getCMUPresetWords() {
  const p = state.cmuPreset;
  if (p === "royalty_family") {
    return state.words.filter(w => ["king", "queen", "prince", "princess", "man", "woman", "boy", "girl"].includes(w.word));
  }
  if (p === "generations") {
    return state.words.filter(w => ["grandfather", "grandmother", "father", "mother", "boy", "girl"].includes(w.word));
  }
  if (p === "animals") {
    return state.words.filter(w => ["dog", "puppy", "cat", "kitten", "lion"].includes(w.word));
  }
  return state.words.slice(0, 15);
}

function drawCMUSpace(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const featX = state.cmuAxisX;
  const featY = state.cmuAxisY;

  const padLeft = 60;
  const padRight = 60;
  const padTop = 50;
  const padBottom = 50;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Grid background
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let f = -1; f <= 1; f += 0.5) {
    const gx = ((f + 1) / 2) * plotW + padLeft;
    ctx.beginPath();
    ctx.moveTo(gx, padTop);
    ctx.lineTo(gx, height - padBottom);
    ctx.stroke();

    const gy = (1 - (f + 1) / 2) * plotH + padTop;
    ctx.beginPath();
    ctx.moveTo(padLeft, gy);
    ctx.lineTo(width - padRight, gy);
    ctx.stroke();
  }

  // Axes (at 0,0)
  const originX = padLeft + plotW / 2;
  const originY = padTop + plotH / 2;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 1.5;
  // X Axis
  ctx.beginPath();
  ctx.moveTo(padLeft, originY);
  ctx.lineTo(width - padRight, originY);
  ctx.stroke();
  // Y Axis
  ctx.beginPath();
  ctx.moveTo(originX, padTop);
  ctx.lineTo(originX, height - padBottom);
  ctx.stroke();

  // Axis Labels
  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "#38bdf8";
  ctx.textAlign = "right";
  ctx.fillText(`+ ${featX.toUpperCase()}`, width - padRight, originY - 8);
  ctx.textAlign = "left";
  ctx.fillText(`- ${featX.toUpperCase()}`, padLeft, originY - 8);

  ctx.fillStyle = "#f472b6";
  ctx.textAlign = "center";
  ctx.fillText(`+ ${featY.toUpperCase()}`, originX, padTop - 12);
  ctx.fillText(`- ${featY.toUpperCase()}`, originX, height - padBottom + 24);

  const words = getCMUPresetWords();

  // Draw connecting distance line if two words selected
  const itemA = state.byWord[state.cmuSelectedA];
  const itemB = state.byWord[state.cmuSelectedB];

  if (itemA && itemB && itemA !== itemB) {
    const ax = ((itemA.cmu_features[featX] + 1) / 2) * plotW + padLeft;
    const ay = (1 - (itemA.cmu_features[featY] + 1) / 2) * plotH + padTop;
    const bx = ((itemB.cmu_features[featX] + 1) / 2) * plotW + padLeft;
    const by = (1 - (itemB.cmu_features[featY] + 1) / 2) * plotH + padTop;

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.setLineDash([]);

    // Distance badge at midpoint
    const midX = (ax + bx) / 2;
    const midY = (ay + by) / 2;
    const dx = itemA.cmu_features[featX] - itemB.cmu_features[featX];
    const dy = itemA.cmu_features[featY] - itemB.cmu_features[featY];
    const dist2D = Math.hypot(dx, dy).toFixed(2);

    ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
    ctx.fillRect(midX - 28, midY - 12, 56, 20);
    ctx.fillStyle = "#000";
    ctx.font = "700 11px JetBrains Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`d=${dist2D}`, midX, midY + 2);
  }

  // Draw Analogy Vector Arrows if active (man -> king, and translated woman -> queen)
  if (state.cmuShowArrow) {
    const fromW = state.byWord[state.cmuArrowFrom];
    const toW = state.byWord[state.cmuArrowTo];

    if (fromW && toW) {
      const fx = ((fromW.cmu_features[featX] + 1) / 2) * plotW + padLeft;
      const fy = (1 - (fromW.cmu_features[featY] + 1) / 2) * plotH + padTop;
      const tx = ((toW.cmu_features[featX] + 1) / 2) * plotW + padLeft;
      const ty = (1 - (toW.cmu_features[featY] + 1) / 2) * plotH + padTop;

      drawArrow(ctx, fx, fy, tx, ty, "#ef4444", 3);

      if (state.cmuShowTranslation) {
        const transW = state.byWord[state.cmuTranslatedFrom];
        if (transW) {
          const sx = ((transW.cmu_features[featX] + 1) / 2) * plotW + padLeft;
          const sy = (1 - (transW.cmu_features[featY] + 1) / 2) * plotH + padTop;
          const ex = sx + (tx - fx);
          const ey = sy + (ty - fy);

          drawArrow(ctx, sx, sy, ex, ey, "#10b981", 3);
        }
      }
    }
  }

  // Draw points
  words.forEach(w => {
    const vx = w.cmu_features[featX];
    const vy = w.cmu_features[featY];
    const px = ((vx + 1) / 2) * plotW + padLeft;
    const py = (1 - (vy + 1) / 2) * plotH + padTop;

    const isSelected = (w.word === state.cmuSelectedA || w.word === state.cmuSelectedB);

    // Glowing halo
    ctx.beginPath();
    ctx.arc(px, py, isSelected ? 12 : 7, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.4)" : "rgba(99, 102, 241, 0.25)";
    ctx.fill();

    // Solid core
    ctx.beginPath();
    ctx.arc(px, py, isSelected ? 7 : 4.5, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "#fbbf24" : (CATEGORY_COLORS[w.category] || "#818cf8");
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Word label
    ctx.font = isSelected ? "700 13px Inter, sans-serif" : "500 11px Inter, sans-serif";
    ctx.fillStyle = isSelected ? "#fff" : "#cbd5e1";
    ctx.textAlign = "center";
    ctx.fillText(w.word, px, py - 12);
  });
}

function drawArrow(ctx, fromX, fromY, toX, toY, color, width) {
  const headlen = 12;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = width;

  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

function renderCMUWordTable() {
  const tbody = document.getElementById("cmu-table-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  const words = getCMUPresetWords();
  const featX = state.cmuAxisX;
  const featY = state.cmuAxisY;

  words.forEach(w => {
    const tr = document.createElement("tr");
    if (w.word === state.cmuSelectedA || w.word === state.cmuSelectedB) {
      tr.className = "selected";
    }

    tr.innerHTML = `
      <td><strong>${w.word}</strong></td>
      <td>[</td>
      <td style="color:#38bdf8">${w.cmu_features[featX].toFixed(2)},</td>
      <td style="color:#f472b6">${w.cmu_features[featY].toFixed(2)}</td>
      <td>]</td>
    `;

    tr.addEventListener("click", () => {
      state.cmuSelectedA = w.word;
      renderCMUWordTable();
      const canvas = document.getElementById("cmu-canvas");
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        drawCMUSpace(canvas.getContext("2d"), canvas.width / dpr, canvas.height / dpr);
      }
    });

    tbody.appendChild(tr);
  });

  // Update distance calculation HUD
  const itemA = state.byWord[state.cmuSelectedA];
  const itemB = state.byWord[state.cmuSelectedB];
  const distInfo = document.getElementById("cmu-distance-display");
  if (distInfo && itemA && itemB) {
    const dx = itemA.cmu_features[featX] - itemB.cmu_features[featX];
    const dy = itemA.cmu_features[featY] - itemB.cmu_features[featY];
    const dist2D = Math.hypot(dx, dy).toFixed(3);
    distInfo.innerHTML = `Distance between <strong>${itemA.word}</strong> &amp; <strong>${itemB.word}</strong> = <code>${dist2D}</code> (Euclidean)`;
  }
}

// ==========================================================================
// Module 2: The Illustrated Vector Heatmap & Cosine Math (Jay Alammar)
// ==========================================================================
function renderHeatmapModule() {
  const itemA = state.byWord[state.heatWordA];
  const itemB = state.byWord[state.heatWordB];
  if (!itemA || !itemB) return;

  document.getElementById("heat-title-a").textContent = itemA.word.toUpperCase();
  document.getElementById("heat-title-b").textContent = itemB.word.toUpperCase();

  const stripA = document.getElementById("vector-strip-a");
  const stripB = document.getElementById("vector-strip-b");
  stripA.innerHTML = "";
  stripB.innerHTML = "";

  const dimNames = [
    "Gender", "Age", "Royalty", "Animacy", "Size", "Ferocity", "Nation", "France",
    "Japan", "UK", "Food", "Tech", "Degree", "Water", "Finance", "Abstract"
  ];

  for (let i = 0; i < 16; i++) {
    const valA = itemA.dense_vector[i];
    const valB = itemB.dense_vector[i];

    // Cell A
    const cellA = document.createElement("div");
    cellA.className = "dim-cell";
    cellA.style.backgroundColor = getHeatmapColor(valA);
    cellA.textContent = valA >= 0 ? `+${valA.toFixed(1)}` : valA.toFixed(1);
    cellA.title = `Dim ${i} (${dimNames[i]}): ${valA}`;
    stripA.appendChild(cellA);

    // Cell B
    const cellB = document.createElement("div");
    cellB.className = "dim-cell";
    cellB.style.backgroundColor = getHeatmapColor(valB);
    cellB.textContent = valB >= 0 ? `+${valB.toFixed(1)}` : valB.toFixed(1);
    cellB.title = `Dim ${i} (${dimNames[i]}): ${valB}`;
    stripB.appendChild(cellB);
  }

  // Calculate Cosine Similarity & Math Breakdown
  const dot = dotProduct(itemA.dense_vector, itemB.dense_vector);
  const magA = magnitude(itemA.dense_vector);
  const magB = magnitude(itemB.dense_vector);
  const cosSim = Math.max(-1, Math.min(1, dot / (magA * magB)));
  const angleRad = Math.acos(cosSim);
  const angleDeg = (angleRad * (180 / Math.PI)).toFixed(1);
  const eucDist = euclideanDistance(itemA.dense_vector, itemB.dense_vector).toFixed(3);

  document.getElementById("cos-sim-score").textContent = cosSim.toFixed(4);
  document.getElementById("cos-angle-score").textContent = `${angleDeg}°`;
  document.getElementById("math-dot-val").textContent = dot.toFixed(4);
  document.getElementById("math-maga-val").textContent = magA.toFixed(3);
  document.getElementById("math-magb-val").textContent = magB.toFixed(3);
  document.getElementById("math-euc-val").textContent = eucDist;

  // Draw Angle Gauge
  drawAngleGauge(angleRad);
}

function drawAngleGauge(angleRad) {
  const canvas = document.getElementById("angle-gauge-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const size = 90;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const r = 35;

  // Outer circle track
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Vector A (along 0 deg, horizontal right)
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + r, cy);
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Vector B (at angle)
  const bx = cx + r * Math.cos(-angleRad);
  const by = cy + r * Math.sin(-angleRad);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(bx, by);
  ctx.strokeStyle = "#f472b6";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Arc between vectors
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, -angleRad, true);
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ==========================================================================
// Module 3: Vector Arithmetic & Analogy Solver
// ==========================================================================
function solveCurrentAnalogy() {
  const wordA = state.analogyA;
  const wordB = state.analogyB;
  const wordC = state.analogyC;

  const itemA = state.byWord[wordA];
  const itemB = state.byWord[wordB];
  const itemC = state.byWord[wordC];

  if (!itemA || !itemB || !itemC) return;

  const va = itemA.dense_vector;
  const vb = itemB.dense_vector;
  const vc = itemC.dense_vector;

  // Target Vector = A - B + C
  const target = [];
  for (let i = 0; i < 16; i++) {
    target.push(va[i] - vb[i] + vc[i]);
  }
  const normTarget = normalize(target);

  // Score all words in dataset (excluding A, B, C)
  const exclude = new Set([wordA.toLowerCase(), wordB.toLowerCase(), wordC.toLowerCase()]);
  const ranked = [];

  state.words.forEach(w => {
    if (exclude.has(w.word.toLowerCase())) return;
    const sim = cosineSimilarity(normTarget, w.dense_vector);
    const dist = euclideanDistance(normTarget, w.dense_vector);
    ranked.push({ word: w.word, category: w.category, similarity: sim, distance: dist });
  });

  ranked.sort((a, b) => b.similarity - a.similarity);
  renderAnalogyMatches(ranked.slice(0, 5));
}

function renderAnalogyMatches(top5) {
  const container = document.getElementById("analogy-matches-list");
  if (!container) return;
  container.innerHTML = "";

  top5.forEach((match, idx) => {
    const item = document.createElement("div");
    item.className = "match-item";
    const pct = Math.max(0, Math.min(100, (match.similarity * 100))).toFixed(1);

    item.innerHTML = `
      <div class="match-item-left">
        <span class="match-rank">#${idx + 1}</span>
        <span class="match-word">${match.word}</span>
        <span class="match-category" style="color: ${CATEGORY_COLORS[match.category] || '#38bdf8'}">${match.category}</span>
      </div>
      <div class="match-item-right">
        <div class="match-sim-bar-wrap">
          <div class="match-sim-bar" style="width: ${pct}%"></div>
        </div>
        <span class="match-sim-val">${match.similarity.toFixed(4)}</span>
      </div>
    `;
    container.appendChild(item);
  });
}

window.loadAnalogyPreset = function(a, b, c) {
  state.analogyA = a;
  state.analogyB = b;
  state.analogyC = c;

  document.getElementById("analogy-select-a").value = a;
  document.getElementById("analogy-select-b").value = b;
  document.getElementById("analogy-select-c").value = c;

  solveCurrentAnalogy();
};

// ==========================================================================
// Module 4: Contextual Shift (Bank vs Bank)
// ==========================================================================
function updateContextualShift() {
  const t = state.ctxWeight; // 0.0 to 1.0
  const canvas = document.getElementById("contextual-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = 420;
  const h = 260;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, w, h);

  // Centers for River Cluster (left) and Money Cluster (right)
  const riverX = 90;
  const riverY = 130;
  const moneyX = 330;
  const moneyY = 130;
  const staticX = 210;
  const staticY = 130;

  // River Cluster
  ctx.beginPath();
  ctx.arc(riverX, riverY, 45, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(6, 182, 212, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
  ctx.stroke();
  ctx.fillStyle = "#38bdf8";
  ctx.font = "600 11px Inter";
  ctx.textAlign = "center";
  ctx.fillText("Water / Nature Cluster", riverX, riverY - 55);

  // Money Cluster
  ctx.beginPath();
  ctx.arc(moneyX, moneyY, 45, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(245, 158, 11, 0.12)";
  ctx.fill();
  ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
  ctx.stroke();
  ctx.fillStyle = "#fbbf24";
  ctx.fillText("Finance Cluster", moneyX, moneyY - 55);

  // Current shifted position based on slider
  // Slider: -1 (full river) to +1 (full money), 0 = static Word2Vec
  const sliderVal = (t - 0.5) * 2; // -1 to +1
  let curX = staticX;
  if (sliderVal < 0) {
    curX = staticX + sliderVal * (staticX - riverX);
  } else {
    curX = staticX + sliderVal * (moneyX - staticX);
  }

  // Connecting path
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(riverX, riverY);
  ctx.lineTo(moneyX, moneyY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Word Point
  ctx.beginPath();
  ctx.arc(curX, staticY, 14, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(236, 72, 153, 0.35)";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(curX, staticY, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#ec4899";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = "700 13px Inter";
  ctx.fillText("bank", curX, staticY - 20);

  // Description update
  const label = document.getElementById("ctx-weight-label");
  if (label) {
    if (Math.abs(sliderVal) < 0.15) {
      label.textContent = "Word2Vec Neutral (Static representation)";
    } else if (sliderVal < 0) {
      label.textContent = `River Context Attention: ${Math.round(-sliderVal * 100)}% (Nature shifted)`;
    } else {
      label.textContent = `Finance Context Attention: ${Math.round(sliderVal * 100)}% (Money shifted)`;
    }
  }
}

// ==========================================================================
// Module 5: 2D PCA Semantic Universe Canvas
// ==========================================================================
function initUniverseCanvas() {
  const canvas = document.getElementById("universe-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  drawUniverse(ctx, rect.width, rect.height);

  // Resize listener
  window.addEventListener("resize", () => {
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    drawUniverse(ctx, r.width, r.height);
  });
}

function drawUniverse(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const pad = 60;
  const plotW = width - pad * 2;
  const plotH = height - pad * 2;

  // Grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 1;
  for (let x = pad; x <= width - pad; x += plotW / 8) {
    ctx.beginPath();
    ctx.moveTo(x, pad);
    ctx.lineTo(x, height - pad);
    ctx.stroke();
  }
  for (let y = pad; y <= height - pad; y += plotH / 6) {
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  // Draw points
  const filter = state.universeFilter;
  const search = state.universeSearch.toLowerCase();

  state.words.forEach(w => {
    if (filter !== "all" && w.category !== filter) return;

    const [rawX, rawY] = w.pca_2d;
    // Map -1..1 to plot dimensions
    const px = ((rawX + 1) / 2) * plotW + pad;
    const py = (1 - (rawY + 1) / 2) * plotH + pad;

    const isMatch = search.length > 0 && w.word.toLowerCase().includes(search);
    const color = CATEGORY_COLORS[w.category] || "#818cf8";

    // Halo
    ctx.beginPath();
    ctx.arc(px, py, isMatch ? 12 : 6, 0, Math.PI * 2);
    ctx.fillStyle = isMatch ? "rgba(245, 158, 11, 0.5)" : "rgba(255, 255, 255, 0.08)";
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(px, py, isMatch ? 6 : 3.5, 0, Math.PI * 2);
    ctx.fillStyle = isMatch ? "#f59e0b" : color;
    ctx.fill();

    // Text
    ctx.font = isMatch ? "700 12px Inter" : "500 10px Inter";
    ctx.fillStyle = isMatch ? "#fff" : "#94a3b8";
    ctx.textAlign = "center";
    ctx.fillText(w.word, px, py - 8);
  });
}

// Populate Dropdowns
function populateDropdowns() {
  const words = state.words.map(w => w.word).sort();

  const populate = (selId, defaultVal) => {
    const sel = document.getElementById(selId);
    if (!sel) return;
    sel.innerHTML = "";
    words.forEach(w => {
      const opt = document.createElement("option");
      opt.value = w;
      opt.textContent = w;
      if (w === defaultVal) opt.selected = true;
      sel.appendChild(opt);
    });
  };

  populate("heat-word-a-select", state.heatWordA);
  populate("heat-word-b-select", state.heatWordB);
  populate("analogy-select-a", state.analogyA);
  populate("analogy-select-b", state.analogyB);
  populate("analogy-select-c", state.analogyC);
}

// Global App Initialization
document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();

  // Module 1: CMU Feature Space Listeners
  initCMUCanvas();
  renderCMUWordTable();

  document.getElementById("cmu-axis-x")?.addEventListener("change", (e) => {
    state.cmuAxisX = e.target.value;
    renderCMUWordTable();
    const c = document.getElementById("cmu-canvas");
    if (c) drawCMUSpace(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
  });

  document.getElementById("cmu-axis-y")?.addEventListener("change", (e) => {
    state.cmuAxisY = e.target.value;
    renderCMUWordTable();
    const c = document.getElementById("cmu-canvas");
    if (c) drawCMUSpace(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
  });

  document.querySelectorAll(".cmu-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cmu-preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.cmuPreset = btn.dataset.preset;
      renderCMUWordTable();
      const c = document.getElementById("cmu-canvas");
      if (c) drawCMUSpace(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
    });
  });

  document.getElementById("btn-cmu-arrow")?.addEventListener("click", () => {
    state.cmuShowArrow = true;
    state.cmuShowTranslation = false;
    const c = document.getElementById("cmu-canvas");
    if (c) drawCMUSpace(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
  });

  document.getElementById("btn-cmu-translate")?.addEventListener("click", () => {
    state.cmuShowArrow = true;
    state.cmuShowTranslation = true;
    const c = document.getElementById("cmu-canvas");
    if (c) drawCMUSpace(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
  });

  // Module 2: Heatmap Listeners
  renderHeatmapModule();
  document.getElementById("heat-word-a-select")?.addEventListener("change", (e) => {
    state.heatWordA = e.target.value;
    renderHeatmapModule();
  });
  document.getElementById("heat-word-b-select")?.addEventListener("change", (e) => {
    state.heatWordB = e.target.value;
    renderHeatmapModule();
  });

  // Module 3: Analogy Listeners
  solveCurrentAnalogy();
  document.getElementById("analogy-select-a")?.addEventListener("change", (e) => {
    state.analogyA = e.target.value;
    solveCurrentAnalogy();
  });
  document.getElementById("analogy-select-b")?.addEventListener("change", (e) => {
    state.analogyB = e.target.value;
    solveCurrentAnalogy();
  });
  document.getElementById("analogy-select-c")?.addEventListener("change", (e) => {
    state.analogyC = e.target.value;
    solveCurrentAnalogy();
  });

  // Module 4: Contextual Shift Listener
  updateContextualShift();
  document.getElementById("ctx-weight-slider")?.addEventListener("input", (e) => {
    state.ctxWeight = parseFloat(e.target.value);
    updateContextualShift();
  });

  // Module 5: Universe Listeners
  initUniverseCanvas();
  document.querySelectorAll(".universe-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".universe-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.universeFilter = btn.dataset.category;
      const c = document.getElementById("universe-canvas");
      if (c) drawUniverse(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
    });
  });

  document.getElementById("universe-search")?.addEventListener("input", (e) => {
    state.universeSearch = e.target.value;
    const c = document.getElementById("universe-canvas");
    if (c) drawUniverse(c.getContext("2d"), c.width / (window.devicePixelRatio || 1), c.height / (window.devicePixelRatio || 1));
  });
});
