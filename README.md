# MZ Harp

![Heroku](http://heroku-badge.herokuapp.com/?app=mz-harp&style=flat)

Boilerplate for [Harp](http://harpjs.com) with Gulp support, responsive images and a simple blog structure.

## Setup

1. Setup boilerplate: `harp init my-harp --boilerplate marzeelabs/mz-harp`
2. Navigate inside the new directory with `cd my-harp`
3. Install all dependencies with `npm install`
4. Install gulp and harp globally with `npm install -g gulp harp` so you get the CLIs available

This will get you a copy of the repository locally and also download all node dependencies such as [harp](http://harpjs.com/), [Gulp](http://gulpjs.com/), [jimp](https://github.com/oliver-moran/jimp), [Browsersync](https://www.browsersync.io/), etc.

## Run

In order to serve your local copy of the website, while on the project directory, just do `gulp` and everything will be handled for you.

The default task for *gulp* will:

1. Create responsive versions of the blog's images with *jimp*
2. Minify and concatenate the multiple JS scripts with *uglify*
3. Build the static files for the website in the *www* dir with *harp*
4. Serve the website in [localhost:3333](http://localhost:3333) with *harp* and *Browsersync*

#### Responsive images

The default *gulp* tasks take care of processing the images in various sizes for the responsive image markup, as well as replacing the code in the compiled HTML. All that is required is for the author to add the image files in the *_posts-images* directory and include the base image (also copied to *public/images/posts/*) in the post - e.g. *[alt](/images/posts/file.extension)*

## Development

For development guidelines, please check the harp documentation at http://harpjs.com/docs/development/

## Reviewing and hosting

In order to review the static site, this boilerplate is integrated with [Heroku's pipelines](https://devcenter.heroku.com/articles/pipelines), which spins up a new site for each pull request and commit.

## Credits 

Made by [Marzee Labs](http://marzeelabs.org)
