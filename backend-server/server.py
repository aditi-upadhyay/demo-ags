from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "/home/turbbo/Desktop/AditiFolder/angular-learning/demo-ags/folderOutputAgs/"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = {'efly', 'csv', 'las', 'stn'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']

    if file and allowed_file(file.filename):
        file_content = file.stream.read()
        x = ''
        _, extension = file.filename.split('.')
        if extension == "efly":
            parsedData = json.loads(file_content)
            file_name = str(parsedData['contents']['flights'][0]['properties']['designation']['flight_number']) + '-' + parsedData['contents']['flights'][0]['properties']['designation']['flight_name']
            x = file_name + '.' + extension
        else:
            x = secure_filename(file.filename)

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], x)
        with open(file_path, 'wb') as f:
            f.write(file_content)

        print("File uploaded")
        return jsonify({"message": "File uploaded successfully"}), 200
    else:
        print("Invalid file type")
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
