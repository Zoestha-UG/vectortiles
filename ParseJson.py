# -*- coding: utf-8 -*-
"""
Created on Sat Feb 17 21:33:03 2018

@author: Sheub
"""


cd "C:\\xampp\\htdocs\\vectortiles"

import json
from pprint import pprint

import dominate
from dominate.tags import *



with open('location.json', encoding='utf-8') as fh:
    data = json.load(fh)
#
#pprint(data)
#
#
#data["features"][0]
#
#data["features"][0]['geometry']
#
#data["features"][0]['properties']
#data["features"][0]['properties']['name']
#data["features"][0]['properties']['description']
#data["features"][0]['properties']['postalCode']
#data["features"][0]['properties']['streetAddress']
#


#for idx, val in enumerate(data["features"]):
#    print(idx, val['properties']['postalCode'])


clsColumn = div(cls='card-columns')
with clsColumn:
    for idx, val in enumerate(data["features"]):
        cardDiv = div(cls='card')
        with cardDiv:
            cardBody = div(cls='card-body')
            with cardBody:
                h4(val['properties']['name'], cls='card-title')
                p(val['properties']['description'], cls='card-text')

print(clsColumn)


#h2('Welcome'), cls='greeting')
#<h1>.card-columns</h1>
#
#    <div class="card">
#      <div class="card-body">
#        <h4 class="card-title">.card-title</h4>
#        <p class="card-text">.card-text</p>
#      </div>
#    </div>
#  </div>
#
#
#  <p>You can adjust the number of columns with media-queries</p>
#  <div class="card-columns">
#
#    <div class="card text-center bg-faded">
#      <div class="card-header">
#        <ul class="nav nav-tabs card-header-tabs">
#          <li class="nav-item">
#            <a class="nav-link active" href="#tab1" data-toggle="tab">.nav-link <span class="badge badge-default">1</span></a>
#          </li>
#          <li class="nav-item">
#            <a class="nav-link" href="#tab2" data-toggle="tab">.nav-link <span class="badge badge-default">2</span></a>
#          </li>
#        </ul>
#      </div>
#
#
#      <div class="card-body">
#
#        <div class="tab-content">
#          <div class="tab-pane active" id="tab1" role="tabpanel">
#            <h4 class="card-title">.card-title <span class="badge badge-default">1</span></h4>
#          </div>
#          <div class="tab-pane" id="tab2" role="tabpanel">
#            <h4 class="card-title">.card-title <span class="badge badge-default">2</span></h4>
#          </div>
#        </div>
#
#      </div>
#    </div>
#    
#    
#      
#      </div>
#<!-- /.card-columns -->
#</div>
#<!-- /.container -->
#
## Card Example from bootstrap
#<div class="card" style="width: 20rem;">
#  <div class="card-block">
#    <h4 class="card-title">Card title</h4>
#    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
#    <a href="#" class="btn btn-primary">Go somewhere</a>
#  </div>
#</div>