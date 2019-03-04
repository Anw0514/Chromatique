# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Level.destroy_all
CompletedLevel.destroy_all

cicada = User.create(email: 'anw0514@gmail.com', username: 'Cicada 3301', password: '123')
ben = User.create(email: 'ben@gmail.com', username: 'Ben', password: '123')

level1 = Level.create(name: 'LEVEL 1', top_left: '#7ECBC9', top_right: '#F6E561', bottom_left: '#0837DC', bottom_right: '#F77259', grid_size: 6, user: cicada, published: true)
level2 = Level.create(name: 'LEVEL 2', top_left: '#7ECBC9', top_right: '#F6E561', bottom_left: '#0837DC', bottom_right: '#F77259', grid_size: 6, user: cicada, published: false)

CompletedLevel.create(user: ben, level: level1)
CompletedLevel.create(user: cicada, level: level1)