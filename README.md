# Outfits On The Go


## Intro

Outfits On The Go is a Rails and JavaScript application that works like a planner for outfits. Upon logging in with username and password or via Facebook, the user gets to create boards where they can add outfits (with caption and hashtags) they plan to wear for specific occasions.  They will also be able to view other users' boards as well as look up outfits by hashtag. The purpose of this app is to save time (and headache) when it comes to planning an outfit and prevent one from over- or under-packing if going away on a trip.


## Installation:

- If you don't have Rails, install by running `$ gem install rails`
- Fork and clone this repo
- Run `$ bundle install` to install all required dependencies  
- Run `$ rake db:migrate` to make all database migrations
- Run `$ rails s` to start the local server
- View the page at http://localhost:3000


## Dependencies

 - [bcrypt](https://rubygems.org/gems/bcrypt/versions/3.1.11) - To encrypt user's passwords
 - [bootstrap](https://github.com/twbs/bootstrap) - For styling
 - [Carrierwave](https://github.com/carrierwaveuploader/carrierwave) - To upload files
 - [dotenv-rails](https://github.com/bkeepers/dotenv)- To load environment variables to aid omniauth-facebook login
 - [jquery-rails](https://github.com/rails/jquery-rails) - Lends Bootstrap JS functionalities
 - [minimagick](https://github.com/minimagick/minimagick) - To connect to the image processing library
 - [omniauth-facebook](https://github.com/mkdynamic/omniauth-facebook) - For allowing users to signup/login via Facebook


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/kriti-rai/outfits-on-the-go-with-js.git. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.


## License

All software is available as open source under the terms of the MIT License.
