# Generated by Django 2.2.3 on 2019-07-29 10:11

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('AssignEmail', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='tokenPass',
            new_name='ResetPasswordToken',
        ),
    ]
