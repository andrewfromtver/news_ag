from googletrans import Translator
import sys

query = str(sys.argv[1])
lang = str(sys.argv[2])
translator = Translator()

print(translator.translate(query, lang).text)