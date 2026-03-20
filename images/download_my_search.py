import urllib.request
from pathlib import Path

out = Path("/Users/cassandramaurer/givenfreerein-ai/images/my-search-for-the-fell-pony")
out.mkdir(parents=True, exist_ok=True)

images = [
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/bba58479-9fd5-46b7-8733-62c40834a3cd/IMG_0582.jpg?format=1600w", "search_hero.jpg"),
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/4783f868-dc6d-4a7a-9c8f-7f34ad1e028d/IMG_0490.jpeg?format=1200w", "search_body1.jpg"),
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/20661b3c-ad25-4378-828a-142369843dcd/IMG_0511.jpg?format=1600w", "search_body2.jpg"),
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/2c9f9759-5bf7-4ea5-ad04-6d6d6f3e89ee/IMG_0553.jpeg?format=1600w", "search_body3.jpg"),
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/2c3614ba-33f8-4ac1-a96e-25a7ba8edfc9/IMG_0574.jpeg?format=1600w", "search_body4.jpg"),
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/6a9bb232-ceba-4133-964c-596fbb972ea3/IMG_0568.jpeg?format=1600w", "search_body5.jpg"),
    ("https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/890234e0-1a49-4680-8c57-3e47ce38b4cb/IMG_1670+%281%29.jpg?format=1600w", "search_body6.jpg"),
]

for url, filename in images:
    dest = out / filename
    urllib.request.urlretrieve(url, dest)
    print(f"{filename}\t{dest.stat().st_size}")
