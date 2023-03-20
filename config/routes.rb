Rails.application.routes.draw do
  resources :presets, only: [:index, :show]
  resources :sequences, only: [:show, :create, :destroy, :user_sequences]
  resources :users, only: [:show, :create, :update, :destroy, :update_password]

  get '/me', to: 'users#show'
  patch '/userpassword/:id', to: 'users#update_password'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/usersequences/:id', to: 'sequences#user_sequences'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
