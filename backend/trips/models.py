from django.db import models
from django.contrib.auth.models import User

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    title = models.CharField(max_length=200, default="Minha Viagem")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.user.first_name}"

class TripItem(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='items')
    day_key = models.CharField(max_length=50) 
    name = models.CharField(max_length=200)
    time = models.CharField(max_length=20)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    weather_text = models.CharField(max_length=100, null=True, blank=True)
    weather_icon = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        ordering = ['day_key', 'time']