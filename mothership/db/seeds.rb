# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Selection.create!(
  [
    {
      host: 'rubygems.org',
      url: 'https://rubygems.org/gems/rails/versions/6.0.0',
      text: 'Ruby on Rails is a full-stack web framework optimized for programmer happiness and sustainable productivity. It encourages beautiful code by favoring convention over configuration.'
    },
    {
      host: 'github.com',
      url: 'https://github.com/ryanseddon/react-frame-component',
      text: 'This component allows you to encapsulate your entire React application or per component in an iFrame.'
    }
  ]
)
