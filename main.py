from flask import Flask,jsonify,request
import requests
app = Flask(__name__)


@app.route("/search",methods=["GET"])
def getData():
    api_key = 'cn419h9r01qtsta4e100cn419h9r01qtsta4e10g'
    symbol = request.args.get("searchText")
    endpoint = f' https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={api_key}'
    endpoint2= f' https://finnhub.io/api/v1/quote?symbol={symbol}&token={api_key}'
    response = requests.get(endpoint)
    response2= requests.get(endpoint2)
    if response.status_code==200 and response2.status_code==200:
        data2=response2.json()
        data = response.json()
        all_data = {
        'data1': data,
        'data2': data2,
        # Add more data as needed
    }
        return jsonify(all_data)
    else:
        return jsonify({'error': 'Failed to retrieve data'}), 500
    
@app.route("/")
def hello():
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)

