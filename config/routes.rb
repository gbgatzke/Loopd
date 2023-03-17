Rails.application.routes.draw do
  resources :presets
  resources :sequences
  resources :users


  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/usersequences/:id', to: 'sequences#user_sequences'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
