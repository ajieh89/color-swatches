import json
import random
import logging
from django.db import models

# Create your models here.
class ColorSwatches(models.Model):
    name = models.CharField(unique=True, max_length=10)
    properties = models.TextField()

    def __str__(self):
        return self.name

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'properties': json.loads(self.properties),
        }

    @classmethod
    def generate_color_swatches(cls, limit=5):
        try:
            colors = cls.objects.all()
            res = [];

            for x in range(limit):
                random_color={}
                random_color_space = random.choice(colors).to_dict()
                random_color['name'] = random_color_space.get('name')

                if random_color_space.get('properties', None):
                    properties = []
                    for key, value in random_color_space.get('properties').items():
                        random_color[key] = random.randrange(value.get('min'), value.get('max'))

                res.append(random_color)

            return res
        except Exception as e:
            raise Exception(str(e))
