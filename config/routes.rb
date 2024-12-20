Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  devise_for :users
  root to: 'home#index'
  resources :users, only: %i(index show)
  resources :reports do
    scope module: :reports do
      resources :comments, only: :create
    end
  end
  resources :comments, only: :destroy
end
