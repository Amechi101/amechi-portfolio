# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.urlresolvers import reverse
from cloudinary.models import CloudinaryField
from django.utils.translation import ugettext_lazy as _


class Photography(models.Model):
    """
    Photography Model
    """
    
    album_name = models.CharField(max_length=255, blank=True, null=True, unique=True)
   
    slug = models.SlugField(max_length=255, verbose_name=_('Album Slug'), unique=True,  null=True,  blank=True)

    cover_image = CloudinaryField('Photo Album Cover', null=True, blank=True)

    #For Admin Purposes and filtering, to keep track of new and old  in the database by administrative users
    date_added = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name=_('Date added'))
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True, verbose_name=_('Last modified'))

    #Metadata
    class Meta: 
        verbose_name = _('Photography')
        verbose_name_plural = _('Photo Albums')

    def __unicode__(self):
        return "{0}".format( self.album_name )

    #Helps return something meaningful, to show within the admin interface for easy interaction
    def get_album_name(self):
        """
        Return item (provided for extensibility)
        """
        return "{0}".format(self.album_name)

    def get_absolute_url(self):
        return reverse('album_view', args=[self.slug])

class Photo(models.Model):
    """
    Products related to each brand
    """

    photo_location = models.CharField(max_length=255, verbose_name=_('Location'), null=True, blank=True)
    photo_country = models.CharField(max_length=255, verbose_name=_('Country'), null=True, blank=True)

    # Points to a Cloudinary image
    photo = CloudinaryField('image', max_length=255, null=True, blank=True)
    
    #For Admin Purposes, to keep track of new and old items in the database by administrative users
    date_added = models.DateTimeField(auto_now_add=True, null=True, blank=True, verbose_name=_('Date added'))
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True, verbose_name=_('Last modified') )

    # Foreign Key
    photography = models.ForeignKey(Photography, null=True)

    #Metadata
    class Meta: 
        verbose_name = _('Photo')
        verbose_name_plural = _('Photos')

    def __unicode__(self):
        return "{0}".format(self.photo_location)


    def get_photo_location(self):
        """
       	Return item (provided for extensibility)
        """
        return "{0}".format(self.photo_location)


