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
import logging

# [START imports]
from flask import Flask, render_template, request
import six
from google.cloud import language
# [END imports]

# [START create_app]
app = Flask(__name__)
# [END create_app]

client = language.LanguageServiceClient()

sentence = "" 
@app.route('/', methods=['POST'])
def parse_tokens():
    sentence += request.words;
    document = language.types.Document(content=sentence, type=language.enums.Document.Type.PLAIN_TEXT)
    entities = client.analyze_entities(document).entities
    return entities
  

@app.errorhandler(500)
def server_error(e):
    # Log the error and stacktrace.
    logging.exception('An error occurred during a request.')
    return 'An internal error occurred.', 500
# [END app]

if __name__ == '__main__':
    app.run(debug=True)