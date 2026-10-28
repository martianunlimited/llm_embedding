"""Configuration settings for embedding demo using pydantic-settings."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings with environment overrides."""

    model_config = SettingsConfigDict(
        env_prefix="EMBEDDING_",
        env_file=".env",
        extra="ignore",
    )

    project_root: Path = Path(__file__).resolve().parent.parent
    data_dir: Path = Path(__file__).resolve().parent.parent / "data"

    default_dimensions: int = 16
    cmu_feature_names: list[str] = [
        "gender",  # -1.0 Female <--> +1.0 Male
        "age",  # -1.0 Child  <--> +1.0 Elder
        "royalty",  # -1.0 Common <--> +1.0 Royal
        "ferocity",  # -1.0 Gentle <--> +1.0 Wild/Fierce
        "size",  # -1.0 Tiny   <--> +1.0 Giant
        "animacy",  # -1.0 Inanimate <--> +1.0 Living
    ]


settings = Settings()
