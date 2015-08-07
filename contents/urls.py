from __future__ import unicode_literals

from django.conf.urls import include, url
from django.views.generic import TemplateView

from contents.views import ProjectView, TrackView

urlpatterns = [
	url(r'^about/$', TemplateView.as_view(template_name="_about.html")),
	url(r'^projects/$', ProjectView.as_view(), name="projects"),
	url(r'^track/$', TrackView.as_view(), name="track"),
]


