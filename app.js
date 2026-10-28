/**
 * LLM Word & Token Embeddings Explorer
 * Inspired by CMU WordEmbeddingDemo & Jay Alammar's Illustrated Word2Vec
 * Core Application Controller with 3D Rotatable Feature Space & 3D PCA Universe
 */

// Embedded full 47-word dataset for 100% offline & zero-config GitHub Pages hosting
const EMBEDDED_DATA = [
  {
    "word": "king",
    "category": "royalty",
    "cmu_features": {
      "gender": 0.85,
      "age": 0.65,
      "royalty": 0.95,
      "ferocity": 0.2,
      "size": 0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2149,
      0.3492,
      0.5104,
      0.5372,
      0.0537,
      0.1074,
      0.0,
      0.0,
      0.0,
      0.0537,
      -0.1074,
      -0.1074,
      0.0,
      -0.1074,
      0.2149,
      0.4298
    ],
    "pca_2d": [
      0.159,
      0.676
    ],
    "pca_3d": [
      0.159,
      0.676,
      -0.187
    ],
    "description": "Male monarch, sovereign ruler of an independent state."
  },
  {
    "word": "queen",
    "category": "royalty",
    "cmu_features": {
      "gender": -0.85,
      "age": 0.65,
      "royalty": 0.95,
      "ferocity": 0.15,
      "size": -0.05,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2157,
      0.3505,
      0.5122,
      0.5392,
      -0.027,
      0.0809,
      0.0,
      0.0,
      0.0,
      0.0539,
      -0.1078,
      -0.1078,
      0.0,
      -0.1078,
      0.2157,
      0.4313
    ],
    "pca_2d": [
      0.176,
      0.631
    ],
    "pca_3d": [
      0.176,
      0.631,
      -0.248
    ],
    "description": "Female monarch, sovereign queen regnant or consort."
  },
  {
    "word": "prince",
    "category": "royalty",
    "cmu_features": {
      "gender": 0.85,
      "age": -0.4,
      "royalty": 0.85,
      "ferocity": 0.1,
      "size": 0.0,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2407,
      -0.2407,
      0.5114,
      0.6017,
      0.0,
      0.0602,
      0.0,
      0.0,
      0.0,
      0.0602,
      -0.1203,
      -0.1203,
      0.0,
      -0.1203,
      0.1805,
      0.4212
    ],
    "pca_2d": [
      0.162,
      0.433
    ],
    "pca_3d": [
      0.162,
      0.433,
      -0.181
    ],
    "description": "Son of a monarch; young male royal."
  },
  {
    "word": "princess",
    "category": "royalty",
    "cmu_features": {
      "gender": -0.85,
      "age": -0.4,
      "royalty": 0.85,
      "ferocity": 0.05,
      "size": -0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2406,
      -0.2406,
      0.5112,
      0.6014,
      -0.0601,
      0.0301,
      0.0,
      0.0,
      0.0,
      0.0601,
      -0.1203,
      -0.1203,
      0.0,
      -0.1203,
      0.1804,
      0.421
    ],
    "pca_2d": [
      0.174,
      0.39
    ],
    "pca_3d": [
      0.174,
      0.39,
      -0.237
    ],
    "description": "Daughter of a monarch; young female royal."
  },
  {
    "word": "man",
    "category": "people",
    "cmu_features": {
      "gender": 0.85,
      "age": 0.55,
      "royalty": -0.7,
      "ferocity": 0.1,
      "size": 0.2,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2733,
      0.3758,
      -0.4782,
      0.6832,
      0.1366,
      0.0683,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1366,
      -0.0683,
      0.0,
      0.0,
      0.0,
      0.205
    ],
    "pca_2d": [
      0.596,
      0.04
    ],
    "pca_3d": [
      0.596,
      0.04,
      0.094
    ],
    "description": "Adult human male."
  },
  {
    "word": "woman",
    "category": "people",
    "cmu_features": {
      "gender": -0.85,
      "age": 0.55,
      "royalty": -0.7,
      "ferocity": 0.05,
      "size": 0.0,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2764,
      0.38,
      -0.4836,
      0.6909,
      0.0,
      0.0345,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1382,
      -0.0691,
      0.0,
      0.0,
      0.0,
      0.2073
    ],
    "pca_2d": [
      0.634,
      -0.032
    ],
    "pca_3d": [
      0.634,
      -0.032,
      0.007
    ],
    "description": "Adult human female."
  },
  {
    "word": "boy",
    "category": "people",
    "cmu_features": {
      "gender": 0.85,
      "age": -0.7,
      "royalty": -0.7,
      "ferocity": 0.05,
      "size": -0.3,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2613,
      -0.4574,
      -0.4574,
      0.6534,
      -0.196,
      0.0327,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1307,
      -0.0653,
      0.0,
      0.0653,
      -0.0653,
      0.1307
    ],
    "pca_2d": [
      0.551,
      -0.433
    ],
    "pca_3d": [
      0.551,
      -0.433,
      0.068
    ],
    "description": "Young male child."
  },
  {
    "word": "girl",
    "category": "people",
    "cmu_features": {
      "gender": -0.85,
      "age": -0.7,
      "royalty": -0.7,
      "ferocity": 0.0,
      "size": -0.4,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2577,
      -0.4509,
      -0.4509,
      0.6442,
      -0.2577,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1288,
      -0.0644,
      0.0,
      0.0644,
      -0.0644,
      0.1288
    ],
    "pca_2d": [
      0.554,
      -0.475
    ],
    "pca_3d": [
      0.554,
      -0.475,
      0.007
    ],
    "description": "Young female child."
  },
  {
    "word": "father",
    "category": "family",
    "cmu_features": {
      "gender": 0.85,
      "age": 0.6,
      "royalty": -0.5,
      "ferocity": 0.1,
      "size": 0.2,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2801,
      0.4201,
      -0.3501,
      0.7001,
      0.14,
      0.07,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.14,
      -0.07,
      0.0,
      0.0,
      0.07,
      0.2801
    ],
    "pca_2d": [
      0.561,
      0.172
    ],
    "pca_3d": [
      0.561,
      0.172,
      0.033
    ],
    "description": "Male parent."
  },
  {
    "word": "mother",
    "category": "family",
    "cmu_features": {
      "gender": -0.85,
      "age": 0.6,
      "royalty": -0.5,
      "ferocity": 0.05,
      "size": 0.0,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2834,
      0.4251,
      -0.3542,
      0.7084,
      0.0,
      0.0354,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1417,
      -0.0708,
      0.0,
      0.0,
      0.0708,
      0.2834
    ],
    "pca_2d": [
      0.599,
      0.1
    ],
    "pca_3d": [
      0.599,
      0.1,
      -0.057
    ],
    "description": "Female parent."
  },
  {
    "word": "grandfather",
    "category": "family",
    "cmu_features": {
      "gender": 0.85,
      "age": 0.95,
      "royalty": -0.5,
      "ferocity": -0.1,
      "size": 0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2509,
      0.5958,
      -0.3136,
      0.6271,
      0.0627,
      -0.0627,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1254,
      -0.0627,
      0.0,
      0.0,
      0.0,
      0.2509
    ],
    "pca_2d": [
      0.529,
      0.15
    ],
    "pca_3d": [
      0.529,
      0.15,
      -0.053
    ],
    "description": "Father of one's father or mother."
  },
  {
    "word": "grandmother",
    "category": "family",
    "cmu_features": {
      "gender": -0.85,
      "age": 0.95,
      "royalty": -0.5,
      "ferocity": -0.15,
      "size": -0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2502,
      0.5943,
      -0.3128,
      0.6256,
      -0.0626,
      -0.0938,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1251,
      -0.0626,
      0.0,
      0.0,
      0.0,
      0.2502
    ],
    "pca_2d": [
      0.555,
      0.082
    ],
    "pca_3d": [
      0.555,
      0.082,
      -0.133
    ],
    "description": "Mother of one's father or mother."
  },
  {
    "word": "uncle",
    "category": "family",
    "cmu_features": {
      "gender": 0.85,
      "age": 0.55,
      "royalty": -0.55,
      "ferocity": 0.05,
      "size": 0.15,
      "animacy": 1.0
    },
    "dense_vector": [
      0.2848,
      0.3916,
      -0.3916,
      0.712,
      0.1068,
      0.0356,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1424,
      -0.0712,
      0.0,
      0.0,
      0.0712,
      0.2492
    ],
    "pca_2d": [
      0.586,
      0.11
    ],
    "pca_3d": [
      0.586,
      0.11,
      0.015
    ],
    "description": "Brother of one's parent."
  },
  {
    "word": "aunt",
    "category": "family",
    "cmu_features": {
      "gender": -0.85,
      "age": 0.55,
      "royalty": -0.55,
      "ferocity": 0.0,
      "size": -0.05,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.2864,
      0.3939,
      -0.3939,
      0.7161,
      -0.0358,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1432,
      -0.0716,
      0.0,
      0.0,
      0.0716,
      0.2506
    ],
    "pca_2d": [
      0.621,
      0.035
    ],
    "pca_3d": [
      0.621,
      0.035,
      -0.077
    ],
    "description": "Sister of one's parent."
  },
  {
    "word": "dog",
    "category": "animals",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.2,
      "royalty": -0.8,
      "ferocity": 0.3,
      "size": 0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0,
      0.1262,
      -0.505,
      0.6312,
      0.0631,
      0.1894,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2525,
      -0.3787,
      0.0,
      0.0631,
      -0.2525,
      0.1262
    ],
    "pca_2d": [
      0.668,
      -0.177
    ],
    "pca_3d": [
      0.668,
      -0.177,
      0.425
    ],
    "description": "Domesticated canine companion."
  },
  {
    "word": "puppy",
    "category": "animals",
    "cmu_features": {
      "gender": 0.0,
      "age": -0.8,
      "royalty": -0.8,
      "ferocity": -0.2,
      "size": -0.6,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0,
      -0.4332,
      -0.4332,
      0.5415,
      -0.3249,
      -0.1083,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2166,
      -0.3249,
      0.0,
      0.0542,
      -0.2166,
      0.1083
    ],
    "pca_2d": [
      0.551,
      -0.594
    ],
    "pca_3d": [
      0.551,
      -0.594,
      0.127
    ],
    "description": "Young juvenile dog."
  },
  {
    "word": "cat",
    "category": "animals",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.15,
      "royalty": -0.6,
      "ferocity": 0.2,
      "size": -0.3,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0,
      0.1004,
      -0.4016,
      0.6693,
      -0.2008,
      0.1339,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2677,
      -0.4016,
      0.0,
      0.0,
      -0.2677,
      0.1339
    ],
    "pca_2d": [
      0.736,
      -0.217
    ],
    "pca_3d": [
      0.736,
      -0.217,
      0.287
    ],
    "description": "Small domesticated carnivorous feline."
  },
  {
    "word": "kitten",
    "category": "animals",
    "cmu_features": {
      "gender": 0.0,
      "age": -0.85,
      "royalty": -0.6,
      "ferocity": -0.3,
      "size": -0.8,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0,
      -0.4522,
      -0.3192,
      0.5321,
      -0.4256,
      -0.1596,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2128,
      -0.3192,
      0.0,
      0.0,
      -0.2128,
      0.1064
    ],
    "pca_2d": [
      0.529,
      -0.578
    ],
    "pca_3d": [
      0.529,
      -0.578,
      0.033
    ],
    "description": "Young juvenile cat."
  },
  {
    "word": "lion",
    "category": "animals",
    "cmu_features": {
      "gender": 0.2,
      "age": 0.4,
      "royalty": 0.6,
      "ferocity": 0.95,
      "size": 0.7,
      "animacy": 1.0
    },
    "dense_vector": [
      0.052,
      0.2082,
      0.3122,
      0.5204,
      0.3643,
      0.4944,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2082,
      -0.3122,
      0.0,
      0.0,
      -0.1561,
      0.2082
    ],
    "pca_2d": [
      0.271,
      0.58
    ],
    "pca_3d": [
      0.271,
      0.58,
      0.474
    ],
    "description": "Large predatory feline; king of the jungle."
  },
  {
    "word": "tiger",
    "category": "animals",
    "cmu_features": {
      "gender": 0.1,
      "age": 0.4,
      "royalty": 0.5,
      "ferocity": 0.98,
      "size": 0.75,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0259,
      0.2075,
      0.2594,
      0.5188,
      0.3891,
      0.5084,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2075,
      -0.3113,
      0.0,
      0.0519,
      -0.1556,
      0.2075
    ],
    "pca_2d": [
      0.276,
      0.553
    ],
    "pca_3d": [
      0.276,
      0.553,
      0.508
    ],
    "description": "Apex striped big cat native to Asia."
  },
  {
    "word": "wolf",
    "category": "animals",
    "cmu_features": {
      "gender": 0.1,
      "age": 0.35,
      "royalty": 0.1,
      "ferocity": 0.85,
      "size": 0.4,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0297,
      0.2081,
      0.0595,
      0.5947,
      0.2379,
      0.5055,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2379,
      -0.3568,
      0.0,
      0.1189,
      -0.2379,
      0.1784
    ],
    "pca_2d": [
      0.458,
      0.366
    ],
    "pca_3d": [
      0.458,
      0.366,
      0.549
    ],
    "description": "Wild predatory pack-hunting canine."
  },
  {
    "word": "france",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.2,
      "ferocity": -0.2,
      "size": 0.8,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.1112,
      -0.3893,
      0.445,
      -0.1112,
      0.445,
      0.4728,
      -0.1112,
      0.0556,
      0.0556,
      -0.1112,
      0.0,
      0.1112,
      0.2225,
      0.3337
    ],
    "pca_2d": [
      -0.792,
      0.051
    ],
    "pca_3d": [
      -0.792,
      0.051,
      0.067
    ],
    "description": "Country in Western Europe."
  },
  {
    "word": "paris",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.4,
      "ferocity": -0.3,
      "size": 0.5,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.2465,
      -0.4314,
      0.3082,
      -0.1849,
      0.1233,
      0.5239,
      -0.1233,
      0.0616,
      0.1233,
      -0.0616,
      0.0,
      0.1233,
      0.3082,
      0.4314
    ],
    "pca_2d": [
      -0.849,
      0.074
    ],
    "pca_3d": [
      -0.849,
      0.074,
      -0.114
    ],
    "description": "Capital city of France."
  },
  {
    "word": "japan",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.2,
      "ferocity": -0.2,
      "size": 0.7,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.1064,
      -0.3724,
      0.3724,
      -0.1064,
      0.4256,
      -0.1064,
      0.4522,
      -0.1064,
      0.0532,
      0.266,
      0.0,
      0.2128,
      0.266,
      0.3192
    ],
    "pca_2d": [
      -0.772,
      0.067
    ],
    "pca_3d": [
      -0.772,
      0.067,
      -0.065
    ],
    "description": "Island country in East Asia."
  },
  {
    "word": "tokyo",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.4,
      "ferocity": -0.3,
      "size": 0.6,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.2208,
      -0.3864,
      0.3312,
      -0.1656,
      0.1104,
      -0.1104,
      0.4692,
      -0.1104,
      0.1104,
      0.3312,
      0.0,
      0.1656,
      0.3312,
      0.3864
    ],
    "pca_2d": [
      -0.807,
      0.122
    ],
    "pca_3d": [
      -0.807,
      0.122,
      -0.207
    ],
    "description": "Capital city of Japan."
  },
  {
    "word": "uk",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.5,
      "ferocity": -0.2,
      "size": 0.75,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.2614,
      -0.366,
      0.3922,
      -0.1046,
      0.4183,
      0.0784,
      -0.1046,
      0.4445,
      0.0523,
      0.0,
      0.0,
      0.2092,
      0.3137,
      0.3137
    ],
    "pca_2d": [
      -0.823,
      0.162
    ],
    "pca_3d": [
      -0.823,
      0.162,
      -0.03
    ],
    "description": "United Kingdom; island nation in northwestern Europe."
  },
  {
    "word": "london",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.6,
      "ferocity": -0.3,
      "size": 0.55,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.3377,
      -0.3939,
      0.3095,
      -0.1688,
      0.1126,
      0.0844,
      -0.1126,
      0.4784,
      0.0563,
      0.0563,
      0.0,
      0.1688,
      0.3939,
      0.3939
    ],
    "pca_2d": [
      -0.85,
      0.19
    ],
    "pca_3d": [
      -0.85,
      0.19,
      -0.161
    ],
    "description": "Capital city of the United Kingdom."
  },
  {
    "word": "germany",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.1,
      "ferocity": -0.2,
      "size": 0.78,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0577,
      -0.4041,
      0.4503,
      -0.1155,
      0.4618,
      0.3464,
      -0.0866,
      0.1155,
      0.0577,
      0.2309,
      0.0,
      0.0577,
      0.2886,
      0.3464
    ],
    "pca_2d": [
      -0.847,
      0.092
    ],
    "pca_3d": [
      -0.847,
      0.092,
      -0.071
    ],
    "description": "Country in Central Europe."
  },
  {
    "word": "berlin",
    "category": "geography",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.3,
      "ferocity": -0.3,
      "size": 0.52,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.1889,
      -0.4407,
      0.3274,
      -0.1889,
      0.1259,
      0.3777,
      -0.0944,
      0.1259,
      0.063,
      0.3148,
      0.0,
      0.063,
      0.3777,
      0.4407
    ],
    "pca_2d": [
      -0.896,
      0.137
    ],
    "pca_3d": [
      -0.896,
      0.137,
      -0.235
    ],
    "description": "Capital city of Germany."
  },
  {
    "word": "apple",
    "category": "food",
    "cmu_features": {
      "gender": 0.0,
      "age": -0.2,
      "royalty": -0.6,
      "ferocity": -0.8,
      "size": -0.6,
      "animacy": -0.3
    },
    "dense_vector": [
      0.0,
      -0.1275,
      -0.3824,
      -0.1912,
      -0.3824,
      -0.5098,
      0.0,
      0.0,
      0.0,
      0.0,
      0.6054,
      -0.1275,
      0.0,
      0.0637,
      -0.0637,
      0.0637
    ],
    "pca_2d": [
      -0.233,
      -0.916
    ],
    "pca_3d": [
      -0.233,
      -0.916,
      -0.436
    ],
    "description": "Round edible pomaceous fruit."
  },
  {
    "word": "orange",
    "category": "food",
    "cmu_features": {
      "gender": 0.0,
      "age": -0.2,
      "royalty": -0.6,
      "ferocity": -0.8,
      "size": -0.55,
      "animacy": -0.3
    },
    "dense_vector": [
      0.0,
      -0.1305,
      -0.3915,
      -0.1957,
      -0.3589,
      -0.522,
      0.0,
      0.0,
      0.0,
      0.0,
      0.6003,
      -0.1305,
      0.0,
      0.0652,
      -0.0652,
      0.0652
    ],
    "pca_2d": [
      -0.24,
      -0.919
    ],
    "pca_3d": [
      -0.24,
      -0.919,
      -0.429
    ],
    "description": "Citrus fruit with a sweet and sour taste."
  },
  {
    "word": "banana",
    "category": "food",
    "cmu_features": {
      "gender": 0.0,
      "age": -0.2,
      "royalty": -0.7,
      "ferocity": -0.85,
      "size": -0.5,
      "animacy": -0.3
    },
    "dense_vector": [
      0.0,
      -0.1248,
      -0.4368,
      -0.1872,
      -0.312,
      -0.5304,
      0.0,
      0.0,
      0.0,
      0.0,
      0.5865,
      -0.156,
      0.0,
      0.0624,
      -0.0624,
      0.0624
    ],
    "pca_2d": [
      -0.226,
      -0.93
    ],
    "pca_3d": [
      -0.226,
      -0.93,
      -0.399
    ],
    "description": "Elongated curved edible fruit rich in potassium."
  },
  {
    "word": "fast",
    "category": "adjectives",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.0,
      "ferocity": 0.4,
      "size": 0.0,
      "animacy": -0.8
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0,
      -0.6082,
      0.0,
      0.3041,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2281,
      0.1521,
      -0.6082,
      0.0,
      0.0,
      0.3041
    ],
    "pca_2d": [
      -0.689,
      -0.102
    ],
    "pca_3d": [
      -0.689,
      -0.102,
      0.433
    ],
    "description": "Moving or capable of moving at high speed."
  },
  {
    "word": "faster",
    "category": "adjectives",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.0,
      "ferocity": 0.5,
      "size": 0.0,
      "animacy": -0.8
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0,
      -0.7365,
      0.0,
      0.4603,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2762,
      0.1841,
      0.0,
      0.0,
      0.0,
      0.3682
    ],
    "pca_2d": [
      -0.771,
      -0.016
    ],
    "pca_3d": [
      -0.771,
      -0.016,
      0.455
    ],
    "description": "Comparative of fast: speedier."
  },
  {
    "word": "tall",
    "category": "adjectives",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.0,
      "ferocity": 0.0,
      "size": 0.6,
      "animacy": -0.8
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0,
      -0.593,
      0.4447,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2224,
      0.0,
      -0.593,
      0.0,
      0.0,
      0.2224
    ],
    "pca_2d": [
      -0.776,
      -0.083
    ],
    "pca_3d": [
      -0.776,
      -0.083,
      0.46
    ],
    "description": "Of great or more than average height."
  },
  {
    "word": "taller",
    "category": "adjectives",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.0,
      "ferocity": 0.0,
      "size": 0.75,
      "animacy": -0.8
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0,
      -0.6804,
      0.6379,
      0.0,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2551,
      0.0,
      0.0,
      0.0,
      0.0,
      0.2551
    ],
    "pca_2d": [
      -0.875,
      0.016
    ],
    "pca_3d": [
      -0.875,
      0.016,
      0.46
    ],
    "description": "Comparative of tall: having greater height."
  },
  {
    "word": "walk",
    "category": "verbs",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": -0.5,
      "ferocity": -0.4,
      "size": 0.0,
      "animacy": 0.6
    },
    "dense_vector": [
      0.0,
      0.0,
      -0.3978,
      0.4773,
      0.0,
      -0.3182,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2387,
      -0.1591,
      -0.6364,
      0.0,
      0.0,
      0.1591
    ],
    "pca_2d": [
      0.361,
      -0.335
    ],
    "pca_3d": [
      0.361,
      -0.335,
      0.048
    ],
    "description": "Move on foot at a regular pace."
  },
  {
    "word": "walking",
    "category": "verbs",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": -0.5,
      "ferocity": -0.4,
      "size": 0.0,
      "animacy": 0.6
    },
    "dense_vector": [
      0.0,
      0.0,
      -0.5157,
      0.6189,
      0.0,
      -0.4126,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.3094,
      -0.2063,
      0.0,
      0.0,
      0.0,
      0.2063
    ],
    "pca_2d": [
      0.541,
      -0.338
    ],
    "pca_3d": [
      0.541,
      -0.338,
      -0.076
    ],
    "description": "Present participle of walk."
  },
  {
    "word": "swim",
    "category": "verbs",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": -0.5,
      "ferocity": -0.2,
      "size": 0.0,
      "animacy": 0.6
    },
    "dense_vector": [
      0.0,
      0.0,
      -0.3384,
      0.4061,
      0.0,
      -0.1354,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2031,
      -0.1354,
      -0.5415,
      0.5754,
      0.0,
      0.1354
    ],
    "pca_2d": [
      0.264,
      -0.323
    ],
    "pca_3d": [
      0.264,
      -0.323,
      0.226
    ],
    "description": "Propel the body through water."
  },
  {
    "word": "swimming",
    "category": "verbs",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": -0.5,
      "ferocity": -0.2,
      "size": 0.0,
      "animacy": 0.6
    },
    "dense_vector": [
      0.0,
      0.0,
      -0.4026,
      0.4831,
      0.0,
      -0.161,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.2416,
      -0.161,
      0.0,
      0.6844,
      0.0,
      0.161
    ],
    "pca_2d": [
      0.364,
      -0.316
    ],
    "pca_3d": [
      0.364,
      -0.316,
      0.162
    ],
    "description": "Present participle of swim."
  },
  {
    "word": "doctor",
    "category": "professions",
    "cmu_features": {
      "gender": 0.1,
      "age": 0.5,
      "royalty": 0.4,
      "ferocity": -0.3,
      "size": 0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0358,
      0.3578,
      0.2863,
      0.7157,
      0.0716,
      -0.2147,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.0716,
      0.2147,
      0.0,
      0.0,
      0.2147,
      0.3578
    ],
    "pca_2d": [
      0.297,
      0.504
    ],
    "pca_3d": [
      0.297,
      0.504,
      -0.463
    ],
    "description": "Qualified practitioner of medicine."
  },
  {
    "word": "nurse",
    "category": "professions",
    "cmu_features": {
      "gender": -0.1,
      "age": 0.45,
      "royalty": 0.2,
      "ferocity": -0.5,
      "size": 0.0,
      "animacy": 1.0
    },
    "dense_vector": [
      -0.0369,
      0.3322,
      0.1476,
      0.7382,
      0.0,
      -0.3691,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.0738,
      0.1476,
      0.0,
      0.0,
      0.1476,
      0.3691
    ],
    "pca_2d": [
      0.379,
      0.317
    ],
    "pca_3d": [
      0.379,
      0.317,
      -0.51
    ],
    "description": "Person trained to care for the sick or infirm."
  },
  {
    "word": "engineer",
    "category": "professions",
    "cmu_features": {
      "gender": 0.1,
      "age": 0.45,
      "royalty": 0.3,
      "ferocity": -0.2,
      "size": 0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0327,
      0.2945,
      0.1963,
      0.6544,
      0.0654,
      -0.1309,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.0654,
      0.5235,
      0.0,
      0.0,
      0.1963,
      0.3272
    ],
    "pca_2d": [
      0.229,
      0.472
    ],
    "pca_3d": [
      0.229,
      0.472,
      -0.478
    ],
    "description": "Person who designs, builds, or maintains engines or machines."
  },
  {
    "word": "scientist",
    "category": "professions",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.5,
      "royalty": 0.4,
      "ferocity": -0.2,
      "size": 0.1,
      "animacy": 1.0
    },
    "dense_vector": [
      0.0,
      0.3221,
      0.2577,
      0.6442,
      0.0644,
      -0.1288,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.0644,
      0.4509,
      0.0,
      0.0,
      0.1932,
      0.3865
    ],
    "pca_2d": [
      0.214,
      0.517
    ],
    "pca_3d": [
      0.214,
      0.517,
      -0.472
    ],
    "description": "Person who studies natural or physical sciences."
  },
  {
    "word": "bank",
    "category": "polysemy",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.1,
      "ferocity": -0.4,
      "size": 0.4,
      "animacy": -0.7
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0835,
      -0.5843,
      0.3339,
      -0.3339,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.0835,
      -0.0835,
      0.0,
      0.3757,
      0.4591,
      0.2504
    ],
    "pca_2d": [
      -0.893,
      -0.125
    ],
    "pca_3d": [
      -0.893,
      -0.125,
      -0.007
    ],
    "description": "Static Word2Vec vector conflating financial institution and river edge."
  },
  {
    "word": "river",
    "category": "nature",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.0,
      "ferocity": 0.2,
      "size": 0.9,
      "animacy": -0.4
    },
    "dense_vector": [
      0.0,
      0.0,
      0.0,
      -0.2608,
      0.5868,
      0.1304,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1956,
      -0.326,
      0.0,
      0.6194,
      -0.1956,
      0.0652
    ],
    "pca_2d": [
      -0.433,
      -0.057
    ],
    "pca_3d": [
      -0.433,
      -0.057,
      0.718
    ],
    "description": "Natural flowing watercourse."
  },
  {
    "word": "money",
    "category": "finance",
    "cmu_features": {
      "gender": 0.0,
      "age": 0.0,
      "royalty": 0.4,
      "ferocity": -0.5,
      "size": -0.2,
      "animacy": -0.9
    },
    "dense_vector": [
      0.0,
      0.0,
      0.2549,
      -0.5735,
      -0.1275,
      -0.3186,
      0.0,
      0.0,
      0.0,
      0.0,
      -0.1275,
      -0.0637,
      0.0,
      -0.1912,
      0.6054,
      0.2549
    ],
    "pca_2d": [
      -0.82,
      -0.07
    ],
    "pca_3d": [
      -0.82,
      -0.07,
      -0.329
    ],
    "description": "Current medium of exchange in the form of banknotes and coins."
  }
];

// App State
const state = {
  words: EMBEDDED_DATA,
  byWord: {},

  // Module 1: CMU 3D Semantic Feature Space
  cmuAxisX: "gender",
  cmuAxisY: "age",
  cmuAxisZ: "royalty",
  cmuViewMode: "3d", // "3d" or "2d"
  cmuRotX: 0.35,     // pitch
  cmuRotY: 0.55,     // yaw
  cmuZoom: 1.0,
  cmuAutoRotate: false,
  cmuPreset: "royalty_family",
  cmuSelectedA: "man",
  cmuSelectedB: "king",
  cmuArrowFrom: "man",
  cmuArrowTo: "king",
  cmuTranslatedFrom: "woman",
  cmuShowArrow: false,
  cmuShowTranslation: false,

  // Module 2: Heatmaps
  heatWordA: "king",
  heatWordB: "queen",

  // Module 3: Analogies
  analogyA: "king",
  analogyB: "man",
  analogyC: "woman",

  // Module 4: Contextual Shift
  ctxWeight: 0.5,

  // Module 5: 3D PCA Semantic Universe
  universeViewMode: "3d", // "3d" or "2d"
  universeRotX: 0.32,
  universeRotY: 0.65,
  universeZoom: 1.0,
  universeAutoRotate: false,
  universeFilter: "all",
  universeSearch: "",
  universeSelectedWord: null,
  universeHoveredWord: null
};

// Index words by lowercase key
state.words.forEach(w => {
  state.byWord[w.word.toLowerCase()] = w;
});

// Color mapping for semantic categories
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

// ==========================================================================
// 3D Perspective Projection & Camera Utilities
// ==========================================================================

class Camera3D {
  constructor({ rotX = 0.35, rotY = 0.55, zoom = 1.0, distance = 3.2, fov = 460 } = {}) {
    this.rotX = rotX; // pitch (around X)
    this.rotY = rotY; // yaw (around Y)
    this.zoom = zoom;
    this.distance = distance;
    this.fov = fov;
  }

  project(x, y, z, centerX, centerY) {
    // 1. Rotate around Y-axis (yaw)
    const cosY = Math.cos(this.rotY);
    const sinY = Math.sin(this.rotY);
    const x1 = x * cosY + z * sinY;
    const z1 = -x * sinY + z * cosY;

    // 2. Rotate around X-axis (pitch)
    const cosX = Math.cos(this.rotX);
    const sinX = Math.sin(this.rotX);
    const y1 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;

    // 3. Perspective division
    const zProj = z2 + this.distance;
    const depthScale = Math.max(0.12, (this.fov / (zProj * 100)) * this.zoom);

    // Canvas Y is inverted relative to standard Cartesian
    const px = centerX + x1 * depthScale * 140;
    const py = centerY - y1 * depthScale * 140;

    return {
      px,
      py,
      depth: z2,
      scale: depthScale,
      visible: zProj > 0.1
    };
  }
}

// ==========================================================================
// Vector & Mathematical Helpers
// ==========================================================================

function dotProduct(vecA, vecB) {
  return vecA.reduce((sum, val, i) => sum + val * (vecB[i] || 0), 0);
}

function vectorNorm(vec) {
  return Math.hypot(...vec);
}

function cosineSimilarity(vecA, vecB) {
  const normA = vectorNorm(vecA);
  const normB = vectorNorm(vecB);
  if (normA === 0 || normB === 0) return 0;
  return dotProduct(vecA, vecB) / (normA * normB);
}

function euclideanDistance(vecA, vecB) {
  let sum = 0;
  for (let i = 0; i < vecA.length; i++) {
    const diff = vecA[i] - (vecB[i] || 0);
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

function vectorAdd(vecA, vecB) {
  return vecA.map((val, i) => val + (vecB[i] || 0));
}

function vectorSubtract(vecA, vecB) {
  return vecA.map((val, i) => val - (vecB[i] || 0));
}

// ==========================================================================
// Module 1: CMU Semantic Feature Space (3D & 2D)
// ==========================================================================

function getCMUPresetWords() {
  const p = state.cmuPreset;
  if (p === "royalty_family") {
    return state.words.filter(w => ["king", "queen", "prince", "princess", "man", "woman", "boy", "girl"].includes(w.word));
  }
  if (p === "generations") {
    return state.words.filter(w => ["grandfather", "grandmother", "father", "mother", "boy", "girl", "uncle", "aunt"].includes(w.word));
  }
  if (p === "animals") {
    return state.words.filter(w => ["dog", "puppy", "cat", "kitten", "lion", "tiger", "wolf"].includes(w.word));
  }
  if (p === "geography") {
    return state.words.filter(w => ["france", "paris", "japan", "tokyo", "uk", "london", "germany", "berlin"].includes(w.word));
  }
  return state.words;
}

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

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let hasMoved = false;

  const onPointerDown = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    hasMoved = false;
    state.cmuAutoRotate = false;
    document.getElementById("btn-cmu-autorotate")?.classList.remove("active");
  };

  const onPointerMove = (clientX, clientY) => {
    const cRect = canvas.getBoundingClientRect();
    const mx = clientX - cRect.left;
    const my = clientY - cRect.top;

    if (isDragging && state.cmuViewMode === "3d") {
      const dx = clientX - startX;
      const dy = clientY - startY;
      if (Math.hypot(dx, dy) > 3) hasMoved = true;

      state.cmuRotY += dx * 0.008;
      state.cmuRotX += dy * 0.008;
      // Clamp pitch to avoid gimbal flip
      state.cmuRotX = Math.max(-1.3, Math.min(1.3, state.cmuRotX));

      startX = clientX;
      startY = clientY;

      drawCMUSpace(ctx, cRect.width, cRect.height);
      return;
    }

    // Hover detection
    if (!isDragging) {
      const words = getCMUPresetWords();
      let hovered = null;
      let minDist = 18;

      words.forEach(w => {
        if (!w._cmuProj) return;
        const dist = Math.hypot(mx - w._cmuProj.px, my - w._cmuProj.py);
        if (dist < minDist) {
          minDist = dist;
          hovered = w;
        }
      });

      const hoverCard = document.getElementById("cmu-hover-card");
      if (hovered && hoverCard) {
        const fx = state.cmuAxisX;
        const fy = state.cmuAxisY;
        const fz = state.cmuAxisZ;
        hoverCard.style.display = "block";
        hoverCard.style.left = `${hovered._cmuProj.px}px`;
        hoverCard.style.top = `${hovered._cmuProj.py}px`;
        hoverCard.innerHTML = `
          <strong>${hovered.word.toUpperCase()}</strong> <span style="color:#94a3b8">(${hovered.category})</span><br>
          <span style="color:#38bdf8">${fx}: ${hovered.cmu_features[fx].toFixed(2)}</span> | 
          <span style="color:#f472b6">${fy}: ${hovered.cmu_features[fy].toFixed(2)}</span> | 
          <span style="color:#34d399">${fz}: ${hovered.cmu_features[fz].toFixed(2)}</span>
        `;
        canvas.style.cursor = "pointer";
      } else if (hoverCard) {
        hoverCard.style.display = "none";
        canvas.style.cursor = isDragging ? "grabbing" : "grab";
      }
    }
  };

  const onPointerUp = (clientX, clientY) => {
    if (!hasMoved) {
      // Treat as click to select words
      const cRect = canvas.getBoundingClientRect();
      const mx = clientX - cRect.left;
      const my = clientY - cRect.top;

      let closest = null;
      let minDist = 24;

      const words = getCMUPresetWords();
      words.forEach(w => {
        if (!w._cmuProj) return;
        const dist = Math.hypot(mx - w._cmuProj.px, my - w._cmuProj.py);
        if (dist < minDist) {
          minDist = dist;
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
        drawCMUSpace(ctx, cRect.width, cRect.height);
      }
    }
    isDragging = false;
  };

  // Mouse listeners
  canvas.addEventListener("mousedown", (e) => onPointerDown(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => {
    if (isDragging) onPointerMove(e.clientX, e.clientY);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) onPointerMove(e.clientX, e.clientY);
  });
  window.addEventListener("mouseup", (e) => {
    if (isDragging) onPointerUp(e.clientX, e.clientY);
  });

  // Touch listeners for mobile rotation
  canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  canvas.addEventListener("touchend", (e) => {
    if (e.changedTouches.length === 1) {
      onPointerUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  });

  // Wheel zoom
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    state.cmuZoom = Math.max(0.5, Math.min(2.5, state.cmuZoom + zoomDelta));
    const cRect = canvas.getBoundingClientRect();
    drawCMUSpace(ctx, cRect.width, cRect.height);
  }, { passive: false });

  // Resize listener
  window.addEventListener("resize", () => {
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    drawCMUSpace(ctx, r.width, r.height);
  });
}

function drawCMUSpace(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const featX = state.cmuAxisX;
  const featY = state.cmuAxisY;
  const featZ = state.cmuAxisZ;
  const words = getCMUPresetWords();

  if (state.cmuViewMode === "2d") {
    drawCMUSpace2D(ctx, width, height, words, featX, featY);
    return;
  }

  // -------------------------------------------------------------------------
  // 3D Rotatable Plot Rendering
  // -------------------------------------------------------------------------
  const centerX = width / 2;
  const centerY = height / 2;
  const camera = new Camera3D({
    rotX: state.cmuRotX,
    rotY: state.cmuRotY,
    zoom: state.cmuZoom,
    distance: 3.3,
    fov: 460
  });

  // 1. Draw Ground Grid at Y = -1
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  const gridSteps = [-1, -0.5, 0, 0.5, 1];

  gridSteps.forEach(gx => {
    const pStart = camera.project(gx, -1, -1, centerX, centerY);
    const pEnd = camera.project(gx, -1, 1, centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(pStart.px, pStart.py);
    ctx.lineTo(pEnd.px, pEnd.py);
    ctx.stroke();
  });

  gridSteps.forEach(gz => {
    const pStart = camera.project(-1, -1, gz, centerX, centerY);
    const pEnd = camera.project(1, -1, gz, centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(pStart.px, pStart.py);
    ctx.lineTo(pEnd.px, pEnd.py);
    ctx.stroke();
  });

  // 2. Bounding Box [-1, 1]^3 Wireframe Edges
  const corners = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1]
  ];
  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];

  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  edges.forEach(([i, j]) => {
    const c1 = corners[i];
    const c2 = corners[j];
    const p1 = camera.project(c1[0], c1[1], c1[2], centerX, centerY);
    const p2 = camera.project(c2[0], c2[1], c2[2], centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(p1.px, p1.py);
    ctx.lineTo(p2.px, p2.py);
    ctx.stroke();
  });

  // 3. Principal Axes through Origin (0, 0, 0)
  const o = camera.project(0, 0, 0, centerX, centerY);

  // X Axis (Cyan)
  const xNeg = camera.project(-1, 0, 0, centerX, centerY);
  const xPos = camera.project(1, 0, 0, centerX, centerY);
  ctx.strokeStyle = "rgba(6, 182, 212, 0.8)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(xNeg.px, xNeg.py);
  ctx.lineTo(xPos.px, xPos.py);
  ctx.stroke();

  // Y Axis (Pink)
  const yNeg = camera.project(0, -1, 0, centerX, centerY);
  const yPos = camera.project(0, 1, 0, centerX, centerY);
  ctx.strokeStyle = "rgba(244, 114, 182, 0.8)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(yNeg.px, yNeg.py);
  ctx.lineTo(yPos.px, yPos.py);
  ctx.stroke();

  // Z Axis (Emerald)
  const zNeg = camera.project(0, 0, -1, centerX, centerY);
  const zPos = camera.project(0, 0, 1, centerX, centerY);
  ctx.strokeStyle = "rgba(52, 211, 153, 0.8)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(zNeg.px, zNeg.py);
  ctx.lineTo(zPos.px, zPos.py);
  ctx.stroke();

  // Axis Labels in 3D Perspective
  ctx.font = "600 11px Inter, sans-serif";
  ctx.textAlign = "center";

  ctx.fillStyle = "#38bdf8";
  ctx.fillText(`+ ${featX.toUpperCase()}`, xPos.px + 12, xPos.py - 4);
  ctx.fillText(`- ${featX.toUpperCase()}`, xNeg.px - 12, xNeg.py + 12);

  ctx.fillStyle = "#f472b6";
  ctx.fillText(`+ ${featY.toUpperCase()}`, yPos.px, yPos.py - 10);
  ctx.fillText(`- ${featY.toUpperCase()}`, yNeg.px, yNeg.py + 14);

  ctx.fillStyle = "#34d399";
  ctx.fillText(`+ ${featZ.toUpperCase()}`, zPos.px + 10, zPos.py + 10);
  ctx.fillText(`- ${featZ.toUpperCase()}`, zNeg.px - 10, zNeg.py - 6);

  // 4. Analogy Vectors in 3D
  if (state.cmuShowArrow) {
    const fromW = state.byWord[state.cmuArrowFrom];
    const toW = state.byWord[state.cmuArrowTo];

    if (fromW && toW) {
      const fx = fromW.cmu_features[featX];
      const fy = fromW.cmu_features[featY];
      const fz = fromW.cmu_features[featZ];
      const tx = toW.cmu_features[featX];
      const ty = toW.cmu_features[featY];
      const tz = toW.cmu_features[featZ];

      const pf = camera.project(fx, fy, fz, centerX, centerY);
      const pt = camera.project(tx, ty, tz, centerX, centerY);
      drawArrow(ctx, pf.px, pf.py, pt.px, pt.py, "#ef4444", 3);

      if (state.cmuShowTranslation) {
        const transW = state.byWord[state.cmuTranslatedFrom];
        if (transW) {
          const sx = transW.cmu_features[featX];
          const sy = transW.cmu_features[featY];
          const sz = transW.cmu_features[featZ];

          const ex = sx + (tx - fx);
          const ey = sy + (ty - fy);
          const ez = sz + (tz - fz);

          const ps = camera.project(sx, sy, sz, centerX, centerY);
          const pe = camera.project(ex, ey, ez, centerX, centerY);
          drawArrow(ctx, ps.px, ps.py, pe.px, pe.py, "#10b981", 3);
        }
      }
    }
  }

  // 5. 3D Euclidean Distance Line
  const itemA = state.byWord[state.cmuSelectedA];
  const itemB = state.byWord[state.cmuSelectedB];

  if (itemA && itemB && itemA !== itemB) {
    const ax = itemA.cmu_features[featX];
    const ay = itemA.cmu_features[featY];
    const az = itemA.cmu_features[featZ];

    const bx = itemB.cmu_features[featX];
    const by = itemB.cmu_features[featY];
    const bz = itemB.cmu_features[featZ];

    const pa = camera.project(ax, ay, az, centerX, centerY);
    const pb = camera.project(bx, by, bz, centerX, centerY);

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(pa.px, pa.py);
    ctx.lineTo(pb.px, pb.py);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3D Midpoint Badge
    const mid3 = camera.project((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2, centerX, centerY);
    const dist3D = Math.hypot(bx - ax, by - ay, bz - az).toFixed(2);

    ctx.fillStyle = "rgba(245, 158, 11, 0.95)";
    ctx.fillRect(mid3.px - 32, mid3.py - 11, 64, 22);
    ctx.fillStyle = "#000";
    ctx.font = "700 11px JetBrains Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`d3D=${dist3D}`, mid3.px, mid3.py + 4);
  }

  // 6. Project & Sort Points by Depth
  const projectedWords = words.map(w => {
    const vx = w.cmu_features[featX];
    const vy = w.cmu_features[featY];
    const vz = w.cmu_features[featZ];
    const proj = camera.project(vx, vy, vz, centerX, centerY);
    const floorProj = camera.project(vx, -1, vz, centerX, centerY);
    w._cmuProj = proj;
    w._cmuFloor = floorProj;
    return w;
  });

  // Painter's algorithm: sort from farthest depth to nearest
  projectedWords.sort((a, b) => a._cmuProj.depth - b._cmuProj.depth);

  // 7. Draw Drop Shadows & Points
  projectedWords.forEach(w => {
    const { px, py, depth, scale } = w._cmuProj;
    const floor = w._cmuFloor;
    const isSelected = (w.word === state.cmuSelectedA || w.word === state.cmuSelectedB);

    // Drop line down to ground plane
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(floor.px, floor.py);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ground shadow circle
    ctx.beginPath();
    ctx.ellipse(floor.px, floor.py, 5 * scale, 2.5 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fill();

    // Glowing Halo
    const ptRadius = (isSelected ? 7 : 4.5) * scale;
    ctx.beginPath();
    ctx.arc(px, py, ptRadius * 2, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.4)" : "rgba(99, 102, 241, 0.22)";
    ctx.fill();

    // Solid Sphere Core
    ctx.beginPath();
    ctx.arc(px, py, ptRadius, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "#fbbf24" : (CATEGORY_COLORS[w.category] || "#818cf8");
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Word Label with depth scaling
    const fontSize = Math.max(9, Math.min(14, Math.round(11 * scale)));
    ctx.font = isSelected ? `700 ${fontSize + 1}px Inter, sans-serif` : `500 ${fontSize}px Inter, sans-serif`;

    // Text shadow background
    ctx.fillStyle = "rgba(10, 15, 28, 0.75)";
    const textWidth = ctx.measureText(w.word).width;
    ctx.fillRect(px - textWidth / 2 - 3, py - ptRadius - fontSize - 2, textWidth + 6, fontSize + 4);

    ctx.fillStyle = isSelected ? "#fff" : "#cbd5e1";
    ctx.textAlign = "center";
    ctx.fillText(w.word, px, py - ptRadius - 4);
  });
}

function drawCMUSpace2D(ctx, width, height, words, featX, featY) {
  const padLeft = 60;
  const padRight = 60;
  const padTop = 50;
  const padBottom = 50;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  // Grid
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

  // Axes at 0,0
  const originX = padLeft + plotW / 2;
  const originY = padTop + plotH / 2;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padLeft, originY);
  ctx.lineTo(width - padRight, originY);
  ctx.stroke();

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

  // 2D Distance
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

    const midX = (ax + bx) / 2;
    const midY = (ay + by) / 2;
    const dist2D = Math.hypot(itemA.cmu_features[featX] - itemB.cmu_features[featX], itemA.cmu_features[featY] - itemB.cmu_features[featY]).toFixed(2);
    ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
    ctx.fillRect(midX - 28, midY - 12, 56, 20);
    ctx.fillStyle = "#000";
    ctx.font = "700 11px JetBrains Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillText(`d=${dist2D}`, midX, midY + 2);
  }

  // 2D Points
  words.forEach(w => {
    const vx = w.cmu_features[featX];
    const vy = w.cmu_features[featY];
    const px = ((vx + 1) / 2) * plotW + padLeft;
    const py = (1 - (vy + 1) / 2) * plotH + padTop;
    w._cmuProj = { px, py, depth: 0, scale: 1 };

    const isSelected = (w.word === state.cmuSelectedA || w.word === state.cmuSelectedB);

    ctx.beginPath();
    ctx.arc(px, py, isSelected ? 12 : 7, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "rgba(245, 158, 11, 0.4)" : "rgba(99, 102, 241, 0.25)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, isSelected ? 7 : 4.5, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "#fbbf24" : (CATEGORY_COLORS[w.category] || "#818cf8");
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

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
  const featZ = state.cmuAxisZ;

  // Update table headers
  const thX = document.getElementById("th-x-label");
  const thY = document.getElementById("th-y-label");
  const thZ = document.getElementById("th-z-label");
  if (thX) thX.textContent = `X (${featX})`;
  if (thY) thY.textContent = `Y (${featY})`;
  if (thZ) thZ.textContent = `Z (${featZ})`;

  words.forEach(w => {
    const tr = document.createElement("tr");
    if (w.word === state.cmuSelectedA || w.word === state.cmuSelectedB) {
      tr.className = "selected";
    }

    tr.innerHTML = `
      <td><strong>${w.word}</strong></td>
      <td><span class="match-category" style="color: ${CATEGORY_COLORS[w.category] || '#94a3b8'}">${w.category}</span></td>
      <td style="color:#38bdf8">${w.cmu_features[featX].toFixed(2)}</td>
      <td style="color:#f472b6">${w.cmu_features[featY].toFixed(2)}</td>
      <td style="color:#34d399">${w.cmu_features[featZ].toFixed(2)}</td>
    `;

    tr.addEventListener("click", () => {
      if (state.cmuSelectedA && state.cmuSelectedA !== w.word) {
        state.cmuSelectedB = w.word;
      } else {
        state.cmuSelectedA = w.word;
      }
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
    const dz = itemA.cmu_features[featZ] - itemB.cmu_features[featZ];
    const dist3D = Math.hypot(dx, dy, dz).toFixed(3);
    distInfo.innerHTML = `3D Distance between <strong>${itemA.word}</strong> &amp; <strong>${itemB.word}</strong> = <code>${dist3D}</code> across [${featX}, ${featY}, ${featZ}]`;
  }
}

// ==========================================================================
// Module 2: The Illustrated Vector Heatmap & Cosine Math (Jay Alammar)
// ==========================================================================

function renderHeatmapModule() {
  const itemA = state.byWord[state.heatWordA];
  const itemB = state.byWord[state.heatWordB];
  if (!itemA || !itemB) return;

  const vecA = itemA.dense_vector;
  const vecB = itemB.dense_vector;

  // Render heatmaps
  renderVectorGrid("heatmap-vector-a", vecA);
  renderVectorGrid("heatmap-vector-b", vecB);

  // Cosine math calculations
  const dot = dotProduct(vecA, vecB);
  const normA = vectorNorm(vecA);
  const normB = vectorNorm(vecB);
  const cosSim = normA && normB ? dot / (normA * normB) : 0;
  const clippedCos = Math.max(-1, Math.min(1, cosSim));
  const angleDeg = Math.acos(clippedCos) * (180 / Math.PI);

  document.getElementById("heat-dot-product").textContent = dot.toFixed(4);
  document.getElementById("heat-norm-a").textContent = normA.toFixed(4);
  document.getElementById("heat-norm-b").textContent = normB.toFixed(4);
  document.getElementById("heat-cosine-score").textContent = cosSim.toFixed(4);
  document.getElementById("heat-angle-deg").textContent = `${angleDeg.toFixed(1)}°`;

  // Draw angle gauge on canvas
  drawAngleGauge(angleDeg, cosSim);
}

function renderVectorGrid(containerId, vector) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  vector.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "vector-cell";
    const bg = getDivergingColor(val);
    cell.style.backgroundColor = bg;
    cell.title = `Dim ${idx + 1}: ${val.toFixed(3)}`;
    cell.textContent = val.toFixed(2);
    container.appendChild(cell);
  });
}

function getDivergingColor(val) {
  // Diverging color scale: -1.0 (blue) -> 0.0 (dark gray) -> +1.0 (magenta/red)
  const norm = Math.max(-1, Math.min(1, val));
  if (norm < 0) {
    const intensity = Math.round(-norm * 200 + 40);
    return `rgb(30, 60, ${intensity})`;
  } else {
    const intensity = Math.round(norm * 210 + 35);
    return `rgb(${intensity}, 25, ${Math.round(intensity * 0.7)})`;
  }
}

function drawAngleGauge(angleDeg, cosSim) {
  const canvas = document.getElementById("angle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width / dpr;
  const h = canvas.height / dpr;
  ctx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(cx, cy) - 20;

  // Background circle
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Vector A (Base horizontal line)
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + radius, cy);
  ctx.stroke();

  // Vector B (Rotated by angle)
  const rad = -angleDeg * (Math.PI / 180);
  ctx.strokeStyle = "#f472b6";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + radius * Math.cos(rad), cy + radius * Math.sin(rad));
  ctx.stroke();

  // Angle arc
  ctx.strokeStyle = "rgba(245, 158, 11, 0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.45, rad, 0, false);
  ctx.stroke();
}

// ==========================================================================
// Module 3: Vector Arithmetic & Analogy Laboratory
// ==========================================================================

function solveCurrentAnalogy() {
  const itemA = state.byWord[state.analogyA];
  const itemB = state.byWord[state.analogyB];
  const itemC = state.byWord[state.analogyC];
  if (!itemA || !itemB || !itemC) return;

  // Vector equation: Target = A - B + C
  const targetVec = vectorAdd(vectorSubtract(itemA.dense_vector, itemB.dense_vector), itemC.dense_vector);

  // Compute cosine similarity to all vocabulary words
  const exclude = new Set([itemA.word, itemB.word, itemC.word]);
  const scores = state.words
    .filter(w => !exclude.has(w.word))
    .map(w => ({
      word: w.word,
      category: w.category,
      score: cosineSimilarity(targetVec, w.dense_vector)
    }))
    .sort((a, b) => b.score - a.score);

  const topMatches = scores.slice(0, 5);

  // Render top matches table
  const resultsContainer = document.getElementById("analogy-results-list");
  if (!resultsContainer) return;
  resultsContainer.innerHTML = "";

  topMatches.forEach((match, rank) => {
    const row = document.createElement("div");
    row.className = `match-row ${rank === 0 ? "best-match" : ""}`;
    const pct = Math.max(0, Math.min(100, (match.score * 100))).toFixed(1);
    row.innerHTML = `
      <div class="match-rank">#${rank + 1}</div>
      <div class="match-name">
        <strong>${match.word}</strong>
        <span class="match-category" style="color: ${CATEGORY_COLORS[match.category] || '#38bdf8'}">${match.category}</span>
      </div>
      <div class="match-bar-wrap">
        <div class="match-bar" style="width: ${pct}%;"></div>
      </div>
      <div class="match-score">${match.score.toFixed(4)}</div>
    `;
    resultsContainer.appendChild(row);
  });
}

// ==========================================================================
// Module 4: Contextual Shift (River Bank vs Money Bank)
// ==========================================================================

function updateContextualShift() {
  const canvas = document.getElementById("contextual-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  const sliderVal = (state.ctxWeight - 0.5) * 2; // -1 (river) to +1 (finance)

  const leftX = width * 0.22;
  const rightX = width * 0.78;
  const centerY = height * 0.5;

  // River/Nature Cluster (Left)
  ctx.fillStyle = "rgba(45, 212, 191, 0.12)";
  ctx.beginPath();
  ctx.arc(leftX, centerY, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(45, 212, 191, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#2dd4bf";
  ctx.font = "700 12px Inter";
  ctx.textAlign = "center";
  ctx.fillText("🌊 Water / Nature Cluster", leftX, centerY - 25);
  ctx.font = "500 11px Inter";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("river • water • stream", leftX, centerY + 28);

  // Finance/Money Cluster (Right)
  ctx.fillStyle = "rgba(132, 204, 22, 0.12)";
  ctx.beginPath();
  ctx.arc(rightX, centerY, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(132, 204, 22, 0.4)";
  ctx.stroke();

  ctx.fillStyle = "#84cc16";
  ctx.font = "700 12px Inter";
  ctx.fillText("💰 Finance / Money Cluster", rightX, centerY - 25);
  ctx.font = "500 11px Inter";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("money • deposit • cash", rightX, centerY + 28);

  // Connecting path
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(leftX, centerY);
  ctx.lineTo(rightX, centerY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Interpolated position for "bank"
  const midX = width * 0.5;
  const curX = midX + sliderVal * (width * 0.28);

  // Faint Static Ghost at center
  ctx.beginPath();
  ctx.arc(midX, centerY, 6, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
  ctx.fill();
  ctx.font = "500 10px Inter";
  ctx.fillStyle = "#64748b";
  ctx.fillText("Static Word2Vec", midX, centerY + 18);

  // Dynamic Contextual Vector
  const shiftColor = sliderVal < 0 ? "#2dd4bf" : (sliderVal > 0 ? "#84cc16" : "#fbbf24");
  ctx.beginPath();
  ctx.arc(curX, centerY, 14, 0, Math.PI * 2);
  ctx.fillStyle = `${shiftColor}33`;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(curX, centerY, 7, 0, Math.PI * 2);
  ctx.fillStyle = shiftColor;
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = "700 13px Inter";
  ctx.fillText("bank", curX, centerY - 18);

  // Text label update
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
// Module 5: 3D PCA Semantic Universe (3D & 2D)
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

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let hasMoved = false;

  const onPointerDown = (clientX, clientY) => {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    hasMoved = false;
    state.universeAutoRotate = false;
    document.getElementById("btn-universe-autorotate")?.classList.remove("active");
  };

  const onPointerMove = (clientX, clientY) => {
    const cRect = canvas.getBoundingClientRect();
    const mx = clientX - cRect.left;
    const my = clientY - cRect.top;

    if (isDragging && state.universeViewMode === "3d") {
      const dx = clientX - startX;
      const dy = clientY - startY;
      if (Math.hypot(dx, dy) > 3) hasMoved = true;

      state.universeRotY += dx * 0.008;
      state.universeRotX += dy * 0.008;
      state.universeRotX = Math.max(-1.3, Math.min(1.3, state.universeRotX));

      startX = clientX;
      startY = clientY;

      drawUniverse(ctx, cRect.width, cRect.height);
      return;
    }

    // Hover detection
    if (!isDragging) {
      let hovered = null;
      let minDist = 20;

      state.words.forEach(w => {
        if (!w._univProj) return;
        const dist = Math.hypot(mx - w._univProj.px, my - w._univProj.py);
        if (dist < minDist) {
          minDist = dist;
          hovered = w;
        }
      });

      state.universeHoveredWord = hovered ? hovered.word : null;
      const hoverCard = document.getElementById("universe-hover-card");

      if (hovered && hoverCard) {
        const [p1, p2, p3] = hovered.pca_3d;
        hoverCard.style.display = "block";
        hoverCard.style.left = `${hovered._univProj.px}px`;
        hoverCard.style.top = `${hovered._univProj.py}px`;
        hoverCard.innerHTML = `
          <strong>${hovered.word.toUpperCase()}</strong> <span style="color:#94a3b8">(${hovered.category})</span><br>
          <span style="color:#38bdf8">PC1: ${p1.toFixed(2)}</span> | 
          <span style="color:#f472b6">PC2: ${p2.toFixed(2)}</span> | 
          <span style="color:#34d399">PC3: ${p3.toFixed(2)}</span>
        `;
        canvas.style.cursor = "pointer";
      } else if (hoverCard) {
        hoverCard.style.display = "none";
        canvas.style.cursor = isDragging ? "grabbing" : "grab";
      }

      drawUniverse(ctx, cRect.width, cRect.height);
    }
  };

  const onPointerUp = (clientX, clientY) => {
    if (!hasMoved) {
      const cRect = canvas.getBoundingClientRect();
      const mx = clientX - cRect.left;
      const my = clientY - cRect.top;

      let closest = null;
      let minDist = 22;

      state.words.forEach(w => {
        if (!w._univProj) return;
        const dist = Math.hypot(mx - w._univProj.px, my - w._univProj.py);
        if (dist < minDist) {
          minDist = dist;
          closest = w;
        }
      });

      if (closest) {
        state.universeSelectedWord = (state.universeSelectedWord === closest.word) ? null : closest.word;
        renderUniverseDetailCard(closest);
        drawUniverse(ctx, cRect.width, cRect.height);
      }
    }
    isDragging = false;
  };

  canvas.addEventListener("mousedown", (e) => onPointerDown(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) => {
    if (isDragging) onPointerMove(e.clientX, e.clientY);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) onPointerMove(e.clientX, e.clientY);
  });
  window.addEventListener("mouseup", (e) => {
    if (isDragging) onPointerUp(e.clientX, e.clientY);
  });

  // Touch handlers
  canvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  canvas.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  canvas.addEventListener("touchend", (e) => {
    if (e.changedTouches.length === 1) onPointerUp(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  });

  // Wheel zoom
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    state.universeZoom = Math.max(0.5, Math.min(2.5, state.universeZoom + zoomDelta));
    const cRect = canvas.getBoundingClientRect();
    drawUniverse(ctx, cRect.width, cRect.height);
  }, { passive: false });

  // Resize listener
  window.addEventListener("resize", () => {
    const r = canvas.getBoundingClientRect();
    canvas.width = r.width * dpr;
    canvas.height = r.height * dpr;
    ctx.scale(dpr, dpr);
    drawUniverse(ctx, r.width, r.height);
  });
}

function renderUniverseDetailCard(wordObj) {
  const badge = document.getElementById("universe-selection-badge");
  if (!badge) return;

  if (!wordObj) {
    badge.style.display = "none";
    return;
  }

  // Find 3 nearest neighbors in PCA 3D space
  const [x1, y1, z1] = wordObj.pca_3d;
  const neighbors = state.words
    .filter(w => w.word !== wordObj.word)
    .map(w => ({
      word: w.word,
      category: w.category,
      dist: Math.hypot(w.pca_3d[0] - x1, w.pca_3d[1] - y1, w.pca_3d[2] - z1)
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3);

  badge.style.display = "block";
  badge.innerHTML = `
    <div style="font-weight:700; color:#fff; font-size:0.85rem; margin-bottom:0.25rem;">
      🎯 ${wordObj.word.toUpperCase()} <span style="color:#94a3b8; font-weight:400;">(${wordObj.category})</span>
    </div>
    <div style="font-size:0.75rem; color:#cbd5e1; margin-bottom:0.35rem;">${wordObj.description}</div>
    <div style="font-size:0.72rem; color:#94a3b8;">
      Closest 3D Neighbors: 
      ${neighbors.map(n => `<span style="color:${CATEGORY_COLORS[n.category] || '#38bdf8'}; font-weight:600;">${n.word}</span>`).join(", ")}
    </div>
  `;
}

function drawUniverse(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const filter = state.universeFilter;
  const search = state.universeSearch.toLowerCase();

  if (state.universeViewMode === "2d") {
    drawUniverse2D(ctx, width, height, filter, search);
    return;
  }

  // -------------------------------------------------------------------------
  // 3D PCA Semantic Universe Rendering
  // -------------------------------------------------------------------------
  const centerX = width / 2;
  const centerY = height / 2;
  const camera = new Camera3D({
    rotX: state.universeRotX,
    rotY: state.universeRotY,
    zoom: state.universeZoom,
    distance: 3.1,
    fov: 470
  });

  // 1. Ground Grid at Y = -1
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 1;
  const gridSteps = [-1, -0.5, 0, 0.5, 1];

  gridSteps.forEach(gx => {
    const pStart = camera.project(gx, -1, -1, centerX, centerY);
    const pEnd = camera.project(gx, -1, 1, centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(pStart.px, pStart.py);
    ctx.lineTo(pEnd.px, pEnd.py);
    ctx.stroke();
  });

  gridSteps.forEach(gz => {
    const pStart = camera.project(-1, -1, gz, centerX, centerY);
    const pEnd = camera.project(1, -1, gz, centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(pStart.px, pStart.py);
    ctx.lineTo(pEnd.px, pEnd.py);
    ctx.stroke();
  });

  // 2. Bounding Box [-1, 1]^3 Wireframe Edges
  const corners = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1]
  ];
  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];

  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  edges.forEach(([i, j]) => {
    const c1 = corners[i];
    const c2 = corners[j];
    const p1 = camera.project(c1[0], c1[1], c1[2], centerX, centerY);
    const p2 = camera.project(c2[0], c2[1], c2[2], centerX, centerY);
    ctx.beginPath();
    ctx.moveTo(p1.px, p1.py);
    ctx.lineTo(p2.px, p2.py);
    ctx.stroke();
  });

  // 3. 3 Principal Component Axes
  const xNeg = camera.project(-1, 0, 0, centerX, centerY);
  const xPos = camera.project(1, 0, 0, centerX, centerY);
  ctx.strokeStyle = "rgba(6, 182, 212, 0.7)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(xNeg.px, xNeg.py);
  ctx.lineTo(xPos.px, xPos.py);
  ctx.stroke();

  const yNeg = camera.project(0, -1, 0, centerX, centerY);
  const yPos = camera.project(0, 1, 0, centerX, centerY);
  ctx.strokeStyle = "rgba(244, 63, 94, 0.7)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(yNeg.px, yNeg.py);
  ctx.lineTo(yPos.px, yPos.py);
  ctx.stroke();

  const zNeg = camera.project(0, 0, -1, centerX, centerY);
  const zPos = camera.project(0, 0, 1, centerX, centerY);
  ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(zNeg.px, zNeg.py);
  ctx.lineTo(zPos.px, zPos.py);
  ctx.stroke();

  // Axis labels
  ctx.font = "600 11px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#38bdf8";
  ctx.fillText("+ PC1", xPos.px + 10, xPos.py);
  ctx.fillText("- PC1", xNeg.px - 10, xNeg.py);

  ctx.fillStyle = "#f43f5e";
  ctx.fillText("+ PC2", yPos.px, yPos.py - 10);
  ctx.fillText("- PC2", yNeg.px, yNeg.py + 14);

  ctx.fillStyle = "#34d399";
  ctx.fillText("+ PC3", zPos.px + 8, zPos.py + 10);
  ctx.fillText("- PC3", zNeg.px - 8, zNeg.py - 6);

  // 4. Project & Sort Words
  const projectedWords = state.words.map(w => {
    const [rawX, rawY, rawZ] = w.pca_3d;
    const proj = camera.project(rawX, rawY, rawZ, centerX, centerY);
    const floorProj = camera.project(rawX, -1, rawZ, centerX, centerY);
    w._univProj = proj;
    w._univFloor = floorProj;
    return w;
  });

  // 5. Constellation Lines to Nearest Neighbors for Selected/Hovered Word
  const activeWordName = state.universeSelectedWord || state.universeHoveredWord;
  const activeWordObj = state.byWord[activeWordName?.toLowerCase()];

  if (activeWordObj && activeWordObj._univProj) {
    const [ax, ay, az] = activeWordObj.pca_3d;
    const pActive = activeWordObj._univProj;

    const topNeighbors = state.words
      .filter(w => w.word !== activeWordObj.word)
      .map(w => ({
        word: w,
        dist: Math.hypot(w.pca_3d[0] - ax, w.pca_3d[1] - ay, w.pca_3d[2] - az)
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 3);

    topNeighbors.forEach(({ word: nWord }) => {
      if (nWord._univProj) {
        ctx.strokeStyle = "rgba(6, 182, 212, 0.65)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(pActive.px, pActive.py);
        ctx.lineTo(nWord._univProj.px, nWord._univProj.py);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }

  // Sort by depth
  projectedWords.sort((a, b) => a._univProj.depth - b._univProj.depth);

  // 6. Draw Points
  projectedWords.forEach(w => {
    const { px, py, scale } = w._univProj;
    const floor = w._univFloor;

    const matchesCategory = (filter === "all" || w.category === filter);
    const matchesSearch = (search.length === 0 || w.word.toLowerCase().includes(search));
    const isHighlighted = (matchesCategory && matchesSearch);
    const isSelected = (w.word === state.universeSelectedWord || w.word === state.universeHoveredWord);

    const baseColor = CATEGORY_COLORS[w.category] || "#818cf8";

    // Drop stem line
    ctx.strokeStyle = isHighlighted ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 3]);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(floor.px, floor.py);
    ctx.stroke();
    ctx.setLineDash([]);

    // Floor shadow
    ctx.beginPath();
    ctx.ellipse(floor.px, floor.py, 4 * scale, 2 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = isHighlighted ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.1)";
    ctx.fill();

    // Point radius
    const ptRadius = (isSelected ? 7 : (isHighlighted ? 4.5 : 2.5)) * scale;

    // Glowing Halo
    ctx.beginPath();
    ctx.arc(px, py, ptRadius * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = isSelected 
      ? "rgba(245, 158, 11, 0.5)" 
      : (isHighlighted ? `${baseColor}44` : "rgba(255, 255, 255, 0.03)");
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(px, py, ptRadius, 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "#f59e0b" : (isHighlighted ? baseColor : "rgba(100, 116, 139, 0.4)");
    ctx.fill();

    if (isHighlighted || isSelected) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // Text Label
    if (isHighlighted || isSelected) {
      const fontSize = Math.max(9, Math.min(13, Math.round(10.5 * scale)));
      ctx.font = isSelected ? `700 ${fontSize + 1}px Inter` : `500 ${fontSize}px Inter`;

      ctx.fillStyle = "rgba(5, 8, 16, 0.8)";
      const tw = ctx.measureText(w.word).width;
      ctx.fillRect(px - tw / 2 - 3, py - ptRadius - fontSize - 2, tw + 6, fontSize + 4);

      ctx.fillStyle = isSelected ? "#fff" : (isHighlighted ? "#e2e8f0" : "#64748b");
      ctx.textAlign = "center";
      ctx.fillText(w.word, px, py - ptRadius - 4);
    }
  });
}

function drawUniverse2D(ctx, width, height, filter, search) {
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

  // Draw 2D Points
  state.words.forEach(w => {
    const [rawX, rawY] = w.pca_2d;
    const px = ((rawX + 1) / 2) * plotW + pad;
    const py = (1 - (rawY + 1) / 2) * plotH + pad;
    w._univProj = { px, py, depth: 0, scale: 1 };

    const matchesCategory = (filter === "all" || w.category === filter);
    const matchesSearch = (search.length === 0 || w.word.toLowerCase().includes(search));
    const isHighlighted = (matchesCategory && matchesSearch);
    const isSelected = (w.word === state.universeSelectedWord || w.word === state.universeHoveredWord);

    const color = CATEGORY_COLORS[w.category] || "#818cf8";

    ctx.beginPath();
    ctx.arc(px, py, isSelected ? 12 : (isHighlighted ? 6 : 3), 0, Math.PI * 2);
    ctx.fillStyle = isSelected 
      ? "rgba(245, 158, 11, 0.5)" 
      : (isHighlighted ? `${color}33` : "rgba(255, 255, 255, 0.03)");
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, isSelected ? 6 : (isHighlighted ? 3.5 : 2), 0, Math.PI * 2);
    ctx.fillStyle = isSelected ? "#f59e0b" : (isHighlighted ? color : "#475569");
    ctx.fill();

    if (isHighlighted || isSelected) {
      ctx.font = isSelected ? "700 12px Inter" : "500 10px Inter";
      ctx.fillStyle = isSelected ? "#fff" : "#cbd5e1";
      ctx.textAlign = "center";
      ctx.fillText(w.word, px, py - 8);
    }
  });
}

// ==========================================================================
// Dropdowns Population
// ==========================================================================

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

// ==========================================================================
// Animation Loop for Smooth Auto-Rotation
// ==========================================================================

function startAnimationLoop() {
  function loop() {
    let needsCMU = false;
    let needsUniverse = false;

    if (state.cmuAutoRotate && state.cmuViewMode === "3d") {
      state.cmuRotY += 0.005;
      needsCMU = true;
    }

    if (state.universeAutoRotate && state.universeViewMode === "3d") {
      state.universeRotY += 0.004;
      needsUniverse = true;
    }

    if (needsCMU) {
      const c = document.getElementById("cmu-canvas");
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    }

    if (needsUniverse) {
      const c = document.getElementById("universe-canvas");
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawUniverse(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

// ==========================================================================
// Global App Lifecycle & Event Wiring
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  populateDropdowns();

  // Module 1: CMU Feature Space Listeners
  initCMUCanvas();
  renderCMUWordTable();

  // Axis change listeners (X, Y, Z)
  ["cmu-axis-x", "cmu-axis-y", "cmu-axis-z"].forEach(axisId => {
    document.getElementById(axisId)?.addEventListener("change", (e) => {
      if (axisId === "cmu-axis-x") state.cmuAxisX = e.target.value;
      if (axisId === "cmu-axis-y") state.cmuAxisY = e.target.value;
      if (axisId === "cmu-axis-z") state.cmuAxisZ = e.target.value;

      renderCMUWordTable();
      const c = document.getElementById("cmu-canvas");
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    });
  });

  // Preset buttons
  document.querySelectorAll(".cmu-preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cmu-preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.cmuPreset = btn.dataset.preset;
      renderCMUWordTable();
      const c = document.getElementById("cmu-canvas");
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    });
  });

  // Auto-rotate toggle for Module 1
  document.getElementById("btn-cmu-autorotate")?.addEventListener("click", (e) => {
    state.cmuAutoRotate = !state.cmuAutoRotate;
    e.currentTarget.classList.toggle("active", state.cmuAutoRotate);
  });

  // Reset view for Module 1
  document.getElementById("btn-cmu-resetview")?.addEventListener("click", () => {
    state.cmuRotX = 0.35;
    state.cmuRotY = 0.55;
    state.cmuZoom = 1.0;
    const c = document.getElementById("cmu-canvas");
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
    }
  });

  // 3D / 2D toggle for Module 1
  document.querySelectorAll("[id^='btn-cmu-view-']").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[id^='btn-cmu-view-']").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.cmuViewMode = btn.dataset.mode;
      const c = document.getElementById("cmu-canvas");
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    });
  });

  // Analogy buttons for Module 1
  document.getElementById("btn-cmu-arrow")?.addEventListener("click", () => {
    state.cmuShowArrow = true;
    state.cmuShowTranslation = false;
    const c = document.getElementById("cmu-canvas");
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
    }
  });

  document.getElementById("btn-cmu-translate")?.addEventListener("click", () => {
    state.cmuShowArrow = true;
    state.cmuShowTranslation = true;
    const c = document.getElementById("cmu-canvas");
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      drawCMUSpace(c.getContext("2d"), c.width / dpr, c.height / dpr);
    }
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
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawUniverse(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    });
  });

  document.getElementById("universe-search")?.addEventListener("input", (e) => {
    state.universeSearch = e.target.value;
    const c = document.getElementById("universe-canvas");
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      drawUniverse(c.getContext("2d"), c.width / dpr, c.height / dpr);
    }
  });

  // Module 5 Toolbar Buttons
  document.getElementById("btn-universe-autorotate")?.addEventListener("click", (e) => {
    state.universeAutoRotate = !state.universeAutoRotate;
    e.currentTarget.classList.toggle("active", state.universeAutoRotate);
  });

  document.getElementById("btn-universe-resetview")?.addEventListener("click", () => {
    state.universeRotX = 0.32;
    state.universeRotY = 0.65;
    state.universeZoom = 1.0;
    const c = document.getElementById("universe-canvas");
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      drawUniverse(c.getContext("2d"), c.width / dpr, c.height / dpr);
    }
  });

  document.querySelectorAll("[id^='btn-universe-view-']").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[id^='btn-universe-view-']").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.universeViewMode = btn.dataset.mode;
      const c = document.getElementById("universe-canvas");
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        drawUniverse(c.getContext("2d"), c.width / dpr, c.height / dpr);
      }
    });
  });

  // Start background auto-rotation animation loop
  startAnimationLoop();
});
