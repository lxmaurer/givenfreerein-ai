import urllib.request
from pathlib import Path

out = Path('/Users/cassandramaurer/givenfreerein-ai/images/tbourida')
out.mkdir(parents=True, exist_ok=True)

images = [
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/5d60506d-beac-4471-b037-5578514d1af7/fantasia_riders.jpg?format=1600w', 'tbourida_hero.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/0da4c0fa-9fcc-42d2-a148-17389c266ba0/fantasia_horse.jpg?format=1600w', 'tbourida_body1.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/1bddbb7d-a429-45d8-9f4c-fb3b2fc03bd4/fantasia_horse_charge.jpg?format=1600w', 'tbourida_body2.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/b35cc83c-c7d3-4cb7-bc9e-7091e3088128/Fantasia_in_Morocco_1.jpg?format=1600w', 'tbourida_body3.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/ea4e4f8d-71ca-40a8-a48c-6929b68ad313/fantasia_female.jpg?format=1600w', 'tbourida_body4.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/622de320-3ea9-4d2a-a507-62547f6e4203/%D0%9C%D1%83%D1%81%D1%81%D0%B5%D0%BC_%28%D1%84%D0%BE%D0%BB%D1%8C%D0%BA%D0%BB%D0%BE%D1%80%D0%BD%D1%8B%D0%B8%CC%86_%D1%84%D0%B5%D1%81%D1%82%D0%B8%D0%B2%D0%B0%D0%BB%D1%8C%29_%D0%B2_%D0%A2%D0%B0%D0%BD-%D0%A2%D0%B0%D0%BD%D0%B5_%28%D0%9C%D0%B0%D1%80%D0%BE%D0%BA%D0%BA%D0%BE%29.jpg?format=1600w', 'tbourida_body5.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/df0d8d2f-f41a-45e2-9b9c-bb7df88682dd/500px-Euge%CC%80ne_Delacroix_-_Fantasia_Arabe_-_Google_Art_Project.jpg?format=1600w', 'tbourida_body6.jpg'),
]

for url, name in images:
    dest = out / name
    urllib.request.urlretrieve(url, dest)
    print(f'{name}\t{dest.stat().st_size}')
