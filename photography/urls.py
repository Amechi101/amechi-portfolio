from __future__ import unicode_literals

from django.conf.urls import include, url
from django.views.generic import TemplateView

from photography.views import PhotographyView, PhotographyDetailView

urlpatterns = [
	url(r'^photography/$', PhotographyView.as_view(), name="photography"),
	url(r'^photography/(?P<slug>[\w\d-]+)/$', PhotographyDetailView.as_view(), name="album_view"),
]


