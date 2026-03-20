import urllib.request
from pathlib import Path

out = Path('/Users/cassandramaurer/givenfreerein-ai/images/spirit-horses-yakutia')
out.mkdir(parents=True, exist_ok=True)

images = [
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/3f50586c-f8b9-48bf-84ff-d5fcba5d16c6/pexels-sh-andrei-77548059-8652527.jpg?format=1600w', 'yakutia_hero.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/7121b7e0-f941-4ae5-88f2-41ea483c36af/yakutia_horse_snow.jpg?format=1600w', 'yakutia_body1.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/a23d900a-57c3-4b73-99b0-d2a575a74291/yakutia_horse_milking.jpg?format=1600w', 'yakutia_body2.jpg'),
    ('https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/0129db70-8d79-49ed-a069-682cdbbe8c67/yakutia_rider.jpg?format=1600w', 'yakutia_body3.jpg'),
]

for url, name in images:
    dest = out / name
    urllib.request.urlretrieve(url, dest)
    print(f'{name}\t{dest.stat().st_size}')
