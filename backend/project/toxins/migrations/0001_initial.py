# Generated by Django 5.1.1 on 2024-11-03 20:03

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Toxin',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, unique=True)),
                ('classification', models.CharField(choices=[('BAIXA', 'Baixa'), ('MEDIA', 'Média'), ('ALTA', 'Alta')])),
                ('description', models.TextField()),
                ('usage', models.TextField()),
                ('risks', models.TextField()),
                ('safety_recommendations', models.TextField()),
                ('containment_plans', models.TextField(blank=True)),
                ('impact_assessment', models.TextField(blank=True)),
                ('access_level', models.IntegerField(choices=[('1', 'Acesso Geral'), ('2', 'Diretores de Divisões'), ('3', 'Ministro do Meio Ambiente')], default='1')),
            ],
        ),
    ]
