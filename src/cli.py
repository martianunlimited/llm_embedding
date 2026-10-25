"""Typer CLI interface for embedding inspection, similarity, and vector analogies."""

import typer
from rich.console import Console
from rich.table import Table
from src.core.embedding_service import EmbeddingService
from src.core.dataset_builder import export_all_embedding_data

app = typer.Typer(help="Interactive Word & Token Embedding CLI Explorer")
console = Console()


@app.command()
def word(
    query: str = typer.Argument(..., help="Word to inspect (e.g. king, queen, paris)"),
) -> None:
    """Inspect a word's interpretable CMU features and dense vector."""
    svc = EmbeddingService()
    try:
        item = svc.get_word(query)
    except KeyError:
        console.print(f"[bold red]Word '{query}' not found in vocabulary.[/bold red]")
        raise typer.Exit(code=1)

    console.print(f"[bold cyan]Word:[/bold cyan] {item.word.upper()} ({item.category})")
    console.print(f"[dim]{item.description}[/dim]")
    console.print(f"[bold green]PCA 2D Coordinates:[/bold green] {item.pca_2d}")
    console.print(f"[bold green]PCA 3D Coordinates:[/bold green] {item.pca_3d}")

    table = Table(title="Interpretable CMU Features", header_style="bold magenta")
    table.add_column("Feature", style="cyan")
    table.add_column("Value", justify="right", style="green")
    table.add_column("Interpretation", style="white")

    interpretations = {
        "gender": "Female (-1.0) <--> Male (+1.0)",
        "age": "Child (-1.0) <--> Elder (+1.0)",
        "royalty": "Common (-1.0) <--> Royal (+1.0)",
        "ferocity": "Gentle (-1.0) <--> Wild/Fierce (+1.0)",
        "size": "Tiny (-1.0) <--> Giant (+1.0)",
        "animacy": "Inanimate (-1.0) <--> Living (+1.0)",
    }

    for feat, val in item.cmu_features.items():
        table.add_row(feat.capitalize(), f"{val:+.2f}", interpretations.get(feat, ""))

    console.print(table)


@app.command()
def similarity(
    word_a: str = typer.Argument(..., help="First word"),
    word_b: str = typer.Argument(..., help="Second word"),
) -> None:
    """Calculate cosine similarity, Euclidean distance, and angle between two words."""
    svc = EmbeddingService()
    try:
        res = svc.compute_similarity(word_a, word_b)
    except KeyError as e:
        console.print(f"[bold red]{e}[/bold red]")
        raise typer.Exit(code=1)

    table = Table(title=f"Geometric Similarity: '{word_a}' vs '{word_b}'", header_style="bold blue")
    table.add_column("Metric", style="cyan")
    table.add_column("Value", justify="right", style="green")
    table.add_column("Explanation", style="white")

    table.add_row(
        "Cosine Similarity",
        f"{res.cosine_similarity:.4f}",
        "cos(θ) between -1.0 (opposite) and +1.0 (identical)",
    )
    table.add_row(
        "Angle (θ)", f"{res.angle_degrees:.1f}°", "Geometric angle between the two 16D vectors"
    )
    table.add_row(
        "Euclidean Distance",
        f"{res.euclidean_distance:.4f}",
        "Straight-line L2 distance between vector endpoints",
    )
    table.add_row("Dot Product", f"{res.dot_product:.4f}", "A · B (magnitude aligned projection)")

    console.print(table)


@app.command()
def analogy(
    word_a: str = typer.Argument(..., help="Word A (e.g. king)"),
    word_b: str = typer.Argument(..., help="Word B to subtract (e.g. man)"),
    word_c: str = typer.Argument(..., help="Word C to add (e.g. woman)"),
    top_k: int = typer.Option(5, help="Number of closest neighbors to return"),
) -> None:
    """Solve vector analogy: Word A - Word B + Word C = ?."""
    svc = EmbeddingService()
    try:
        res = svc.solve_analogy(word_a, word_b, word_c, top_k=top_k)
    except KeyError as e:
        console.print(f"[bold red]{e}[/bold red]")
        raise typer.Exit(code=1)

    console.print(
        f"\n[bold yellow]Analogy Equation:[/bold yellow] [bold white]{res.formula}[/bold white]"
    )

    table = Table(title="Top Nearest Neighbors in Embedding Space", header_style="bold green")
    table.add_column("Rank", justify="center", style="dim")
    table.add_column("Word", style="bold cyan")
    table.add_column("Category", style="magenta")
    table.add_column("Cosine Similarity", justify="right", style="green")
    table.add_column("Euclidean Distance", justify="right", style="yellow")

    for idx, match in enumerate(res.top_matches, start=1):
        table.add_row(
            str(idx),
            match.word,
            match.category,
            f"{match.similarity:.4f}",
            f"{match.distance:.4f}",
        )

    console.print(table)


@app.command()
def list_words() -> None:
    """List all available words in the embedding vocabulary."""
    svc = EmbeddingService()
    words = svc.get_all_words()
    console.print(f"[bold cyan]Total Vocabulary:[/bold cyan] {len(words)} words\n")
    console.print(", ".join(sorted(words)))


@app.command()
def generate_data() -> None:
    """Regenerate and export JSON embedding datasets."""
    export_all_embedding_data()
    console.print("[bold green]Successfully regenerated JSON datasets in data/![/bold green]")


if __name__ == "__main__":
    app()
