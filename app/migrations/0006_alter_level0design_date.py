# Generated by Django 5.0.7 on 2024-07-19 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_level0design_date_alter_level0design_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='level0design',
            name='date',
            field=models.DateField(blank=True, default=0, null=True),
        ),
    ]
