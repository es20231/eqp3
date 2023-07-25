import os

class PATH:
    MAIN = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', ))
    UPLOAD = os.path.join(MAIN, 'static', 'images')
    
class FILE():
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']
    
def rows_to_dict(rows):
    dictionary_list = []
    columns = rows[0].keys()
    for i in rows:
        dictionary = {}
        for col in columns:
            dictionary[col] = i[col]
        dictionary_list.append(dictionary)
        
    return dictionary_list
