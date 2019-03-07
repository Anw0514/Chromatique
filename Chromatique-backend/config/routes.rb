Rails.application.routes.draw do
  # /levels    => published levels belonging to any user
  # /levels/:id/users    => user index of those that completed that level
  resources :levels, only: %i(index show create destroy)
    resources :users, only: :index
  end

  post 'levels/:id/users/:user_id', to: 'levels#complete' 

  # /users/:id    => user show
  # /users/:id/levels    => level index belonging to a user
  # /users/:id/levels/:id    => level show
  resources :users, only: %i(show)
end
