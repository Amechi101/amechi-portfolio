from django.contrib import admin
from django.conf.urls import include, url

from django.views.generic import TemplateView

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name="home.html")),
    url(r"^admin/", include(admin.site.urls)),
]


