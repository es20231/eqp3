import os

class PATH():
    MAIN = os.path.abspath(os.getcwd())
    UPLOAD= os.path.join(MAIN,'djavu/static/images')
    
class FILE():
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    ALLOWED_EXTENSIONS = ['.jpg','.jpeg','.png','.gif']
