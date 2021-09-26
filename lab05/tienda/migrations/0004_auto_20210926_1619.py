# Generated by Django 3.2.6 on 2021-09-26 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0003_cliente'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cliente',
            old_name='nombres',
            new_name='nombre',
        ),
        migrations.AlterField(
            model_name='cliente',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]