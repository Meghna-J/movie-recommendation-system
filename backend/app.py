from flask import Flask, request, render_template, jsonify
import pickle
import requests
import pandas as pd
from patsy import dmatrices
import json

app = Flask(__name__)

movies = pickle.load(open('models/movies_list.pkl','rb'))
similarity = pickle.load(open('models/similarity.pkl','rb'))
movies['title'] = movies['title'].str.lower()

def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=3afc3d9c9bc6a9321feca626d548c13a&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path_poster = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path_poster

def fetch_backdrop(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=3afc3d9c9bc6a9321feca626d548c13a&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    backdrop_path = data['backdrop_path']
    full_backdrop_poster = "https://image.tmdb.org/t/p/w500/" + backdrop_path
    return full_backdrop_poster
  
def fetch_genres(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=3afc3d9c9bc6a9321feca626d548c13a&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    genres = list(data["genres"])
    s = ""
    # print(len(genres))
    for i in range (0,len(genres)):
        s = s+', '+ genres[i]["name"]
    # print(s)
    return s

def fetch_id(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=3afc3d9c9bc6a9321feca626d548c13a&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    id = data["id"]
    return id


def recommend(movie):

    index = movies[movies['title']==movie].index[0]
    distances = sorted(list(enumerate(similarity[index])),reverse=True,key=lambda x:x[1])
    
    data = []
    
    for i in distances[0:9]:
        movie_id = movies.iloc[i[0]].id
        movie_dict = {}
        movie_dict["overview"] = movies.iloc[i[0]].overview
        movie_dict["recommended_movies_poster"] = fetch_poster(movie_id)
        movie_dict["recommended_backdrop_poster"] = fetch_backdrop(movie_id)
        movie_dict["recommend_movie_name"] = movies.iloc[i[0]].title.title()
        movie_dict["tagline"] = movies.iloc[i[0]].tagline
        movie_dict["recommend_movie_genres"] = fetch_genres(movie_id)
        movie_dict["recommend_movie_id"] = fetch_id(movie_id)
        # movie_dict["recommend_movie_id"] = movies.iloc[i[0]].id
        # print(movie_id)

        # print(movie_dict["recommend_movie_genres"])
        # print(movies.iloc[i[0]].genres)
        # fetch_genres(movie_id)

        data.append(movie_dict)
 
    return data

@app.route("/", methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/recommendation',methods=['GET','POST'])
def recommendation():
    movies_list = movies['title'].values
    # print(movies_list)
    if request.method=='POST':
        try:
            searched_movie = request.json
            # print(searched_movie)
            movies_name = searched_movie
            
            movies_name = movies_name.lower()
            print(movies_name)
               
            data = recommend(movies_name)
            # print(data)
            # print(type(data))
            # print(movies[movies['title']=='Karate Kid'])
            if data is []:
                return render_template('error.html')
            print(jsonify(data))
            return jsonify(data)

        except Exception as e:
            error = {'error':e}
            print('error')
            return render_template('error.html')
    
    return render_template('recommendation.html', movies_list = movies_list)


if __name__ == '__main__':
    # Start the Flask application
    app.run(debug=True)
