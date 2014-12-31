ascjones.com
============

Source for my blog on ascjones.com

Generated using http://gohugo.io/

Running on my VPS using Docker: instructions from http://gohugo.io/

### Updating the blog

```
docker start blog_content
```

### Running Hugo to watch content

```
sudo docker run -t --name blog --volumes-from blog_content blog/rendered
```

-t option makes it continue to run after ctrl-c
