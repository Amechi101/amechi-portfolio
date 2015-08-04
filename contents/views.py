from __future__ import unicode_literals 

from django.utils.translation import ugettext_lazy as _
from django.views.generic import ListView
from contents.models import Project, Track, Photography

class ProjectView(ListView):

	template_name = '_projects.html'
	
	model = Project

	def get_context_data(self, **kwargs):
		context = super(ProjectView, self).get_context_data(**kwargs)
		context['projects'] = Project.objects.all()
		
		return context

class TrackView(ListView):

	template_name = '_track.html'
	
	model = Track

	def get_context_data(self, **kwargs):
		context = super(TrackView, self).get_context_data(**kwargs)
		context['track_photos'] = Track.objects.all()
		
		return context


class PhotographyView(ListView):

	template_name = '_photography.html'
	
	model = Photography

	def get_context_data(self, **kwargs):
		context = super(PhotographyView, self).get_context_data(**kwargs)
		context['photos'] = Photography.objects.all()
		
		return context



		