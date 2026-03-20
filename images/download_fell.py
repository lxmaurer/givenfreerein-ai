import urllib.request, os
os.makedirs('/Users/cassandramaurer/givenfreerein-ai/images/fell-pony', exist_ok=True)
base = 'https://images.squarespace-cdn.com/content/v1/685136bfb31e545b005f2971/'
imgs = [
    ('fell_hero.jpg', '1354973c-9a13-4d88-9314-d02cacd9a1cf/C164B4CE-3D8D-4CE0-AF89-00986A897CC3_1_201_a.jpeg?format=2500w'),
    ('fell_body1.jpg', '8b7c6c73-2c83-4150-bf98-05764fd5f6c6/23BBA3B4-64FE-49CB-BA27-FEBFBE984C5D_1_201_a.jpeg?format=2500w'),
    ('fell_body2.jpg', '773092a0-e089-413b-8ad7-6446ccfbfc88/IMG_1806.jpg?format=2500w'),
    ('fell_body3.jpg', '3bc6aa00-0a9a-4fcf-a6da-fc6c77117287/08E9B0D2-CD7D-4A55-BE1A-52D2AD1DB577_1_201_a.jpeg?format=2500w'),
    ('fell_body4.jpg', '1761559308373-1GDEX9LFGEHYSQMUX9KG/unsplash-image-DZdGVtJtMSQ.jpg?format=2500w'),
    ('fell_body5.jpg', '8a4aca55-004a-4626-96a5-79e46e8e4597/Queen+Elizabeth+II%3A+A+Life+of+Conservation+-+The+Livestock+Conservancy.jpg?format=2500w'),
    ('fell_body6.jpg', '1e552476-5d3b-43c4-a988-7056317f91b0/IMG_0568.jpeg?format=2500w'),
]
for name, path in imgs:
    dest = f'/Users/cassandramaurer/givenfreerein-ai/images/fell-pony/{name}'
    print(f'Downloading {name}...')
    urllib.request.urlretrieve(base + path, dest)
    print(f'  {os.path.getsize(dest)//1024}KB')
print('DONE')
