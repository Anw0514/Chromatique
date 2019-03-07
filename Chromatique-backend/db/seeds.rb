# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'database_cleaner'
DatabaseCleaner.strategy = :truncation
DatabaseCleaner.clean

cicada = User.create(email: 'anw0514@gmail.com', username: 'Cicada 3301', password: '123')
ben = User.create(email: 'ben@gmail.com', username: 'Ben', password: '123')

level1 = Level.create(name: 'LEVEL 1', top_left: 'rgb(126, 203, 201)', top_right: 'rgb(246, 229, 97)', bottom_left: 'rgb(8, 55, 220)', bottom_right: 'rgb(247, 114, 89)', grid_size: 6, creator: cicada, published: true)

10.times do |i|
  level = Level.create(
    name: Faker::Book.title, 
    top_left: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    top_right: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    bottom_left: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    bottom_right: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    grid_size: Faker::Number.between(6,10),
    creator: cicada, published: true)
end

CompletedLevel.create(user: cicada, level: level1)
CompletedLevel.create(user: ben, level: level1)

50.times do |i|
  name = Faker::Name.name

  user = User.create!(
    email: Faker::Internet.free_email(name),
    username: Faker::Internet.username(name, %w(_ -)),
    password: "123"
  )

  # random_pic = Dir.glob("profiles/*.*")[i]
  # user.avatar.attach(io: File.open(random_pic), filename: File.basename(random_pic))
  # sleep 1
end
