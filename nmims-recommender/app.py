from flask import Flask, request

from calc import *

app = Flask(__name__)

@app.route("/", methods=['POST'])
def predict():
    if request.method == 'POST':        
        data = request.json
        result = setup(data)
        return result



if __name__=="__main__":
    app.run(debug=True)