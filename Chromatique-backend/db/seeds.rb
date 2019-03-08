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

ben = User.create(email: 'ben@gmail.com', username: 'Ben', password: '123')
cicada = User.create(email: 'anw0514@gmail.com', username: 'Cicada 3301', password: '123')
shannon = User.create(email: 'shannon@gmail.com', username: 'Shannon', password: '123')

level1 = Level.create(name: 'LEVEL 1', top_left: 'rgb(126, 203, 201)', top_right: 'rgb(246, 229, 97)', bottom_left: 'rgb(8, 55, 220)', bottom_right: 'rgb(247, 114, 89)', grid_size: 6, creator: cicada, published: true)
level2 = Level.create(name: 'LEVEL 2', top_left: 'rgb(199, 251, 0)', top_right: 'rgb(170, 14, 150)', bottom_left: 'rgb(0, 142, 150)', bottom_right: 'rgb(255, 99, 0)', grid_size: 9, creator: cicada, published: true)
level3 = Level.create(name: 'LEVEL 3', top_left: 'rgb(227, 255, 0)', top_right: 'rgb(195, 102, 140)', bottom_left: 'rgb(200, 27, 7)', bottom_right: 'rgb(0, 153, 226)', grid_size: 8, creator: cicada, published: true)
level4 = Level.create(name: 'LEVEL 4', top_left: 'rgb(26, 203, 201)', top_right: 'rgb(246, 229, 0)', bottom_left: 'rgb(28, 203, 22)', bottom_right: 'rgb(247, 14, 89)', grid_size: 10, creator: cicada, published: true)
level5 = Level.create(name: 'LEVEL 5', top_left: 'rgb(247, 203, 201)', top_right: 'rgb(246, 0, 197)', bottom_left: 'rgb(247, 55, 20)', bottom_right: 'rgb(150, 4, 250)', grid_size: 5, creator: cicada, published: true)
level6 = Level.create(name: 'LEVEL 6', top_left: 'rgb(26, 203, 21)', top_right: 'rgb(246, 255, 97)', bottom_left: 'rgb(148, 55, 220)', bottom_right: 'rgb(0, 137, 157)', grid_size: 7, creator: cicada, published: true)
level7 = Level.create(name: 'LEVEL 7', top_left: 'rgb(255, 0, 255)', top_right: 'rgb(55, 254, 253)', bottom_left: 'rgb(48, 0, 245)', bottom_right: 'rgb(250, 246, 0)', grid_size: 4, creator: cicada, published: true)
level8 = Level.create(name: 'LEVEL 8', top_left: 'rgb(126, 203, 201)', top_right: 'rgb(40, 30, 240)', bottom_left: 'rgb(228, 55, 220)', bottom_right: 'rgb(247, 14, 9)', grid_size: 6, creator: cicada, published: true)
level9 = Level.create(name: 'LEVEL 9', top_left: 'rgb(247, 0, 37)', top_right: 'rgb(0, 137, 157)', bottom_left: 'rgb(90, 200, 30)', bottom_right: 'rgb(247, 114, 2)', grid_size: 11, creator: cicada, published: true)

levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9]

3.times do |i|
  newlevel = Level.create(
    name: Faker::Book.title, 
    top_left: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    top_right: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    bottom_left: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    bottom_right: "rgb(#{Faker::Color.rgb_color.join(',')})", 
    grid_size: Faker::Number.between(4,12),
    creator: ben, published: true)

  CompletedLevel.create(user: cicada, level: newlevel)
end

4.times do |i|
  CompletedLevel.create(user: ben, level: levels.sample)
  CompletedLevel.create(user: shannon, level: levels.sample)
end

50.times do |i|
  name = Faker::Name.name

  newuser = User.create!(
    email: Faker::Internet.free_email(name),
    username: Faker::Internet.username(name, %w(_ -)),
    password: "123"
  )

  CompletedLevel.create(user: newuser, level: levels.sample)

  # random_pic = Dir.glob("profiles/*.*")[i]
  # user.avatar.attach(io: File.open(random_pic), filename: File.basename(random_pic))
  # sleep 1
end


