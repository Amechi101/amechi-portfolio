from django.contrib import admin
from django.conf.urls import include, url

from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="home.html")),
    url(r'', include("contents.urls")),
    url(r'', include("photography.urls")),
    url(r"^admin/", include(admin.site.urls)),
]


