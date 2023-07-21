import os

class PATH():
    MAIN = os.path.abspath(os.getcwd())
    UPLOAD = os.path.join(MAIN,'api/static/images')
    
class FILE():
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']
    
def rows_to_dict(rows, columns):
    dictionary_list = []
    columns = [col[0] for col in rows.description]
    
    for i in rows:
        dictionary = {}
        for col in columns:
            dictionary[col] = i[col]
        dictionary_list.append(dictionary)
    
    return dictionary_list
