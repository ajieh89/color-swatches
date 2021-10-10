from django.contrib import admin
from django.urls import path, re_path
from django.conf.urls import url
from color_swatches import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/color-swatches/$', views.QueryColorSwatches),
    re_path(r'^api/color-swatches/create/$', views.CreateColorSwatches),
]
