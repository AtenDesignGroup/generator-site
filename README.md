# Aten Site Generator

Yo generator for Aten sites. Alpha.

## Usage

```
# install yo
npm install -g yo

# install the generator
pushd ~/git
git clone git@bitbucket.org:atendesigngroup/generator-aten-site.git
pushd generator-aten-site
npm link
popd

# make a site
mkdir some-project
pushd some-project

# run the generator, answer the questions
yo aten-site

popd
popd
```
