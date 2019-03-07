Rails.application.routes.draw do
  # /levels    => published levels belonging to any user
  # /levels/:id/users    => user index of those that completed that level
  resources :levels, only: %i(index show) do
    resources :users, only: :index
  end

  # /users/:id    => user show
  # /users/:id/levels    => level index belonging to a user
  # /users/:id/levels/:id    => level show
  resources :users, only: %i(show)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
