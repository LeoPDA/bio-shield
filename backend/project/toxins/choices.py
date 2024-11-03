from django.db.models import TextChoices


class ChoicesClassification(TextChoices):
    BAIXA = (
        "BAIXA",
        "Baixa",
    )
    MEDIA = (
        "MEDIA",
        "Média",
    )
    ALTA = (
        "ALTA",
        "Alta",
    )
