Rails.application.routes.draw do
  # /users/:id    => user show
  # /users/:id/levels    => level index belonging to a user
  # /users/:id/levels/:id    => level show
  # /levels    => published levels belonging to any user
  # /levels/:id /users    => user index of those that completed that level
  resources :levels, only: %i(index show)
  resources :users, only: %i(show)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
