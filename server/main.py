# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START app]
#from rake_nltk import Rake

# [START imports]
import json
from google.cloud import language

from flask import Flask, render_template, request
from flask_cors import CORS


from google.cloud.language import types
from google.cloud.language import enums

app = Flask(__name__)
CORS(app)

client = language.LanguageServiceClient()
sentence = ""
@app.route('/',methods = ['POST', 'GET'])
def parse_tokens():
    global sentence
    if request.method == 'POST':
        content = request.get_json()
        sentence = sentence + " " + " ".join(content['words'])
    document = types.Document(content=sentence, language='en', type=enums.Document.Type.PLAIN_TEXT)   
    entities = client.analyze_entities(document=document,encoding_type='UTF32').entities
    formatted_entities = []
    for entity in entities:
        format_entity = {}
        entity_type = enums.Entity.Type(entity.type)
        format_entity['name'] =  u'{}'.format(entity.name)
        format_entity['type'] = u'{}'.format(entity_type.name)
        format_entity['salience'] = u'{}'.format(entity.salience)
        formatted_entities.append(format_entity)
    return json.dumps({'entities':formatted_entities})

@app.route('/reset',methods = ['GET'])
def reset():
    global sentence
    sentence = ""
    return sentence
if __name__ == '__main__':
    app.run(debug=True)