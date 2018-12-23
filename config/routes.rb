Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'sessions#new'

  get '/hashtags', to: 'tags#index', as: :hashtags
  get '/hashtags/:hashtag', to: 'tags#show', as: :hashtag

  get '/boards/feed' => 'boards#feed', as: :feed


  get '/sortedtags' => 'tags#sorted_tags'

  root to: 'sessions#new'

  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'
  delete '/signout' => 'sessions#destroy'

  get '/auth/facebook/callback' => 'sessions#create'
  get 'auth/failure', to: redirect('/')

  get '/users/:id/next', to: 'users#next'
  
  resources :users do
    resources :boards , shallow: true do
      resources :outfits, shallow: true
    end
  end


end
