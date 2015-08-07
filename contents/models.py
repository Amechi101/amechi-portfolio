# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from cloudinary.models import CloudinaryField
from django.utils.translation import ugettext_lazy as _


class Project(models.Model):
    """
    Information for each Project
    """
    
    project_name = models.CharField(max_length=255, blank=True, null=True, unique=True)

    project_description = models.TextField(null=True, blank=True)

    project_url = models.URLField(max_length=200, null=True, blank=True)

    #For Admin Purposes and filtering, to keep track of new and old  in the database by administrative users
    date_added = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name=_('Date added'))
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True, verbose_name=_('Last modified'))

    #Metadata
    class Meta: 
        verbose_name = _('Project')
        verbose_name_plural = _('Projects')

    def __unicode__(self):
        return "{0}".format( self.project_name )

    #Helps return something meaningful, to show within the admin interface for easy interaction
    def get_project_name(self):
        """
        Return item (provided for extensibility)
        """
        return "{0}".format(self.project_name)

    def get_project_description(self):
        """
        Return item (provided for extensibility)
        """
        return "{0}".format(self.project_description)
    
    def get_project_url(self):
        """
        Return item (provided for extensibility)
        """
        return "{0}".format(self.project_url)


class Role(models.Model):
    """
    Information for Role
    """
    
    role = models.CharField(max_length=255, blank=True, null=True)

    project_role = models.ManyToManyField(Project)

    #Metadata
    class Meta: 
        verbose_name = _('Role')
        verbose_name_plural = _('Project Roles')

    def __unicode__(self):
        return "{0}".format( self.role )

    #Helps return something meaningful, to show within the admin interface for easy interaction
    def get_project_role(self):
        """
        Return item (provided for extensibility)
        """
        return "{0}".format(self.role)

    def get_parents(self):
        return ",".join([str(p) for p in self.project_role.all()])


class Technologies(models.Model):
    """
    Information for Tech
    """
    
    technologies = models.CharField(max_length=255, blank=True, null=True)

    project_tech = models.ManyToManyField(Project)

    #Metadata
    class Meta: 
        verbose_name = _('Tech')
        verbose_name_plural = _('Tech Roles')

    def __unicode__(self):
        return "{0}".format( self.technologies )

    #Helps return something meaningful, to show within the admin interface for easy interaction
    def get_project_role(self):
        """
        Return item (provided for extensibility)
        """
        return "{0}".format(self.technologies)

    def get_parents(self):
        return ",".join([str(p) for p in self.project_tech.all()])


class Track(models.Model):
    """
    Track & Field
    """

    # Points to a Cloudinary image
    track_photos = CloudinaryField('Track images', max_length=255, null=True, blank=True)
    
    #For Admin Purposes, to keep track of new and old items in the database by administrative users
    date_added = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name=_('Date added'))
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True, verbose_name=_('Last modified') )


    #Metadata
    class Meta: 
        verbose_name = _('Track')
        verbose_name_plural = _('Track Photos')

    def __unicode__(self):
        return "{0}".format( self.track_photos )








