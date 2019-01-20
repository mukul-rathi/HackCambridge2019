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
from google.cloud import language

from flask import Flask, render_template, request

#from google.cloud.language import types
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

#client = language.LanguageServiceClient()
sentence = " "
#r = Rake() # Uses stopwords for english from NLTK, and all puntuation characters.
#r.extract_keywords_from_text(sentence)
@app.route('/',methods = ['POST', 'GET'])
def parse_tokens():
    if request.method == 'POST':
        content = request.get_json()
        return sentence + " ".join(content['words'])
    return sentence

#    document = types.Document(
#    content=sentence,
#    type=enums.Document.Type.PLAIN_TEXT)
#    entities = client.analyze_entities(document).entities
#    return entities

if __name__ == '__main__':
    app.run(debug=True)