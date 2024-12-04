Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  devise_for :users
  root to: 'users#index'
  resources :users, only: %i(index show)
  
  resources :reports
end
